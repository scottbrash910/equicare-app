// Equicare — answers Instagram and Facebook messages.
// Meta sends every new message here (the webhook). We save it, wait a few
// seconds in case more arrive, ask the AI for one reply, and send it back.
// When staff reply themselves, the assistant stays quiet in that chat.
//
// Settings in Vercel → Settings → Environment Variables:
//   META_VERIFY_TOKEN   optional; default equicare-gezira-webhook (type it in Meta's webhook setup)
//   META_APP_SECRET     Meta app → App settings → Basic → App secret
//   META_PAGE_TOKEN     Meta app → Messenger → Instagram/Messenger settings → Generate token
//   OPENAI_API_KEY      platform.openai.com → API keys (or ANTHROPIC_API_KEY instead)
//   EQ_BOT_KEY          printed by social-1.sql
//   EQ_MODEL            optional, default gpt-6-luna (OpenAI) or claude-haiku-5-5
const crypto = require("crypto");
const KNOWLEDGE = require("./_knowledge");

const SB = "https://dbrekbtgkhvhudqhuito.supabase.co";
// The public key, the same one the apps use. Each function checks EQ_BOT_KEY itself.
const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicmVrYnRna2h2aHVkcWh1aXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM1Mzc5OTgsImV4cCI6MjEwOTExMzk5OH0.wA70oorXBc70IQ12NzSKbNRwKn4DVfZ54jNAK5sllfY";
const GRAPH = "https://graph.facebook.com/v23.0";
const TZ = "Africa/Cairo";
const WAIT_MS = 4500;          // gather messages sent in a row into one reply
const env = k => (process.env[k] || "").trim();
// Not a secret: it only confirms to Meta that this address is ours. Can be overridden in Vercel.
const VERIFY = env("META_VERIFY_TOKEN") || "equicare-gezira-webhook";
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function rpc(name, args) {
  const r = await fetch(SB + "/rest/v1/rpc/" + name, {
    method: "POST",
    headers: { apikey: ANON, Authorization: "Bearer " + ANON, "Content-Type": "application/json" },
    body: JSON.stringify(Object.assign({ p_key: env("EQ_BOT_KEY") }, args))
  });
  const t = await r.text();
  if (!r.ok) throw new Error(name + ": " + t.slice(0, 300));
  return t ? JSON.parse(t) : null;
}
const note = msg => rpc("social_note", { p_note: String(msg).slice(0, 400) }).catch(() => {});

// ---------- Is this really Meta? ----------
function readRaw(req, ms) {
  return new Promise(resolve => {
    const chunks = []; let done = false;
    const finish = v => { if (!done) { done = true; clearTimeout(timer); resolve(v); } };
    const timer = setTimeout(() => finish(chunks.length ? Buffer.concat(chunks) : null), ms);
    try {
      req.on("data", c => chunks.push(Buffer.from(c)));
      req.on("end", () => finish(Buffer.concat(chunks)));
      req.on("error", () => finish(null));
    } catch (e) { finish(null); }
  });
}
// Meta's own way of writing JSON, for when the platform has already read the body.
const metaJson = o => JSON.stringify(o)
  .replace(/\//g, "\\/")
  .replace(/[\u007f-￿]/g, c => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"));
function signed(raw, header) {
  const secret = env("META_APP_SECRET");
  if (!secret || !header) return false;
  const want = Buffer.from("sha256=" + crypto.createHmac("sha256", secret).update(raw).digest("hex"));
  const got = Buffer.from(String(header));
  return want.length === got.length && crypto.timingSafeEqual(want, got);
}

// ---------- Talking to Meta ----------
async function graphSend(payload) {
  const r = await fetch(GRAPH + "/me/messages?access_token=" + encodeURIComponent(env("META_PAGE_TOKEN")), {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error("Meta send: " + JSON.stringify(j.error || j).slice(0, 250));
  return j;
}
async function profileName(platform, user) {
  try {
    const fields = platform === "instagram" ? "name,username" : "first_name,last_name";
    const r = await fetch(GRAPH + "/" + user + "?fields=" + fields + "&access_token=" + encodeURIComponent(env("META_PAGE_TOKEN")));
    const j = await r.json();
    return j.name || [j.first_name, j.last_name].filter(Boolean).join(" ") || (j.username ? "@" + j.username : null);
  } catch (e) { return null; }
}
// Instagram allows 1,000 characters per message.
function pieces(text) {
  const out = []; let left = String(text || "").trim();
  while (left.length > 950) {
    let cut = left.lastIndexOf("\n", 950);
    if (cut < 400) cut = left.lastIndexOf(". ", 950) + 1;
    if (cut < 400) cut = 950;
    out.push(left.slice(0, cut).trim()); left = left.slice(cut).trim();
  }
  if (left) out.push(left);
  return out;
}

// ---------- The AI ----------
function cairoNow() {
  return new Intl.DateTimeFormat("en-GB", { timeZone: TZ, weekday: "long", day: "numeric", month: "long",
    year: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date());
}
async function think(ctx, platform, name) {
  const lines = (ctx.history || []).map(h =>
    (h.dir === "in" ? "Customer: " : h.dir === "staff" ? "Equicare (team member): " : "Equicare: ") + h.text);
  const known = [
    "Platform: " + platform,
    "Customer's name on " + platform + ": " + (name || "unknown"),
    "Member: " + (ctx.member || "unknown") + (ctx.member_no ? " (membership no. " + ctx.member_no + ")" : ""),
    "Rider found in our records: " + (ctx.rider ? "yes" : "no"),
    "Now in Cairo: " + cairoNow()
  ].join("\n");
  const notes = ctx.notes && ctx.notes.trim() ? "# Staff notes (latest news, these override the notes above)\n" + ctx.notes.trim() : "";
  const ask = "What we know:\n" + known + "\n\nConversation so far (oldest first):\n" + lines.join("\n") +
    "\n\nWrite Equicare's next reply to the customer's latest message(s). Return only the JSON object.";
  let text;
  if (env("OPENAI_API_KEY")) {                                // OpenAI (GPT-6 Luna by default)
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: "Bearer " + env("OPENAI_API_KEY"), "Content-Type": "application/json" },
      body: JSON.stringify({
        model: env("EQ_MODEL") || "gpt-6-luna",
        max_completion_tokens: 2000,
        response_format: { type: "json_object" },
        messages: [{ role: "system", content: KNOWLEDGE + (notes ? "\n\n" + notes : "") }, { role: "user", content: ask }]
      })
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error("AI: " + JSON.stringify(j.error || j).slice(0, 250));
    text = (((j.choices || [])[0] || {}).message || {}).content || "";
  } else {                                                    // Anthropic (Claude Haiku 5.5)
    const system = [{ type: "text", text: KNOWLEDGE, cache_control: { type: "ephemeral" } }];
    if (notes) system.push({ type: "text", text: notes });
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": env("ANTHROPIC_API_KEY"), "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: env("EQ_MODEL") || "claude-haiku-5-5", max_tokens: 700, system,
        messages: [{ role: "user", content: ask }] })
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error("AI: " + JSON.stringify(j.error || j).slice(0, 250));
    text = (j.content || []).filter(c => c.type === "text").map(c => c.text).join("");
  }
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("AI gave no answer: " + text.slice(0, 120));
  return JSON.parse(m[0]);
}

// ---------- One customer message ----------
async function incoming(platform, user, mid, text) {
  const r = await rpc("social_in", { p_platform: platform, p_user: user, p_mid: mid, p_text: text });
  if (!r || !r.new) return;                                   // Meta sent it twice
  await sleep(WAIT_MS);
  const ctx = await rpc("social_context", { p_thread: r.thread, p_mid: mid });
  if (!ctx.latest) return;                                    // a newer message answers them all
  if (!ctx.bot_on || ctx.paused || ctx.needs_admin) return;   // staff are handling it
  if (ctx.too_many) {
    await rpc("social_out", { p_thread: r.thread, p_mid: null, p_text: null, p_handover: true, p_note: "Very long chat: assistant stopped, please take over." });
    return;
  }
  const name = ctx.name || await profileName(platform, user);

  graphSend({ recipient: { id: user }, sender_action: "typing_on" }).catch(() => {});
  let a;
  try { a = await think(ctx, platform, name); }
  catch (e) { await note(e.message); return; }                // staff see it in the inbox; nothing is sent

  const parts = pieces(a.reply);
  const info = {
    p_member: a.member, p_member_no: a.member_no || null, p_lang: a.lang || null,
    p_handover: !!a.handover, p_note: a.note || null, p_name: name || null
  };
  if (!parts.length) { await rpc("social_out", Object.assign({ p_thread: r.thread, p_mid: null, p_text: null }, info)); return; }
  for (let i = 0; i < parts.length; i++) {
    const sent = await graphSend({ recipient: { id: user }, messaging_type: "RESPONSE", message: { text: parts[i] } });
    await rpc("social_out", Object.assign({ p_thread: r.thread, p_mid: sent.message_id || null, p_text: parts[i] }, i === 0 ? info : {}));
  }
}

// ---------- A message from our side (staff, or the assistant's own copy) ----------
async function fromUs(platform, user, msg) {
  if (msg.app_id && env("META_APP_ID") && String(msg.app_id) === env("META_APP_ID")) return;
  await sleep(3000);                                          // let the assistant save its own reply first
  const text = msg.text || "[" + (msg.attachments || []).map(x => x.type).join(", ") + "]";
  await rpc("social_staff", { p_platform: platform, p_user: user, p_mid: msg.mid, p_text: text });
}

module.exports = async (req, res) => {
  if (req.method === "GET") {
    const q = req.query || {};
    if (q["hub.mode"] === "subscribe") {
      if (q["hub.verify_token"] && q["hub.verify_token"] === VERIFY) return res.status(200).send(q["hub.challenge"]);
      return res.status(403).send("Wrong verify token");
    }
    const need = ["META_APP_SECRET", "META_PAGE_TOKEN", "EQ_BOT_KEY"].filter(k => !env(k));
    if (!env("OPENAI_API_KEY") && !env("ANTHROPIC_API_KEY")) need.push("OPENAI_API_KEY");
    return res.status(200).json({ service: "Equicare Instagram & Facebook assistant", ready: !need.length, missing: need });
  }
  if (req.method !== "POST") return res.status(405).end();

  let body;
  const sig = req.headers["x-hub-signature-256"];
  const raw = await readRaw(req, 1500);
  if (raw && raw.length) {
    if (!signed(raw, sig)) { await note("A message was refused: signature did not match. Check META_APP_SECRET."); return res.status(401).end(); }
    try { body = JSON.parse(raw.toString("utf8")); } catch (e) { return res.status(400).end(); }
  } else {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    if (!signed(Buffer.from(metaJson(body)), sig)) { await note("A message was refused: signature did not match. Check META_APP_SECRET."); return res.status(401).end(); }
  }

  const platform = body.object === "instagram" ? "instagram" : body.object === "page" ? "facebook" : null;
  if (!platform) return res.status(200).send("ignored");

  const work = [];
  for (const entry of body.entry || []) {
    for (const ev of entry.messaging || []) {
      const msg = ev.message;
      if (ev.postback && ev.sender) {                         // Facebook "Get started" and menu buttons
        const t = ev.postback.title || ev.postback.payload || "Hi";
        work.push(incoming(platform, ev.sender.id, ev.postback.mid || "pb-" + ev.sender.id + "-" + ev.timestamp, t));
        continue;
      }
      if (!msg || msg.is_deleted || !ev.sender || !ev.recipient) continue;
      if (msg.is_echo) { work.push(fromUs(platform, ev.recipient.id, msg)); continue; }
      if (ev.sender.id === entry.id) continue;
      let text = (msg.text || "").trim();
      const types = (msg.attachments || []).map(x => x.type).filter(Boolean);
      if (!text && types.length) text = "[sent " + types.join(", ") + "]";
      if (msg.is_unsupported && !text) text = "[sent a message type we can't read]";
      if (msg.reply_to && msg.reply_to.story) text = "[replied to our story] " + text;
      if (text) work.push(incoming(platform, ev.sender.id, msg.mid, text));
    }
  }
  const done = await Promise.allSettled(work);
  const failed = done.find(d => d.status === "rejected");
  if (failed) await note(failed.reason && failed.reason.message || failed.reason);
  return res.status(200).send("EVENT_RECEIVED");
};

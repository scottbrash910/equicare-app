// Equicare — sends the lesson reminders.
// The database wakes this every 5 minutes when reminders are waiting
// (see push-1.sql). It needs no settings: the secret push key arrives from the
// database with each call, and the notification keys are kept in the database.
const webpush = require("web-push");

const SB = "https://dbrekbtgkhvhudqhuito.supabase.co";
// The public key, the same one the apps use. Each function checks the push key itself.
const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicmVrYnRna2h2aHVkcWh1aXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM1Mzc5OTgsImV4cCI6MjEwOTExMzk5OH0.wA70oorXBc70IQ12NzSKbNRwKn4DVfZ54jNAK5sllfY";
const SITE = "https://equicare-black.vercel.app";
const TZ = "Africa/Cairo";

async function rpc(name, args) {
  const r = await fetch(SB + "/rest/v1/rpc/" + name, {
    method: "POST",
    headers: { apikey: ANON, Authorization: "Bearer " + ANON, "Content-Type": "application/json" },
    body: JSON.stringify(args)
  });
  const t = await r.text();
  if (!r.ok) throw new Error(name + ": " + t.slice(0, 300));
  return t ? JSON.parse(t) : null;
}

function message(m, now) {
  if (m.kind === "test") {
    return { title: "Equicare reminders are on", body: "You will get a reminder before each lesson.", tag: "equicare-test", url: "./index.html" };
  }
  const at = new Date(m.at);
  const time = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: TZ }).format(at);
  const mins = Math.max(1, Math.round((at - now) / 60000));
  const when = mins >= 55 ? "in 1 hour" : "in " + mins + " minutes";
  const first = String(m.rider || "").trim().split(/\s+/)[0] || "Your";
  return {
    title: first + "'s lesson at " + time,
    body: "Starts " + when + " · Level " + m.level + (m.trainer ? " with " + m.trainer : "") + ". See you at the arena.",
    tag: "lesson-" + m.booking,
    url: "./index.html"
  };
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(200).json({ ok: true, service: "Equicare reminders" });
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const key = body && body.key;
  if (!key) return res.status(401).json({ error: "no key" });

  try {
    const d = await rpc("push_take", { p_key: key });
    let pub = d.public, priv = d.private;
    if (!pub || !priv) {
      const k = webpush.generateVAPIDKeys();
      const saved = await rpc("push_set_keys", { p_key: key, p_public: k.publicKey, p_private: k.privateKey });
      pub = saved.public; priv = saved.private;
    }
    const opts = { vapidDetails: { subject: SITE, publicKey: pub, privateKey: priv }, TTL: 3600, urgency: "high" };
    const now = new Date(), ok = [], gone = [], failed = [];

    await Promise.all((d.messages || []).map(async m => {
      const sub = { endpoint: m.endpoint, keys: { p256dh: m.p256dh, auth: m.auth } };
      try {
        await webpush.sendNotification(sub, JSON.stringify(message(m, now)), opts);
        ok.push(m.endpoint);
      } catch (e) {
        if (e.statusCode === 404 || e.statusCode === 410) gone.push(m.endpoint);
        else failed.push((e.statusCode || "") + " " + String(e.body || e.message || "").slice(0, 120));
      }
    }));

    const note = new Date().toISOString() + ": sent " + ok.length + ", gone " + gone.length +
      (failed.length ? ", failed " + failed.length + " (" + failed[0] + ")" : "");
    await rpc("push_report", { p_key: key, p_ok: ok, p_gone: gone, p_note: note });
    return res.status(200).json({ sent: ok.length, gone: gone.length, failed: failed.length });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
};

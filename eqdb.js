// Equicare — the one connection to the database, shared by both apps.
// The anon key is public by design; Row Level Security protects the data.
(function () {
  var URL_ = "https://dbrekbtgkhvhudqhuito.supabase.co";
  var KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicmVrYnRna2h2aHVkcWh1aXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM1Mzc5OTgsImV4cCI6MjEwOTExMzk5OH0.wA70oorXBc70IQ12NzSKbNRwKn4DVfZ54jNAK5sllfY";
  var LIB = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js";
  // ?demo on the address opens the old demo data instead of the live database.
  var LIVE = !/[?&]demo\b/.test(location.search);
  var client = null, loading = null;

  function load() {
    if (client) return Promise.resolve(client);
    if (loading) return loading;
    loading = new Promise(function (res, rej) {
      function go() {
        client = window.supabase.createClient(URL_, KEY, {
          auth: { persistSession: true, autoRefreshToken: true, storageKey: "equicare.auth" }
        });
        res(client);
      }
      if (window.supabase && window.supabase.createClient) return go();
      var s = document.createElement("script");
      s.src = LIB; s.async = true;
      s.onload = go;
      s.onerror = function () { loading = null; rej(new Error("No connection. Check the internet and try again.")); };
      document.head.appendChild(s);
    });
    return loading;
  }

  function friendly(e) {
    var m = (e && (e.message || e.error_description || e.msg)) || String(e || "");
    if (/anonymous.*disabled|signups? not allowed/i.test(m)) return new Error("Sign-in is switched off on the server. Message Equicare.");
    if (/failed to fetch|network|load failed/i.test(m)) return new Error("No connection. Check the internet and try again.");
    if (/admins only/i.test(m)) return new Error("Sign in as staff first.");
    return new Error(m.replace(/^.*?ERROR:\s*/i, ""));
  }

  async function ensureSession() {
    var c = await load();
    var got = await c.auth.getSession();
    if (got.data && got.data.session) return got.data.session;
    var r = await c.auth.signInAnonymously();
    if (r.error) throw friendly(r.error);
    return r.data.session;
  }

  async function rpc(name, args) {
    try {
      await ensureSession();
      var c = await load();
      var r = await c.rpc(name, args || {});
      if (r.error) throw r.error;
      return r.data;
    } catch (e) { throw friendly(e); }
  }

  async function hasSession() {
    try { var c = await load(); var g = await c.auth.getSession(); return !!(g.data && g.data.session); }
    catch (e) { return false; }
  }

  async function signOut() {
    try { var c = await load(); await c.auth.signOut(); } catch (e) {}
  }

  window.EQDB = { live: LIVE, load: load, rpc: rpc, hasSession: hasSession, signOut: signOut };
})();

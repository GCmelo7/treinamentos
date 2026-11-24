/* Alta Performance Comercial — acesso, salvamento na nuvem e identidade do sistema.
   © 2026 Gabriel Melo. Todos os direitos reservados. */
(function () {
  'use strict';
  var C = window.APC_CONFIG || {};
  var ON = !!(C.SUPABASE_URL && C.SUPABASE_ANON_KEY && window.supabase);
  var META = 'apc__meta';
  var isKey = function (k) { return typeof k === 'string' && /^apc_(?!_)/.test(k); };
  var rawSet = Storage.prototype.setItem, rawDel = Storage.prototype.removeItem;
  var page = (location.pathname.split('/').pop() || 'index.html');
  var isLogin = page === 'entrar.html';
  if (page === 'index.html' && !location.hash) {
    var ref = ''; try { ref = document.referrer ? new URL(document.referrer).origin : '' } catch (e) {}
    if (ref !== location.origin) { location.replace('inicio.html' + location.search); return }
  }
  var client = ON ? window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_ANON_KEY, { auth: { persistSession: true, autoRefreshToken: true, storageKey: 'apc-auth' } }) : null;

  function meta() { try { return JSON.parse(localStorage.getItem(META) || '{}') } catch (e) { return {} } }
  function setMeta(m) { try { rawSet.call(localStorage, META, JSON.stringify(m)) } catch (e) {} }
  function localKeys() { var k = []; for (var i = 0; i < localStorage.length; i++) { var x = localStorage.key(i); if (isKey(x)) k.push(x) } return k }
  function snapshot() { var o = {}; localKeys().forEach(function (k) { o[k] = localStorage.getItem(k) }); return o }
  function clearLocal() { localKeys().forEach(function (k) { rawDel.call(localStorage, k) }) }

  var APC = window.APC = { on: ON, client: client, user: null, nome: '', status: 'local' };
  APC.nextUrl = function () {
    var n = new URLSearchParams(location.search).get('next') || '';
    if (!n || /^(index\.html)?$/.test(n) || /^https?:/i.test(n) || n.indexOf('//') === 0 || n.indexOf('entrar.html') === 0) return 'inicio.html';
    return n;
  };

  /* ---------- barra de conta e rodapé ---------- */
  var CSS = '.apc-strip{background:#0B1F4D;color:#fff;font:600 12.5px/1.2 Montserrat,system-ui,sans-serif;display:flex;align-items:center;gap:14px;padding:7px 16px;position:relative;z-index:90}' +
    '.apc-strip a,.apc-strip button{color:#fff;text-decoration:none;font:inherit;background:none;border:0;cursor:pointer;padding:4px 8px;border-radius:8px}' +
    '.apc-strip a:hover,.apc-strip button:hover{background:rgba(255,255,255,.12)}' +
    '.apc-strip .apc-who{display:flex;align-items:center;gap:8px;min-width:0}.apc-strip .apc-who b{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:40vw}' +
    '.apc-strip .st{display:inline-flex;align-items:center;gap:6px;opacity:.9;white-space:nowrap}.apc-strip .st i{width:8px;height:8px;border-radius:50%;background:#1DBF8A;display:inline-block}' +
    '.apc-strip .st.saving i{background:#F2C14E}.apc-strip .st.off i{background:#E86A6A}.apc-strip .st.local i{background:#9FB3D1}' +
    '.apc-strip .sp{margin-left:auto;display:flex;gap:2px}' +
    '@media(max-width:600px){.apc-strip{gap:8px;padding:6px 10px}.apc-strip .st span{display:none}.apc-strip .apc-who b{max-width:34vw}}' +
    '.apc-foot{font:500 12px/1.55 Montserrat,system-ui,sans-serif;color:#5A6B85;text-align:center;padding:22px 16px 28px;border-top:1px solid #D6E1EC;background:#fff;margin-top:24px}' +
    '.apc-foot b{color:#0E2A5C}.apc-foot a{color:#1565C0}' +
    '@media(max-width:600px){.apc-foot{font-size:11.5px;line-height:1.5;padding:18px 18px 22px;margin-top:8px}.apc-foot div+div{margin-top:4px}.apc-foot div:last-child{font-size:11px;color:#6B7C93}}' +
    '@media(max-width:980px){.mobnav ~ .apc-foot{padding-bottom:calc(92px + env(safe-area-inset-bottom))}}';
  function addCSS() { if (document.getElementById('apc-css')) return; var s = document.createElement('style'); s.id = 'apc-css'; s.textContent = CSS; document.head.appendChild(s) }

  APC.footerHTML = function () {
    return '<div><b>Alta Performance Comercial e Fidelização Estratégica</b> · Escola de Negócios IEL Pernambuco</div>' +
      '<div>Sistema e conteúdo desenvolvidos por <b>Gabriel Melo</b>. © 2026 Gabriel Melo. Todos os direitos reservados.</div>' +
      '<div>Proibida a reprodução, distribuição ou uso comercial, total ou parcial, sem autorização do autor. As marcas IEL e Escola de Negócios pertencem a seus titulares. Casos, empresas e números das práticas são fictícios.</div>';
  };
  function strip() {
    if (isLogin || document.querySelector('.apc-strip')) return;
    addCSS();
    var d = document.createElement('div'); d.className = 'apc-strip'; d.setAttribute('role', 'navigation'); d.setAttribute('aria-label', 'Sua conta');
    d.innerHTML = '<div class="apc-who"><span aria-hidden="true">●</span><b id="apc-nome">' + (ON ? 'Carregando…' : 'Modo local') + '</b></div>' +
      '<span class="st local" id="apc-st"><i></i><span id="apc-st-t">' + (ON ? 'Conectando…' : 'Salvo neste aparelho') + '</span></span>' +
      '<div class="sp">' + (page === 'inicio.html' ? '' : '<a href="inicio.html">⌂ Início</a>') + (ON ? '<button type="button" id="apc-sair">Sair</button>' : '') + '</div>';
    document.body.insertBefore(d, document.body.firstChild);
    var s = document.getElementById('apc-sair'); if (s) s.onclick = APC.logout;
    var f = document.createElement('footer'); f.className = 'apc-foot'; f.innerHTML = APC.footerHTML(); document.body.appendChild(f);
    paint();
  }
  function paint() {
    var n = document.getElementById('apc-nome'); if (n && APC.user) n.textContent = 'Olá, ' + (APC.nome.split(' ')[0] || 'participante');
    var st = document.getElementById('apc-st'), t = document.getElementById('apc-st-t'); if (!st) return;
    var map = { ok: ['', 'Tudo salvo'], saving: ['saving', 'Salvando…'], off: ['off', 'Sem conexão: salvo no aparelho'], local: ['local', ON ? 'Conectando…' : 'Salvo neste aparelho'] };
    var m = map[APC.status] || map.local; st.className = 'st ' + m[0]; t.textContent = m[1]; st.title = m[1];
    document.dispatchEvent(new CustomEvent('apc:status', { detail: APC.status }));
  }
  function setStatus(s) { APC.status = s; paint() }

  /* ---------- salvamento ---------- */
  var timer = null, token = null;
  var pulled = false;
  function schedule() {
    var m = meta();
    if (!pulled) { m.pending = true; setMeta(m); return }          // antes de sincronizar: só anota
    m.dirty = true; setMeta(m); if (!ON || !APC.user) return; setStatus('saving'); clearTimeout(timer); timer = setTimeout(push, 1200)
  }
  Storage.prototype.setItem = function (k, v) {
    var same = this === localStorage && isKey(k) && this.getItem(k) === String(v);
    rawSet.call(this, k, v); if (this === localStorage && isKey(k) && !same) schedule()
  };
  Storage.prototype.removeItem = function (k) { rawDel.call(this, k); if (this === localStorage && isKey(k)) schedule() };

  function push(keepalive) {
    clearTimeout(timer);
    if (!ON || !APC.user || !token) return Promise.resolve();
    var now = new Date().toISOString();
    var body = JSON.stringify({ user_id: APC.user.id, nome: APC.nome, email: APC.user.email, dados: snapshot(), atualizado_em: now });
    return fetch(C.SUPABASE_URL + '/rest/v1/progresso?on_conflict=user_id', {
      method: 'POST', keepalive: !!keepalive,
      headers: { apikey: C.SUPABASE_ANON_KEY, Authorization: 'Bearer ' + token, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: body
    }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      var m = meta(); m.dirty = false; m.ts = now; m.uid = APC.user.id; setMeta(m); setStatus('ok');
    }).catch(function () { setStatus('off'); clearTimeout(timer); timer = setTimeout(push, 15000) });
  }
  APC.saveNow = function () { return push() };
  window.addEventListener('pagehide', function () { if (meta().dirty) push(true) });
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden' && meta().dirty) push(true) });
  window.addEventListener('online', function () { if (meta().dirty) push() });

  function pull() {
    return client.from('progresso').select('dados,atualizado_em').eq('user_id', APC.user.id).maybeSingle().then(function (res) {
      if (res.error) throw res.error;
      var row = res.data, m = meta();
      var switched = false;
      if (m.uid && m.uid !== APC.user.id) { clearLocal(); m = { uid: APC.user.id }; switched = true }
      var localEdits = m.dirty || (m.pending && m.uid === APC.user.id && m.ts);
      m.uid = APC.user.id; delete m.pending; setMeta(m); pulled = true;
      if (localEdits) return push();                                   // edições locais ainda não enviadas prevalecem
      if (row && row.dados && (!m.ts || row.atualizado_em > m.ts)) {
        var before = JSON.stringify(snapshot());
        clearLocal(); Object.keys(row.dados).forEach(function (k) { if (isKey(k)) rawSet.call(localStorage, k, row.dados[k]) });
        m.ts = row.atualizado_em; m.dirty = false; setMeta(m); setStatus('ok');
        if (JSON.stringify(snapshot()) !== before && !isLogin && page !== 'inicio.html') {
          if (!sessionStorage.getItem('apc_reloaded')) { sessionStorage.setItem('apc_reloaded', '1'); location.reload(); return }
        }
        document.dispatchEvent(new CustomEvent('apc:data'));
        return;
      }
      if (switched && !isLogin && page !== 'inicio.html' && !sessionStorage.getItem('apc_reloaded')) { sessionStorage.setItem('apc_reloaded', '1'); location.reload(); return }
      if (!row && localKeys().length) return push();
      setStatus('ok');
    }).catch(function () { pulled = true; var m = meta(); if (m.pending) { m.dirty = true; delete m.pending; setMeta(m) } setStatus('off') });
  }

  /* ---------- sessão ---------- */
  APC.logout = function () {
    var go = function () { clearLocal(); setMeta({}); (client ? client.auth.signOut() : Promise.resolve()).finally(function () { location.href = 'entrar.html' }) };
    if (meta().dirty && APC.user) { setStatus('saving'); push().finally(go) } else go();
  };
  APC.ready = new Promise(function (resolve) {
    if (!ON) { pulled = true; APC.status = 'local'; resolve(null); return }
    if (!isLogin) document.documentElement.style.visibility = 'hidden';
    client.auth.getSession().then(function (r) {
      var s = r.data && r.data.session;
      if (!s) {
        if (isLogin) { resolve(null); return }
        location.replace('entrar.html?next=' + encodeURIComponent(page + location.search + location.hash)); return;
      }
      token = s.access_token; APC.user = s.user;
      try { rawSet.call(localStorage, 'apc__known', '1') } catch (e) {}
      APC.nome = (s.user.user_metadata && s.user.user_metadata.nome) || s.user.email.split('@')[0];
      document.documentElement.style.visibility = '';
      if (isLogin) { resolve(s.user); return }
      paint(); pull().finally(function () { sessionStorage.removeItem('apc_reloaded'); resolve(s.user) });
    });
    client.auth.onAuthStateChange(function (ev, s) { if (s) { token = s.access_token; APC.user = s.user } });
  });

  function boot() { addCSS(); strip() }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();

/* Motor das árvores de links · Gabriel Melo
   Cada página define window.TREE e carrega este arquivo. O perfil é o mesmo para todas. */
(function(){
const PROFILE={
  name:'Gabriel Melo',
  role:'Consultor em inovação, IA aplicada e negócios',
  photo:'gabriel.jpg',
  rotator:['IA aplicada ao trabalho real','Inovação e design de negócios','Estratégia comercial e crescimento'],
  linkedin:'https://www.linkedin.com/in/gabriel-cmelo/',
  instagram:'https://www.instagram.com/gabrielcmelo',
  whatsapp:'https://wa.me/5581999141429',
  quote:'Tecnologia só gera valor quando melhora o trabalho real.'
};
const I={
  flask:'<path d="M9 3h6M10 3v6.5L4.6 18.2A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.7-2.8L14 9.5V3"/><path d="M7.5 15h9"/>',
  spark:'<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  wand:'<path d="M15 4V2M15 10V8M11 6h2M17 6h2M4 20L14 10"/><path d="M12.5 11.5l-1-1"/>',
  gem:'<path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M12 21L8 9l4-6 4 6z"/>',
  chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  li:'<path d="M4 9h3.5v11H4zM5.7 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h3.4v1.6c.5-.9 1.7-1.9 3.6-1.9 3.6 0 4 2.3 4 5.3V20h-3.5v-5.2c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V20H10z" fill="currentColor" stroke="none"/>',
  ig:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/>',
  qr:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 17h4v4h-4"/>',
  copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
  share:'<path d="M12 3v13M7 8l5-5 5 5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>',
  arrow:'<path d="M7 17L17 7M8 7h9v9"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin:'<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6"/>',
  wa:'<path d="M20.5 11.7a8.6 8.6 0 0 1-12.7 7.5L3.5 20.5l1.3-4.2A8.6 8.6 0 1 1 20.5 11.7z"/><path d="M9 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.5c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3 0 .6-.5.8-.6.3-1.5.4-2.6 0-1.9-.7-3.6-2.3-4.4-4.3-.4-1.1-.3-2-.4-2.6z" fill="currentColor" stroke="none"/>',
  dl:'<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>'
};
const ic=(n)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${I[n]||I.arrow}</svg>`;
const esc=(s)=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const T=window.TREE||{}; const A=T.assets||'../assets/';
const $=(s,r=document)=>r.querySelector(s);

/* ---------- blocos ---------- */
function profile(){
  return `<header class="profile">
    <div class="avatar"><img src="${A}${PROFILE.photo}" alt="${PROFILE.name}" width="112" height="112">${T.live?'<span class="live" title="Ao vivo"></span>':''}</div>
    <div class="name">${PROFILE.name}</div>
    <div class="role">${PROFILE.role}</div>
    <div class="rotator">${PROFILE.rotator.concat(PROFILE.rotator[0]).map(t=>`<span>${t}</span>`).join('')}</div>
    <div class="socials">
      <a class="social" href="${PROFILE.linkedin}" target="_blank" rel="noopener">${ic('li')}LinkedIn</a>
      <a class="social" href="${PROFILE.instagram}" target="_blank" rel="noopener">${ic('ig')}Instagram</a>
    </div></header>`;
}
function card(it,i){
  const cls=['card',it.featured?'featured':''].join(' ');
  const ext=/^https?:/.test(it.url);
  return `<div class="${cls}" style="transition-delay:${i*60}ms">
    <a class="go" href="${esc(it.url)}" ${ext?'target="_blank" rel="noopener"':''} aria-label="${esc(it.title)}"></a>
    <div class="ic ${it.cyan?'cy':''}">${ic(it.icon)}</div>
    <div class="tx"><div class="tt">${esc(it.title)}${it.tag?`<span class="tag ${it.featured?'lime':''}">${esc(it.tag)}</span>`:''}</div><div class="st">${esc(it.sub||'')}</div></div>
    <div class="acts">
      <button class="mini q" data-qr="${esc(it.url)}" data-t="${esc(it.title)}" aria-label="QR Code">${ic('qr')}</button>
      <button class="mini" data-copy="${esc(it.url)}" aria-label="Copiar link">${ic('copy')}</button>
    </div></div>`;
}
function section(s){
  return `<div class="sec-h"><h2>${esc(s.label)}</h2>${s.note?`<small>${esc(s.note)}</small>`:''}</div><div class="list">${s.items.map(card).join('')}</div>`;
}
function agenda(a){
  return `<div class="sec-h"><h2>Roteiro do encontro</h2><small>${esc(T.agendaNote||'')}</small></div>
  <div class="agenda">${a.map((s,i)=>`<div class="slot" data-i="${i}"><div class="hr">${s.t}</div><div class="bar"></div><div><b>${esc(s.label)}<span class="dur">${s.d}′</span></b><span>${esc(s.desc)}</span></div></div>`).join('')}</div>`;
}
function promptCards(){
  const L=[['P','Papel','Quem a IA deve ser nessa tarefa'],['R','Requisição','Qual tarefa ou problema resolver'],['O','Objetivo','Qual resultado você espera'],['M','Modelo','Como quer receber a resposta'],['P','Panorama','Contexto, fatos, dados e restrições'],['T','Testar','Criticar, validar e virar ação']];
  return `<div class="sec-h"><h2>Método PROMPT</h2><small>toque para virar</small></div>
  <div class="prompt-grid">${L.map(l=>`<button class="flip" aria-label="${l[1]}"><div class="flip-in"><div class="face f"><strong>${l[0]}</strong><small>${l[1]}</small></div><div class="face b">${l[2]}</div></div></button>`).join('')}</div>`;
}
function connect(){
  return `<div class="sec-h"><h2>Vamos continuar a conversa</h2></div>
  <div class="connect">
    <a class="cbox" href="${PROFILE.linkedin}" target="_blank" rel="noopener">${ic('li')}<b>LinkedIn</b><span>Conteúdo sobre IA aplicada e negócios</span></a>
    <a class="cbox" href="${PROFILE.instagram}" target="_blank" rel="noopener">${ic('ig')}<b>Instagram</b><span>Bastidores, aulas e projetos</span></a>
  </div><div class="quote">“${PROFILE.quote}”</div>`;
}
function trails(list){
  return `<div class="sec-h"><h2>Treinamentos e trabalhos</h2><small>${list.length} ${list.length===1?'trilha':'trilhas'}</small></div>
  <div class="list">${list.map(t=>`<a class="trail" href="${esc(t.url)}"><span class="arrow">${ic('arrow')}</span><span class="pill ${t.cyan?'cy':''}">${esc(t.kicker)}</span><h3>${esc(t.title)}</h3><p>${esc(t.sub)}</p></a>`).join('')}
  <div class="empty">Novas trilhas aparecem aqui a cada turma.</div></div>`;
}

/* ---------- montagem ---------- */
const app=document.getElementById('app');
let html=`<div class="topbar"><div class="brand"><i></i>${esc(T.brand||'Gabriel Melo')}</div>
  <div style="display:flex;gap:8px"><button class="icon-btn" id="qrPage" aria-label="QR desta página">${ic('qr')}</button><button class="icon-btn" id="sharePage" aria-label="Compartilhar">${ic('share')}</button></div></div>`;
html+=profile();
if(T.kind==='hub'){
  html+=trails(T.trails||[])+connect();
}else{
  html+=`<section class="event"><span class="pill" id="evPill"><span class="dot"></span>${esc(T.kicker||'')}</span>
    <h1>${T.titleHtml||esc(T.title)}</h1><p>${esc(T.subtitle||'')}</p>
    <div class="meta">${T.dateLabel?`<span>${ic('clock')}${esc(T.dateLabel)}</span>`:''}${T.place?`<span>${ic('pin')}${esc(T.place)}</span>`:''}${T.audience?`<span>${ic('users')}${esc(T.audience)}</span>`:''}</div></section>`;
  const tabs=T.tabs||[];
  html+=`<nav class="tabs" role="tablist"><span class="tab-ind"></span>${tabs.map((t,i)=>`<button class="tab" role="tab" data-tab="${i}" aria-selected="${i===0}">${esc(t.label)}</button>`).join('')}</nav>`;
  tabs.forEach((t,i)=>{
    let body='';
    (t.blocks||[]).forEach(b=>{
      if(b.type==='links') body+=section(b);
      if(b.type==='agenda') body+=agenda(T.agenda||[]);
      if(b.type==='prompt') body+=promptCards();
      if(b.type==='connect') body+=connect();
    });
    html+=`<section class="panel ${i===0?'on':''}" data-panel="${i}">${body}</section>`;
  });
}
html+=`<footer><a class="wa" href="${PROFILE.whatsapp}" target="_blank" rel="noopener">${ic('wa')}Falar comigo no WhatsApp</a><div>${esc(PROFILE.name)} · ${new Date().getFullYear()}${T.kind!=='hub'?` · <a href="${T.hubUrl||'../'}">outras trilhas</a>`:''}</div></footer>`;
app.innerHTML=html;
document.body.insertAdjacentHTML('beforeend',`<div class="sheet-bg" id="sbg"></div><div class="sheet" id="sheet" role="dialog" aria-modal="true"><div class="grab"></div><h3 id="sT"></h3><p id="sU"></p><div class="qrbox"><img id="sQ" alt="QR Code"></div><div class="row"><button class="btn sec" id="sCopy">${ic('copy')}Copiar</button><a class="btn pri" id="sOpen" target="_blank" rel="noopener">${ic('arrow')}Abrir</a></div></div><div class="toast" id="toast">${ic('check')}<span></span></div>`);

/* ---------- interações ---------- */
const toast=(m)=>{const t=$('#toast');t.querySelector('span').textContent=m;t.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove('on'),1800)};
const abs=(u)=>new URL(u,location.href).href;
async function copy(u){try{await navigator.clipboard.writeText(abs(u))}catch(e){const x=document.createElement('textarea');x.value=abs(u);document.body.appendChild(x);x.select();document.execCommand('copy');x.remove()}toast('Link copiado');if(navigator.vibrate)navigator.vibrate(12)}
function qr(u,title){
  const q=qrcode(0,'M');q.addData(abs(u));q.make();
  $('#sQ').src=q.createDataURL(8,2);$('#sT').textContent=title;$('#sU').textContent=abs(u).replace(/^https?:\/\//,'');
  $('#sOpen').href=abs(u);$('#sCopy').onclick=()=>copy(u);
  $('#sbg').classList.add('on');$('#sheet').classList.add('on');
}
const close=()=>{$('#sbg').classList.remove('on');$('#sheet').classList.remove('on')};
$('#sbg').onclick=close;document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
let y0=null;$('#sheet').addEventListener('touchstart',e=>y0=e.touches[0].clientY,{passive:true});$('#sheet').addEventListener('touchend',e=>{if(y0!==null&&e.changedTouches[0].clientY-y0>60)close();y0=null});

document.addEventListener('click',e=>{
  const c=e.target.closest('[data-copy]');if(c){e.preventDefault();copy(c.dataset.copy);return}
  const q=e.target.closest('[data-qr]');if(q){e.preventDefault();qr(q.dataset.qr,q.dataset.t);return}
  const f=e.target.closest('.flip');if(f){f.classList.toggle('on');return}
});
$('#qrPage').onclick=()=>qr(location.href,T.shareTitle||document.title);
$('#sharePage').onclick=async()=>{const d={title:document.title,text:T.shareText||'',url:location.href};if(navigator.share){try{await navigator.share(d)}catch(e){}}else copy(location.href)};

// brilho que segue o dedo/cursor
document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.card');if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')});

// abas com indicador deslizante + swipe
const tabs=[...document.querySelectorAll('.tab')],ind=$('.tab-ind');
function setTab(i,push){
  if(!tabs.length)return;i=Math.max(0,Math.min(tabs.length-1,i));
  tabs.forEach((t,k)=>t.setAttribute('aria-selected',k===i));
  document.querySelectorAll('.panel').forEach((p,k)=>p.classList.toggle('on',k===i));
  ind.style.left=tabs[i].offsetLeft+'px';ind.style.width=tabs[i].offsetWidth+'px';
  reveal();cur=i;if(push!==false)history.replaceState(null,'','#'+(T.tabs[i].id||i));
}
let cur=0;tabs.forEach((t,i)=>t.onclick=()=>setTab(i));
window.addEventListener('resize',()=>setTab(cur,false));
let sx=null,sy=null;document.addEventListener('touchstart',e=>{if(e.target.closest('.sheet,.flip'))return;sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
document.addEventListener('touchend',e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.6)setTab(cur+(dx<0?1:-1));sx=null},{passive:true});

// entrada escalonada dos cards
function reveal(){document.querySelectorAll('.panel.on .card, .card:not(.panel .card)').forEach(c=>requestAnimationFrame(()=>c.classList.add('in')));document.querySelectorAll('.card').forEach(c=>{if(c.closest('.panel')&&!c.closest('.panel.on'))return;c.classList.add('in')})}

// agenda e selo "ao vivo" conforme data/hora local
function tick(){
  if(!T.date||!T.agenda)return;const now=new Date();const day=now.toISOString().slice(0,10)===T.date||now.toLocaleDateString('sv')===T.date;
  const pill=$('#evPill');const mins=now.getHours()*60+now.getMinutes();
  const toM=t=>{const[h,m]=t.split(':').map(Number);return h*60+m};
  const start=toM(T.agenda[0].t),end=toM(T.agenda.at(-1).t)+T.agenda.at(-1).d;
  if(pill){
    document.body.classList.toggle('is-live',day&&mins>=start&&mins<end);
    if(day&&mins>=start&&mins<end){pill.innerHTML='<span class="dot"></span>Ao vivo agora'}
    else if(day&&mins<start){pill.innerHTML='<span class="dot"></span>Hoje, às '+T.agenda[0].t}
    else if(new Date(T.date+'T23:59')<now||(day&&mins>=end)){pill.className='pill cy';pill.innerHTML='Material do encontro'}
  }
  document.querySelectorAll('.slot').forEach((s,i)=>{const a=T.agenda[i],b=toM(a.t);s.classList.toggle('now',day&&mins>=b&&mins<b+a.d);s.classList.toggle('done',day&&mins>=b+a.d)});
}
tick();setInterval(tick,30000);

// abre a aba do hash
const h=location.hash.slice(1);const hi=(T.tabs||[]).findIndex((t,i)=>t.id===h||String(i)===h);
requestAnimationFrame(()=>{setTab(hi>=0?hi:0,false);reveal()});
if(document.fonts)document.fonts.ready.then(()=>setTab(cur,false));
})();

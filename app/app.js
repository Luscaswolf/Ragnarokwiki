const { DB, BUILDS, REGRAS, DUPLA, CALC, SERVIDOR, DESCARTADAS } = window;
if (!window.PARES) console.error('[RO Builds] window.PARES não definido: confira a ordem dos scripts em index.html');
if (!window.JOBMAX) console.error('[RO Builds] window.JOBMAX não definido: confira a ordem dos scripts em index.html');
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = n => n == null ? '—' : Number(n).toLocaleString('pt-BR');
const pct = c => c ? (c / 100).toLocaleString('pt-BR') + '%' : 'lendário';
const PT = {}, CID = {}; DB.playable.forEach(p => { PT[p.nome] = p.nomePt; CID[p.nome] = p.id; });
const pt = c => PT[c] || c;
const SK = {}; Object.entries(DB.skills).forEach(([id, s]) => SK[s.code] = { ...s, id });
const SEL = { ok: ['b-ok', 'Funciona em combate'], fora: ['b-fora', 'Sem efeito em combate'], nao: ['b-nao', 'Ainda não funciona'] };
const LOC = { Right_Hand: 'Arma', Left_Hand: 'Escudo', Armor: 'Armadura', Garment: 'Capa', Shoes: 'Sapatos', Head_Top: 'Topo', Head_Mid: 'Meio', Head_Low: 'Baixo', Right_Accessory: 'Acessório', Left_Accessory: 'Acessório', Ammo: 'Munição' };
const TAGN = { zeny: 'Farm de Zeny', up: 'Up', masmorra: 'Masmorra', suporte: 'Suporte', grupo: 'Grupo' };
const ATR = ['str', 'agi', 'vit', 'int', 'dex', 'luk'];
const FAMS = [
  ['Swordman', ['Knight', 'Crusader']], ['Mage', ['Wizard', 'Sage']], ['Archer', ['Hunter', 'Bard', 'Dancer']],
  ['Acolyte', ['Priest', 'Monk']], ['Merchant', ['Blacksmith', 'Alchemist']], ['Thief', ['Assassin', 'Rogue']],
  ['Novice', ['Supernovice', 'Gunslinger', 'Ninja', 'Taekwon']],
];
BUILDS.forEach(b => { if (!b.servidor && SERVIDOR[b.id]) b.servidor = SERVIDOR[b.id]; });

// ---------- sprites: arquivo local (app/img/dp) -> Divine Pride online -> wiki -> espaço vazio ----------
const REMOTE = 'https://roclassicidle.com.br/wiki/', DP = 'https://static.divine-pride.net/images/';
function img(paths, attrs = '') {
  const list = (Array.isArray(paths) ? paths : [paths]).filter(Boolean);
  if (!list.length) return '<span class="ph"></span>';
  return `<img class="px" src="${list[0]}" data-f="${list.slice(1).join('|')}" onerror="imgErr(this)" loading="lazy" alt="" ${attrs}>`;
}
window.imgErr = el => {
  const f = (el.dataset.f || '').split('|').filter(Boolean);
  if (f.length) { el.dataset.f = f.slice(1).join('|'); el.src = f[0]; }
  else el.replaceWith(Object.assign(document.createElement('span'), { className: 'ph' }));
};
const wiki = p => p ? REMOTE + p : null;
const P = {
  item: id => +id >= 9000000 ? [wiki(DB.items[id] && DB.items[id].img ? `assets/project/items/${id}.png` : null)] : [`app/img/dp/item/${id}.png`, `${DP}items/item/${id}.png`, wiki(DB.items[id] && DB.items[id].img ? `assets/project/items/${id}.png` : null)],
  card: id => [`app/img/dp/card/${id}.png`, `${DP}items/collection/${id}.png`, ...P.item(id)],
  mon: id => [`app/img/dp/mob/${id}.png`, `${DP}mobs/png/${id}.png`, wiki(DB.mons[id] && DB.mons[id].img ? `assets/project/monsters/${id}.png` : null)],
  skill: c => SK[c] ? [`app/img/dp/skill/${SK[c].id}.png`, `${DP}skill/${SK[c].id}.png`, wiki(SK[c].img ? `assets/project/skills/${c}.png` : null)] : null,
  map: k => [`app/img/dp/map/${k}.webp`, `app/img/dp/map/${k}.png`, wiki(DB.maps[k] && DB.maps[k].img ? `assets/project/maps/${k}.webp` : null)].filter(Boolean),
  cls: n => CID[n] != null ? [`app/img/dp/job/${CID[n]}.png`, `${DP}jobs/icon_jobs_${CID[n]}.png`, wiki(DB.portraits[n])] : null,
};
P.clsIcon = P.cls;

try { const f = localStorage.getItem('rcib-formula'); if (f && CALC.FORMULAS[f]) CALC.formula = f; } catch (e) { }
let state = { v: 'home', b: BUILDS[0].id, filt: null };
try { Object.assign(state, JSON.parse(localStorage.getItem('rcib2') || '{}')); } catch (e) { }
const save = () => { try { localStorage.setItem('rcib2', JSON.stringify({ v: state.v, b: state.b, filt: state.filt })); } catch (e) { } };
// Favoritos: builds marcadas com ★ sobem para o topo do Início e da barra lateral (salvo neste navegador)
let FAV = []; try { FAV = JSON.parse(localStorage.getItem('rcib-favb') || '[]').filter(id => BUILDS.some(b => b.id === id)); } catch (e) { }
const isFav = id => FAV.includes(id);
const bnome = b => b.nome.split(' — ')[1] || b.nome;
const star = b => `<button class="star${isFav(b.id) ? ' on' : ''}" title="${isFav(b.id) ? 'Tirar dos favoritos' : 'Favoritar esta build'}" aria-label="${isFav(b.id) ? 'Tirar dos favoritos' : 'Favoritar'} ${esc(bnome(b))}" aria-pressed="${isFav(b.id)}" onclick="fav('${b.id}',event)">${isFav(b.id) ? '★' : '☆'}</button>`;
window.fav = (id, ev) => { if (ev) ev.stopPropagation(); FAV = isFav(id) ? FAV.filter(x => x !== id) : [...FAV, id]; try { localStorage.setItem('rcib-favb', JSON.stringify(FAV)); } catch (e) { } render(); };
const TEMAS = ['auto', 'light', 'dark'], TICON = { auto: '◐', light: '☀', dark: '☾' }, TNOME = { auto: 'automático', light: 'claro', dark: 'escuro' };
function aplicaTema(t) { if (t === 'auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', t); const b = $('#tbtn'); b.textContent = TICON[t]; b.title = 'Tema: ' + TNOME[t]; }
let tema = 'auto'; try { tema = localStorage.getItem('rcib-tema') || 'auto'; } catch (e) { }
aplicaTema(tema);
$('#tbtn').onclick = () => { tema = TEMAS[(TEMAS.indexOf(tema) + 1) % 3]; aplicaTema(tema); try { localStorage.setItem('rcib-tema', tema); } catch (e) { } };
window.nav = v => { state.v = v; render(); window.scrollTo(0, 0); };
document.querySelectorAll('#nav button').forEach(b => b.onclick = () => nav(b.dataset.v));

// ---------- URL HASH ROUTING ----------
function hashFromState() { return '#' + state.v + (state.v === 'builds' ? '/' + state.b : ''); }
function restoreFromHash() {
  const h = location.hash.slice(1).split('/');
  if (h[0]) state.v = h[0];
  if (h[1]) state.b = h[1];
}
window.addEventListener('popstate', () => { restoreFromHash(); render(); });
// ao navegar, atualiza o hash sem recarregar
const _origNav = window.nav;
window.nav = v => { state.v = v; history.pushState(null, '', hashFromState()); _origNav(v); };
window.go = id => { state.v = 'builds'; state.b = id; history.pushState(null, '', hashFromState()); render(); window.scrollTo(0, 0); };
// restaura estado da URL se houver hash ao abrir
if (location.hash) restoreFromHash();

const tag = t => `<span class="chip t-${t}">${TAGN[t] || t}</span>`;
const badge = st => { const s = SEL[st] || ['', st]; return `<span class="badge ${s[0]}">${s[1]}</span>`; };
const locName = it => [...new Set((it.loc || []).map(x => LOC[x] || x))].join('/') || ({ Card: 'Carta', Healing: 'Cura', Etc: 'Material', Usable: 'Usável' }[it.t] || it.t);
function itemLine(it) {
  const p = []; if (it.atk) p.push('ATK ' + it.atk); if (it.def) p.push('DEF ' + it.def); if (it.sl) p.push('[' + it.sl + ']'); if (it.lv) p.push('nv ' + it.lv); return p.join(' · ');
}
function srcShort(it) {
  const s = it.src || {}; const o = [];
  if (s.s && s.s.length) o.push(`🛒 ${esc(s.s[0][0])} · <b>${fmt(s.s[0][1])}z</b>`);
  if (s.m && s.m.length) { const m = DB.mons[s.m[0][0]]; if (m) o.push(`💀 ${esc(m.n)} nv${m.lv}${m.mvp ? ' MVP' : ''} · ${pct(s.m[0][1])}`); }
  return o.join('<br>') || 'kit / enxoval / evento';
}
function itemCard(id, extra) {
  const it = DB.items[id]; if (!it) return '';
  return `<div class="it${it.t === 'Card' ? ' card-it' : ''}" onclick="showItem(${id})"><div class="ic">${img(it.t === 'Card' ? P.card(id) : P.item(id))}</div><div class="bd"><b>${esc(it.n)}${it.ef === 'nao' ? ' <span class="badge b-nao">não funciona</span>' : ''}</b><small>${esc(locName(it))}${itemLine(it) ? ' · ' + itemLine(it) : ''}</small>${extra ? `<small>${esc(extra)}</small>` : ''}<small>${srcShort(it)}</small></div></div>`;
}

// ---------- SIDEBAR ----------
function side() {
  const s = $('#side');
  if (state.v !== 'builds') { s.style.display = 'none'; return; }
  s.style.display = '';
  const _sideScrollTop = s.scrollTop;
  let h = '<div class="filt">' + ['zeny', 'up', 'masmorra', 'suporte'].map(t => `<span class="chip ${state.filt === t ? 'on' : ''}" onclick="setF('${t}')">${TAGN[t]}</span>`).join('') + '</div>';
  const row = b => `<div class="bl ${b.id === state.b ? 'on' : ''}" onclick="go('${b.id}')"><div class="ic">${img(P.clsIcon(b.classe))}</div><div style="min-width:0"><b>${esc(b.nome.split(' — ')[1] || b.nome)}</b><small>${esc(pt(b.classe))} · ${b.tags.map(t => TAGN[t]).join(', ')}</small></div>${star(b)}</div>`;
  const passa = b => !state.filt || b.tags.includes(state.filt);
  const favs = FAV.map(id => BUILDS.find(b => b.id === id)).filter(b => b && passa(b));
  if (favs.length) h += '<div class="fam fav">★ Favoritas</div>' + favs.map(row).join('');
  for (const [base, kids] of FAMS) {
    const bs = BUILDS.filter(b => kids.includes(b.classe) && !isFav(b.id) && passa(b));
    if (!bs.length) continue;
    h += `<div class="fam">${esc(base === 'Novice' ? 'Classes expandidas' : pt(base))}</div>`;
    h += bs.map(row).join('');
  }
  s.innerHTML = h;
  s.scrollTop = _sideScrollTop;
}
window.setF = t => { state.filt = state.filt === t ? null : t; render(); };

// ---------- HOME ----------
function viewHome() {
  const nOk = Object.values(SK).filter(s => s.st === 'ok').length;
  let h = `<div class="hero2"><div style="min-width:0"><h1>Codex de Builds</h1>
  <p>Builds para todas as classes do <b>RO Classic Idle</b>, ajustadas às regras deste servidor: o que funciona no combate automático, de onde vem o zeny e o que a wiki confirma. Cada build explica <b>por que ela está aqui</b>.</p>
  <p style="margin-top:12px"><a onclick="nav('dupla')">→ Ver a dupla recomendada (Zeny + Up)</a> &nbsp; <a onclick="nav('regras')">→ O que muda neste servidor</a></p></div><div class="mascots" aria-hidden="true">${[1131, 1113, 1096, 1038].map(id => img(P.mon(id), 'style="height:80px;max-width:72px;object-fit:contain;filter:drop-shadow(0 4px 6px #0005)"')).join('')}</div></div>`;
  h += `<div class="stats4"><div><b>${BUILDS.length}</b><span>builds</span></div><div><b>${DESCARTADAS.length}</b><span>builds clássicas descartadas, com o motivo</span></div><div><b>${nOk}/${Object.keys(SK).length}</b><span>skills funcionam em combate</span></div><div><b>${fmt(Object.keys(DB.items).length)}</b><span>itens no banco</span></div></div>`;
  h += '<h2 class="s">Escolha sua classe</h2><p class="mut" style="margin:-4px 0 12px;font-size:13px">Toque na ☆ de uma build (na aba Builds ou no título dela) para fixá-la aqui no topo.</p><div class="tree">';
  const clsRow = k => { const bs = BUILDS.filter(b => b.classe === k); return `<div class="cls" onclick="go('${bs[0] ? bs[0].id : ''}')">${img(P.cls(k))}<div style="min-width:0"><b>${esc(pt(k))}</b><small>${bs.length} build${bs.length > 1 ? 's' : ''}: ${bs.map(b => esc(b.nome.split(' — ')[1] || b.nome)).join(' · ')}</small></div></div>`; };
  const favRow = b => `<div class="cls" onclick="go('${b.id}')">${img(P.cls(b.classe))}<div style="min-width:0"><b>${esc(bnome(b))}</b><small>${esc(pt(b.classe))} · ${b.tags.map(t => TAGN[t]).join(', ')}</small></div>${star(b)}</div>`;
  const favB = FAV.map(id => BUILDS.find(b => b.id === id)).filter(Boolean);
  if (favB.length) h += `<div class="fcard favcard"><div class="top"><span class="favic">★</span><div>Favoritas<div class="mut" style="font-weight:400;font-size:12px">builds fixadas por você</div></div></div>${favB.map(favRow).join('')}</div>`;
  for (const [base, kids] of FAMS) {
    h += `<div class="fcard"><div class="top">${base !== 'Novice' ? img(P.cls(base)) : ''}<div>${esc(base === 'Novice' ? 'Classes expandidas' : pt(base))}<div class="mut" style="font-weight:400;font-size:12px">${base === 'Novice' ? 'vêm direto do Aprendiz' : 'segundas classes'}</div></div></div>`;
    for (const k of kids) h += clsRow(k);
    h += '</div>';
  }
  h += '</div>';
  h += `<p class="mut" style="font-size:12.5px;margin-top:28px">Dados: wiki oficial do RO Classic Idle (${esc((DB.meta.geradoEm || '').slice(0, 10))}). Sprites: Divine Pride, guardadas em app/img para funcionar offline.</p>`;
  $('#view').innerHTML = h;
}

// ---------- BUILD ----------
function routesFor(b) { const ns = b.caminho.map(pt), fin = pt(b.classe); return DB.routes.filter(r => ns.includes(r.classe) || r.classe.endsWith('→ ' + fin)); }
const statBox = st => '<div class="sg">' + ATR.map(k => `<div class="sv"><span style="color:var(--${k})">${k.toUpperCase()}</span><b>${st[k] || 1}</b><i><u style="width:${(st[k] || 1) / 99 * 100}%;background:var(--${k})"></u></i></div>`).join('') + '</div>';
function prioridade(b) {
  const f = b.fases[b.fases.length - 1].stats;
  const up = ATR.filter(k => (f[k] || 1) > 1).sort((a, c) => (f[c] || 1) - (f[a] || 1)), um = ATR.filter(k => (f[k] || 1) <= 1);
  return up.map(k => `<b style="color:var(--${k})">${k.toUpperCase()} ${f[k]}</b>`).join(' › ') + (um.length ? ` &nbsp;·&nbsp; <span class="mut">deixe ${um.map(k => k.toUpperCase()).join(', ')} em 1</span>` : '');
}
const MEU = {}; let CAL = null;
window.meuUpd = id => {
  const L = +document.getElementById('me-L').value || 1, st = {}, rv = document.getElementById('me-rest').value;
  ATR.forEach(k => st[k] = Math.max(1, +document.getElementById('me-' + k).value || 1));
  MEU[id] = { L, st, restantes: rv === '' ? null : Math.max(0, +rv) };
  CAL = null;
  if (MEU[id].restantes != null) {
    const ok = CALC.calibrar(L, st, MEU[id].restantes);
    CAL = { ok, antes: CALC.formula };
    if (ok.length && !ok.includes(CALC.formula)) { CALC.formula = ok[0]; try { localStorage.setItem('rcib-formula', ok[0]); } catch (e) { } }
  }
  if (CAL && CAL.antes !== CALC.formula) { render(); document.querySelector('details.card').open = true; document.getElementById('steps-' + id).scrollIntoView(); return; } document.getElementById('steps-' + id).innerHTML = stepRows(BUILDS.find(x => x.id === id));
};
window.meuLimpa = id => { delete MEU[id]; document.getElementById('steps-' + id).innerHTML = stepRows(BUILDS.find(x => x.id === id)); };
function stepRows(b) {
  const me = MEU[b.id], rows = CALC.simular(b.fases, me), last = rows[rows.length - 1];
  let h = '';
  if (me) {
    const u = CALC.custo(me.st), hv = CALC.pontos(me.L);
    if (CAL && CAL.ok.length) h += `<div class="callout" style="margin:8px 0"><div class="h">✔ Calibrado com o seu jogo</div>A conta bate exatamente com a regra de custo: <b>${CALC.FORMULAS[CALC.formula].nome}</b>.${CAL.antes !== CALC.formula ? ' A página passou a usar essa regra em todas as builds e em todos os passo a passo.' : ''}</div>`;
    else if (CAL) h += `<div class="warn">Nenhuma regra de custo conhecida bate com esses números. Confira se digitou os valores <b>base</b> (sem o "+X") e os pontos restantes. Se estiverem certos, me mande o print da janela de status.</div>`;
    if (me.restantes != null) {
      const esperado = hv - u, dif = me.restantes - esperado;
      h += `<div class="warn">Usando os <b>${me.restantes} pontos restantes</b> que o jogo mostra. ${dif === 0 ? 'Bate com a conta da página.' : `A página esperava ${esperado}; a diferença é de <b>${dif > 0 ? '+' : ''}${dif}</b>. A tabela abaixo já usa o número do jogo. Se puder, me mande esse número e o custo que aparece ao lado de cada atributo para eu achar a causa.`}</div>`;
    } else h += u > hv ? `<div class="warn">Com esses atributos você usou <b>${u}</b> pontos, mas o nível ${me.L} dá só <b>${hv}</b>. Confira os valores base (sem o "+X").</div>`
      : `<div class="warn">Continuando do nível ${me.L} com os seus atributos: ${u} de ${hv} pontos usados, ${hv - u} livres. A tabela abaixo começa no nível ${me.L + 1}.</div>`;
  }
  if (!rows.length) return h + '<p class="mut">Você já está no nível 99.</p>';
  h += '<div class="steps"><table><thead><tr><th>Nível</th><th>Ganha</th><th>Coloque</th>' + ATR.map(k => `<th style="color:var(--${k})">${k.toUpperCase()}</th>`).join('') + '<th>Sobram</th></tr></thead><tbody>';
  for (const r of rows) {
    const add = r.add.map(([k, n]) => `<span class="addp" style="color:var(--${k})">+${n} ${k.toUpperCase()}</span>`).join(' ') || '<span class="mut">guarde</span>';
    h += `<tr${r.L % 10 === 0 ? ' class="dec"' : ''}><td><b>${r.L}</b></td><td class="mut">+${r.ganho}</td><td>${add}</td>` + ATR.map(k => `<td class="num" style="${r.add.some(a => a[0] === k) ? `color:var(--${k});font-weight:700` : ''}">${r.st[k]}</td>`).join('') + `<td class="num mut">${r.livre}</td></tr>`;
  }
  h += '</tbody></table></div>';
  const alvo = b.fases[b.fases.length - 1].stats, falta = ATR.filter(k => last.st[k] < (alvo[k] || 1));
  if (falta.length) h += `<div class="warn">Partindo dos seus atributos, no 99 não dá para chegar em ${falta.map(k => `${k.toUpperCase()} ${alvo[k]}`).join(', ')} (fica ${falta.map(k => `${k.toUpperCase()} ${last.st[k]}`).join(', ')}). Os pontos que foram para outros atributos saem daqui.</div>`;
  if (last.livre > 0 && !falta.length) h += `<div class="warn">No nível 99 sobram <b>${last.livre} pontos</b>. Coloque em VIT (mais HP para o idle) ou no atributo principal da build.</div>`;
  return h;
}
function stepTable(b) {
  let h = `<div class="warn" style="margin-top:12px">Os números são <b>pontos base</b>: o valor antes do "+" na janela de status. Bônus de classe, Codex e a Bênção de boas-vindas aparecem como "+X" e <b>não contam</b>. Em cada nível, coloque exatamente o que a coluna "Coloque" mostra.</div>`;
  h += `<div class="card" style="margin-top:10px"><b>Já distribuiu pontos de outro jeito?</b> <span class="mut">Digite o que a janela de status mostra agora: nível, pontos restantes e os atributos base (o número antes do "+"). A tabela recalcula a partir daí.</span>
  <div class="mejust"><label>Nível <input id="me-L" type="number" min="1" max="98" value="${(MEU[b.id] || {}).L || ''}" placeholder="23"></label><label>Restantes <input id="me-rest" type="number" min="0" value="${(MEU[b.id] || {}).restantes ?? ''}" placeholder="?"></label>${ATR.map(k => `<label style="color:var(--${k})">${k.toUpperCase()} <input id="me-${k}" type="number" min="1" max="99" value="${((MEU[b.id] || {}).st || {})[k] || ''}" placeholder="1"></label>`).join('')}
  <button class="btn" onclick="meuUpd('${b.id}')">Recalcular</button><button class="btn ghost" onclick="meuLimpa('${b.id}')">Do zero</button></div></div>`;
  h += `<div id="steps-${b.id}">${stepRows(b)}</div>`;
  h += `<p class="mut" style="font-size:12.5px">Pontos por nível: tabela do próprio servidor (${CALC.pontos(99)} no nível 99). Custo de cada ponto no jogo: 2 até o 10, 3 a partir do 10, 4 a partir do 20, e assim por diante (a janela de status mostra esse custo ao lado de cada atributo). "Guarde" = o próximo ponto custa mais do que você tem; ele entra no nível seguinte. <b>Ao subir de nível, confira se o jogo deu o número da coluna "Ganha".</b> Se não der, me avise: a tabela de pontos da wiki estaria errada.</p>`;
  return h;
}
function skillTier(code, tiers) {
  if (code.startsWith('NV_')) return 0;
  const s = SK[code]; if (!s) return tiers.length - 1;
  for (let i = 1; i < tiers.length; i++) { const cl = DB.classes[CID[tiers[i]]]; if (cl && cl.tree.some(t => String(t[0]) === String(s.id))) return i; }
  return tiers.length - 1;
}
function skillPlan(b) {
  const tiers = b.caminho, by = tiers.map(() => []);
  for (const sk of b.skills) by[skillTier(sk[0], tiers)].push(sk);
  let h = '<p class="mut">Cada nível de classe (Job) dá 1 ponto. A coluna "Job" mostra em que nível de classe você termina de pegar cada skill, seguindo esta ordem.</p>';
  tiers.forEach((c, ti) => {
    const list = by[ti]; if (!list.length) return;
    const max = ti === 0 ? 10 : ((window.JOBMAX || {})[c] || 50), pts = max - 1;
    const used = list.reduce((a, s) => a + s[1], 0);
    let msg = '';
    if (ti > 0 && ti < tiers.length - 1) {
      msg = used === 49 ? `<span class="ok">Usa os 49 pontos do Job 50: suba até o Job 50, gaste tudo nesta ordem e só então vire ${esc(pt(tiers[ti + 1]))}.</span>`
        : used < 49 ? `<span class="fora">Usa ${used} de 49 pontos: sobram ${49 - used}.</span>`
          : `<span class="nao">Usa ${used} pontos, mais que os 49 do Job 50.</span>`;
    } else if (ti > 0) msg = used <= pts ? `<span class="ok">Usa ${used} de ${pts} pontos (Job ${max}).</span>${pts - used ? ` Sobram ${pts - used} pontos livres.` : ''}` : `<span class="nao">Usa ${used} pontos, mais que os ${pts} do Job ${max}.</span>`;
    h += `<div class="card" style="padding:4px 6px"><div style="padding:10px 10px 6px;display:flex;gap:10px;align-items:center">${img(P.clsIcon(c), 'style="height:30px"')}<b>${esc(pt(c))}</b><span class="mut">${ti === 0 ? 'Job 1–10' : 'Job 1–' + max}</span></div>${msg ? `<div style="padding:0 10px 8px;font-size:13px">${msg}</div>` : ''}`;
    h += `<div class="sk head"><span></span><span>Skill</span><span>Job</span><span class="sel">Selo no servidor</span><span class="why">Por quê</span></div>`;
    let acc = 0;
    for (const [code, lv, why] of list) {
      const s = SK[code], a = acc + 2, z = acc + lv + 1; acc += lv;
      {
      // extrai pré-requisitos do campo ds
      let reqLine = '';
      if (s && s.ds) {
        const m = s.ds.match(/Pr[eé]-requisitos?:([^\n]+)/i);
        if (m) reqLine = m[1].trim();
      }
      const tipHtml = s ? `<div class="sk-tip">
        <div class="th">${img(P.skill(code), 'style="width:36px;height:36px"')}<div><b>${esc(s.n)}</b><small>Nível máximo: ${s.max} · ${s.st === 'ok' ? 'Funciona em combate' : s.st === 'fora' ? 'Sem efeito em combate' : 'Ainda não funciona'}</small></div></div>${reqLine ? `<div class="req">Pré-requisitos: ${esc(reqLine)}</div>` : ''}<div class="desc">${esc((s.ds||'').replace(/Pr[eé]-requisitos?:[^\n]+\n?/i,'').trim().slice(0,400))}</div>
      </div>` : '';
      h += `<div class="sk"><span class="sk-wrap">${img(P.skill(code))}${tipHtml}</span><span><a onclick="showSkill('${code}')">${esc(s ? s.n : code)}</a> <b class="mut">nv ${lv}</b></span><span class="lvl">${a === z ? a : a + '–' + z}</span><span class="sel">${s ? badge(s.st) : ''}</span><span class="why">${esc(why)}</span></div>`;
    };
    }
    h += '</div>';
  });
  return h;
}
// ---------- POTTER ----------
const POT = { int: 1, dex: 99, luk: 98, job: 50, pesquisa: 10, preparar: 10, sup: 10 };
function potterRows(p, sup) {
  const I = DB.items, ov = x => Math.floor(x * (1 + [0, 7, 9, 11, 13, 15, 17, 19, 21, 23, 24][sup] / 100));
  const cap = it => Math.min(ov(it.sell), it.buy || 1e9);
  const recs = [
    ['Poção Branca', 504, [[509, 1], [713, 1], [7134, 1]], 7144],
    ['Poção Amarela', 503, [[508, 1], [713, 1], [7134, 1]], 7144],
    ['Poção Vermelha', 501, [[507, 1], [713, 1], [7134, 1]], 7144],
    ['Poção Branca Compacta', 547, [[504, 1], [1092, 1], [1061, 1], [7134, 1]], 7133],
  ];
  return recs.map(([n, out, mats, man]) => {
    const it = I[out], venda = cap(it);
    const custo = mats.reduce((a, [m, q]) => { const x = I[m]; const loja = x.src && x.src.s && x.src.s.length; return a + q * (loja ? x.buy : cap(x)); }, 0);
    const esperado = (p / 100) * venda - custo;
    const falta = mats.map(([m]) => I[m]).filter(x => !(x.src && ((x.src.s || []).length || (x.src.m || []).length))).map(x => x.n);
    return { n, out, mats, man, venda, custo, esperado, loja: it.buy, economia: (p / 100) * it.buy - custo, falta };
  });
}
function potterHTML() {
  const herb = DB.items[509], src = (herb.src.m || []).slice(0, 8);
  let h = `<div class="card"><b>Calculadora de sucesso e lucro</b> <span class="mut">(mexa nos valores)</span><div class="plan" style="margin-top:10px">`;
  h += [['int', 'INT', 99], ['dex', 'DEX', 99], ['luk', 'LUK', 99], ['job', 'Job', 50], ['pesquisa', 'Pesquisa de Poções', 10], ['preparar', 'Preparar Poção', 10], ['sup', 'Superfaturar', 10]].map(([k, l, m]) => `<label>${l} <b id="pt-${k}">${POT[k]}</b><input type="range" min="${k === 'job' ? 1 : (k === 'pesquisa' || k === 'preparar' || k === 'sup' ? 0 : 1)}" max="${m}" value="${POT[k]}" oninput="POTset('${k}',this.value)"></label>`).join('');
  h += `</div><div id="potout"></div><p class="mut" style="font-size:12.5px;margin:6px 0 0">Botões rápidos: <a onclick="POTpreset(1)">Pure (DEX 99, LUK 98)</a> · <a onclick="POTpreset(2)">Alquimista de batalha (DEX 70, INT 45)</a> · <a onclick="POTpreset(3)">Sem atributos</a></p></div>`;
  h += `<div class="card"><b>Onde conseguir Erva Branca</b> <span class="mut">(não é vendida em loja)</span><table style="margin-top:8px"><tr><th></th><th>Monstro</th><th>Nível</th><th>Chance</th><th>Mapas</th></tr>${src.map(([mid, ch]) => { const m = DB.mons[mid]; return m ? `<tr><td style="width:44px">${img(P.mon(mid), 'style="max-height:34px;max-width:40px"')}</td><td><a onclick="showMon(${mid})">${esc(m.n)}</a></td><td>${m.lv}</td><td>${pct(ch)}</td><td class="mut">${m.maps.map(k => `<a onclick="showMap('${k}')">${esc(DB.maps[k] ? DB.maps[k].n : k)}</a>`).slice(0, 2).join(', ')}</td></tr>` : ''; }).join('')}</table></div>`;
  h += `<div class="card"><b>Simulador de renda por dia (Poção Branca)</b> <span class="mut">(use a chance da calculadora acima; preencha com o que você vê no jogo)</span><div class="plan" style="margin-top:10px">`;
  h += [['ervas', 'Ervas Brancas que você farma por dia', 1000], ['uso', 'Poções Brancas que seu principal gasta por dia', 1000], ['comp', 'Ervas compradas de jogadores por dia (VIP)', 1000], ['pago', 'Preço pago por erva (VIP)', 400], ['vend', 'Preço de venda da poção a jogadores (VIP)', 600]].map(([k, l, m]) => `<label>${l} <b id="rn-${k}">${REN[k]}</b><input type="range" min="0" max="${m}" step="${m >= 600 ? 10 : 5}" value="${REN[k]}" oninput="RENset('${k}',this.value)"></label>`).join('');
  h += `</div><div id="renout"></div></div>`;
  h += `<div class="callout"><div class="h">Veredito (com up offline)</div>
  <b>Personagem dedicado:</b> com o up offline, VALE como 2º ou 3º personagem. Ser fraco em combate só custa tempo fora do jogo, e o Homunculus faz o dano. O Pure (~90%) rende ~11% a mais que o Alquimista de batalha com Preparar Poção (~79%): em 1.000 ervas, são ~110 poções a mais.<br>
  <b>Sem VIP, para vender:</b> só ao NPC, ≈372z por poção contra ≈74z da erva crua. Ganho de ≈250z por erva, limitado pela erva que o seu principal farma (monstros nível 43+). É um bônus, não uma fonte de renda principal: não troque o Ferreiro de zeny por ele.<br>
  <b>Para abastecer o principal:</b> é o melhor uso sem VIP. Cada Poção Branca fabricada evita gastar 600z no NPC.<br>
  <b>Com VIP:</b> vira negócio. Todo mundo upa offline gastando poção; você vende abaixo dos 600z do NPC e compra erva de quem só ganharia ≈60–74z por ela. Os dois lados da troca precisam de VIP.<br>
  <b>Fabricar funciona?</b> Provavelmente sim: Criar Conversor do Sábio tem o mesmo selo, e a missão da Mishuna confirma que o Sábio fabrica. Teste com 1 manual antes de investir 100.000z+.</div>`;
  return h;
}
const REN = { ervas: 150, uso: 60, comp: 0, pago: 120, vend: 500 };
window.RENset = (k, v) => { REN[k] = +v; document.getElementById('rn-' + k).textContent = v; renUpd(); };
window.renUpd = () => {
  const el = document.getElementById('renout'); if (!el) return;
  const p = CALC.farmacia(POT) / 100, sup = 1 + [0, 7, 9, 11, 13, 15, 17, 19, 21, 23, 24][POT.sup] / 100;
  const ervaNPC = Math.floor(60 * sup), potNPC = Math.min(Math.floor(300 * sup), 600), vas = 8 + Math.floor(3 * sup); // Vasilha + Garrafa Vazia
  const pots = REN.ervas * p, usadas = Math.min(REN.uso, pots), sobra = pots - usadas;
  const A = REN.ervas * ervaNPC;                                                   // vende a erva crua
  const B = REN.ervas * (p * potNPC - vas);                                        // fabrica e vende tudo ao NPC
  const C = usadas * 600 + sobra * potNPC - REN.ervas * vas;                       // abastece o principal, sobra ao NPC
  const D = (REN.ervas + REN.comp) * (p * REN.vend - vas) - REN.comp * REN.pago;   // VIP: vende a jogadores
  const row = (n, v, nota) => `<tr><td>${n}</td><td><b class="${v > A ? 'ok' : ''}">${fmt(Math.round(v))}z</b></td><td>${fmt(Math.round(v * 30))}z</td><td class="${v - A > 0 ? 'ok' : 'nao'}">${v === A ? '—' : (v - A > 0 ? '+' : '') + fmt(Math.round(v - A)) + 'z'}</td><td class="mut" style="font-size:12.5px">${nota}</td></tr>`;
  el.innerHTML = `<table style="margin-top:10px"><tr><th>Cenário</th><th>Por dia</th><th>Por mês</th><th>vs vender a erva</th><th></th></tr>
  ${row('Vender a erva crua ao NPC', A, `${ervaNPC}z por erva. É o que você já faria sem Alquimista.`)}
  ${row('Fabricar e vender ao NPC (sem VIP)', B, `${fmt(Math.round(pots))} poções a ${potNPC}z.`)}
  ${row('Fabricar e abastecer o principal', C, `${fmt(Math.round(usadas))} poções que você não compra a 600z; o resto vai ao NPC.`)}
  ${row('Fabricar e vender a jogadores (VIP)', D, `${REN.comp ? `inclui ${REN.comp} ervas compradas a ${REN.pago}z; ` : ''}poção a ${REN.vend}z. Depende de haver comprador.`)}</table>
  <p class="mut" style="font-size:12.5px;margin:6px 0 0">Valores com ${(p * 100).toFixed(1)}% de chance e Superfaturar ${POT.sup}. Não inclui o custo único do Manual Vol.1 (100.000z), que se paga em ≈${fmt(Math.ceil(100000 / Math.max(1, B / Math.max(1, REN.ervas) - ervaNPC)))} ervas fabricadas vendendo ao NPC. O VIP custa 9 RO Cash por 30 dias (dinheiro real).</p>`;
};
window.POTset = (k, v) => { POT[k] = +v; document.getElementById('pt-' + k).textContent = v; potUpd(); };
window.POTpreset = n => { Object.assign(POT, n === 1 ? { int: 1, dex: 99, luk: 98 } : n === 2 ? { int: 45, dex: 70, luk: 1 } : { int: 1, dex: 1, luk: 1 }); ['int', 'dex', 'luk'].forEach(k => { document.getElementById('pt-' + k).textContent = POT[k]; document.querySelector(`input[oninput*="'${k}'"]`).value = POT[k]; }); potUpd(); };
window.potUpd = () => {
  const el = document.getElementById('potout'); if (!el) return;
  const p = CALC.farmacia(POT), rows = potterRows(p, POT.sup);
  let h = `<div style="display:flex;gap:16px;align-items:baseline;margin:10px 0"><span style="font-size:30px;font-weight:800;color:var(--acc2)">${p.toFixed(1)}%</span><span class="mut">de chance (Poção Vermelha/Amarela/Branca; a Compacta é mais difícil)</span></div>`;
  h += '<table><tr><th></th><th>Poção</th><th>Custo dos materiais</th><th>Vende ao NPC</th><th>Lucro por tentativa</th><th>Economia vs comprar</th></tr>';
  h += rows.map(r => `<tr><td style="width:40px">${img(P.item(r.out))}</td><td>${esc(r.n)}<div class="mut" style="font-size:12px">${r.mats.map(([m]) => esc(DB.items[m].n)).join(' + ')}</div>${r.falta.length ? `<div class="nao" style="font-size:12px">⚠ sem fonte no servidor: ${r.falta.map(esc).join(', ')}</div>` : ''}</td><td>${fmt(Math.round(r.custo))}z</td><td>${fmt(r.venda)}z</td><td class="${r.esperado > 0 ? 'ok' : 'nao'}"><b>${r.esperado > 0 ? '+' : ''}${fmt(Math.round(r.esperado))}z</b></td><td class="${r.economia > 0 ? 'ok' : 'nao'}">${r.economia > 0 ? '+' : ''}${fmt(Math.round(r.economia))}z</td></tr>`).join('');
  h += '</table><p class="mut" style="font-size:12.5px;margin-top:6px">Custo do material = o que você ganharia vendendo ao NPC (com Superfaturar), ou o preço de loja quando existe. "Economia" = quanto você deixa de gastar comprando a poção no NPC, por tentativa. Na Compacta a chance real é menor (a fórmula clássica tira uns 10–15%).</p>';
  el.innerHTML = h;
  renUpd();
};
function _buildSecAtributos(b, sec) {
  let h = sec('atributos', 'Atributos: como distribuir');
  h += `<div class="card"><b>Regra de ouro desta build:</b> ${prioridade(b)}<div class="mut" style="margin-top:6px;font-size:13px">Na janela de status, coloque os pontos na ordem de prioridade da fase em que você está. Dica: o custo de cada ponto sobe a cada 10 (de 1→10 custa 2, de 90→99 custa 11), então atributo que só precisa ficar baixo deve ficar em 1.</div></div>`;
  b.fases.forEach((f, i) => {
    const L = CALC.faseNivel(f.nv), u = CALC.custo(f.stats), hv = CALC.pontos(L), prev = i ? b.fases[i - 1].stats : { str: 1, agi: 1, vit: 1, int: 1, dex: 1, luk: 1 };
    const ord = ATR.map(k => [k, (f.stats[k] || 1) - (prev[k] || 1)]).filter(x => x[1] > 0).sort((a, c) => c[1] - a[1]);
    h += `<div class="phase" onclick="derived('${b.id}',${i})"><div class="lv"><b>Nível ${esc(f.nv)}</b><span class="pts ${u > hv ? 'over' : ''}">${u} / ${hv} pontos</span></div>${statBox(f.stats)}<div class="txt"><div style="margin-bottom:4px">${ord.map(([k, d], j) => `<span class="chip" style="border-color:var(--${k});color:var(--${k})">${j + 1}º ${k.toUpperCase()} +${d}</span>`).join(' ')}</div>${esc(f.foco)}${f.porque ? `<em>${esc(f.porque)}</em>` : ''}</div></div><div id="der-${i}"></div>`;
  });
  h += `<details class="card"><summary style="cursor:pointer"><b>Passo a passo nível a nível</b> <span class="mut">(como os atributos devem estar a cada 5 níveis)</span></summary>${stepTable(b)}</details>`;
  return h;
}
function _buildSecEquip(b, sec) {
  let h = sec('equip', 'Equipamento: inicial → provisório → final');
  for (const e of b.equip) h += `<div class="eq"><div class="eh"><b>${esc(e.fase)}</b>${e.porque ? `<span>${esc(e.porque)}</span>` : ''}</div><div class="items">${e.itens.map(i => itemCard(i)).join('')}</div></div>`;
  h += `<div class="eq"><div class="eh"><b>Consumíveis</b><span>Poção de NPC é barata aqui. Configure a reposição automática antes de sair.</span></div><div class="items">${[501, 502, 503, 504, 505, 601, 645].map(i => itemCard(i)).join('')}</div></div>`;
  return h;
}
function _buildSecRota(b, rs, sec) {
  let h = sec('rota', 'Rota de up (wiki do servidor)');
  for (const r of rs) {
    h += `<p><b>${esc(r.classe)}</b> <span class="mut">— ${esc(r.build)}</span></p><div class="route">`;
    for (const s of r.stages) {
      const m = DB.maps[s.mapa], mp = P.map(s.mapa);
      h += `<div class="st2" onclick="showMap('${s.mapa}')"><div class="mp" style="background-image:${mp.map(u => `url('${u}')`).join(',')}"><span class="lvb">nv ${s.de}–${s.ate}</span></div><div class="bd"><b>${esc(m ? m.n : s.mapa)}</b><small>${esc(s.alvo)}</small><div class="mobs">${(s.targets || []).map(t => img(P.mon(t), `title="${esc(DB.mons[t] ? DB.mons[t].n : '')}"`)).join('')}</div></div></div>`;
    }
    h += `</div>${r.note ? `<div class="warn">${esc(r.note)}</div>` : ''}`;
  }
  return h;
}
function _buildSecFarmRota(b, sec) {
  if (!b.farmRota || !b.farmRota.length) return '';
  let h = sec('farm', 'Rota de farm de zeny: onde ir por nível');
  h += '<div class="card" style="margin-bottom:12px"><p style="margin:0"><b>Regra deste servidor:</b> todo zeny vem de loot vendido ao NPC — sem drop direto de moeda e troca entre jogadores exige VIP. Loot/abate = soma de (preço NPC × chance de drop). Com Superfaturar 10 multiplique por 1,24.</p></div>';
  h += '<div class="route">';
  b.farmRota.forEach(s => {
    const m = DB.maps[s.mapa], mp = P.map(s.mapa);
    const nome = m ? m.n : s.mapa;
    h += `<div class="st2" onclick="showMap('${s.mapa}')">`
      + `<div class="mp" style="background-image:${mp.map(u => `url('${u}')`).join(',')}"><span class="lvb">nv ${s.de}–${s.ate}</span></div>`
      + `<div class="bd">`
      + `<b>${esc(nome)} <span class="mut" style="font-size:11px;font-weight:400">${s.lootAbate} z/abate</span></b>`
      + `<small style="display:block;margin-top:3px"><b>Equip:</b> ${esc(s.equip)}</small>`
      + `<small>${esc(s.porque)}</small>`
      + `<div class="mobs">${(s.targets||[]).map(t => img(P.mon(t),`title="${esc(DB.mons[t]?DB.mons[t].n:'')}"`)).join('')}</div>`
      + '</div></div>';
  });
  h += '</div>';
  return h;
}
function _buildInfobox(b, last, main, others, secs) {
  return `<aside class="infobox"><div class="hero">${img(P.cls(b.classe))}</div><div class="ttl">${esc(pt(b.classe))}</div><dl>
    <dt>Caminho</dt><dd>${b.caminho.map(c => esc(pt(c))).join(' → ')}</dd>
    <dt>Foco</dt><dd>${b.tags.map(tag).join(' ')}</dd>
    ${main ? `<dt>Skill principal</dt><dd>${SK[main[0]] ? esc(SK[main[0]].n) : ''}</dd>` : ''}
    <dt>Atributos no nível 99</dt><dd>${ATR.filter(k => (last.stats[k] || 1) > 1).map(k => `<b style="color:var(--${k})">${k.toUpperCase()}</b> ${last.stats[k]}`).join(' · ')}</dd>
    ${DB.jobs[b.classe] && DB.jobs[b.classe].master ? `<dt>Mestre da classe</dt><dd>${esc(DB.jobs[b.classe].master.name.split('#')[0])} <span class="mut">(${esc(DB.jobs[b.classe].master.map)})</span></dd>` : ''}
    ${others.length ? `<dt>Outras builds de ${esc(pt(b.classe))}</dt><dd>${others.map(o => `<a onclick="go('${o.id}')">${esc(o.nome.split(' — ')[1])}</a>`).join('<br>')}</dd>` : ''}
  </dl><div class="toc"><div class="mut" style="font-size:11px;text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px">Nesta página</div>${secs.map(([id, n]) => `<a onclick="var el=document.getElementById('${id}');el&&el.scrollIntoView({behavior:'smooth',block:'start'})" style="cursor:pointer">${n}</a>`).join('')}</div></aside>`;
}
function viewBuild() {
  const b = BUILDS.find(x => x.id === state.b) || BUILDS[0]; state.b = b.id;
  const last = b.fases[b.fases.length - 1], main = (b.principal && b.skills.find(s => s[0] === b.principal)) || [...b.skills].filter(s => SK[s[0]] && SK[s[0]].st === 'ok').sort((x, y) => y[1] - x[1])[0];
  const others = BUILDS.filter(x => x.classe === b.classe && x.id !== b.id);
  const rs = routesFor(b);
  const pares = (window.PARES || {})[b.id] || [];
  const secs = [['por-que', 'Por que essa build'], b.extra === 'potter' && ['potter', 'Vale a pena fabricar?'], ['atributos', 'Atributos: como distribuir'], ['skills', 'Skills: ordem por Job'], pares.length && ['pares', 'Combina com (principal/secundário)'], ['equip', 'Equipamento'], ['cartas', 'Cartas'], b.farmRota && b.farmRota.length && ['farm', 'Farm de zeny'], rs.length && ['rota', 'Rota de up'], b.cuidados.length && ['cuidados', 'Cuidados']].filter(Boolean);
  const sec = (id, t) => `<h2 class="s" id="${id}">${t}</h2>`;
  let h = `<div class="crumbs"><a onclick="nav('home')">Início</a> › ${b.caminho.map(c => esc(pt(c))).join(' › ')}</div><div class="page"><div>`;
  h += `<h1 class="t">${esc(b.nome)} ${star(b)}</h1><div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">${b.tags.map(tag).join('')}</div><p class="lead">${esc(b.resumo)}</p>`;
  if (b.servidor) h += `<div class="callout"><div class="h">★ Por que essa build está aqui (regras deste servidor)</div>${esc(b.servidor)}</div>`;
  h += sec('por-que', 'Por que essa build funciona') + `<div class="card"><ul class="why">${b.porque.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`;
  if (b.extra === 'potter') h += sec('potter', 'Vale a pena fabricar? (números do servidor)') + potterHTML();
  h += _buildSecAtributos(b, sec);
  h += sec('skills', 'Skills: ordem por Job') + skillPlan(b);
  if (pares.length) {
    h += sec('pares', 'Combina com: personagem principal ou secundário') + `<p class="mut">Se você escolher esta build, estes personagens completam a conta (zeny, cura, poções ou EXP em grupo).</p><div class="duo">`;
    h += pares.map(([id, papel, why]) => { const o = BUILDS.find(x => x.id === id); return o ? `<div class="card" onclick="go('${id}')">${img(P.cls(o.classe))}<div><span class="chip">${esc(papel)}</span><div style="font-weight:700;margin:6px 0 2px">${esc(o.nome)}</div><div class="mut" style="font-size:13px">${esc(why)}</div></div></div>` : ''; }).join('') + '</div>';
  }
  h += _buildSecEquip(b, sec);
  h += sec('cartas', 'Cartas') + `<p class="mut">Cartas só caem como drop lendário (raras). Monte a build para funcionar sem elas.</p><div class="items" style="padding:0">${b.cartas.map(([id, slot, why]) => itemCard(id, slot + (why ? ' — ' + why : ''))).join('')}</div>`;
  h += _buildSecFarmRota(b, sec);
  if (rs.length) h += _buildSecRota(b, rs, sec);
  if (b.cuidados.length) h += sec('cuidados', 'Cuidados') + b.cuidados.map(c => `<div class="warn">${esc(c)}</div>`).join('');
  h += '</div>';
  h += _buildInfobox(b, last, main, others, secs) + '</div>';
  $('#view').innerHTML = h;
  if (b.extra === 'potter') potUpd();
}
window.derived = (id, i) => {
  const b = BUILDS.find(x => x.id === id), f = b.fases[i], L = CALC.faseNivel(f.nv), d = CALC.derivados(f.stats, L), el = $('#der-' + i);
  if (el.innerHTML) { el.innerHTML = ''; return; }
  el.innerHTML = `<div class="card" style="margin-top:-4px"><b>Derivados no nível ${L}</b> <span class="mut">(sem equipamento e sem bônus de classe)</span><div class="kv" style="margin-top:8px">${Object.entries(d).map(([k, v]) => `<div><span>${k}</span>${v}</div>`).join('')}</div><p class="mut" style="margin:8px 0 0"><a onclick="toPlan('${id}',${i})">Abrir no Planejador →</a></p></div>`;
};

// ---------- ZENY GUIDE ----------
function viewDupla() {
  const zBuilds = BUILDS.filter(b => b.tags && b.tags.includes('zeny'));
  const spotMap = {};
  zBuilds.filter(b => b.farmRota).forEach(b => {
    b.farmRota.forEach(s => {
      const key = s.mapa + '_' + s.de;
      if (!spotMap[key]) spotMap[key] = { ...s, classes: [] };
      const short = b.nome.split(' — ')[0].trim();
      if (!spotMap[key].classes.includes(short)) spotMap[key].classes.push(short);
    });
  });
  const spots = Object.values(spotMap).sort((a, b) => a.de - b.de);
  let h = `<div class="crumbs"><a onclick="nav('home')">Início</a> › Guia de Zeny</div><h1 class="t">Como ganhar Zeny neste servidor</h1>`;
  h += `<p class="lead">Todo zeny vem de loot vendido ao NPC — nenhum monstro dá moeda ao morrer e troca entre jogadores exige VIP. O que define sua renda é escolher o monstro certo para o seu nível.</p>`;
  h += `<div class="callout"><div class="h">★ A regra fundamental</div>Loot/abate = soma de (preço de venda ao NPC × chance de drop) de todos os itens do monstro. Superfaturar (Ferreiro/Alquimista) aplica +24% sobre esse total sem nenhum esforço extra.</div>`;
  h += `<h2 class="s">Os 3 pilares</h2><div class="duo">`;
  h += `<div class="card"><b>💰 Monstro certo</b><div class="mut" style="margin-top:4px">Farm na faixa de nível com maior loot/abate. Trocar de mapa na hora certa dobra a renda.</div></div>`;
  h += `<div class="card"><b>🛒 Carga máxima</b><div class="mut" style="margin-top:4px">Cada STR = +30 de peso. Carrinho do Mercador dá até 8.000 de carga extra.</div></div>`;
  h += `<div class="card"><b>📈 Superfaturar</b><div class="mut" style="margin-top:4px">Superfaturar 10 (Ferreiro/Alquimista): +24% em tudo que você vende ao NPC. Aprenda uma vez, funciona para sempre.</div></div>`;
  h += `</div>`;
  h += `<h2 class="s">Builds de zeny disponíveis</h2><p class="mut">Clique para abrir a build completa com atributos, skills e rota de farm.</p><div class="duo">`;
  zBuilds.forEach(b => {
    h += `<div class="card" onclick="go('${b.id}')">${img(P.cls(b.classe))}<div><div style="font-weight:700;margin:2px 0 4px">${esc(b.nome)}</div><div class="mut" style="font-size:13px">${esc(b.resumo)}</div></div></div>`;
  });
  h += `</div>`;
  h += `<h2 class="s">Progressão de spots por nível</h2><p class="mut">Loot/abate = venda NPC × chance, sem carta e sem Superfaturar. Com Superfaturar 10 multiplique por 1,24.</p>`;
  h += `<div class="route">`;
  spots.forEach(s => {
    const m = DB.maps[s.mapa], mp = P.map(s.mapa);
    h += `<div class="st2" onclick="showMap('${s.mapa}')">`
      + `<div class="mp" style="background-image:${mp.map(u => `url('${u}')`).join(',')}"><span class="lvb">nv ${s.de}–${s.ate}</span></div>`
      + `<div class="bd"><b>${esc(m?m.n:s.mapa)} <span class="mut" style="font-size:11px;font-weight:400">${s.lootAbate} z/abate</span></b>`
      + `<small style="display:block;margin-top:2px"><b>Classes:</b> ${esc(s.classes.join(', '))}</small>`
      + `<small>${esc(s.porque)}</small>`
      + `<div class="mobs">${(s.targets||[]).map(t=>img(P.mon(t),`title="${esc(DB.mons[t]?DB.mons[t].n:'')}"`)).join('')}</div>`
      + `</div></div>`;
  });
  h += `</div>`;
  h += `<h2 class="s">Dicas práticas</h2><div class="card"><ul class="why">`;
  h += `<li><b>Configure a reposição automática de HP</b> antes de sair: sem isso o personagem morre no idle e perde horas de farm.</li>`;
  h += `<li><b>Troque de mapa assim que atingir o nível mínimo</b> do próximo spot — o loot/abate mais que dobra a cada troca.</li>`;
  h += `<li><b>Volte ao NPC antes de encher o peso</b>: regeneração para a 70%, skills param a 90%.</li>`;
  h += `<li><b>Sem VIP não tente fabricar e vender pociões</b>: o NPC já vende Pocião Branca por 600z. Você não consegue competir sem loja de jogador.</li>`;
  h += `</ul></div>`;
  $('#view').innerHTML = h;
}
// ---------- REGRAS ----------
function viewRegras() {
  let h = `<div class="crumbs"><a onclick="nav('home')">Início</a> › Regras do servidor</div><h1 class="t">O que muda neste servidor</h1><p class="lead">Regras tiradas da wiki oficial do RO Classic Idle. É por causa delas que algumas builds clássicas foram trocadas.</p><h2 class="s">Regras que mudam as builds</h2>`;
  h += REGRAS.map(r => `<div class="card"><b>${esc(r.t)}</b><div class="mut" style="margin-top:3px;color:var(--tx2)">${esc(r.d)}</div></div>`).join('');
  h += `<h2 class="s">Builds clássicas descartadas</h2><table><tr><th>Build</th><th>Por que não funciona aqui</th><th>Use no lugar</th></tr>`;
  h += DESCARTADAS.map(d => `<tr><td><b>${esc(d.nome)}</b></td><td class="mut" style="color:var(--tx2)">${esc(d.motivo)}</td><td>${d.troque ? `<a onclick="go('${d.troque}')">${esc(BUILDS.find(b => b.id === d.troque).nome)}</a>` : '—'}</td></tr>`).join('') + '</table>';
  const by = {}; Object.values(SK).forEach(s => { if (s.st !== 'ok') { const c = (s.cls || '?').split('|')[0]; (by[c] = by[c] || []).push(s); } });
  h += '<h2 class="s">Skills que não contam na luta</h2><table><tr><th>Classe</th><th>Skills</th></tr>';
  for (const [c, ss] of Object.entries(by)) h += `<tr><td>${esc(c)}</td><td>${ss.map(s => `<a onclick="showSkill('${s.code}')" class="${s.st}">${esc(s.n)}</a>`).join(', ')}</td></tr>`;
  $('#view').innerHTML = h + '</table>';
}
// ---------- PLANEJADOR ----------
let plan = { lv: 99, st: { str: 1, agi: 1, vit: 1, int: 1, dex: 1, luk: 1 } };
window.toPlan = (id, i) => { const f = BUILDS.find(x => x.id === id).fases[i]; plan = { lv: CALC.faseNivel(f.nv), st: { ...f.stats } }; nav('plan'); };
function viewPlan() {
  let h = `<div class="crumbs"><a onclick="nav('home')">Início</a> › Planejador</div><h1 class="t">Planejador de atributos</h1><p class="lead">Mexa nos atributos e veja quanto custa em pontos e o que cada um muda.</p>`;
  h += `<div class="card"><select onchange="loadPlan(this.value)"><option value="">Carregar uma fase de build…</option>${BUILDS.map(b => `<optgroup label="${esc(b.nome)}">${b.fases.map((f, i) => `<option value="${b.id}|${i}">${esc(f.nv)}</option>`).join('')}</optgroup>`).join('')}</select>
  <label style="display:block;margin-top:12px">Nível base: <b id="plv"></b><input type="range" min="1" max="99" value="${plan.lv}" oninput="plan.lv=+this.value;upd()" style="width:100%"></label></div><div class="plan">`;
  h += ATR.map(k => `<label><span style="color:var(--${k});font-weight:700">${k.toUpperCase()}</span> <b id="pv-${k}"></b><input type="range" min="1" max="99" value="${plan.st[k]}" oninput="plan.st.${k}=+this.value;upd()"><small class="mut" id="pc-${k}"></small></label>`).join('');
  h += `</div><div id="pout"></div><div class="card"><b>O que cada atributo faz (pré-renovação)</b><ul class="why" style="margin-top:6px">
  <li><b style="color:var(--str)">STR</b> dano corpo a corpo (bônus extra a cada 10 pontos) e +30 de carga por ponto.</li>
  <li><b style="color:var(--agi)">AGI</b> velocidade de ataque e esquiva (FLEE = nível + AGI).</li>
  <li><b style="color:var(--vit)">VIT</b> +1% de HP por ponto, defesa e mais cura de poção.</li>
  <li><b style="color:var(--int)">INT</b> dano mágico, SP e regeneração de SP.</li>
  <li><b style="color:var(--dex)">DEX</b> acerto (HIT = nível + DEX), dano de arco/arma de fogo e conjuração (150 = instantânea).</li>
  <li><b style="color:var(--luk)">LUK</b> crítico (+0,3% por ponto), um pouco de ATK e esquiva perfeita.</li>
  <li>Custo de cada ponto no jogo: de 1 até 10 custa 2; a partir de 10 custa 3; a partir de 20 custa 4; e assim por diante (⌊atual/10⌋+2). Levar um atributo de 1 a 99 custa 637 pontos e o nível 99 dá 1.273: por isso não existe build com dois atributos em 99.</li></ul></div>`;
  $('#view').innerHTML = h; upd();
}
window.loadPlan = v => { if (!v) return; const [id, i] = v.split('|'); toPlan(id, +i); };
window.upd = () => {
  $('#plv').textContent = plan.lv;
  ATR.forEach(k => { $('#pv-' + k).textContent = plan.st[k]; $('#pc-' + k).textContent = ' · próximo custa ' + CALC.passo(plan.st[k]); });
  const u = CALC.custo(plan.st), hv = CALC.pontos(plan.lv), d = CALC.derivados(plan.st, plan.lv);
  $('#pout').innerHTML = `<div class="card"><b class="${u > hv ? 'nao' : 'ok'}">${u} de ${hv} pontos ${u > hv ? '— não cabe nesse nível!' : '— sobram ' + (hv - u)}</b><div class="kv" style="margin-top:8px">${Object.entries(d).map(([k, v]) => `<div><span>${k}</span>${v}</div>`).join('')}</div></div>`;
};
// ---------- BUSCA ----------
function search(q, onlyCards, lim) {
  q = q.trim().toLowerCase(); const r = { b: [], i: [], m: [], p: [], s: [] }; if (q.length < 2) return r;
  if (!onlyCards) r.b = BUILDS.filter(b => (b.nome + ' ' + pt(b.classe)).toLowerCase().includes(q));
  for (const [id, it] of Object.entries(DB.items)) if (it.n.toLowerCase().includes(q) && (!onlyCards || it.t === 'Card')) r.i.push(id);
  if (!onlyCards) {
    for (const [id, m] of Object.entries(DB.mons)) if (m.n.toLowerCase().includes(q)) r.m.push(id);
    for (const [k, m] of Object.entries(DB.maps)) if ((m.n + ' ' + k).toLowerCase().includes(q)) r.p.push(k);
    for (const s of Object.values(SK)) if (s.n.toLowerCase().includes(q)) r.s.push(s.code);
  }
  for (const k in r) r[k] = r[k].slice(0, lim); return r;
}
function resHTML(r) {
  let h = '';
  if (r.b.length) h += '<div class="h">Builds</div>' + r.b.map(b => `<div class="row" onclick="closeGs();go('${b.id}')">${img(P.clsIcon(b.classe), 'style="width:26px"')}<span>${esc(b.nome)}</span></div>`).join('');
  if (r.i.length) h += '<div class="h">Itens</div>' + r.i.map(id => { const it = DB.items[id]; return `<div class="row" onclick="showItem(${id})">${img(P.item(id), 'style="width:26px"')}<span>${esc(it.n)} <span class="mut">${esc(locName(it))} ${itemLine(it)}</span></span></div>`; }).join('');
  if (r.m.length) h += '<div class="h">Monstros</div>' + r.m.map(id => { const m = DB.mons[id]; return `<div class="row" onclick="showMon(${id})">${img(P.mon(id), 'style="width:26px;max-height:26px"')}<span>${esc(m.n)} <span class="mut">nv ${m.lv}${m.mvp ? ' · MVP' : ''}</span></span></div>`; }).join('');
  if (r.p.length) h += '<div class="h">Mapas</div>' + r.p.map(k => `<div class="row" onclick="showMap('${k}')"><span>🗺 ${esc(DB.maps[k].n)} <span class="mut">${k}</span></span></div>`).join('');
  if (r.s.length) h += '<div class="h">Skills</div>' + r.s.map(c => `<div class="row" onclick="showSkill('${c}')">${img(P.skill(c), 'style="width:24px"')}<span>${esc(SK[c].n)}</span> ${badge(SK[c].st)}</div>`).join('');
  return h;
}
$('#gq').oninput = e => { const r = search(e.target.value, false, 6); const h = resHTML(r); $('#gsr').innerHTML = h || (e.target.value.length > 1 ? '<div class="h">Nada encontrado</div>' : ''); $('#gsr').style.display = e.target.value.length > 1 ? 'block' : 'none'; };
window.closeGs = () => { $('#gsr').style.display = 'none'; $('#gq').value = ''; };
document.addEventListener('click', e => { if (!e.target.closest('.gs')) $('#gsr').style.display = 'none'; });
function viewDB() {
  $('#view').innerHTML = `<div class="crumbs"><a onclick="nav('home')">Início</a> › Banco de dados</div><h1 class="t">Banco de dados</h1><p class="lead">${fmt(Object.keys(DB.items).length)} itens · ${fmt(Object.keys(DB.mons).length)} monstros · ${fmt(Object.keys(DB.maps).length)} mapas · ${fmt(Object.keys(SK).length)} skills, tudo da wiki do servidor.</p>
  <div class="card"><input type="search" id="q" placeholder="Raydric, Kataná, Orc, Payon, Nevasca…"><label class="mut" style="display:block;margin-top:8px"><input type="checkbox" id="qc"> só cartas</label></div><div class="res card" id="res" style="padding:4px"></div>`;
  const run = () => {
    const q = $('#q').value, onlyCards = $('#qc').checked;
    const r = search(q, onlyCards, 80);
    if (q.length < 2) {
      $('#res').innerHTML = `<div style="padding:14px 10px;color:var(--mut)"><div style="font-size:15px;font-weight:700;margin-bottom:8px">O que você pode buscar</div><div style="display:flex;flex-wrap:wrap;gap:6px">${['Raydric','Oridecon','Kataná','Poring','Payon','Anubis','Nevasca','Kyrie','Furto'].map(s=>`<span class="chip" style="cursor:pointer" onclick="document.getElementById('q').value='${s}';run()">${s}</span>`).join('')}</div></div>`;
    } else {
      $('#res').innerHTML = resHTML(r) || `<p class="mut" style="padding:14px 10px">Nenhum resultado para "<b>${esc(q)}</b>". Tente o nome em português ou o nome do jogo original.</p>`;
    }
  };
  window.run = run;
  $('#q').oninput = run; $('#qc').onchange = run; run(); $('#q').focus();
}
// ---------- MODAIS ----------
const openM = (icon, title, sub, body) => { $('#mbody').innerHTML = `<div class="mh"><div class="ic">${icon}</div><div><h2>${title}</h2><div class="mut">${sub}</div></div></div><div class="mb">${body}</div>`; $('#modal').style.display = 'flex'; $('#gsr').style.display = 'none'; };
window.closeM = () => $('#modal').style.display = 'none';
$('#modal').onclick = e => { if (e.target.id === 'modal') closeM(); };
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeM(); });
window.showItem = id => {
  const it = DB.items[id]; if (!it) return; const s = it.src || {};
  let b = `<div class="kv"><div><span>Compra</span>${fmt(it.buy)}z</div><div><span>Venda ao NPC</span>${fmt(it.sell)}z</div><div><span>Peso</span>${(it.w || 0) / 10}</div>${it.atk ? `<div><span>ATK</span>${it.atk}</div>` : ''}${it.def ? `<div><span>DEF</span>${it.def}</div>` : ''}<div><span>Slots</span>${it.sl}</div>${it.lv ? `<div><span>Nível mínimo</span>${it.lv}</div>` : ''}<div><span>Efeito</span>${it.ef === 'nao' ? '<span class="nao">não funciona</span>' : '<span class="ok">funciona</span>'}</div></div>`;
  if (it.jobs && it.jobs.length && it.jobs.length < 25) b += `<p class="mut">Classes: ${it.jobs.map(j => esc(pt(j))).join(', ')}</p>`;
  b += `<pre class="ds">${esc(it.ds)}</pre>`;
  if (s.s && s.s.length) b += '<h2 class="s">Vendido em</h2>' + s.s.map(x => `<div>🛒 ${esc(x[0])} — <b>${fmt(x[1])}z</b></div>`).join('');
  if (s.m && s.m.length) b += '<h2 class="s">Dropa de</h2><table>' + s.m.slice(0, 30).map(([mid, ch]) => { const m = DB.mons[mid]; return m ? `<tr><td style="width:44px">${img(P.mon(mid), 'style="max-height:34px;max-width:40px"')}</td><td><a onclick="showMon(${mid})">${esc(m.n)}</a></td><td>nv ${m.lv}${m.mvp ? ' <b class="fora">MVP</b>' : ''}</td><td>${pct(ch)}</td><td class="mut">${m.maps.map(k => DB.maps[k] ? DB.maps[k].n : k).slice(0, 2).join(', ')}</td></tr>` : ''; }).join('') + '</table>';
  openM(img(it.t === 'Card' ? P.card(id) : P.item(id)), esc(it.n), `#${id} · ${esc(locName(it))} ${itemLine(it)}`, b);
};
window.showMon = id => {
  const m = DB.mons[id]; if (!m) return;
  let b = `<div class="kv">${[['Nível', m.lv], ['HP', fmt(m.hp)], ['Raça', m.race], ['Tamanho', m.size], ['Elemento', m.el + ' ' + (m.ell || '')], ['DEF / DEFM', m.def + ' / ' + m.mdef], ['EXP base', fmt(m.exp)], ['EXP classe', fmt(m.jexp)]].map(([k, v]) => `<div><span>${k}</span>${esc(v)}</div>`).join('')}</div>`;
  b += '<p class="mut">EXP recebida: 100% até o nível 10, 50% do 11 ao 30, 20% do 31 ao 99.</p><h2 class="s">Mapas</h2>' + m.maps.map(k => `<a onclick="showMap('${k}')">${esc(DB.maps[k] ? DB.maps[k].n : k)}</a>`).join(' · ');
  b += '<h2 class="s">Drops</h2><table>' + m.d.map(([iid, ch]) => { const it = DB.items[iid]; return `<tr><td style="width:40px">${img(P.item(iid))}</td><td><a onclick="showItem(${iid})">${esc(it ? it.n : iid)}</a></td><td>${pct(ch)}</td><td class="mut">${it ? 'NPC paga ' + fmt(it.sell) + 'z' : ''}</td></tr>`; }).join('') + '</table>';
  openM(img(P.mon(id)), esc(m.n) + (m.mvp ? ' <span class="chip t-masmorra">MVP</span>' : ''), `Nível ${m.lv} · ${esc(m.race)} · ${esc(m.el)}`, b);
};
window.showMap = k => {
  const m = DB.maps[k] || { n: k }; const ms = Object.entries(DB.mons).filter(([, x]) => x.maps.includes(k)); const mp = P.map(k);
  let b = `<div class="mapview" style="background-image:${mp.map(u => `url('${u}')`).join(',')}"></div>`;
  b += '<table><tr><th></th><th>Monstro</th><th>Nível</th><th>Tipo</th><th>Loot por abate</th></tr>' + ms.map(([id, x]) => {
    const z = x.d.map(([i, c]) => [DB.items[i], c]).filter(([it]) => it && it.t !== 'Card').reduce((a, [it, c]) => a + (it.sell || 0) * (c || 0) / 10000, 0);
    return `<tr><td style="width:46px">${img(P.mon(id), 'style="max-height:36px;max-width:42px"')}</td><td><a onclick="showMon(${id})">${esc(x.n)}</a></td><td>${x.lv}</td><td class="mut">${x.el} · ${x.race}</td><td>~${fmt(Math.round(z))}z</td></tr>`;
  }).join('') + '</table><p class="mut">"Loot por abate" = soma de (venda ao NPC × chance) dos drops, sem carta e sem Superfaturar. Serve para comparar mapas de farm.</p>';
  openM('🗺', esc(m.n), `${k}${m.lv ? ' · abre no nível ' + m.lv : ''}${m.faixa ? ' · monstros nv ' + m.faixa : ''}`, b);
};
window.showSkill = c => { const s = SK[c]; if (!s) return; openM(img(P.skill(c)), esc(s.n), `${esc(s.cls)} · nível máximo ${s.max}`, `${badge(s.st)}<pre class="ds">${esc(s.ds)}</pre>`); };

function render() {
  document.querySelectorAll('#nav button').forEach(b => b.classList.toggle('on', b.dataset.v === state.v));
  side(); ({ home: viewHome, builds: viewBuild, dupla: viewDupla, regras: viewRegras, plan: viewPlan, db: viewDB }[state.v] || viewHome)(); save();
}
render();

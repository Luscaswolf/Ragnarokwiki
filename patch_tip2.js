const fs = require('fs');

// ================================================================
// 1. index.html — substitui CSS do tooltip
// ================================================================
let html = fs.readFileSync('index.html', 'utf8');

const oldCSS = `
/* ---------- skill tooltip ---------- */
.sk-wrap{position:relative;display:inline-flex;align-items:center}
.sk-tip{
  display:none;position:absolute;z-index:60;
  left:calc(100% + 10px);top:50%;transform:translateY(-50%);
  width:280px;background:var(--bg2);border:1px solid var(--line2);
  border-radius:12px;box-shadow:var(--shade);padding:12px 14px;
  pointer-events:none;text-align:left;
}
.sk-wrap:hover .sk-tip,
.sk-wrap:focus-within .sk-tip{display:block}
/* flip para a esquerda quando não cabe à direita */
@media(max-width:860px){.sk-tip{left:auto;right:calc(100% + 10px)}}
.sk-tip .th{display:flex;gap:10px;align-items:center;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid var(--line)}
.sk-tip .th img{width:36px;height:36px;flex:none}
.sk-tip .th b{font-size:14px;display:block;line-height:1.3}
.sk-tip .th small{color:var(--mut);font-size:12px}
.sk-tip .req{color:var(--acc2);font-size:12.5px;font-weight:700;margin-bottom:6px}
.sk-tip .desc{color:var(--tx2);font-size:12.5px;line-height:1.5;white-space:pre-line;max-height:160px;overflow:auto}
`;

const newCSS = `
/* ---------- skill tooltip ---------- */
.sk-wrap{position:relative;display:inline-flex;align-items:center}
.sk-tip{
  display:none;position:absolute;z-index:60;
  left:calc(100% + 8px);top:50%;transform:translateY(-50%);
  width:260px;background:var(--bg2);border:1px solid var(--line2);
  border-radius:12px;box-shadow:var(--shade);padding:12px 14px;
  text-align:left;cursor:default;
}
.sk-tip.vis{display:block}
/* ponte invisível preenche o gap entre ícone e popup */
.sk-tip::before{content:"";position:absolute;right:100%;top:0;width:12px;height:100%}
@media(max-width:860px){.sk-tip{left:auto;right:calc(100% + 8px)}.sk-tip::before{left:100%;right:auto}}
.sk-tip .sth{display:flex;gap:10px;align-items:center;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid var(--line)}
.sk-tip .sth img,.sk-tip .sth .ph{width:34px;height:34px;flex:none}
.sk-tip .sth b{font-size:13.5px;display:block;line-height:1.3}
.sk-tip .sth small{color:var(--mut);font-size:11.5px;display:block;margin-top:2px}
.sk-tip .sreq{margin:0;padding:0;list-style:none}
.sk-tip .sreq li{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--line);font-size:13px}
.sk-tip .sreq li:last-child{border:0}
.sk-tip .sreq li img,.sk-tip .sreq li .ph{width:24px;height:24px;flex:none}
.sk-tip .sreq li span{flex:1}
.sk-tip .sreq li b{font-family:var(--f-num);font-size:12px;color:var(--acc2);white-space:nowrap}
.sk-tip .snone{color:var(--mut);font-size:13px;font-style:italic}
`;

if (!html.includes(newCSS)) {
  html = html.replace(oldCSS, newCSS);
  if (!html.includes('.sk-tip.vis')) {
    // fallback: substitui qualquer bloco sk-tip existente
    html = html.replace(/\/\* ---------- skill tooltip ---------- \*\/[\s\S]+?\.sk-tip \.desc\{[^}]+\}\s*/, newCSS);
  }
}
fs.writeFileSync('index.html', html);
console.log('CSS atualizado');

// ================================================================
// 2. app.js — reescreve o bloco do tooltip + adiciona funções JS
// ================================================================
let asrc = fs.readFileSync('app/app.js', 'utf8');

// --- 2a. Substitui o bloco do skillPlan tooltip ---
const oldBlock = `    for (const [code, lv, why] of list) {
      const s = SK[code], a = acc + 2, z = acc + lv + 1; acc += lv;
      {
      // extrai pré-requisitos do campo ds
      let reqLine = '';
      if (s && s.ds) {
        const m = s.ds.match(/Pr[eé]-requisitos?:([\\n]+)/i);
        if (m) reqLine = m[1].trim();
      }
      const tipHtml = s ? \`<div class="sk-tip">
        <div class="th">\${img(P.skill(code), 'style="width:36px;height:36px"')}<div><b>\${esc(s.n)}</b><small>Nível máximo: \${s.max} · \${s.st === 'ok' ? 'Funciona em combate' : s.st === 'fora' ? 'Sem efeito em combate' : 'Ainda não funciona'}</small></div></div>\${reqLine ? \`<div class="req">Pré-requisitos: \${esc(reqLine)}</div>\` : ''}<div class="desc">\${esc((s.ds||'').replace(/Pr[eé]-requisitos?:[^\\n]+\\n?/i,'').trim().slice(0,400))}</div>
      </div>\` : '';
      h += \`<div class="sk"><span class="sk-wrap">\${img(P.skill(code))}\${tipHtml}</span><span><a onclick="showSkill('\${code}')">\${esc(s ? s.n : code)}</a> <b class="mut">nv \${lv}</b></span><span class="lvl">\${a === z ? a : a + '–' + z}</span><span class="sel">\${s ? badge(s.st) : ''}</span><span class="why">\${esc(why)}</span></div>\`;
    };
    }`;

const newBlock = `    for (const [code, lv, why] of list) {
      const s = SK[code], a = acc + 2, z = acc + lv + 1; acc += lv;
      // extrai pré-requisitos do campo ds e monta popup
      let reqItems = [];
      if (s && s.ds) {
        const m = s.ds.match(/Pr[eé]-requisitos?:([^\\n]+)/i);
        if (m) {
          // parse "Nome da Skill X, Outra Skill Y" → [{nome, lv}]
          m[1].split(',').forEach(part => {
            const p = part.trim().replace(/\\.$/, '');
            if (!p) return;
            const lm = p.match(/^(.+?)\\s+(\\d+)$/);
            if (lm) reqItems.push({ nome: lm[1].trim(), nivel: lm[2] });
            else if (p) reqItems.push({ nome: p, nivel: null });
          });
        }
      }
      const tipId = 'st-' + code;
      const reqHtml = reqItems.length
        ? '<ul class="sreq">' + reqItems.map(r => {
            // tenta achar a skill pelo nome para pegar o ícone
            const found = Object.values(SK).find(x => x.n === r.nome);
            const ico = found ? img(P.skill(found.code)) : '<span class="ph"></span>';
            return \`<li>\${ico}<span>\${esc(r.nome)}</span>\${r.nivel ? \`<b>nv \${r.nivel}</b>\` : ''}</li>\`;
          }).join('') + '</ul>'
        : '<p class="snone">Sem pré-requisitos</p>';
      const sel = s ? (s.st === 'ok' ? 'Funciona em combate' : s.st === 'fora' ? 'Sem efeito em combate' : 'Ainda não funciona') : '';
      const tipHtml = s ? \`<div class="sk-tip" id="\${tipId}" onmouseenter="tipOver('\${tipId}')" onmouseleave="tipOut('\${tipId}')">
        <div class="sth">\${img(P.skill(code))}<div><b>\${esc(s.n)} nv \${lv}</b><small>\${esc(sel)}</small></div></div>
        \${reqHtml}
      </div>\` : '';
      h += \`<div class="sk"><span class="sk-wrap" onmouseenter="skOver('\${tipId}')" onmouseleave="skOut('\${tipId}')">\${img(P.skill(code))}\${tipHtml}</span><span><a onclick="showSkill('\${code}')">\${esc(s ? s.n : code)}</a> <b class="mut">nv \${lv}</b></span><span class="lvl">\${a === z ? a : a + '–' + z}</span><span class="sel">\${s ? badge(s.st) : ''}</span><span class="why">\${esc(why)}</span></div>\`;
    }`;

if (!asrc.includes('tipOver')) {
  if (!asrc.includes(oldBlock.slice(0, 60))) {
    console.error('OLD BLOCK NAO ENCONTRADO — procurando alternativa');
    // localiza pelo padrão mais simples
    const altOld = `for (const [code, lv, why] of list) {
      const s = SK[code], a = acc + 2, z = acc + lv + 1; acc += lv;`;
    const altIdx = asrc.indexOf(altOld);
    if (altIdx === -1) { console.error('NENHUM PADRAO ENCONTRADO'); process.exit(1); }
    // pega o bloco inteiro até o próximo h += '</div>';
    const blockEnd = asrc.indexOf("    h += '</div>';", altIdx);
    const oldFull = asrc.slice(altIdx, blockEnd);
    asrc = asrc.slice(0, altIdx) + newBlock + '\n' + asrc.slice(altIdx + oldFull.length);
  } else {
    asrc = asrc.replace(oldBlock, newBlock);
  }
  console.log('skillPlan tooltip reescrito');
} else {
  // já tem tipOver, só precisa atualizar o conteúdo
  const altOld = `for (const [code, lv, why] of list) {
      const s = SK[code], a = acc + 2, z = acc + lv + 1; acc += lv;`;
  const altIdx = asrc.indexOf(altOld);
  const blockEnd = asrc.indexOf("    h += '</div>';", altIdx);
  asrc = asrc.slice(0, altIdx) + newBlock + '\n' + asrc.slice(blockEnd);
  console.log('skillPlan tooltip atualizado');
}

// --- 2b. Adiciona funções JS de hover persistente (antes do render) ---
const funcMarker = 'window.derived = ';
if (!asrc.includes('function skOver')) {
  const tipFns = `// ---------- SKILL TOOLTIP HOVER ----------
let _tipTimer = null;
window.skOver = id => {
  clearTimeout(_tipTimer);
  document.querySelectorAll('.sk-tip.vis').forEach(el => { if (el.id !== id) el.classList.remove('vis'); });
  const el = document.getElementById(id);
  if (el) el.classList.add('vis');
};
window.skOut = id => {
  _tipTimer = setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('vis');
  }, 180);
};
window.tipOver = id => { clearTimeout(_tipTimer); };
window.tipOut  = id => {
  _tipTimer = setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('vis');
  }, 180);
};
`;
  asrc = asrc.replace(funcMarker, tipFns + funcMarker);
  console.log('funções de hover inseridas');
} else {
  console.log('funções de hover já existem');
}

fs.writeFileSync('app/app.js', asrc);
console.log('app.js salvo');

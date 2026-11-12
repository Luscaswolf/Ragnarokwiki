const fs = require('fs');
let src = fs.readFileSync('app/app.js', 'utf8');

// Encontra o início e fim do bloco usando índices
const forStart = src.indexOf('    for (const [code, lv, why] of list) {');
// Fim: a linha "    }" que fecha o forEach de tiers, depois do h += '</div>';
// Localiza: h += '</div>';\n  });\n  return h;
const returnPos = src.indexOf("  return h;\n}", forStart);
// O for termina na linha "    }" antes de "    h += '</div>';"
const closeDiv = src.lastIndexOf("    h += '</div>';", returnPos);
const forEnd = src.lastIndexOf('\n    }', closeDiv) + 1; // posição após \n

if (forStart === -1 || forEnd === -1 || closeDiv === -1) {
  console.error('POSICOES:', forStart, forEnd, closeDiv); process.exit(1);
}
console.log('forStart:', forStart, 'forEnd:', forEnd, 'closeDiv:', closeDiv);

const newFor = `    for (const [code, lv, why] of list) {
      const s = SK[code], a = acc + 2, z = acc + lv + 1; acc += lv;
      // pré-requisitos: extrai do campo ds e resolve ícones
      let reqItems = [];
      if (s && s.ds) {
        const m = s.ds.match(/Pr[eé]-requisitos?:([^\n]+)/i);
        if (m) m[1].split(',').forEach(part => {
          const p = part.trim().replace(/\\.$/,'');
          if (!p) return;
          const lm = p.match(/^(.+?)\\s+(\\d+)$/);
          reqItems.push(lm ? { nome: lm[1].trim(), nivel: lm[2] } : { nome: p, nivel: null });
        });
      }
      const tipId = 'st-' + code;
      const reqHtml = reqItems.length
        ? \`<ul class="sreq">\${reqItems.map(r => {
            const found = Object.values(SK).find(x => x.n === r.nome);
            const ico = found ? img(P.skill(found.code)) : '<span class="ph"></span>';
            return \`<li>\${ico}<span>\${esc(r.nome)}</span>\${r.nivel ? \`<b>nv&nbsp;\${r.nivel}</b>\` : ''}</li>\`;
          }).join('')}</ul>\`
        : \`<p class="snone">Sem pr\u00e9-requisitos</p>\`;
      const selo = s ? (s.st === 'ok' ? '\u2705 Funciona em combate' : s.st === 'fora' ? '\u26d4 Sem efeito em combate' : '\u23f3 Ainda n\u00e3o funciona') : '';
      const tipHtml = s
        ? \`<div class="sk-tip" id="\${tipId}" onmouseenter="tipOver('\${tipId}')" onmouseleave="tipOut('\${tipId}')">
            <div class="sth">\${img(P.skill(code))}<div><b>\${esc(s.n)}</b><small>Nv m\u00e1x: \${s.max} \u00b7 \${esc(selo)}</small></div></div>
            <div class="sreq-lbl">Pr\u00e9-requisitos para esta skill</div>
            \${reqHtml}
          </div>\`
        : '';
      h += \`<div class="sk"><span class="sk-wrap" onmouseenter="skOver('\${tipId}')" onmouseleave="skOut('\${tipId}')">\${img(P.skill(code))}\${tipHtml}</span><span><a onclick="showSkill('\${code}')">\${esc(s ? s.n : code)}</a> <b class="mut">nv \${lv}</b></span><span class="lvl">\${a === z ? a : a + '\u2013' + z}</span><span class="sel">\${s ? badge(s.st) : ''}</span><span class="why">\${esc(why)}</span></div>\`;
    }\r\n`;

src = src.slice(0, forStart) + newFor + src.slice(forEnd);
console.log('for loop substituído');

// funções de hover (remove antigas se existirem)
src = src.replace(/\/\/ ---------- SKILL TOOLTIP HOVER ----------[\s\S]+?window\.tipOut[^;]+;\s*\};\s*/,'');

const hoverFns = `// ---------- SKILL TOOLTIP HOVER ----------
let _tipTimer = null;
window.skOver = id => {
  clearTimeout(_tipTimer);
  document.querySelectorAll('.sk-tip.vis').forEach(el => { if (el.id !== id) el.classList.remove('vis'); });
  const el = document.getElementById(id); if (el) el.classList.add('vis');
};
window.skOut = id => { _tipTimer = setTimeout(() => { const el = document.getElementById(id); if (el) el.classList.remove('vis'); }, 180); };
window.tipOver = id => { clearTimeout(_tipTimer); };
window.tipOut  = id => { _tipTimer = setTimeout(() => { const el = document.getElementById(id); if (el) el.classList.remove('vis'); }, 180); };
`;
const marker = 'window.derived = ';
src = src.replace(marker, hoverFns + marker);
console.log('hover fns inseridas');

fs.writeFileSync('app/app.js', src);
console.log('app.js salvo');

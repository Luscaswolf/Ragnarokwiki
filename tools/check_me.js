// node tools/check_me.js -> testa "continuar a partir dos meus atributos" no Ferreiro (nível 23: STR 25, AGI 17, VIT 11, DEX 13)
const fs = require('fs');
const probe = `<script>
const errs = []; window.onerror = m => errs.push(m);
try {
  for (const v of ['home', 'dupla', 'regras', 'plan', 'db']) nav(v);
  for (const b of BUILDS) go(b.id);
  go('ferreiro-zeny');
  document.getElementById('me-L').value = 23; document.getElementById('me-rest').value = 2;
  ({ str: 25, agi: 16, vit: 10, int: 1, dex: 12, luk: 1 }) && Object.entries({ str: 25, agi: 16, vit: 10, int: 1, dex: 12, luk: 1 }).forEach(([k, v]) => document.getElementById('me-' + k).value = v);
  meuUpd('ferreiro-zeny');
} catch (e) { errs.push(e.message); }
const rows = [...document.querySelectorAll('#steps-ferreiro-zeny tbody tr')];
const pick = rows.filter((r, i) => i < 6 || i > rows.length - 3).map(r => [...r.cells].map(c => c.textContent.trim()).join(' | '));
const w = [...document.querySelectorAll('#steps-ferreiro-zeny .warn')].map(x => x.textContent);
document.title = 'R:' + encodeURIComponent('ERROS ' + JSON.stringify(errs) + '\\n' + w.join('\\n') + '\\n' + pick.join('\\n'));
</script>`;
fs.writeFileSync('t.html', fs.readFileSync('index.html', 'utf8').replace('<script src="app/app.js"></script>', '<script src="app/app.js"></script>' + probe));

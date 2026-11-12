// node tools/check_cal.js <restantes> -> testa a calibração com STR 25, AGI 16, VIT 10, DEX 12 no nível 23 (Ferreiro)
const fs = require('fs');
const rest = process.argv[2] || '10';
const probe = `<script>
try { localStorage.removeItem('rcib-formula'); } catch (e) {}
CALC.formula = 'A';
const errs = []; window.onerror = m => errs.push(m);
try {
  go('ferreiro-zeny');
  document.getElementById('me-L').value = 23; document.getElementById('me-rest').value = ${JSON.stringify(rest)};
  Object.entries({ str: 25, agi: 16, vit: 10, int: 1, dex: 12, luk: 1 }).forEach(([k, v]) => document.getElementById('me-' + k).value = v);
  meuUpd('ferreiro-zeny');
} catch (e) { errs.push(e.message); }
const box = document.getElementById('steps-ferreiro-zeny');
const first = box.querySelector('tbody tr');
document.title = 'R:' + encodeURIComponent('ERROS ' + JSON.stringify(errs) + ' | formula=' + CALC.formula + '\\n' + [...box.querySelectorAll('.warn,.callout')].map(x => x.textContent).join('\\n') + '\\n1a linha: ' + (first ? [...first.cells].map(c => c.textContent.trim()).join(' | ') : '-'));
try { localStorage.removeItem('rcib-formula'); } catch (e) {}
</script>`;
fs.writeFileSync('t.html', fs.readFileSync('index.html', 'utf8').replace('<script src="app/app.js"></script>', '<script src="app/app.js"></script>' + probe));

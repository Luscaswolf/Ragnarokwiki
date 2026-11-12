// node tools/check_steps.js <build-id> -> gera t.html que escreve no <title> as linhas do passo a passo
const fs = require('fs');
const id = process.argv[2] || 'alquimista-potter';
const probe = `<script>
go(${JSON.stringify(id)});
const rows = [...document.querySelectorAll('.steps tbody tr')];
const pick = rows.filter((r, i) => i < 12 || i > rows.length - 4).map(r => [...r.cells].map(c => c.textContent.trim()).join(' | '));
const w = [...document.querySelectorAll('.warn')].map(x => x.textContent).filter(t => /sobram/i.test(t));
document.title = 'R:' + encodeURIComponent(pick.join('\\n') + '\\n' + w.join('\\n'));
</script>`;
const h = fs.readFileSync('index.html', 'utf8').replace('<script src="app/app.js"></script>', '<script src="app/app.js"></script>' + probe);
fs.writeFileSync('t.html', h);

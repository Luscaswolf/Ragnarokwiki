const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.png':  'image/png',
  '.webp': 'image/webp',
  '.gif':  'image/gif',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon',
  '.json': 'application/json',
};

// Script injetado no HTML: conecta ao SSE e recarrega quando servidor avisar
const RELOAD_SCRIPT = `
<script>
(function(){
  const es = new EventSource('/__reload');
  es.onmessage = () => location.reload();
  es.onerror   = () => setTimeout(() => location.reload(), 1000);
})();
</script>`;

// Clientes SSE conectados
const clients = new Set();

function sendReload() {
  for (const res of clients) {
    try { res.write('data: reload\n\n'); } catch (_) {}
  }
}

// Watch recursivo nos arquivos do projeto
const WATCH_DIRS = [ROOT];
const DEBOUNCE = 120;
let debounceTimer = null;

function watchDir(dir) {
  try {
    fs.watch(dir, { recursive: true }, (event, filename) => {
      if (!filename) return;
      // ignora: .git, node_modules, e os próprios arquivos de imagem (muito ruído)
      if (/[\\/](\.git|node_modules)[\\/]/.test(filename)) return;
      if (/\.(png|webp|gif|jpg|ico)$/.test(filename)) return;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        console.log('  ~ alterado:', filename);
        sendReload();
      }, DEBOUNCE);
    });
  } catch (e) {
    console.warn('watch falhou em', dir, e.message);
  }
}

for (const d of WATCH_DIRS) watchDir(d);

// Servidor HTTP
http.createServer((req, res) => {
  // SSE endpoint de reload
  if (req.url === '/__reload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });
    res.write('data: connected\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(ROOT, urlPath);

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }

    const ext = path.extname(filePath).toLowerCase();
    const ct = MIME[ext] || 'application/octet-stream';

    // Injeta script de reload só no HTML
    if (ext === '.html') {
      const html = data.toString('utf8').replace('</body>', RELOAD_SCRIPT + '</body>');
      res.writeHead(200, { 'Content-Type': ct, 'Cache-Control': 'no-cache' });
      res.end(html);
    } else {
      res.writeHead(200, { 'Content-Type': ct });
      res.end(data);
    }
  });

}).listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:' + PORT);
  console.log('Hot-reload ativo — salve qualquer .html, .js ou .css para recarregar.');
});

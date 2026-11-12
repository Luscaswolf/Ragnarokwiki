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

const RELOAD_SCRIPT = `
<script>
(function(){
  const es = new EventSource('/__reload');
  es.addEventListener('reload', e => {
    const file = e.data || '';
    if (file.endsWith('.css')) {
      document.querySelectorAll('link[rel=stylesheet]').forEach(l => {
        const u = new URL(l.href); u.searchParams.set('_r', Date.now()); l.href = u.toString();
      });
      return;
    }
    document.body.style.transition = 'opacity .12s';
    document.body.style.opacity = '0';
    setTimeout(() => location.reload(), 130);
  });
  // onerror silencioso — sem reload automatico na reconexao
  es.onerror = () => {};
})();
</script>`;

const clients = new Set();

function sendReload(filename) {
  const msg = 'event: reload\ndata: ' + (filename || '') + '\n\n';
  for (const res of [...clients]) {
    try { res.write(msg); } catch (_) { clients.delete(res); }
  }
}

// Debounce GLOBAL unico — qualquer mudanca espera 400ms antes de disparar
// Evita multiplos reloads por save atomico (write temp + rename)
let globalTimer = null;
let pendingFile = '';

try {
  fs.watch(ROOT, { recursive: true }, (event, filename) => {
    if (!filename) return;
    if (/[\/\\](\.git|node_modules)[\/\\]/.test(filename)) return;
    if (/\.(png|webp|gif|jpg|ico)$/.test(filename)) return;
    if (filename === 'server.js') return;
    // guarda o ultimo arquivo alterado
    pendingFile = filename.replace(/\\/g, '/');
    clearTimeout(globalTimer);
    globalTimer = setTimeout(() => {
      console.log('  ~', pendingFile);
      sendReload(pendingFile);
      pendingFile = '';
    }, 400);
  });
} catch (e) { console.warn('watch error:', e.message); }

http.createServer((req, res) => {
  if (req.url === '/__reload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });
    // ping inicial sem evento reload — so confirma conexao
    res.write(': connected\n\n');
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
    if (ext === '.html') {
      const html = data.toString('utf8').replace('</body>', RELOAD_SCRIPT + '</body>');
      res.writeHead(200, { 'Content-Type': ct, 'Cache-Control': 'no-cache' });
      res.end(html);
    } else {
      res.writeHead(200, { 'Content-Type': ct, 'Cache-Control': 'no-cache' });
      res.end(data);
    }
  });

}).listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:' + PORT);
  console.log('Hot-reload ativo (debounce 400ms, sem piscar).');
});

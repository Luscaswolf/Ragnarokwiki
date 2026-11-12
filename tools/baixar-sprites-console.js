// COLE NO CONSOLE (F12) com a wiki aberta: https://roclassicidle.com.br/wiki/
// Baixa todas as sprites (itens, monstros, skills, classes, mapas) num arquivo ro-wiki-sprites.json
;(async function () {
  var paths = Object.keys((window.WIKI_GAME && WIKI_GAME.assets) || {});
  var por = (window.WIKI_CLASS_AVAILABILITY && WIKI_CLASS_AVAILABILITY.portraits) || {};
  Object.keys(por).forEach(function (k) { if (paths.indexOf(por[k]) < 0) paths.push(por[k]); });
  var out = {}, done = 0, fail = [];
  function viaImg(url) {
    return new Promise(function (ok, no) {
      var im = new Image(); im.onload = function () {
        try { var c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight; c.getContext('2d').drawImage(im, 0, 0); ok(c.toDataURL('image/png')); } catch (e) { no(e); }
      }; im.onerror = no; im.src = url;
    });
  }
  function toData(blob) { return new Promise(function (ok) { var r = new FileReader(); r.onload = function () { ok(r.result); }; r.readAsDataURL(blob); }); }
  async function one(p) {
    var url = new URL(p, location.origin + '/wiki/').href;
    try {
      var r = await fetch(url, { credentials: 'include' });
      var ct = r.headers.get('content-type') || '';
      if (r.ok && ct.indexOf('image') === 0) { out[p] = await toData(await r.blob()); return; }
      out[p] = await viaImg(url);
    } catch (e) { try { out[p] = await viaImg(url); } catch (e2) { fail.push(p); } }
  }
  var i = 0;
  async function worker() { while (i < paths.length) { var p = paths[i++]; await one(p); done++; if (done % 200 === 0) console.log('sprites: ' + done + '/' + paths.length); } }
  await Promise.all(Array.from({ length: 10 }, worker));
  var blob = new Blob([JSON.stringify(out)], { type: 'application/json' });
  var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'ro-wiki-sprites.json';
  document.body.appendChild(a); a.click(); a.remove();
  console.log('PRONTO: ' + Object.keys(out).length + ' sprites (' + (blob.size / 1048576).toFixed(1) + ' MB). Falharam: ' + fail.length);
})();

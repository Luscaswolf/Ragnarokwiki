"""Extrai ro-wiki-sprites.json (Desktop, Downloads ou data/) para app/img/."""
import base64, json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
home = os.path.expanduser('~')
cands = [os.path.join(ROOT, 'data', 'ro-wiki-sprites.json'), os.path.join(home, 'Desktop', 'ro-wiki-sprites.json'),
         os.path.join(home, 'Downloads', 'ro-wiki-sprites.json')]
src = next((c for c in cands if os.path.exists(c)), None)
if not src:
    sys.exit('ro-wiki-sprites.json não encontrado em: ' + ', '.join(cands))
data = json.load(open(src, encoding='utf-8'))
out_root = os.path.realpath(os.path.join(ROOT, 'app', 'img'))
n = 0
for path, uri in data.items():
    rel = path[len('assets/'):] if path.startswith('assets/') else path
    dest = os.path.realpath(os.path.join(out_root, rel))
    if not dest.startswith(out_root + os.sep) or ',' not in uri:
        continue  # ignora caminhos estranhos
    header, b64 = uri.split(',', 1)
    if 'base64' not in header:
        continue
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    # canvas pode ter convertido para PNG: mantém o nome original (o navegador detecta pelo conteúdo)
    with open(dest, 'wb') as f:
        f.write(base64.b64decode(b64))
    n += 1
print(f'{n} sprites extraídas de {src} para {out_root}')

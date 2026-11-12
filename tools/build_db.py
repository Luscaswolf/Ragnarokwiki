"""Compacta o dump da wiki (data/ro-wiki-dump.json) em app/db.js para a página."""
import json, re, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
d = json.load(open(os.path.join(ROOT, 'data', 'ro-wiki-dump.json'), encoding='utf-8'))
E = d['WIKI_GAME']['entities']

def fact(e, k):
    for f in e.get('facts') or []:
        if isinstance(f, list) and f and f[0] == k:
            return f[1]
    return None

def num(v):
    if v is None: return None
    s = re.sub(r'[^\d]', '', str(v))
    return int(s) if s else None

def desc(e):
    for s in e.get('sections') or []:
        if s.get('title', '').startswith('Descrição'):
            t = s.get('text', '')
            t = re.sub(r'\n?Os números da ficha.*$', '', t, flags=re.S)
            t = re.sub(r'\n?É o texto que o jogo mostra.*$', '', t, flags=re.S)
            return t.strip()
    return (e.get('summary') or '').strip()

def idnum(ref):
    m = re.search(r'-(\d+)$', ref or '')
    return int(m.group(1)) if m else None

STATUS = {'Funciona em combate': 'ok', 'Sem efeito em combate': 'fora', 'Ainda não funciona': 'nao'}
EFEITO = {'Funciona': 'ok', 'Sem efeito especial': 'ok', 'Depende do refino': 'ok', 'Depende da arma': 'ok',
          'Ainda não funciona': 'nao', 'Não equipável': 'nao'}

maps, mons, items, skills, classes, shops = {}, {}, {}, {}, {}, []

for e in E:
    t = e['type']
    if t == 'maps':
        c = e.get('catalog') or {}
        maps[c.get('map') or e['id'][4:]] = {'n': e['title'], 'lv': num(fact(e, 'Nível que libera o mapa')),
                                             'faixa': fact(e, 'Níveis dos monstros comuns'), 'tipo': fact(e, 'Tipo')}
    elif t == 'monsters':
        c = e['catalog']
        mons[c.get('id') or idnum(e['id'])] = {
            'n': e['title'], 'lv': c['level'], 'hp': c['hp'], 'race': c['race'], 'size': c['size'],
            'el': c['element'], 'ell': c.get('elementLevel'), 'exp': c['baseExp'], 'jexp': c['jobExp'],
            'boss': bool(c.get('boss')), 'mvp': fact(e, 'MVP') == 'Sim', 'maps': c.get('maps') or [],
            'def': num(fact(e, 'DEF')), 'mdef': num(fact(e, 'MDEF')),
            'd': [[x['itemId'], x.get('chance')] for x in c.get('drops') or []],
        }
    elif t == 'items':
        c = e['catalog']
        items[c['id']] = {
            'n': e['title'], 't': c['type'], 'wt': c.get('weaponType'), 'sl': c.get('slots') or 0,
            'atk': c.get('attack') or 0, 'def': c.get('defense') or 0, 'w': c.get('weight'),
            'lv': c.get('equipLevelMin') or 0, 'loc': c.get('locations') or [], 'jobs': c.get('jobs') or [],
            'wl': c.get('weaponLevel') or 0, 'buy': num(fact(e, 'Menor preço na vitrine (Zeny)')),
            'sell': num(fact(e, 'Venda ao NPC (Zeny)')),
            'ef': EFEITO.get(fact(e, 'Efeito do item'), 'ok'), 'ds': desc(e)[:600],
        }
    elif t == 'skills':
        c = e['catalog']
        skills[c['id']] = {'n': e['title'], 'code': c['nome'], 'max': c['nivelMaximo'],
                           'st': STATUS.get(e['status'], e['status']),
                           'cls': (e.get('filters') or {}).get('classe', ''), 'ds': desc(e)[:900]}
    elif t == 'classes':
        tree = []
        for tb in e.get('tables') or []:
            if tb['title'] == 'Árvore de habilidades':
                for r in tb['rows']:
                    tree.append([idnum(r[0]['id']) if isinstance(r[0], dict) else None, r[1], r[2]])
        classes[idnum(e['id'])] = {'n': e['title'], 'st': e.get('status'), 'tree': tree,
                                   'carga': fact(e, 'Capacidade de carga com STR 1')}
    elif t == 'economy':
        for tb in e.get('tables') or []:
            if tb['title'] == 'Estoque':
                rows = []
                for r in tb['rows']:
                    rid = r[0].get('id') if isinstance(r[0], dict) else None
                    rows.append([idnum(rid), r[0].get('text') if isinstance(r[0], dict) else r[0], r[1]])
                shops.append({'n': e['title'], 'rows': rows})

# fontes de cada item: monstros que dropam + lojas
src = {}
for mid, m in mons.items():
    for iid, ch in m['d']:
        src.setdefault(iid, {'m': [], 's': []})['m'].append([mid, ch])
name2id = {}
for iid, it in items.items():
    name2id.setdefault(it['n'], iid)
for sh in shops:
    for iid, nm, price in sh['rows']:
        iid = iid or name2id.get(nm)
        if iid in items:
            src.setdefault(iid, {'m': [], 's': []})['s'].append([sh['n'], price])
for iid, s in src.items():
    if iid in items:
        s['m'].sort(key=lambda x: -(x[1] or 0))
        items[iid]['src'] = s

# sprites: caminhos que existem na wiki (baixados para app/img/ pelo script do console)
A = set(d['WIKI_GAME'].get('assets', {}).keys())
for iid, it in items.items():
    if f'assets/project/items/{iid}.png' in A: it['img'] = 1
for mid, m in mons.items():
    if f'assets/project/monsters/{mid}.png' in A: m['img'] = 1
for sid, s in skills.items():
    if f'assets/project/skills/{s["code"]}.png' in A: s['img'] = 1
for k, m in maps.items():
    if f'assets/project/maps/{k}.webp' in A: m['img'] = 1
portraits = d['WIKI_CLASS_AVAILABILITY'].get('portraits', {})

L = d['WIKI_LEVELING']
db = {'meta': {'geradoEm': d['WIKI_GAME'].get('generatedAt'), 'fonte': 'roclassicidle.com.br/wiki'},
      'maps': maps, 'mons': mons, 'items': items, 'skills': skills, 'classes': classes,
      'routes': L['routes'], 'playable': d['WIKI_CLASS_AVAILABILITY']['playable'], 'portraits': portraits,
      'jobs': {k: {'master': v.get('master'), 'proof': v.get('proof')} for k, v in L['jobs'].items()},
      'pontosPorNivel': next(c for c in d['WIKI_GAME']['tools']['curves'] if c['classe'] == 'Novice')['pontosPorNivel'][:100]}
os.makedirs(os.path.join(ROOT, 'app'), exist_ok=True)
out = os.path.join(ROOT, 'app', 'db.js')
with open(out, 'w', encoding='utf-8') as f:
    f.write('window.DB=' + json.dumps(db, ensure_ascii=False, separators=(',', ':')) + ';')
print('ok', out, os.path.getsize(out) // 1024, 'KB', len(items), 'itens', len(mons), 'monstros', len(skills), 'skills')

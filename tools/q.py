import json,sys
db=json.loads(open('app/db.js',encoding='utf-8').read()[10:-1])
I=db['items'];M=db['mons']
def top(it,n=2):
    out=[]
    for m in it.get('src',{}).get('m',[])[:n]:
        mm=M.get(str(m[0]))
        if mm: out.append(f"{mm['n']} lv{mm['lv']}{' MVP' if mm['mvp'] else ''}{' '+str(m[1]/100)+'%' if m[1] else ''}")
    for s in it.get('src',{}).get('s',[])[:1]: out.append('LOJA '+s[0]+' '+str(s[1]))
    return '; '.join(out) or 'SEM FONTE'

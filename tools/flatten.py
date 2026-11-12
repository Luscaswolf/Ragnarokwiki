import json,sys
def flat(o,ind=0):
    out=[]
    p='  '*ind
    if isinstance(o,dict):
        for k,v in o.items():
            if k in('image','art','spriteUrl','icon','weight','filters') : continue
            if isinstance(v,(dict,list)):
                s=flat(v,ind+1)
                if s.strip(): out.append(p+str(k)+':'); out.append(s)
            elif v not in (None,'',[]): out.append(p+f'{k}: {v}')
    elif isinstance(o,list):
        for v in o:
            if isinstance(v,(dict,list)): out.append(p+'-'); out.append(flat(v,ind+1))
            else: out.append(p+'- '+str(v))
    else: out.append(p+str(o))
    return '\n'.join(x for x in out if x)
if __name__=='__main__':
    d=json.load(open(sys.argv[1],encoding='utf-8'))
    E=d['WIKI_GAME']['entities']
    types=sys.argv[2].split(',')
    for e in E:
        if e['type'] in types and 'taming' not in e['title']:
            print('\n########',e['type'],'|',e['title']); print(flat(e))

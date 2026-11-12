// node tools/ordem.js -> confere se a ORDEM das skills (o passo a passo do Job) respeita os pré-requisitos
const fs=require('fs'),vm=require('vm');const c={window:{}};vm.createContext(c);
for(const f of ['app/db.js','app/calc.js','app/builds.js','app/builds2.js','app/builds3.js','app/builds4.js','app/builds5.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const W=c.window,D=W.DB,CID={};D.playable.forEach(p=>CID[p.nome]=p.id);
let bad=0;
for(const b of W.BUILDS){const fin=D.classes[CID[b.classe]],n2c={},req={};
  for(const[sid,,pre]of fin.tree){const s=D.skills[sid];if(s){n2c[s.n]=s.code;req[s.code]=pre}}
  const have={},p=[];
  for(const[code,lv]of b.skills){const r=req[code]||'';
    if(!/Nenhum/.test(r))for(const part of r.split(/,\s*/)){const m=part.match(/^(.*)\s(\d+)$/);if(!m)continue;const rc=n2c[m[1].trim()];if(rc&&(have[rc]||0)<+m[2])p.push(`${code} vem antes de ${rc} ${m[2]}`)}
    have[code]=(have[code]||0)+lv}
  if(p.length){bad++;console.log(b.id);p.forEach(x=>console.log('   !',x))}}
console.log(bad?bad+' builds com ordem errada':'ordem das skills OK');

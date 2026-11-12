// node tools/prereq.js -> confere pré-requisitos e orçamento de pontos de cada build
const fs=require('fs'),vm=require('vm');const c={window:{}};vm.createContext(c);
for(const f of ['app/db.js','app/calc.js','app/builds.js','app/builds2.js','app/builds3.js','app/builds4.js','app/builds5.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const W=c.window,D=W.DB,CID={};D.playable.forEach(p=>CID[p.nome]=p.id);
const S={};for(const[id,s]of Object.entries(D.skills))S[s.code]={...s,id:+id};
let bad=0;
for(const b of W.BUILDS){
  const fin=D.classes[CID[b.classe]];if(!fin){console.log('?',b.id);continue}
  const name2code={},req={};
  for(const [sid,max,pre] of fin.tree){const s=D.skills[sid];if(!s)continue;name2code[s.n]=s.code;req[s.code]=pre}
  const have={};for(const[code,lv]of b.skills)have[code]=(have[code]||0)+lv;
  const probs=[];
  for(const[code,lv]of b.skills){
    if(lv<=0)continue;const p=req[code];if(!p){if(!code.startsWith('NV_'))probs.push(code+' fora da árvore de '+fin.n);continue}
    if(/Nenhum/.test(p))continue;
    for(const part of p.split(/,\s*/)){const m=part.match(/^(.*)\s(\d+)$/);if(!m)continue;const rc=name2code[m[1].trim()];
      if(!rc){probs.push(code+': requisito desconhecido '+part);continue}
      if((have[rc]||0)<+m[2])probs.push(`${S[code].n} precisa de ${m[1]} ${m[2]} (build tem ${have[rc]||0})`)}
  }
  // orçamento por tier
  const t=b.caminho,u=t.map(()=>0);
  for(const[code,lv]of b.skills){let ti=t.length-1;if(code.startsWith('NV_'))ti=0;else for(let i=1;i<t.length;i++){const cl=D.classes[CID[t[i]]];if(cl&&cl.tree.some(x=>x[0]===S[code].id)){ti=i;break}}u[ti]+=lv}
  t.forEach((cl,i)=>{const lim=i===0?9:((W.JOBMAX||{})[cl]||50)-1;if(u[i]>lim)probs.push(`${cl}: ${u[i]} pontos > ${lim}`)});
  if(probs.length){bad++;console.log(b.id);probs.forEach(x=>console.log('   !',x))}
}
console.log(bad?bad+' builds com problema':'pré-requisitos e pontos OK');

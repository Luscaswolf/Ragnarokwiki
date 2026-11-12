// node tools/stats_check.js -> confere as fases de atributos com a tabela REAL do servidor (pontosPorNivel)
const fs=require('fs'),vm=require('vm');const c={window:{}};vm.createContext(c);
for(const f of ['app/db.js','app/calc.js','app/builds.js','app/builds2.js','app/builds3.js','app/builds4.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const W=c.window,CALC=W.CALC,K=['str','agi','vit','int','dex','luk'];
const dump=JSON.parse(fs.readFileSync('data/ro-wiki-dump.json','utf8'));
const tab=dump.WIKI_GAME.tools.curves.find(x=>x.classe==='Novice').pontosPorNivel;
const real=L=>tab.slice(1,L+1).reduce((a,b)=>a+b,0);
let bad=0;
for(const b of W.BUILDS){const p=[];let prev={str:1,agi:1,vit:1,int:1,dex:1,luk:1};
 b.fases.forEach(f=>{const L=CALC.faseNivel(f.nv);
  for(const k of K){const v=f.stats[k]||1;if(v<(prev[k]||1))p.push(`${f.nv}: ${k.toUpperCase()} cai de ${prev[k]} para ${v} (não dá para tirar ponto)`)}
  const u=CALC.custo(f.stats);if(u>real(L))p.push(`${f.nv}: usa ${u} > ${real(L)} pontos reais`);
  prev={...prev,...f.stats};});
 const sim=CALC.simular(b.fases);
 b.fases.forEach(f=>{const L=CALC.faseNivel(f.nv),r=sim.find(x=>x.L===L);if(!r){p.push('sem checkpoint no nível '+L);return}
  for(const k of K)if(r.st[k]<(f.stats[k]||1))p.push(`fim da fase ${f.nv}: simulação tem ${k.toUpperCase()} ${r.st[k]}, abaixo do alvo ${f.stats[k]||1}`);
  if(r.livre<0)p.push('pontos negativos no nível '+L);});
 for(const r of sim)if(r.livre<0)p.push('pontos negativos no nível '+r.L);const last=sim[sim.length-1],alvo=b.fases[b.fases.length-1].stats;
 for(const k of K)if(last.st[k]!==(alvo[k]||1))p.push(`simulação termina com ${k.toUpperCase()} ${last.st[k]} (alvo ${alvo[k]||1})`);
 if(p.length){bad++;console.log(b.id);p.forEach(x=>console.log('   !',x))}}
console.log(bad?bad+' builds com problema':'atributos OK em todas as builds');

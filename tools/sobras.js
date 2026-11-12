// node tools/sobras.js -> mostra pontos de atributo e de skill que sobram em cada build (meta: 0 no fim de cada fase/classe)
const fs=require('fs'),vm=require('vm');const c={window:{}};vm.createContext(c);
for(const f of ['app/db.js','app/calc.js','app/builds.js','app/builds2.js','app/builds3.js','app/builds4.js','app/builds5.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const W=c.window,D=W.DB,CALC=W.CALC,CID={};D.playable.forEach(p=>CID[p.nome]=p.id);
const S={};for(const[id,s]of Object.entries(D.skills))S[s.code]={...s,id:+id};
const dump=JSON.parse(fs.readFileSync('data/ro-wiki-dump.json','utf8'));
const tab=dump.WIKI_GAME.tools.curves.find(x=>x.classe==='Novice').pontosPorNivel;
const real=L=>tab.slice(1,L+1).reduce((a,b)=>a+b,0);
let tot=0;
for(const b of W.BUILDS){
  const st=b.fases.map(f=>{const L=CALC.faseNivel(f.nv);return `${L}:${real(L)-CALC.custo(f.stats)}`}).join(' ');
  const t=b.caminho,u=t.map(()=>0);
  for(const[code,lv]of b.skills){let ti=t.length-1;if(code.startsWith('NV_'))ti=0;else for(let i=1;i<t.length;i++){const cl=D.classes[CID[t[i]]];if(cl&&cl.tree.some(x=>x[0]===S[code].id)){ti=i;break}}u[ti]+=lv}
  const sk=t.map((cl,i)=>{const lim=i===0?9:((W.JOBMAX||{})[cl]||50)-1;return `${cl}:${lim-u[i]}`}).join(' ');
  console.log(b.id.padEnd(28),'| attr sobra',st.padEnd(28),'| skill sobra',sk);
}

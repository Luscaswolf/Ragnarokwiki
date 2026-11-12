// node tools/validate.js  -> confere builds.js contra db.js
const fs=require('fs'),vm=require('vm');const ctx={window:{}};vm.createContext(ctx);
for(const f of ['app/db.js','app/builds.js','app/builds2.js','app/builds3.js','app/builds4.js','app/calc.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx);
const {DB,BUILDS,CALC}=ctx.window;const code2={};for(const[id,s]of Object.entries(DB.skills))code2[s.code]=s;
let probs=0;const p=m=>{probs++;console.log('  !',m)};
for(const b of BUILDS){console.log(b.id);
 for(const[c,lv]of b.skills){const s=code2[c];if(!s){p('skill inexistente '+c);continue}
  if(s.st!=='ok'&&!/Requisito|requisito|confirme|BASIC/.test(JSON.stringify(b.skills.find(x=>x[0]===c)))&&c!=='NV_BASIC')p(`skill ${c} (${s.n}) selo=${s.st}`);
  if(lv>s.max)p(`${c} nível ${lv} > max ${s.max}`)}
 for(const e of b.equip)for(const i of e.itens)if(!DB.items[i])p('item inexistente '+i);
 for(const[i]of b.cartas)if(!DB.items[i])p('carta inexistente '+i);
 for(const f of b.fases){const lv=CALC.faseNivel(f.nv);const used=CALC.custo(f.stats),have=CALC.pontos(lv);
  if(used>have)p(`fase ${f.nv}: usa ${used} > ${have} pontos do nv ${lv}`);else console.log(`   fase ${f.nv}: ${used}/${have}`)}
}
console.log(probs?probs+' problemas':'OK');

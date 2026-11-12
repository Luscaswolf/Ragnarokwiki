/* Correções de skills: pré-requisitos reais da árvore do servidor + limite de pontos por Job. */
(() => {
  const B = id => window.BUILDS.find(b => b.id === id);
  const set = (id, l) => { B(id).skills = l; };
  const add = (id, before, row) => { const s = B(id).skills, i = s.findIndex(x => x[0] === before); s.splice(i < 0 ? s.length : i, 0, row); };
  const lv = (id, code, n, why) => { const r = B(id).skills.find(x => x[0] === code); if (r) { r[1] = n; if (why) r[2] = why; } };
  const del = (id, code) => { const s = B(id).skills; const i = s.findIndex(x => x[0] === code); if (i >= 0) s.splice(i, 1); };
  const move = (id, code, before) => { const s = B(id).skills, i = s.findIndex(x => x[0] === code); if (i < 0) return; const [r] = s.splice(i, 1); s.splice(s.findIndex(x => x[0] === before), 0, r); };
  const R = 'Requisito.';

  set('bruxo-aoe', [['NV_BASIC', 9, ''], ['MG_COLDBOLT', 10, 'Dano contra fogo; requisito de Rajada Congelante.'], ['MG_FIREBOLT', 10, 'Dano contra terra e mortos-vivos.'], ['MG_LIGHTNINGBOLT', 10, 'Dano contra água.'],
    ['MG_FROSTDIVER', 1, 'Requisito de Nevasca.'], ['MG_NAPALMBEAT', 4, 'Requisito de Trovão de Júpiter.'], ['MG_THUNDERSTORM', 1, 'Requisito de Meteoros e Ira de Thor.'], ['MG_SIGHT', 1, 'Requisito de Supernova.'], ['MG_STONECURSE', 1, 'Requisito de Coluna de Pedra.'],
    ['MG_SRECOVERY', 10, 'Regeneração de SP: sustenta o idle.'], ['MG_ENERGYCOAT', 1, 'Reduz dano gastando SP.'],
    ['WZ_JUPITEL', 7, 'Alvo único forte; requisito de Nevasca e Ira de Thor.'], ['WZ_STORMGUST', 10, 'A principal: área + congelamento.'], ['WZ_SIGHTRASHER', 2, 'Requisito de Meteoros.'], ['WZ_METEOR', 10, 'Área de fogo.'], ['WZ_VERMILION', 10, 'Área de vento.'],
    ['WZ_EARTHSPIKE', 3, R], ['WZ_HEAVENDRIVE', 1, R], ['WZ_QUAGMIRE', 5, 'Deixa os monstros lentos.'], ['WZ_SIGHTBLASTER', 1, 'Empurra quem encosta.']]);
  set('bruxo-jupitel', [['NV_BASIC', 9, ''], ['MG_COLDBOLT', 10, ''], ['MG_FIREBOLT', 10, ''], ['MG_LIGHTNINGBOLT', 10, ''], ['MG_NAPALMBEAT', 4, R], ['MG_SOULSTRIKE', 4, 'Contra fantasmas.'], ['MG_STONECURSE', 1, R], ['MG_SRECOVERY', 10, 'Regeneração de SP.'],
    ['WZ_JUPITEL', 10, 'A skill da build.'], ['WZ_EARTHSPIKE', 3, R], ['WZ_HEAVENDRIVE', 1, R], ['WZ_QUAGMIRE', 5, 'Deixa os monstros lentos.'], ['WZ_WATERBALL', 5, 'Forte perto de água.'], ['WZ_SIGHTBLASTER', 1, '']]);
  set('sabio-bolt', [['NV_BASIC', 9, ''], ['MG_COLDBOLT', 10, ''], ['MG_FIREBOLT', 10, ''], ['MG_LIGHTNINGBOLT', 10, ''], ['MG_NAPALMBEAT', 4, R], ['MG_SOULSTRIKE', 4, ''], ['MG_STONECURSE', 1, R], ['MG_SRECOVERY', 10, ''],
    ['SA_ADVANCEDBOOK', 10, 'Velocidade e ATK com livro.'], ['SA_CASTCANCEL', 1, 'Requisito de Conjuração Livre (sem efeito em combate).'], ['SA_FREECAST', 10, 'Anda enquanto conjura.'], ['SA_SEISMICWEAPON', 1, 'Requisito de Coluna de Pedra.'],
    ['WZ_EARTHSPIKE', 5, ''], ['WZ_HEAVENDRIVE', 5, 'Área de terra.'], ['SA_DRAGONOLOGY', 5, 'INT +1 e dano contra dragões.'], ['SA_FLAMELAUNCHER', 1, 'Encanta a arma do grupo.']]);
  set('sabio-suporte', [['NV_BASIC', 9, ''], ['MG_COLDBOLT', 5, ''], ['MG_FIREBOLT', 5, ''], ['MG_LIGHTNINGBOLT', 5, ''], ['MG_NAPALMBEAT', 4, ''], ['MG_SOULSTRIKE', 5, ''], ['MG_STONECURSE', 1, R], ['MG_SRECOVERY', 10, ''],
    ['SA_ADVANCEDBOOK', 5, R], ['SA_FLAMELAUNCHER', 2, ''], ['SA_FROSTWEAPON', 2, ''], ['SA_LIGHTNINGLOADER', 2, ''], ['SA_SEISMICWEAPON', 2, ''], ['SA_VOLCANO', 5, ''], ['SA_DELUGE', 5, ''], ['SA_VIOLENTGALE', 5, ''],
    ['SA_LANDPROTECTOR', 5, 'Anula terrenos inimigos.'], ['SA_MAGICROD', 1, R], ['SA_SPELLBREAKER', 3, R], ['SA_DISPELL', 5, 'Tira buffs do alvo.']]);
  set('superaprendiz-mago', [['NV_BASIC', 9, ''], ['MG_SRECOVERY', 10, ''], ['MG_FIREBOLT', 10, ''], ['MG_COLDBOLT', 10, ''], ['MG_LIGHTNINGBOLT', 10, ''], ['MG_NAPALMBEAT', 4, R], ['MG_SOULSTRIKE', 10, ''], ['MG_FROSTDIVER', 5, '']]);

  lv('bardo-suporte', 'BA_DISSONANCE', 3, 'Requisito das músicas.'); move('bardo-suporte', 'BA_DISSONANCE', 'BA_ASSASSINCROSS'); move('bardo-suporte', 'BA_WHISTLE', 'BA_ASSASSINCROSS');
  add('odalisca-suporte', 'DC_SERVICEFORYOU', ['DC_UGLYDANCE', 3, 'Requisito das danças.']); move('odalisca-suporte', 'DC_HUMMING', 'DC_SERVICEFORYOU');

  set('sacerdote-suporte', [['NV_BASIC', 9, ''], ['AL_HEAL', 10, ''], ['AL_DP', 10, ''], ['AL_BLESSING', 10, ''], ['AL_INCAGI', 10, ''], ['AL_ANGELUS', 2, 'Requisito de Kyrie.'], ['AL_CURE', 1, ''], ['AL_HOLYWATER', 1, 'Requisito de Aspersio.'],
    ['PR_KYRIE', 10, 'Escudo que absorve golpes.'], ['PR_MAGNIFICAT', 5, 'Dobra a regeneração de SP.'], ['PR_GLORIA', 5, 'SOR +30.'], ['PR_IMPOSITIO', 5, '+ATK do grupo.'], ['PR_SUFFRAGIUM', 3, 'Conjuração mais rápida.'], ['PR_SANCTUARY', 10, 'Cura em área.'],
    ['PR_LEXDIVINA', 5, 'Requisito de Lex Aeterna.'], ['PR_LEXAETERNA', 1, 'Dobra o próximo dano.'], ['PR_ASPERSIO', 5, 'Arma sagrada.']]);
  set('sacerdote-tu', [['NV_BASIC', 9, ''], ['AL_HEAL', 10, ''], ['AL_DP', 10, ''], ['AL_BLESSING', 10, ''], ['AL_DEMONBANE', 10, 'Dano contra mortos-vivos e demônios.'], ['AL_ANGELUS', 2, R], ['AL_INCAGI', 1, ''], ['AL_HOLYLIGHT', 1, 'Missão (base 31, job 30).'],
    ['PR_LEXDIVINA', 5, 'Requisito de Esconjurar e Lex Aeterna.'], ['ALL_RESURRECTION', 1, 'Requisito de Esconjurar (sem efeito em combate).'], ['PR_TURNUNDEAD', 10, 'Mata morto-vivo na hora (chance).'], ['MG_SAFETYWALL', 1, 'Requisito de Magnus.'], ['PR_MAGNUS', 10, 'Área sagrada.'],
    ['PR_LEXAETERNA', 1, ''], ['PR_KYRIE', 5, ''], ['PR_MAGNIFICAT', 5, 'SP.']]);
  set('sacerdote-batalha', [['NV_BASIC', 9, ''], ['AL_DP', 10, ''], ['AL_DEMONBANE', 10, ''], ['AL_HEAL', 4, ''], ['AL_INCAGI', 10, ''], ['AL_BLESSING', 10, ''], ['AL_ANGELUS', 2, R],
    ['PR_MACEMASTERY', 10, '+ATK com maça.'], ['PR_IMPOSITIO', 5, '+ATK.'], ['PR_MAGNIFICAT', 3, 'Requisito de Glória.'], ['PR_GLORIA', 5, ''], ['PR_KYRIE', 5, '']]);

  set('monge-combo', [['NV_BASIC', 9, ''], ['AL_DP', 10, 'Requisito de Punhos de Ferro.'], ['AL_DEMONBANE', 10, 'Requisito de Punhos de Ferro.'], ['AL_HEAL', 3, ''], ['AL_INCAGI', 10, ''], ['AL_BLESSING', 10, ''],
    ['MO_IRONHAND', 10, '+ATK.'], ['MO_CALLSPIRITS', 5, 'Esferas.'], ['MO_DODGE', 5, 'Requisito do Combo Triplo.'], ['MO_TRIPLEATTACK', 10, 'Dispara sozinho nos ataques normais.'], ['MO_INVESTIGATE', 5, 'Forte contra defesa alta.'], ['MO_CHAINCOMBO', 5, ''], ['MO_COMBOFINISH', 3, '']]);
  set('taekwon-chutes', [['NV_BASIC', 9, ''], ['TK_STORMKICK', 7, ''], ['TK_READYSTORM', 1, 'Postura: chute automático.'], ['TK_TURNKICK', 7, ''], ['TK_READYTURN', 1, ''], ['TK_DOWNKICK', 7, ''], ['TK_READYDOWN', 1, ''],
    ['TK_JUMPKICK', 7, ''], ['TK_HPTIME', 5, 'Recupera HP.'], ['TK_SPTIME', 5, 'Recupera SP.'], ['TK_RUN', 5, '']]);

  lv('ferreiro-zeny', 'MC_INCCARRY', 5, 'Requisito de Usar Carrinho (e mais carga).'); lv('ferreiro-zeny', 'BS_HAMMERFALL', 2, 'Requisito de Adrenalina Pura.'); lv('ferreiro-carrinho', 'BS_HAMMERFALL', 2, 'Requisito de Adrenalina Pura.');
  lv('alquimista-acido', 'MC_INCCARRY', 5, R); add('alquimista-acido', 'AM_REST', ['AM_BIOETHICS', 1, 'Requisito do Homunculus.']);
  lv('alquimista-potter', 'MC_INCCARRY', 5, R);
  lv('assassino-katar', 'TF_STEAL', 5, 'Requisito de Esconderijo.'); lv('assassino-katar', 'TF_HIDING', 2, 'Requisito de Furtividade.');
  del('arruaceiro-farm', 'RG_RAID');
  del('justiceiro-rifle', 'GS_ADJUSTMENT');
  add('ninja-magico', 'NJ_BAKUENRYU', ['NJ_KAENSIN', 7, 'Requisito de Dragão Explosivo.']); add('ninja-magico', 'NJ_UTSUSEMI', ['NJ_SHADOWJUMP', 5, R]);
  add('ninja-arremesso', 'NJ_UTSUSEMI', ['NJ_SHADOWJUMP', 5, R]);
  del('templario-gc', 'CR_REFLECTSHIELD');
  add('cacador-armadilha', 'HT_BLASTMINE', ['HT_SANDMAN', 1, R]); add('cacador-armadilha', 'HT_FREEZINGTRAP', ['HT_FLASHER', 1, R]);
  add('justiceiro-pistola', 'GS_CHAINACTION', ['GS_SINGLEACTION', 1, R]);

  add('odalisca-suporte', 'DC_UGLYDANCE', ['BD_ADAPTATION', 1, R]);
  add('sacerdote-suporte', 'PR_KYRIE', ['AL_RUWACH', 1, 'Requisito de Lex Divina (sem efeito em combate).']);
  set('sacerdote-tu', [['NV_BASIC', 9, ''], ['AL_HEAL', 10, ''], ['AL_DP', 10, ''], ['AL_BLESSING', 10, ''], ['AL_DEMONBANE', 10, 'Dano contra mortos-vivos e demônios.'], ['AL_INCAGI', 1, ''], ['AL_HOLYLIGHT', 1, 'Missão (base 31, job 30).'], ['AL_RUWACH', 1, 'Requisito de Lex Divina.'], ['AL_HOLYWATER', 1, 'Requisito de Aspersio.'],
    ['PR_LEXDIVINA', 5, 'Requisito de Esconjurar e Lex Aeterna.'], ['PR_STRECOVERY', 1, R], ['MG_SRECOVERY', 4, 'Requisito de Ressuscitar (e mais SP).'], ['ALL_RESURRECTION', 1, 'Requisito de Esconjurar (sem efeito em combate).'],
    ['PR_TURNUNDEAD', 10, 'Mata morto-vivo na hora (chance).'], ['PR_IMPOSITIO', 3, R], ['PR_ASPERSIO', 4, 'Requisito de Escudo Mágico.'], ['PR_SANCTUARY', 3, 'Requisito de Escudo Mágico.'], ['MG_SAFETYWALL', 1, 'Requisito de Magnus.'],
    ['PR_MAGNUS', 10, 'Área sagrada.'], ['PR_LEXAETERNA', 1, 'Dobra o próximo dano.']]);
  del('arruaceiro-farm', 'RG_INTIMIDATE'); del('arruaceiro-farm', 'RG_PLAGIARISM');
  add('ninja-magico', 'NJ_SHADOWJUMP', ['NJ_TATAMIGAESHI', 1, R]); add('ninja-arremesso', 'NJ_SHADOWJUMP', ['NJ_TATAMIGAESHI', 1, R]);
  B('arruaceiro-farm').porque[3] = 'Plágio exige Rapto 5, que exige Ataque Surpresa, que exige Túnel de Fuga (sem efeito em combate): caro demais, ficou de fora.';
})();

// Skill principal de cada build (mostrada no quadro lateral)
(() => {
  const M = {
    'cavaleiro-tyr': 'KN_BOWLINGBASH', 'templario-crux': 'CR_HOLYCROSS', 'bruxo-aoe': 'WZ_STORMGUST', 'sabio-bolt': 'WZ_HEAVENDRIVE', 'cacador-dex': 'AC_DOUBLE',
    'bardo-suporte': 'BA_MUSICALSTRIKE', 'odalisca-suporte': 'DC_THROWARROW', 'sacerdote-suporte': 'PR_KYRIE', 'sacerdote-tu': 'PR_TURNUNDEAD', 'monge-combo': 'MO_TRIPLEATTACK',
    'ferreiro-zeny': 'MC_OVERCHARGE', 'alquimista-acido': 'AM_ACIDTERROR', 'assassino-katar': 'AS_SONICBLOW', 'arruaceiro-farm': 'RG_SNATCHER', 'superaprendiz': 'TF_DOUBLE',
    'justiceiro-rifle': 'GS_TRACKING', 'ninja-magico': 'NJ_KOUENKA', 'taekwon-chutes': 'TK_STORMKICK', 'alquimista-homunculus': 'AM_CALLHOMUN', 'cavaleiro-agi': 'KN_TWOHANDQUICKEN',
    'cavaleiro-lanca': 'KN_PIERCE', 'templario-gc': 'CR_GRANDCROSS', 'templario-lanca': 'CR_SPEARQUICKEN', 'bruxo-jupitel': 'WZ_JUPITEL', 'sabio-suporte': 'SA_VOLCANO',
    'cacador-armadilha': 'HT_CLAYMORETRAP', 'cacador-falcao': 'HT_BLITZBEAT', 'assassino-critico': 'AS_KATAR', 'arruaceiro-arco': 'AC_DOUBLE', 'sacerdote-batalha': 'PR_MACEMASTERY',
    'ferreiro-carrinho': 'MC_CARTREVOLUTION', 'superaprendiz-mago': 'MG_FIREBOLT', 'ninja-arremesso': 'NJ_HUUMA', 'justiceiro-pistola': 'GS_DESPERADO', 'alquimista-potter': 'AM_PHARMACY',
  };
  for (const b of window.BUILDS) if (M[b.id]) b.principal = M[b.id];
})();

// Ajuste para o custo REAL de atributo do jogo (de 10→11 custa 3; levar a 99 custa 637, então não existe 99/99).
(() => {
  const F = (id, i, st) => { const b = window.BUILDS.find(x => x.id === id); Object.assign(b.fases[i].stats, st); };
  F('cavaleiro-tyr', 3, { vit: 43 });
  F('templario-crux', 2, { vit: 53 });
  for (const id of ['bruxo-aoe', 'sabio-bolt']) F(id, 1, { vit: 11 });
  F('bruxo-aoe', 3, { vit: 36 });
  F('sabio-bolt', 2, { vit: 41 });
  F('bruxo-jupitel', 0, { vit: 11 }); F('bruxo-jupitel', 1, { vit: 27 });
  F('cacador-dex', 3, { luk: 21 });
  F('arruaceiro-farm', 0, { agi: 44 });
  F('justiceiro-rifle', 0, { luk: 26 });
  F('assassino-critico', 0, { luk: 14 }); F('assassino-critico', 1, { luk: 54 });
  F('alquimista-potter', 1, { vit: 6 }); F('alquimista-potter', 2, { vit: 6, luk: 98 });
  const p = window.BUILDS.find(x => x.id === 'alquimista-potter');
  p.fases[2].porque = 'DEX 99 + LUK 98 ≈ +20% de chance. Não dá para ter as duas em 99: levar um atributo a 99 custa 637 pontos e o nível 99 dá 1.273.';
  p.porque[3] = 'DEX e LUK valem o mesmo (0,1% por ponto) e INT vale a metade. Por isso o Pure leva DEX a 99 e LUK a 98 (as duas em 99 custariam 1.274 pontos, 1 a mais do que o jogo dá).';
})();
window.REGRAS.splice(2, 0, { t: 'Custo dos atributos: a partir do 10 já custa 3', d: 'No jogo, cada ponto custa ⌊valor atual/10⌋+2: de 1 até 10 custa 2, a partir de 10 custa 3, a partir de 20 custa 4, e assim por diante (confirmado em jogo). Levar um atributo a 99 custa 637 pontos e o nível 99 dá 1.273, então nenhuma build tem dois atributos em 99.' });

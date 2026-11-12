/* Distribuição completa: todos os pontos de skill e de atributo usados, sem sobra.
   Referência de distribuição: guias clássicos pré-renovação (iRO Wiki Classic, Payon Stories / openpscalc),
   ajustados à tabela real de pontos deste servidor. Gerado/conferido com tools/sobras.js.
   Carregado por último: sobrescreve níveis de skill e atributos das builds anteriores. */
(() => {
  const B = id => window.BUILDS.find(b => b.id === id);
  // up = define o nível (cria a skill se ainda não existe); why opcional troca o comentário
  const up = (id, code, n, why) => { const s = B(id).skills, r = s.find(x => x[0] === code); if (r) { r[1] = n; if (why) r[2] = why; } else s.push([code, n, why || '']); };
  const del = (id, code) => { const s = B(id).skills, i = s.findIndex(x => x[0] === code); if (i >= 0) s.splice(i, 1); };
  const R = 'Requisito.';
  const SOBRA = 'Sem efeito em combate: recebe só os pontos que sobram depois de todas as skills úteis (confirme no jogo).';
  const many = (id, rows) => rows.forEach(r => up(id, ...r));

  // ---------- Espadachim / Cavaleiro / Templário ----------
  many('cavaleiro-tyr', [['SM_MAGNUM', 10, 'Área ao redor: limpa grupos.'], ['SM_AUTOBERSERK', 1, 'ATK maior com pouco HP.'], ['SM_FATALBLOW', 1, 'Golpe Fulminante pode atordoar.'],
    ['KN_CHARGEATK', 1, 'Avança até o alvo distante.'], ['KN_SPEARMASTERY', 10, 'Arma reserva: lança contra monstros grandes.'], ['KN_PIERCE', 10, 'Forte contra grandes (com lança).'], ['KN_SPEARSTAB', 3, 'Área com lança.']]);
  many('templario-crux', [['SM_MAGNUM', 10, 'Área ao redor.'], ['SM_AUTOBERSERK', 1, 'ATK maior com pouco HP.'], ['SM_FATALBLOW', 1, 'Golpe Fulminante pode atordoar.'], ['SM_ENDURE', 2, 'Não trava ao apanhar.']]);
  many('cavaleiro-agi', [['SM_MAGNUM', 10, 'Área ao redor.'], ['SM_AUTOBERSERK', 1, 'ATK maior com pouco HP.'], ['SM_FATALBLOW', 1, ''], ['SM_ENDURE', 6, 'Não trava ao apanhar.'],
    ['KN_SPEARMASTERY', 10, 'Arma reserva: lança contra grandes.'], ['KN_PIERCE', 10, 'Forte contra grandes (com lança).'], ['KN_SPEARSTAB', 10, 'Área com lança.'], ['KN_SPEARBOOMERANG', 3, 'Ataque à distância com lança.'], ['KN_CHARGEATK', 1, 'Avança até o alvo distante.']]);
  many('cavaleiro-lanca', [['SM_MAGNUM', 10, 'Área ao redor.'], ['SM_ENDURE', 10, 'Não trava ao apanhar.'], ['SM_AUTOBERSERK', 1, 'ATK maior com pouco HP.'], ['SM_FATALBLOW', 1, ''], ['SM_PROVOKE', 7, 'Reduz a DEF do alvo; requisito de Vigor.'],
    ['KN_SPEARSTAB', 10, 'Área com lança.'], ['KN_SPEARBOOMERANG', 5, 'Ataque à distância.'], ['KN_CHARGEATK', 1, 'Avança até o alvo distante.'],
    ['KN_RIDING', 1, 'Requisito de Brandir Lança (confirme no jogo se a montaria funciona aqui).'], ['KN_BRANDISHSPEAR', 10, 'Área em leque; no clássico exige estar montado (confirme no jogo).'], ['KN_CAVALIERMASTERY', 2, 'Velocidade de ataque montado (confirme no jogo).']]);
  many('templario-gc', [['SM_BASH', 10, 'Golpe forte de alvo único.'], ['SM_MAGNUM', 10, 'Área ao redor.'], ['SM_SWORD', 10, 'ATK com espada.'], ['SM_AUTOBERSERK', 1, ''], ['SM_FATALBLOW', 1, ''], ['SM_ENDURE', 2, 'Não trava ao apanhar.'],
    ['CR_HOLYCROSS', 10, 'Dano sagrado de alvo único.'], ['CR_SHIELDCHARGE', 5, 'Atordoa com o escudo.'], ['CR_SHIELDBOOMERANG', 3, 'Ataque à distância.'], ['CR_DEFENDER', 1, 'Reduz dano à distância.']]);
  many('templario-lanca', [['SM_BASH', 10, 'Golpe forte de alvo único.'], ['SM_MAGNUM', 10, 'Área ao redor.'], ['SM_ENDURE', 10, 'Não trava ao apanhar.'], ['SM_AUTOBERSERK', 1, ''], ['SM_FATALBLOW', 1, ''], ['SM_PROVOKE', 7, 'Requisito de Vigor.'],
    ['CR_AUTOGUARD', 10, 'Bloqueia até 30% dos golpes.'], ['CR_SHIELDCHARGE', 5, 'Atordoa com o escudo.'], ['CR_SHIELDBOOMERANG', 3, 'Ataque à distância.'], ['CR_SHRINK', 1, 'Empurra quem é bloqueado.']]);

  // ---------- Mago / Bruxo / Sábio ----------
  del('bruxo-jupitel', 'MG_SOULSTRIKE');
  many('bruxo-jupitel', [['MG_FROSTDIVER', 1, 'Requisito de Nevasca.'], ['MG_THUNDERSTORM', 1, 'Requisito de Ira de Thor.'], ['MG_SIGHT', 1, 'Revela escondidos.'], ['MG_ENERGYCOAT', 1, 'Reduz dano gastando SP.'],
    ['WZ_EARTHSPIKE', 5, 'Dano de terra.'], ['WZ_HEAVENDRIVE', 5, 'Área de terra.'], ['WZ_STORMGUST', 10, 'Área + congelamento para grupos.'], ['WZ_VERMILION', 8, 'Área de vento.']]);
  many('sabio-bolt', [['SA_FLAMELAUNCHER', 2, 'Requisito de Vulcão.'], ['SA_VOLCANO', 5, 'Terreno: mais dano de fogo e ATK.'], ['SA_FROSTWEAPON', 2, 'Requisito de Dilúvio.'], ['SA_DELUGE', 3, 'Terreno: mais dano de água e HP máximo.']]);
  many('sabio-suporte', [['MG_SOULSTRIKE', 10, 'Contra fantasmas.'], ['MG_ENERGYCOAT', 1, 'Reduz dano gastando SP.'], ['MG_NAPALMBEAT', 7, 'Requisito de Escudo Mágico.'], ['MG_SAFETYWALL', 5, 'Bloqueia golpes corpo a corpo no grupo.'],
    ['SA_FLAMELAUNCHER', 5, 'Encanto mais longo.'], ['SA_FROSTWEAPON', 5, 'Encanto mais longo.'], ['SA_MAGICROD', 2, 'Absorve magia.']]);
  many('superaprendiz-mago', [['AL_DP', 5, R], ['AL_BLESSING', 10, 'INT e DEX +10.'], ['MG_THUNDERSTORM', 10, 'Área de vento.'], ['MG_NAPALMBEAT', 10, 'Área contra fantasmas.'], ['MG_SIGHT', 1, 'Requisito de Barreira de Fogo; revela escondidos.'], ['MG_FIREBALL', 7, 'Área de fogo.']]);

  // ---------- Arqueiro / Caçador / Bardo / Odalisca ----------
  many('cacador-dex', [['AC_SHOWER', 8, 'Área: limpa grupos.'],
    ['HT_PHANTASMIC', 1, 'Empurra sem gastar flecha.'], ['HT_FLASHER', 1, R], ['HT_FREEZINGTRAP', 5, 'Congela grupos.'], ['HT_SANDMAN', 1, R], ['HT_BLASTMINE', 5, 'Mina de vento.'], ['HT_LANDMINE', 3, 'Atordoa.']]);
  many('cacador-armadilha', [['AC_CONCENTRATION', 10, 'DEX e AGI maiores.'], ['AC_SHOWER', 10, 'Área.'], ['AC_CHARGEARROW', 1, 'Empurra.'], ['AC_VULTURE', 8, 'Alcance e precisão.'],
    ['HT_BEASTBANE', 10, 'Dano contra brutos e insetos.'], ['HT_PHANTASMIC', 1, 'Empurra sem gastar flecha.'], ['HT_SHOCKWAVE', 5, 'Drena SP.'], ['HT_SANDMAN', 5, 'Faz dormir em área.'], ['HT_SKIDTRAP', 2, R]]);
  many('cacador-falcao', [['AC_CONCENTRATION', 10, 'DEX e AGI maiores.'], ['AC_DOUBLE', 10, 'Rajada mais forte.'], ['AC_SHOWER', 8, 'Área.'], ['AC_CHARGEARROW', 1, 'Empurra.'],
    ['HT_BEASTBANE', 10, 'Dano contra brutos e insetos.'], ['HT_PHANTASMIC', 1, 'Empurra sem gastar flecha.'], ['HT_SKIDTRAP', 1, R], ['HT_LANDMINE', 5, 'Atordoa.'], ['HT_ANKLESNARE', 5, 'Prende.'],
    ['HT_FLASHER', 1, R], ['HT_FREEZINGTRAP', 5, 'Congela grupos.'], ['HT_SANDMAN', 1, R], ['HT_BLASTMINE', 4, 'Mina de vento.']]);
  many('bardo-suporte', [['AC_CONCENTRATION', 10, 'DEX e AGI maiores.'], ['AC_CHARGEARROW', 1, 'Empurra.'], ['AC_SHOWER', 8, 'Área.'], ['BA_APPLEIDUN', 8, 'HP máximo e cura contínua para o grupo.']]);
  many('odalisca-suporte', [['AC_CONCENTRATION', 10, 'DEX e AGI maiores.'], ['AC_CHARGEARROW', 1, 'Empurra.'], ['AC_SHOWER', 8, 'Área.'], ['DC_HUMMING', 10, 'Mais precisão para o grupo.']]);

  // ---------- Noviço / Sacerdote / Monge ----------
  up('sacerdote-suporte', 'AL_ANGELUS', 6, 'Mais DEF para o grupo; requisito de Kyrie.');
  many('sacerdote-tu', [['AL_CRUCIS', 5, 'Reduz a DEF de mortos-vivos e demônios: mais dano no Magnus.'], ['MG_SRECOVERY', 10, 'SP para o Magnus.']]);
  many('sacerdote-batalha', [['AL_CURE', 1, 'Tira silêncio, cegueira e confusão.'], ['AL_ANGELUS', 4, 'Mais DEF.'],
    ['PR_KYRIE', 10, 'Escudo que absorve golpes.'], ['PR_MAGNIFICAT', 5, 'SP mais rápido.'], ['PR_SUFFRAGIUM', 3, 'Conjuração mais rápida para o grupo.'], ['PR_SANCTUARY', 10, 'Cura em área.'], ['PR_SLOWPOISON', 1, '']]);
  many('monge-combo', [['AL_ANGELUS', 5, 'Mais DEF.'], ['AL_CURE', 1, 'Tira silêncio, cegueira e confusão.'],
    ['MO_COMBOFINISH', 5, 'Último golpe do combo mais forte.'], ['MO_ABSORBSPIRITS', 1, 'Requisito de Fúria Interior; recupera SP.'], ['MO_EXPLOSIONSPIRITS', 3, 'Fúria Interior: mais crítico.']]);

  // ---------- Mercador / Ferreiro / Alquimista ----------
  const merc = id => many(id, [['MC_INCCARRY', 10, 'Mais carga para loot (confirme no jogo).'], ['MC_PUSHCART', 10, 'No 10 o carrinho não reduz a velocidade (sem efeito em combate; confirme no jogo).'], ['MC_MAMMONITE', 10, 'Dano extra, mas gasta zeny por golpe.'],
    ['MC_LOUD', 1, 'STR +4.'], ['MC_CARTREVOLUTION', 1, 'Área usando o carrinho.'], ['MC_DISCOUNT', 7, 'Compra mais barata no NPC (confirme no jogo).']]);
  merc('alquimista-acido'); merc('alquimista-homunculus');
  many('ferreiro-zeny', [['MC_INCCARRY', 10, 'Mais carga para loot (confirme no jogo).'], ['MC_DISCOUNT', 10, 'Poções e flechas mais baratas no NPC (confirme no jogo).'], ['MC_CARTREVOLUTION', 1, 'Área usando o carrinho.'], ['MC_MAMMONITE', 7, 'Dano extra, mas gasta zeny por golpe.']]);
  many('ferreiro-carrinho', [['MC_MAMMONITE', 10, 'Dano extra, mas gasta zeny por golpe.'], ['MC_INCCARRY', 10, 'Mais peso no carrinho = mais dano no Cavalo-de-Pau (confirme no jogo).'], ['MC_DISCOUNT', 7, 'Compra mais barata no NPC (confirme no jogo).'],
    ['BS_WEAPONRESEARCH', 10, '+ATK e +acerto.'], ['BS_WEAPONPERFECT', 5, 'Sem penalidade de tamanho.'], ['BS_MAXIMIZE', 5, 'Dano máximo sempre.']]);
  ['ferreiro-zeny', 'ferreiro-carrinho'].forEach(id => many(id, [['BS_HAMMERFALL', 5, 'Atordoa em área.'], ['BS_SKINTEMPER', 5, 'Resistência a fogo.'], ['BS_UNFAIRLYTRICK', 1, 'Mammonita gasta menos zeny.'],
    ['BS_GREED', 1, SOBRA], ['BS_IRON', 4, SOBRA], ['BS_STEEL', 1, SOBRA], ['BS_FINDINGORE', 1, SOBRA]]));
  many('alquimista-acido', [['AM_CANNIBALIZE', 5, 'Planta que luta junto.'], ['AM_SPHEREMINE', 5, 'Esfera que explode em área.'], ['AM_CP_HELM', 3, 'Protege o capacete; requisito.'], ['AM_CP_SHIELD', 1, 'Protege o escudo.']]);
  many('alquimista-homunculus', [['AM_RESURRECTHOMUN', 5, 'Homunculus volta com mais HP.'], ['AM_DEMONSTRATION', 5, 'Fogo em área.'], ['AM_PHARMACY', 6, 'Requisito de Criar Monstro Planta.'], ['AM_CANNIBALIZE', 5, 'Planta que luta junto.'], ['AM_SPHEREMINE', 5, 'Esfera que explode em área.']]);
  many('alquimista-potter', [['MC_DISCOUNT', 10, 'Ervas e frascos mais baratos no NPC (confirme no jogo).'], ['MC_PUSHCART', 10, 'No 10 o carrinho não reduz a velocidade (sem efeito em combate; confirme no jogo).'], ['MC_INCCARRY', 10, 'Mais carga para ervas (confirme no jogo).'],
    ['MC_CARTREVOLUTION', 1, 'Área usando o carrinho.'], ['MC_LOUD', 1, 'STR +4.'], ['MC_MAMMONITE', 7, 'Dano extra, mas gasta zeny.'],
    ['AM_CANNIBALIZE', 5, 'Planta que luta por você (o potter bate pouco).'], ['AM_SPHEREMINE', 4, 'Esfera que explode em área.'], ['AM_DEMONSTRATION', 5, 'Fogo em área.'], ['AM_RESURRECTHOMUN', 5, 'Homunculus volta com mais HP.']]);

  // ---------- Gatuno / Assassino / Arruaceiro ----------
  const thiefX = id => many(id, [['TF_DETOXIFY', 1, 'Cura veneno.'], ['TF_SPRINKLESAND', 1, 'Cega.'], ['TF_THROWSTONE', 1, 'Ataque à distância.'], ['TF_HIDING', 6, 'Esconderijo mais longo.']]);
  thiefX('assassino-katar'); thiefX('assassino-critico'); thiefX('arruaceiro-farm'); thiefX('arruaceiro-arco');
  up('assassino-katar', 'TF_STEAL', 10, 'Mais loot para vender.'); up('assassino-critico', 'TF_STEAL', 10, 'Mais loot para vender.');
  many('assassino-katar', [['AS_SONICACCEL', 1, 'Mais dano e precisão nas Lâminas.'], ['AS_ENCHANTPOISON', 10, 'Arma venenosa por mais tempo.'], ['AS_VENOMKNIFE', 1, 'Ataque à distância.'], ['AS_VENOMDUST', 10, 'Névoa venenosa em área.']]);
  many('assassino-critico', [['AS_SONICBLOW', 10, 'Golpe forte quando sobra SP.'], ['AS_CLOAKING', 2, R], ['AS_GRIMTOOTH', 5, 'Área escondido.'], ['AS_VENOMKNIFE', 1, 'Ataque à distância.'], ['AS_POISONREACT', 10, 'Contra-ataque venenoso automático.']]);
  many('arruaceiro-farm', [['TF_POISON', 10, 'Dano venenoso.'], ['SM_SWORD', 10, 'ATK com adaga e espada.'], ['RG_TUNNELDRIVE', 2, 'Requisito de Ataque Surpresa (sem efeito em combate).'], ['RG_RAID', 5, 'Área ao sair do esconderijo.'], ['RG_CLOSECONFINE', 1, 'Prende o alvo.'], ['RG_STRIPHELM', 1, 'Tira o capacete do alvo.']]);
  many('arruaceiro-arco', [['TF_MISS', 10, 'Mais esquiva.'], ['TF_POISON', 10, 'Dano venenoso.'], ['TF_DOUBLE', 10, 'Para quando usar adaga.'], ['RG_SNATCHER', 10, 'Furto automático ao bater.'], ['RG_CLOSECONFINE', 1, 'Prende o alvo.'], ['RG_BACKSTAP', 8, 'Golpe forte (funciona com arco).']]);

  // ---------- Classes de 1 job ----------
  many('superaprendiz', [['AL_DP', 10, 'DEF contra monstros.'], ['AL_BLESSING', 10, 'STR, INT e DEX +10.'], ['AL_HEAL', 3, R], ['AL_INCAGI', 10, 'AGI e velocidade.'], ['SM_BASH', 10, 'Golpe forte.'], ['SM_MAGNUM', 10, 'Área ao redor.'], ['SM_PROVOKE', 5, 'Reduz a DEF do alvo.']]);
  many('justiceiro-rifle', [['GS_BULLSEYE', 1, 'Forte contra brutos e humanoides.'], ['GS_PIERCINGSHOT', 5, 'Causa sangramento.'], ['GS_DISARM', 5, R], ['GS_ADJUSTMENT', 1, 'Reduz dano à distância.'],
    ['GS_MAGICALBULLET', 1, 'Tiro mágico.'], ['GS_CRACKER', 1, 'Atordoa.'], ['GS_FLING', 1, 'Reduz DEF do alvo.'], ['GS_TRIPLEACTION', 1, 'Três tiros.'], ['GS_RAPIDSHOWER', 7, 'Só com pistola (arma reserva).']]);
  many('justiceiro-pistola', [['GS_RAPIDSHOWER', 10, 'Cinco tiros rápidos.'], ['GS_INCREASING', 1, 'DEX e precisão maiores.'], ['GS_TRIPLEACTION', 1, 'Três tiros.'], ['GS_MAGICALBULLET', 1, 'Tiro mágico.'], ['GS_CRACKER', 1, 'Atordoa.'], ['GS_FLING', 1, 'Reduz DEF do alvo.'],
    ['GS_SINGLEACTION', 10, 'Precisão e velocidade com qualquer arma.'], ['GS_GATLINGFEVER', 9, 'Só com metralhadora (arma reserva).']]);
  many('ninja-magico', [['NJ_NEN', 5, 'Aura Ninja: mais dano.'], ['NJ_KAENSIN', 8, 'Escudo de chamas mais forte.']]);
  many('ninja-arremesso', [['NJ_KASUMIKIRI', 10, 'Golpe corpo a corpo quando o alvo encosta.'], ['NJ_KIRIKAGE', 5, 'Corte à distância.'], ['NJ_NINPOU', 10, 'Mais SP.'], ['NJ_NEN', 3, 'Aura Ninja: mais dano.']]);
  many('taekwon-chutes', [['TK_DODGE', 1, 'Esquiva de ataques à distância.'], ['TK_COUNTER', 1, 'Contrachute.'], ['TK_READYCOUNTER', 1, 'Postura do Contrachute.']]);

  // Skills de venda/fabricação: sem efeito em combate, mas são o motivo das builds de zeny e de poção
  ['ferreiro-zeny', 'alquimista-acido', 'ferreiro-carrinho', 'alquimista-potter'].forEach(id => up(id, 'MC_OVERCHARGE', 10, 'Até +24% na venda ao NPC: multiplica a renda (sem efeito em combate; confirme no balcão).'));
  up('ferreiro-carrinho', 'MC_PUSHCART', 10, 'No 10 o carrinho não reduz a velocidade; requisito de Cavalo-de-Pau (sem efeito em combate; confirme no jogo).');
  up('ferreiro-zeny', 'MC_PUSHCART', 10, 'Deixe no 10: abaixo disso o carrinho reduz a velocidade. Também dá espaço para loot e é requisito de Cavalo-de-Pau (sem efeito em combate; confirme no jogo).');
  up('alquimista-potter', 'AM_LEARNINGPOTION', 10, 'Mais chance ao fabricar e poções curam mais (sem efeito em combate; confirme no jogo).');
  up('alquimista-potter', 'AM_PHARMACY', 10, 'Fabricar poções: a renda da build (sem efeito em combate; confirme no jogo).');

  // ---------- Textos que mudaram junto ----------
  const fz = B('ferreiro-zeny');
  fz.fases[1].foco = 'Aumentar Capacidade 10 → Desconto 3 → Superfaturar 10 → Usar Carrinho 10 (no 10 o carrinho não reduz a velocidade) → Desconto 10. Mammonita só se sobrar zeny.';
  ['ferreiro-zeny', 'ferreiro-carrinho'].forEach(id => { const b = B(id); if (b.cuidados) b.cuidados = b.cuidados.map(t => t.replace(/não têm efeito em combate aqui: não gaste pontos\./, 'não têm efeito em combate aqui: recebem só os 7 pontos que sobram de Ferreiro depois de todas as skills úteis.')); });

  // ---------- Atributos por fase (alvo no fim de cada faixa; sobra final 0 ou 1) ----------
  const ST = {
    'cavaleiro-tyr': [{ str: 16, agi: 5, vit: 10, int: 1, dex: 10, luk: 1 }, { str: 42, agi: 10, vit: 25, int: 1, dex: 25, luk: 1 }, { str: 52, agi: 10, vit: 30, int: 2, dex: 30, luk: 1 }, { str: 70, agi: 10, vit: 43, int: 10, dex: 45, luk: 2 }, { str: 90, agi: 20, vit: 70, int: 20, dex: 62, luk: 4 }],
    'templario-crux': [{ str: 16, agi: 1, vit: 10, int: 5, dex: 10, luk: 1 }, { str: 46, agi: 1, vit: 35, int: 15, dex: 30, luk: 1 }, { str: 55, agi: 1, vit: 54, int: 35, dex: 40, luk: 1 }, { str: 72, agi: 1, vit: 82, int: 50, dex: 57, luk: 3 }],
    'bruxo-aoe': [{ str: 1, agi: 1, vit: 5, int: 20, dex: 12, luk: 1 }, { str: 1, agi: 1, vit: 11, int: 57, dex: 40, luk: 1 }, { str: 1, agi: 1, vit: 21, int: 77, dex: 57, luk: 1 }, { str: 1, agi: 1, vit: 36, int: 99, dex: 88, luk: 1 }],
    'sabio-bolt': [{ str: 1, agi: 1, vit: 5, int: 20, dex: 12, luk: 1 }, { str: 1, agi: 1, vit: 11, int: 57, dex: 40, luk: 2 }, { str: 1, agi: 1, vit: 41, int: 99, dex: 85, luk: 3 }],
    'cacador-dex': [{ str: 2, agi: 10, vit: 1, int: 1, dex: 23, luk: 1 }, { str: 10, agi: 40, vit: 10, int: 1, dex: 55, luk: 1 }, { str: 10, agi: 56, vit: 12, int: 1, dex: 78, luk: 5 }, { str: 15, agi: 80, vit: 35, int: 1, dex: 99, luk: 21 }],
    'bardo-suporte': [{ str: 10, agi: 40, vit: 10, int: 1, dex: 55, luk: 1 }, { str: 15, agi: 74, vit: 36, int: 32, dex: 99, luk: 2 }],
    'odalisca-suporte': [{ str: 10, agi: 40, vit: 10, int: 1, dex: 55, luk: 1 }, { str: 15, agi: 74, vit: 36, int: 32, dex: 99, luk: 2 }],
    'sacerdote-suporte': [{ str: 1, agi: 1, vit: 21, int: 60, dex: 30, luk: 1 }, { str: 1, agi: 1, vit: 60, int: 92, dex: 80, luk: 4 }],
    'sacerdote-tu': [{ str: 1, agi: 1, vit: 21, int: 60, dex: 30, luk: 1 }, { str: 1, agi: 2, vit: 50, int: 92, dex: 73, luk: 40 }],
    'monge-combo': [{ str: 50, agi: 41, vit: 10, int: 1, dex: 20, luk: 1 }, { str: 82, agi: 82, vit: 32, int: 10, dex: 56, luk: 1 }],
    'ferreiro-zeny': [{ str: 17, agi: 8, vit: 5, int: 1, dex: 10, luk: 1 }, { str: 53, agi: 30, vit: 15, int: 1, dex: 25, luk: 1 }, { str: 64, agi: 50, vit: 25, int: 1, dex: 41, luk: 1 }, { str: 82, agi: 78, vit: 37, int: 1, dex: 60, luk: 3 }],
    'alquimista-acido': [{ str: 53, agi: 15, vit: 20, int: 10, dex: 30, luk: 2 }, { str: 80, agi: 20, vit: 55, int: 45, dex: 74, luk: 2 }],
    'assassino-katar': [{ str: 10, agi: 20, vit: 1, int: 1, dex: 8, luk: 1 }, { str: 38, agi: 50, vit: 10, int: 1, dex: 24, luk: 1 }, { str: 80, agi: 90, vit: 26, int: 10, dex: 51, luk: 2 }],
    'arruaceiro-farm': [{ str: 35, agi: 44, vit: 10, int: 1, dex: 35, luk: 2 }, { str: 72, agi: 80, vit: 32, int: 2, dex: 65, luk: 23 }],
    'superaprendiz': [{ str: 75, agi: 80, vit: 54, int: 1, dex: 52, luk: 3 }],
    'justiceiro-rifle': [{ str: 15, agi: 75, vit: 40, int: 1, dex: 99, luk: 26 }],
    'ninja-magico': [{ str: 1, agi: 25, vit: 36, int: 99, dex: 81, luk: 2 }],
    'taekwon-chutes': [{ str: 75, agi: 88, vit: 36, int: 1, dex: 56, luk: 3 }],
    'alquimista-homunculus': [{ str: 53, agi: 15, vit: 20, int: 10, dex: 30, luk: 1 }, { str: 55, agi: 15, vit: 41, int: 30, dex: 52, luk: 1 }, { str: 75, agi: 15, vit: 60, int: 45, dex: 77, luk: 1 }],
    'cavaleiro-agi': [{ str: 45, agi: 42, vit: 10, int: 1, dex: 26, luk: 1 }, { str: 80, agi: 90, vit: 30, int: 1, dex: 51, luk: 3 }],
    'cavaleiro-lanca': [{ str: 53, agi: 5, vit: 31, int: 1, dex: 30, luk: 1 }, { str: 85, agi: 11, vit: 72, int: 20, dex: 70, luk: 2 }],
    'templario-gc': [{ str: 35, agi: 1, vit: 43, int: 20, dex: 30, luk: 2 }, { str: 40, agi: 1, vit: 80, int: 80, dex: 58, luk: 3 }],
    'templario-lanca': [{ str: 80, agi: 80, vit: 40, int: 1, dex: 58, luk: 3 }],
    'bruxo-jupitel': [{ str: 1, agi: 1, vit: 11, int: 57, dex: 40, luk: 1 }, { str: 1, agi: 1, vit: 27, int: 99, dex: 92, luk: 1 }],
    'sabio-suporte': [{ str: 1, agi: 1, vit: 61, int: 90, dex: 82, luk: 1 }],
    'cacador-armadilha': [{ str: 10, agi: 30, vit: 11, int: 20, dex: 55, luk: 1 }, { str: 15, agi: 30, vit: 40, int: 73, dex: 99, luk: 2 }],
    'cacador-falcao': [{ str: 1, agi: 50, vit: 21, int: 50, dex: 98, luk: 50 }],
    'assassino-critico': [{ str: 35, agi: 50, vit: 10, int: 1, dex: 20, luk: 14 }, { str: 70, agi: 90, vit: 20, int: 1, dex: 35, luk: 54 }],
    'arruaceiro-arco': [{ str: 20, agi: 81, vit: 30, int: 1, dex: 99, luk: 21 }],
    'sacerdote-batalha': [{ str: 80, agi: 75, vit: 36, int: 20, dex: 61, luk: 1 }],
    'ferreiro-carrinho': [{ str: 90, agi: 30, vit: 57, int: 21, dex: 70, luk: 1 }],
    'superaprendiz-mago': [{ str: 1, agi: 1, vit: 50, int: 99, dex: 80, luk: 1 }],
    'ninja-arremesso': [{ str: 61, agi: 60, vit: 30, int: 1, dex: 99, luk: 3 }],
    'justiceiro-pistola': [{ str: 1, agi: 71, vit: 40, int: 30, dex: 99, luk: 21 }],
    'alquimista-potter': [{ str: 1, agi: 1, vit: 5, int: 1, dex: 20, luk: 12 }, { str: 1, agi: 1, vit: 6, int: 1, dex: 52, luk: 48 }, { str: 1, agi: 1, vit: 6, int: 1, dex: 99, luk: 98 }],
  };
  for (const [id, fs] of Object.entries(ST)) fs.forEach((s, i) => { B(id).fases[i].stats = s; });
})();

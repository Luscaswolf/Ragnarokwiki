/* Builds adicionais + "por que essa build está aqui (servidor)" + builds descartadas. */

// Justiceiro rifle: Desperado/Disparo Espalhado não são de rifle -> corrigido aqui
(() => {
  const j = window.BUILDS.find(b => b.id === 'justiceiro-rifle');
  j.nome = 'Justiceiro — Rifle (alvo único)';
  j.skills = [['NV_BASIC', 9, ''], ['GS_GLITTERING', 5, 'Moedas para as skills.'], ['GS_SNAKEEYE', 10, '+alcance e acerto.'], ['GS_SINGLEACTION', 10, '+acerto e velocidade.'], ['GS_TRACKING', 10, 'A skill principal do rifle.'], ['GS_CHAINACTION', 10, 'Disparo extra automático (pistola).'], ['GS_INCREASING', 1, 'Buff de DES/acerto.'], ['GS_ADJUSTMENT', 1, 'Menos dano à distância.']];
  j.porque = ['DEX é dano e acerto das armas de fogo.', 'AGI para velocidade.', 'Rastrear o Alvo com rifle é o maior dano de alvo único da classe.', 'LUK alimenta Cara ou Coroa.'];
})();

window.BUILDS.push(
// ---------------- ALQUIMISTA HOMUNCULUS ----------------
{
  id: 'alquimista-homunculus', classe: 'Alchemist', nome: 'Alquimista — Homunculus + Terror Ácido', tags: ['up', 'zeny'],
  caminho: ['Novice', 'Merchant', 'Alchemist'],
  resumo: 'O Homunculus luta junto com você (ataque normal) enquanto você usa Terror Ácido. É um "segundo personagem" de graça.',
  servidor: 'Despertar Homunculus funciona e, durante o beta, não gasta Semente da Vida (60.000z no clássico). Porém TODAS as skills do Homunculus estão "Ainda não funciona" e Arremessar Poção não tem efeito em combate: você não cura o Homunculus com poção. Por isso a build clássica de "Alquimista suporte" (VIT/INT jogando poção) foi trocada por uma híbrida: o Homunculus é dano extra e distração, e você mata com Terror Ácido.',
  porque: [
    'Sem as skills dele, o Homunculus vale pelo ataque automático e por puxar a agressão dos monstros, então você apanha menos.',
    'Terror Ácido ignora a defesa do monstro e aqui não consome frasco: dano constante sem gastar material.',
    'STR/DEX aumentam o Terror Ácido; INT dá SP para usar sem parar; VIT porque o Alquimista não tem esquiva.',
    'Vaporizar exige o Homunculus com 80% do HP. Como não dá para curar com poção, deixe-o regenerar entre caçadas (no idle ele descansa quando você para).',
  ],
  fases: [
    { nv: '11–49 (Mercador)', stats: { str: 40, agi: 15, vit: 20, int: 10, dex: 30, luk: 1 }, foco: 'Aumentar Capacidade 5, Desconto 3, Superfaturar 10.', porque: 'O loot do Homunculus também vende com Superfaturar.' },
    { nv: '50–70 (Alquimista)', stats: { str: 55, agi: 15, vit: 40, int: 30, dex: 45, luk: 1 }, foco: 'Bioética → Vaporizar → Despertar Homunculus. Terror Ácido 5.', porque: 'Pegue o Homunculus assim que virar Alquimista: ele upa junto.' },
    { nv: '71–99 (Alquimista)', stats: { str: 75, agi: 15, vit: 60, int: 45, dex: 65, luk: 1 }, foco: 'Perícia com Machado e Espada 10.', porque: 'Rota da wiki: Argiope → High Orc → Rybio → Medusa.' },
  ],
  skills: [['NV_BASIC', 9, ''], ['MC_INCCARRY', 3, 'Requisito.'], ['MC_DISCOUNT', 3, 'Requisito.'], ['MC_OVERCHARGE', 10, 'Venda do loot (confirme no balcão).'],
    ['AM_BIOETHICS', 1, 'Requisito do Homunculus (sem efeito em combate).'], ['AM_REST', 1, 'Guarda o Homunculus.'], ['AM_CALLHOMUN', 1, 'Chama/cria o Homunculus.'], ['AM_RESURRECTHOMUN', 3, 'Revive se ele morrer.'],
    ['AM_AXEMASTERY', 10, '+ATK.'], ['AM_LEARNINGPOTION', 5, 'Requisito.'], ['AM_PHARMACY', 5, 'Requisito.'], ['AM_ACIDTERROR', 5, 'Seu dano principal.']],
  equip: [
    { fase: 'Início', itens: [9000121, 1301, 2224, 2501, 2403], porque: '' },
    { fase: 'Alquimista', itens: [1354, 2103, 2307, 2405, 2226], porque: 'Machado de 2 mãos não dá: use Marreta só no começo; depois espada de 1 mão + escudo para aguentar.' },
    { fase: 'Final de loja', itens: [1128, 2105, 2314, 2228, 2505, 2627], porque: 'Haedonggum + Escudo: Alquimista com escudo sobrevive muito mais.' },
  ],
  cartas: [[4058, 'Escudo', 'Sapo de Thara.'], [4233, 'Armadura', 'Leopardo Filhote.'], [4133, 'Capa', 'Raydric.']],
  cuidados: ['O Homunculus é sorteado (Lif, Amistr, Filir ou Vanilmirth). Sem skills, Amistr (mais HP) e Filir (ataque rápido) rendem mais.', 'Se as skills do Homunculus forem liberadas numa atualização, esta build fica bem mais forte: confira o selo na aba Banco.'],
},
// ---------------- CAVALEIRO AGI ----------------
{
  id: 'cavaleiro-agi', classe: 'Knight', nome: 'Cavaleiro — AGI auto-ataque (sem SP)', tags: ['up', 'zeny'],
  caminho: ['Novice', 'Swordman', 'Knight'],
  resumo: 'Bate muito rápido só com ataque normal. Não gasta SP, então fica horas no idle sem poção azul.',
  servidor: 'No idle, a sessão para quando o SP acaba. Esta build mata só com golpes normais acelerados por Rapidez com Duas Mãos, o que dá sessões longas e baratas. Carta Raydric funciona contra ataque normal de monstro (as de elemento na armadura não).',
  porque: ['AGI para velocidade de ataque e esquiva.', 'STR para dano por golpe.', 'DEX para acertar.', 'Rapidez com Duas Mãos (+30% velocidade) dura 300s e custa pouco SP.'],
  fases: [
    { nv: '11–49 (Espadachim)', stats: { str: 45, agi: 40, vit: 10, int: 1, dex: 25, luk: 1 }, foco: 'Perícia Espada 2 Mãos 10, Aumentar Recuperação de HP 10.', porque: '' },
    { nv: '50–99 (Cavaleiro)', stats: { str: 80, agi: 90, vit: 30, int: 1, dex: 45, luk: 1 }, foco: 'Rapidez com Duas Mãos 10, Contra-Ataque.', porque: 'AGI 90 + Rapidez = perto do teto de velocidade.' },
  ],
  skills: [['NV_BASIC', 9, ''], ['SM_SWORD', 1, ''], ['SM_TWOHAND', 10, ''], ['SM_RECOVERY', 10, ''], ['SM_PROVOKE', 5, ''], ['SM_ENDURE', 5, ''], ['SM_BASH', 5, ''], ['KN_TWOHANDQUICKEN', 10, 'A base da build.'], ['KN_AUTOCOUNTER', 5, ''], ['KN_SPEARMASTERY', 1, ''], ['KN_PIERCE', 1, '']],
  equip: [{ fase: 'Provisório', itens: [1154, 2307, 2405, 2226], porque: 'Espada Bastarda [2].' }, { fase: 'Final de loja', itens: [1157, 2314, 2228, 2505, 2627], porque: '' }],
  cartas: [[4092, 'Arma', ''], [4126, 'Arma', ''], [4285, 'Capa', 'Choco: esquiva.'], [4097, 'Armadura', '']],
  cuidados: ['Menos dano em área que a versão Impacto de Tyr: melhor em mapas com monstros espalhados.'],
},
{
  id: 'cavaleiro-lanca', classe: 'Knight', nome: 'Cavaleiro — Lança e Perfurar (contra grandes)', tags: ['up', 'masmorra'],
  caminho: ['Novice', 'Swordman', 'Knight'],
  resumo: 'Perfurar acerta 1x em pequeno, 2x em médio e 3x em grande. Excelente contra Golems, Anubis, Minorous.',
  servidor: 'Brandir Lança (a skill em área de lança) exige montaria, e Montaria tem selo "Sem efeito em combate": por isso a build clássica de Brandir foi descartada. Perfurar não precisa de montaria e funciona.',
  porque: ['STR para dano.', 'DEX para acertar.', 'VIT para aguentar alvos grandes que batem forte.', 'Perícia com Lança dá ATK por nível.'],
  fases: [
    { nv: '11–49 (Espadachim)', stats: { str: 45, agi: 5, vit: 30, int: 1, dex: 30, luk: 1 }, foco: 'Golpe Fulminante, Aumentar Recuperação de HP.', porque: '' },
    { nv: '50–99 (Cavaleiro)', stats: { str: 85, agi: 10, vit: 65, int: 20, dex: 60, luk: 1 }, foco: 'Perícia com Lança 10, Perfurar 10.', porque: 'INT 20 para o SP do Perfurar.' },
  ],
  skills: [['NV_BASIC', 9, ''], ['SM_RECOVERY', 10, ''], ['SM_BASH', 10, ''], ['SM_PROVOKE', 5, ''], ['SM_ENDURE', 1, ''], ['KN_SPEARMASTERY', 10, ''], ['KN_PIERCE', 10, 'A skill da build.'], ['KN_SPEARSTAB', 5, 'Empurra em linha.'], ['KN_SPEARBOOMERANG', 3, 'Ataque à distância.']],
  equip: [{ fase: 'Provisório', itens: [1454, 2307, 2405, 2226], porque: 'Glaive [2] (Einbroch).' }, { fase: 'Final de loja', itens: [1463, 1410, 2314, 2228, 2505], porque: 'Alabarda [1] ou Lança (ATK 185).' }],
  cartas: [[4126, 'Arma', 'Minorous: +15% vs grande.'], [4092, 'Arma', ''], [4133, 'Capa', '']], cuidados: ['Não pegue Montaria nem Brandir Lança.'],
},
// ---------------- TEMPLÁRIO ----------------
{
  id: 'templario-gc', classe: 'Crusader', nome: 'Templário — Crux Magnum (INT/VIT)', tags: ['masmorra'],
  caminho: ['Novice', 'Swordman', 'Crusader'],
  resumo: 'Área sagrada em volta de si. Destrói mortos-vivos e demônios em Glast Heim e Payon.',
  servidor: 'Mapas com mortos-vivos aparecem muito nas rotas da wiki (Payon, Glast Heim, Anubis). Crux Magnum funciona em combate. A conjuração não é interrompida aqui, o que ajuda muito uma skill que gasta HP e pode ser cortada no clássico.',
  porque: ['INT e STR somam no dano híbrido.', 'VIT alta: a skill consome 20% do HP por uso.', 'DEX para conjurar mais rápido.'],
  fases: [
    { nv: '11–49 (Espadachim)', stats: { str: 35, agi: 1, vit: 40, int: 20, dex: 30, luk: 1 }, foco: 'Aumentar Recuperação de HP 10.', porque: '' },
    { nv: '50–99 (Templário)', stats: { str: 40, agi: 1, vit: 80, int: 80, dex: 50, luk: 1 }, foco: 'Fé 10, Crux Divinum 6, Crux Magnum 10.', porque: '' },
  ],
  skills: [['NV_BASIC', 9, ''], ['SM_RECOVERY', 10, ''], ['SM_SWORD', 5, ''], ['SM_PROVOKE', 5, ''], ['SM_ENDURE', 1, ''], ['CR_TRUST', 10, ''], ['CR_HOLYCROSS', 6, 'Requisito.'], ['CR_GRANDCROSS', 10, 'A skill da build.'], ['CR_AUTOGUARD', 10, ''], ['CR_REFLECTSHIELD', 5, '']],
  equip: [{ fase: 'Final de loja', itens: [1128, 2105, 2325, 2228, 2505, 2608], porque: 'Manto Sagrado (DEFM) e Rosário.' }],
  cartas: [[4058, 'Escudo', ''], [4031, 'Armadura', ''], [4133, 'Capa', '']], cuidados: ['Leve muita Poção Branca: a skill gasta HP.'],
},
{
  id: 'templario-lanca', classe: 'Crusader', nome: 'Templário — Rapidez com Lança (AGI/STR)', tags: ['up'],
  caminho: ['Novice', 'Swordman', 'Crusader'],
  resumo: 'Templário de auto-ataque com lança de duas mãos. Sem gasto de SP.',
  servidor: 'Mesma lógica do Cavaleiro AGI: ataque normal não gasta SP e deixa a caçada idle rodar mais tempo. Rapidez com Lança funciona em combate.',
  porque: ['AGI para velocidade.', 'STR para dano.', 'VIT moderada: o Templário com lança não usa escudo.', 'Fé dá HP extra.'],
  fases: [{ nv: '50–99 (Templário)', stats: { str: 80, agi: 80, vit: 40, int: 1, dex: 45, luk: 1 }, foco: 'Perícia com Lança 10, Rapidez com Lança 10, Fé.', porque: '' }],
  skills: [['NV_BASIC', 9, ''], ['SM_RECOVERY', 10, ''], ['SM_PROVOKE', 5, ''], ['SM_ENDURE', 1, ''], ['KN_SPEARMASTERY', 10, ''], ['CR_SPEARQUICKEN', 10, ''], ['CR_TRUST', 10, ''], ['CR_AUTOGUARD', 1, '']],
  equip: [{ fase: 'Final de loja', itens: [1463, 2314, 2228, 2505, 2627], porque: 'Alabarda [1].' }],
  cartas: [[4092, 'Arma', ''], [4133, 'Capa', '']], cuidados: [],
},
// ---------------- MAGO ----------------
{
  id: 'bruxo-jupitel', classe: 'Wizard', nome: 'Bruxo — Trovão de Júpiter (alvo único)', tags: ['up'],
  caminho: ['Novice', 'Mage', 'Wizard'],
  resumo: 'Para mapas com monstros espalhados: mata um por um, com menos SP que a área.',
  servidor: 'O modo automático escolhe alvos um a um. Em mapa espalhado, magia de área desperdiça SP. Trovão de Júpiter empurra e acerta várias vezes. Como a conjuração não é interrompida, dá para pôr mais INT/DEX e menos VIT.',
  porque: ['INT/DEX como todo mago.', 'Trovão de Júpiter (vento) contra água; Lanças de Fogo contra terra.'],
  fases: [
    { nv: '11–49 (Mago)', stats: { str: 1, agi: 1, vit: 12, int: 57, dex: 40, luk: 1 }, foco: 'Lanças 10.', porque: '' },
    { nv: '50–99 (Bruxo)', stats: { str: 1, agi: 1, vit: 30, int: 99, dex: 92, luk: 1 }, foco: 'Trovão de Júpiter 10, Pântano dos Mortos.', porque: '' },
  ],
  skills: [['NV_BASIC', 9, ''], ['MG_SRECOVERY', 10, ''], ['MG_FIREBOLT', 10, ''], ['MG_COLDBOLT', 10, ''], ['MG_LIGHTNINGBOLT', 10, ''], ['MG_SOULSTRIKE', 10, ''], ['MG_NAPALMBEAT', 4, ''], ['WZ_JUPITEL', 10, ''], ['WZ_QUAGMIRE', 5, ''], ['WZ_SIGHTRASHER', 1, '']],
  equip: [{ fase: 'Final de loja', itens: [1610, 2332, 2230, 2505, 2627], porque: '' }],
  cartas: [[4052, 'Capacete', ''], [4064, 'Acessório', '']], cuidados: [],
},
{
  id: 'sabio-suporte', classe: 'Sage', nome: 'Sábio — Encantador (suporte de grupo)', tags: ['suporte', 'grupo'],
  caminho: ['Novice', 'Mage', 'Sage'],
  resumo: 'Encanta a arma do grupo com o elemento certo e cria terrenos (Vulcão, Dilúvio, Furacão).',
  servidor: 'Elemento muda muito o dano neste servidor (veja a tabela de elementos da wiki), e as rotas da wiki pedem arma de fogo/sagrada em vários mapas. Os Encantar funcionam em combate. Em grupo, cada membro dá +10% de EXP.',
  porque: ['INT para SP e duração.', 'DEX para conjurar.', 'VIT para sobreviver no meio do grupo.'],
  fases: [{ nv: '50–99 (Sábio)', stats: { str: 1, agi: 1, vit: 60, int: 90, dex: 70, luk: 1 }, foco: 'Os 4 Encantar, Vulcão/Dilúvio/Furacão, Proteger Terreno, Desencantar.', porque: '' }],
  skills: [['NV_BASIC', 9, ''], ['MG_SRECOVERY', 10, ''], ['MG_FIREBOLT', 5, ''], ['MG_COLDBOLT', 5, ''], ['MG_LIGHTNINGBOLT', 5, ''], ['SA_ADVANCEDBOOK', 5, ''], ['SA_FLAMELAUNCHER', 2, ''], ['SA_FROSTWEAPON', 2, ''], ['SA_LIGHTNINGLOADER', 2, ''], ['SA_SEISMICWEAPON', 2, ''], ['SA_VOLCANO', 5, ''], ['SA_DELUGE', 5, ''], ['SA_VIOLENTGALE', 5, ''], ['SA_LANDPROTECTOR', 5, ''], ['SA_DISPELL', 5, '']],
  equip: [{ fase: 'Final', itens: [1550, 2332, 2230, 2505], porque: '' }], cartas: [[4052, 'Capacete', '']], cuidados: ['Solo é fraco: só faça se for jogar em grupo.'],
},
// ---------------- ARQUEIRO ----------------
{
  id: 'cacador-armadilha', classe: 'Hunter', nome: 'Caçador — Armadilheiro (INT/DEX)', tags: ['up', 'masmorra'],
  caminho: ['Novice', 'Archer', 'Hunter'],
  resumo: 'Armadilha Explosiva causa dano de fogo em 9×9 e ignora a esquiva. Ótimo para grupos de monstros.',
  servidor: 'As 9 armadilhas de dano estão com selo "Funciona em combate". A Armadilha custa 150z na Loja de Ferramentas de Prontera. Dano de armadilha vem de DEX e INT, não do arco: barato de equipar.',
  porque: ['DEX e INT aumentam o dano das armadilhas.', 'AGI baixa: você não depende de velocidade de ataque.', 'VIT para aguentar quando o grupo encosta.'],
  fases: [
    { nv: '11–49 (Arqueiro)', stats: { str: 10, agi: 30, vit: 10, int: 20, dex: 55, luk: 1 }, foco: 'Rota do Arqueiro (Rajada de Flechas).', porque: '' },
    { nv: '50–99 (Caçador)', stats: { str: 15, agi: 30, vit: 40, int: 70, dex: 99, luk: 1 }, foco: 'Armadilha Explosiva 5, Instalar Mina 5, Armadilha Congelante.', porque: '' },
  ],
  skills: [['NV_BASIC', 9, ''], ['AC_OWL', 10, ''], ['AC_VULTURE', 5, ''], ['AC_DOUBLE', 10, ''], ['HT_SKIDTRAP', 1, ''], ['HT_LANDMINE', 5, ''], ['HT_ANKLESNARE', 5, ''], ['HT_SHOCKWAVE', 1, ''], ['HT_BLASTMINE', 5, ''], ['HT_CLAYMORETRAP', 5, 'A skill da build.'], ['HT_FREEZINGTRAP', 5, '']],
  equip: [{ fase: 'Final de loja', itens: [1714, 1065, 2330, 2226, 2505, 2627], porque: 'Armadilha (150z) é a "munição".' }],
  cartas: [[4052, 'Capacete', 'INT +2.'], [4064, 'Acessório', 'DES +3.']], cuidados: ['Calcule o custo: cada armadilha gasta itens. Compare com a versão Rajada.'],
},
{
  id: 'cacador-falcao', classe: 'Hunter', nome: 'Caçador — Falcão automático (LUK/DEX/INT)', tags: ['up'],
  caminho: ['Novice', 'Archer', 'Hunter'],
  resumo: 'O falcão dispara sozinho com chance baseada na LUK. Dano que ignora defesa e esquiva.',
  servidor: 'Ataque Aéreo tem selo "Funciona em combate" e dispara automaticamente nos ataques à distância: casa perfeita com o modo idle. O dano do falcão ignora a esquiva do monstro.',
  porque: ['LUK aumenta a chance de auto-falcão.', 'DEX e INT aumentam o dano do falcão (Garras de Aço também).', 'AGI um pouco: mais flechas = mais chances de falcão.'],
  fases: [{ nv: '50–99 (Caçador)', stats: { str: 1, agi: 50, vit: 20, int: 50, dex: 90, luk: 50 }, foco: 'Garras de Aço 10, Ataque Aéreo 5.', porque: '' }],
  skills: [['NV_BASIC', 9, ''], ['AC_OWL', 10, ''], ['AC_VULTURE', 10, ''], ['AC_DOUBLE', 5, ''], ['HT_BEASTBANE', 1, ''], ['HT_FALCON', 1, 'Requisito do falcão.'], ['HT_STEELCROW', 10, ''], ['HT_BLITZBEAT', 5, '']],
  equip: [{ fase: 'Final de loja', itens: [1714, 1750, 2330, 2226, 2505], porque: '' }], cartas: [[4001, 'Acessório', 'Poring: SOR +2.']], cuidados: ['Confirme que consegue o falcão (Adestrar Ave aparece como "sem efeito em combate").'],
},
// ---------------- GATUNO ----------------
{
  id: 'assassino-critico', classe: 'Assassin', nome: 'Assassino — Katar crítico (sem SP)', tags: ['up', 'zeny'],
  caminho: ['Novice', 'Thief', 'Assassin'],
  resumo: 'Katar dobra a chance de crítico. Muitos críticos com ataque normal, sem gastar SP.',
  servidor: 'No idle o SP acaba e a caçada para. Esta build não usa skill para matar. Há várias cartas de crítico que funcionam (Soldado Esqueleto, Soldadinho de Chumbo, Cobold) e caem de monstros baixos das rotas da wiki.',
  porque: ['LUK dá crítico (0,3% por ponto) e katar dobra.', 'AGI para velocidade e esquiva.', 'STR para dano por golpe. Crítico ignora a esquiva do monstro.'],
  fases: [
    { nv: '11–49 (Gatuno)', stats: { str: 35, agi: 50, vit: 10, int: 1, dex: 20, luk: 15 }, foco: 'Ataque Duplo 10, Esquiva 10.', porque: '' },
    { nv: '50–99 (Assassino)', stats: { str: 70, agi: 90, vit: 20, int: 1, dex: 35, luk: 55 }, foco: 'Perícia com Katar 10.', porque: '' },
  ],
  skills: [['NV_BASIC', 9, ''], ['TF_DOUBLE', 10, ''], ['TF_MISS', 10, ''], ['TF_POISON', 10, ''], ['AS_KATAR', 10, ''], ['AS_ENCHANTPOISON', 10, ''], ['AS_SONICACCEL', 1, '']],
  equip: [{ fase: 'Assassino', itens: [1250, 1254, 2335, 2226, 2505, 2627], porque: 'Jamadhar.' }],
  cartas: [[4086, 'Arma', 'Esqueleto Soldado: crítico +9.'], [4297, 'Arma', 'Soldadinho de Chumbo: +10% dano crítico.'], [4091, 'Arma', 'Cobold: crítico +4.'], [4006, 'Acessório', 'Lunático.']], cuidados: [],
},
{
  id: 'arruaceiro-arco', classe: 'Rogue', nome: 'Arruaceiro — Arco (Rajada + Furto)', tags: ['zeny', 'up'],
  caminho: ['Novice', 'Thief', 'Rogue'],
  resumo: 'Arruaceiro à distância. Tem Rajada de Flechas na árvore e mantém Afanar.',
  servidor: 'Rajada de Flechas e Olhos de Águia estão na árvore do Arruaceiro aqui. Atacar de longe no idle significa menos dano levado e menos poção gasta, e a parte de farm (Afanar) continua.',
  porque: ['DEX para dano de arco e acerto.', 'AGI para velocidade.', 'LUK um pouco para Afanar.'],
  fases: [{ nv: '50–99 (Arruaceiro)', stats: { str: 20, agi: 70, vit: 30, int: 1, dex: 95, luk: 20 }, foco: 'Rajada de Flechas 10, Olhos de Águia 10, Afanar.', porque: '' }],
  skills: [['NV_BASIC', 9, ''], ['TF_DOUBLE', 5, ''], ['TF_STEAL', 10, ''], ['TF_MISS', 5, ''], ['AC_VULTURE', 10, ''], ['AC_DOUBLE', 10, ''], ['RG_SNATCHER', 4, ''], ['RG_STEALCOIN', 10, '']],
  equip: [{ fase: 'Final de loja', itens: [1714, 1752, 2335, 2226, 2505], porque: '' }], cartas: [[4092, 'Arma', '']], cuidados: ['Mãos Leves só dispara em ataque corpo a corpo: a versão de arco depende do Afanar.'],
},
// ---------------- NOVIÇO ----------------
{
  id: 'sacerdote-batalha', classe: 'Priest', nome: 'Sacerdote — Batalha (maça)', tags: ['up'],
  caminho: ['Novice', 'Acolyte', 'Priest'],
  resumo: 'Bate de maça e se cura sozinho. Upa solo sem depender de grupo.',
  servidor: 'Sem grupo fixo, o Sacerdote suporte upa muito devagar no idle. Esta versão usa Perícia com Maça e os próprios buffs (Bênção, Aumentar Agilidade, Glória), todos com "Funciona em combate".',
  porque: ['STR e AGI para bater.', 'DEX para acertar.', 'INT baixa: só a Cura em si mesmo.'],
  fases: [{ nv: '50–99 (Sacerdote)', stats: { str: 80, agi: 75, vit: 35, int: 20, dex: 50, luk: 1 }, foco: 'Perícia com Maça 10, Impositio, Glória.', porque: '' }],
  skills: [['NV_BASIC', 9, ''], ['AL_DP', 10, ''], ['AL_DEMONBANE', 10, ''], ['AL_HEAL', 4, ''], ['AL_INCAGI', 10, ''], ['AL_BLESSING', 10, ''], ['PR_MACEMASTERY', 10, ''], ['PR_IMPOSITIO', 5, ''], ['PR_GLORIA', 5, ''], ['PR_KYRIE', 5, '']],
  equip: [{ fase: 'Final de loja', itens: [1513, 1522, 2325, 2216, 2505], porque: 'Maça de Guerra / Atordoador.' }], cartas: [[4092, 'Arma', '']], cuidados: [],
},
// ---------------- MERCADOR ----------------
{
  id: 'ferreiro-carrinho', classe: 'Blacksmith', nome: 'Ferreiro — Cavalo-de-Pau (área)', tags: ['zeny', 'up'],
  caminho: ['Novice', 'Merchant', 'Blacksmith'],
  resumo: 'Usa o carrinho cheio para bater em área. Quanto mais peso no carrinho, mais dano.',
  servidor: 'Cavalo-de-Pau funciona em combate e o carrinho é alugado na Kafra. Como todo zeny vem de loot, ter área + Superfaturar + carrinho para guardar drops encaixa bem com farm.',
  porque: ['STR para dano e carga.', 'DEX para acertar.', 'VIT porque você bate no meio do grupo.'],
  fases: [{ nv: '50–99 (Ferreiro)', stats: { str: 90, agi: 30, vit: 55, int: 20, dex: 55, luk: 1 }, foco: 'Usar Carrinho, Cavalo-de-Pau, Superfaturar, Força Violenta.', porque: 'INT 20 para o SP do Cavalo-de-Pau.' }],
  skills: [['NV_BASIC', 9, ''], ['MC_INCCARRY', 5, 'Requisito.'], ['MC_DISCOUNT', 3, 'Requisito.'], ['MC_OVERCHARGE', 10, ''], ['MC_PUSHCART', 10, 'Velocidade normal com carrinho.'], ['MC_CARTREVOLUTION', 1, 'A skill da build.'], ['MC_LOUD', 1, ''], ['BS_WEAPONRESEARCH', 5, ''], ['BS_HILTBINDING', 1, ''], ['BS_SKINTEMPER', 1, ''], ['BS_HAMMERFALL', 1, ''], ['BS_ADRENALINE', 5, ''], ['BS_OVERTHRUST', 5, '']],
  equip: [{ fase: 'Final de loja', itens: [1360, 2314, 2228, 2505, 2627], porque: '' }], cartas: [[4092, 'Arma', '']], cuidados: ['Confirme no jogo que o carrinho é alugado (Usar Carrinho aparece "sem efeito em combate", mas a página de Carrinho da wiki diz que o aluguel existe).'],
},
// ---------------- EXPANDIDAS ----------------
{
  id: 'superaprendiz-mago', classe: 'Supernovice', nome: 'Super Aprendiz — Mago (INT)', tags: ['up'],
  caminho: ['Novice', 'Supernovice'],
  resumo: 'Usa as magias do Mago com o conjunto do Anjo Guardião, que cai fácil.',
  servidor: 'O conjunto do Anjo (5 peças) cai a 30% de monstros de nível baixo nesta wiki: Mastering, Eclipse, Sapo-Cururu, Vocal e Lobo Errante. É o equipamento mais fácil de completar do servidor.',
  porque: ['INT/DEX como Mago.', 'VIT um pouco: o Super Aprendiz tem pouco HP.'],
  fases: [{ nv: '1–99', stats: { str: 1, agi: 1, vit: 40, int: 99, dex: 80, luk: 1 }, foco: 'Lanças 10, Aumentar Recuperação de SP.', porque: '' }],
  skills: [['NV_BASIC', 9, ''], ['MG_SRECOVERY', 10, ''], ['MG_FIREBOLT', 10, ''], ['MG_COLDBOLT', 10, ''], ['MG_LIGHTNINGBOLT', 10, ''], ['MG_SOULSTRIKE', 10, ''], ['MG_FROSTDIVER', 5, '']],
  equip: [{ fase: 'Anjo (drop fácil)', itens: [2116, 2355, 5125, 2420, 2521, 1610], porque: '' }], cartas: [[4052, 'Capacete', '']], cuidados: [],
},
{
  id: 'ninja-arremesso', classe: 'Ninja', nome: 'Ninja — Arremesso (DEX/STR)', tags: ['up'],
  caminho: ['Novice', 'Ninja'],
  resumo: 'Ataca de longe com Shuriken e Kunai elemental. Huuma em área.',
  servidor: 'Todas as 23 skills do Ninja funcionam em combate. Shuriken custa 8z e Kunai elemental 20z no Mestre de Munições de Prontera: munição barata para idle.',
  porque: ['DEX para dano à distância e acerto.', 'STR um pouco para Huuma.', 'AGI para velocidade.'],
  fases: [{ nv: '1–99', stats: { str: 50, agi: 60, vit: 30, int: 1, dex: 90, luk: 1 }, foco: 'Perícia com Shuriken 10, Arremessar Kunai 5, Arremessar Huuma 5.', porque: '' }],
  skills: [['NV_BASIC', 9, ''], ['NJ_TOBIDOUGU', 10, ''], ['NJ_SYURIKEN', 10, ''], ['NJ_KUNAI', 5, ''], ['NJ_HUUMA', 5, ''], ['NJ_UTSUSEMI', 5, '']],
  equip: [{ fase: 'Geral', itens: [13250, 13255, 13301, 2117], porque: '' }], cartas: [[4092, 'Arma', '']], cuidados: [],
},
{
  id: 'justiceiro-pistola', classe: 'Gunslinger', nome: 'Justiceiro — Pistola Desperado (área)', tags: ['up', 'masmorra'],
  caminho: ['Novice', 'Gunslinger'],
  resumo: 'Desperado atira em volta (13×13). Área à distância com projétil de 2z.',
  servidor: 'Desperado funciona em combate e só usa pistola (a wiki deixa isso claro). Projétil custa 2z. Área + munição barata = up rápido em mapas cheios.',
  porque: ['DEX para dano e acerto.', 'AGI para velocidade.', 'INT um pouco para o SP do Desperado (32–50).'],
  fases: [{ nv: '1–99', stats: { str: 1, agi: 60, vit: 40, int: 30, dex: 99, luk: 20 }, foco: 'Rajada Certeira 5, Desperado 10, Reação em Cadeia.', porque: '' }],
  skills: [['NV_BASIC', 9, ''], ['GS_GLITTERING', 5, ''], ['GS_SNAKEEYE', 10, ''], ['GS_CHAINACTION', 10, ''], ['GS_RAPIDSHOWER', 5, ''], ['GS_DESPERADO', 10, '']],
  equip: [{ fase: 'Geral', itens: [13100, 13102, 13200], porque: '' }], cartas: [[4092, 'Arma', '']], cuidados: [],
},
);

// "Por que essa build está aqui": motivo baseado no servidor
window.SERVIDOR = {
  'cavaleiro-tyr': 'As rotas da wiki levam o Cavaleiro a mapas de grupo (Ísis, High Orc, Mavka). Impacto de Tyr funciona em combate e mata vários de uma vez, e a própria rota diz que Tyr em grupo supera alvo único.',
  'templario-crux': 'Muitos mapas das rotas têm mortos-vivos e demônios. Crux Divinum é sagrado e funciona em combate. Bloqueio e Escudo Refletor também funcionam, então o Templário quase não morre no automático.',
  'bruxo-aoe': 'A conjuração do jogador não é interrompida neste servidor, o maior ponto fraco do Bruxo no clássico. Nevasca e Meteoros funcionam e as rotas da wiki usam mapas cheios (Strouf, Congelador, Rybio).',
  'sabio-bolt': 'Desejo Arcano (auto-magia) tem selo "Sem efeito em combate", o que mata o Sábio batedor clássico. Sobra a versão conjuradora, que funciona e tem Conjuração Livre.',
  'cacador-dex': 'É a build mais segura para idle: ataca de longe, flecha elemental custa 6z na loja e Ataque Aéreo dispara sozinho. A rota da wiki cobre do 50 ao 99.',
  'bardo-suporte': 'As 19 skills do Bardo funcionam em combate aqui. Grupo dá +10% EXP por membro, e as músicas aceleram o grupo inteiro.',
  'odalisca-suporte': 'Todas as danças funcionam em combate. Mesma lógica do Bardo, para personagem feminino.',
  'sacerdote-suporte': 'Grupo dá +10% de EXP por membro e divide EXP até 15 níveis de diferença. Kyrie, Magnificat e Glória funcionam. Teleporte e Portal não têm efeito, então não gaste pontos neles.',
  'sacerdote-tu': 'Anubis (rota final da wiki) e Glast Heim são cheios de mortos-vivos. Esconjurar mata na hora com chance, e a wiki recomenda testar a partir do 73.',
  'monge-combo': 'Combo Triplo dispara sozinho nos ataques normais: ideal para idle. Impacto Psíquico funciona e é forte contra os alvos de defesa alta da rota (Sleeper).',
  'ferreiro-zeny': 'Todo zeny do servidor vem de vender loot, e Superfaturar é a única skill que aumenta esse valor. O Ferreiro tem o melhor dano automático da linha Mercador e STR alta para carregar o loot.',
  'alquimista-acido': 'A wiki confirma: Terror Ácido não consome frasco neste servidor. Ganha Superfaturar do Mercador. A fabricação de poção não compensa (ver aba Zeny + Up).',
  'assassino-katar': 'Perícia com Mão Direita/Esquerda não tem efeito em combate, então a build de duas adagas perde metade do dano. Katar + Lâminas Destruidoras é a versão que funciona.',
  'arruaceiro-farm': 'Mãos Leves e Afanar funcionam em combate. Como monstro não dá zeny direto, os drops extras do Furto automático são renda pura.',
  'superaprendiz': 'O conjunto do Anjo Guardião cai a 30% de monstros fáceis aqui (escudo, armadura, chapéu, sapatos, capa). É o personagem mais barato de equipar no servidor.',
  'justiceiro-rifle': 'Todas as 22 skills do Justiceiro funcionam em combate. Projétil a 2z na loja: munição barata.',
  'ninja-magico': 'Todas as 23 skills do Ninja funcionam. Magia ninja não precisa de munição, e a conjuração não é interrompida aqui.',
  'taekwon-chutes': '16 das 17 skills funcionam (só Missão Taekwon não). Chutes por postura disparam nos ataques normais: combina com idle.',
};

// Builds clássicas que NÃO funcionam aqui
window.DESCARTADAS = [
  { nome: 'Assassino de duas adagas', motivo: 'Perícia com Mão Direita e com Mão Esquerda: "Sem efeito em combate". Com duas armas você perde até metade do ATK de cada mão.', troque: 'assassino-katar' },
  { nome: 'Cavaleiro/Templário Brandir Lança (montado)', motivo: 'Brandir Lança exige PecoPeco, e Montaria tem selo "Sem efeito em combate".', troque: 'cavaleiro-lanca' },
  { nome: 'Sábio auto-magia (Desejo Arcano)', motivo: 'Desejo Arcano e Abracadabra: "Sem efeito em combate".', troque: 'sabio-bolt' },
  { nome: 'Alquimista "pure poter" (fabricar e vender poção)', motivo: 'Preparar Poção tem selo "Sem efeito em combate". O NPC vende Poção Branca por 600z a qualquer um e compra a sua por 300z. Venda entre jogadores só com VIP dos dois lados.', troque: 'ferreiro-zeny' },
  { nome: 'Alquimista suporte de Homunculus (jogar poção)', motivo: 'Arremessar Poção: "Sem efeito em combate". As 16 skills do Homunculus: "Ainda não funciona".', troque: 'alquimista-homunculus' },
  { nome: 'Ferreiro forjador', motivo: 'Todas as Forjas, Trabalhar Ferro/Aço e Encontrar Minério: "Sem efeito em combate". Também não dá para vender a arma a outros sem VIP.', troque: 'ferreiro-zeny' },
  { nome: 'Mago/Bruxo com VIT alta "para não cortar a magia"', motivo: 'A conjuração do jogador não é interrompida neste servidor. Carta Fen e Borboleta Sanguinária ficam inúteis.', troque: 'bruxo-aoe' },
  { nome: 'Sacerdote/Noviço de Portal e Teleporte', motivo: 'Teleporte, Portal, Revelação e Aqua Benedicta: "Sem efeito em combate".', troque: 'sacerdote-suporte' },
  { nome: 'Cartas de elemento na armadura (Pasana, Ghostring, Bathory…)', motivo: 'Contra monstros, o elemento da armadura só vale para skills e magias, não para o ataque normal.', troque: null },
];

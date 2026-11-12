/* Builds do RO Classic Idle.
   Base: guias clássicos pré-renovação, filtrados pelas regras deste servidor (dados da wiki, 05/11/2026).
   Skills são referenciadas pelo código (o app mostra nome e selo do servidor).
   Itens são referenciados pelo ID (o app mostra nome, preço e onde dropa).
   stats de cada fase = alvo ao FIM da faixa de nível (o app confere se os pontos fecham). */

window.REGRAS = [
  { t: 'É idle: só conta skill com selo "Funciona em combate"', d: 'A luta é automática. Skill "Sem efeito em combate" pode ser aprendida mas não muda a caçada. Ex.: Perícia com Mão Direita/Esquerda (Assassino) não funciona, então a build de duas adagas morre aqui; Desejo Arcano (Sábio) também não.' },
  { t: 'Zeny vem só da venda de loot no NPC', d: 'Nenhum monstro dá Zeny direto. Por isso escolha mapa pelo drop que vende bem e leve espaço de peso. Superfaturar (Mercador) é a única forma de aumentar o valor de todo o loot.' },
  { t: 'Troca e loja de jogador são só VIP', d: 'Sem VIP você só vende para NPC. Isso derruba a ideia de "fabricar poção e vender para jogador": o NPC vende Poção Branca por 600z para todo mundo.' },
  { t: 'EXP cai com o nível', d: '100% até o nível 10, 50% do 11 ao 30, 20% do 31 ao 99. Praça de EXP (250%, 30 min/dia) e grupo (+10% por membro) são o que mais aceleram.' },
  { t: 'Refino até +10 nunca quebra', d: 'Do +5 ao +10 a falha pode rebaixar um nível, mas nunca destrói a peça. Arma comprada na loja + refino é o melhor custo/benefício. Seguro sem risco: arma nv1 até +7, nv2 até +6, nv3 até +5, nv4 até +4, armadura até +4. Elunium/Oridecon gastam 2 por tentativa e não são vendidos em loja.' },
  { t: 'Carta de elemento na armadura quase não serve', d: 'Pasana, Bathory, Ghostring, Angeling etc.: contra monstros, o elemento da armadura só vale para skills e magias, não para o ataque normal. Prefira Raydric (capa), Thara/Besouro-Chifre (escudo) e cartas de HP.' },
  { t: 'Conjuração não é interrompida', d: 'Neste servidor a conjuração do jogador já não é interrompida por dano. Carta Fen e Borboleta Sanguinária são inúteis; mago pode usar DEX/INT sem se preocupar com VIT para "não cortar".' },
  { t: 'Peso: 70% para a regeneração, 90% para as skills', d: 'Em caçada idle longa, o loot enche a mochila. Build física com pouca STR precisa de Armazém Kafra frequente. Cada STR = +30 de carga.' },
  { t: 'Resetar é caro', d: 'Hipnotizador: 1kk atributos, 1kk skills, 750k os dois (VIP paga metade). Planeje antes de distribuir.' },
  { t: 'Sem transcendência', d: 'As classes trans aparecem como "Em breve". O teto é 2ª classe nível 99.' },
  { t: 'Codex e cartas', d: 'O Codex dá atributos permanentes (até 20 em cada um) e pontos sobem com o nível base. Cartas só caem como drop lendário (raras): monte a build para funcionar sem elas e trate carta como bônus.' },
];

window.DUPLA = {
  titulo: 'Sugestão de dupla: 1 personagem para Zeny + 1 para Up/Masmorra',
  itens: [
    { papel: 'Zeny (secundário)', build: 'ferreiro-zeny', porque: 'Superfaturar 10 aumenta em até 24% tudo que você vende ao NPC, e aqui todo zeny vem de vender loot. O Ferreiro tem o melhor dano físico automático da linha Mercador (Adrenalina Pura + Força Violenta + Manejo Perfeito), tem STR alta (carga para muito loot) e não gasta munição.' },
    { papel: 'Zeny, alternativa', build: 'arruaceiro-farm', porque: 'Mãos Leves conjura Furto sozinho a cada golpe: são drops extras do próprio monstro. Afanar ainda tira zeny. Não precisa de Superfaturar e funciona 100% no automático.' },
    { papel: 'Up e masmorra (principal)', build: 'cacador-dex', porque: 'Ataque à distância apanha menos, flecha custa 6z, e o Falcão dispara sozinho sem gastar SP. É a classe mais "idle-friendly" para ficar horas no mapa sem morrer.' },
    { papel: 'Up e masmorra, alternativa', build: 'bruxo-aoe', porque: 'Nevasca e Chuva de Meteoros limpam grupos inteiros, e aqui a conjuração não é interrompida. Mais rápido em mapa cheio, mas gasta SP: leve Poções Azuis.' },
  ],
  nota: 'Por que não "Alquimista poter" para zeny: Preparar Poção aparece como "Sem efeito em combate" e a fabricação não é confirmada na wiki; mesmo funcionando, a Poção Branca vende ao NPC por 300z, o NPC vende a mesma poção por 600z a qualquer um, e a venda entre jogadores exige VIP dos dois lados. A margem é pequena e depende de farmar Erva Branca. O Alquimista de combate (Terror Ácido, que aqui não gasta frasco) é bom, mas o Ferreiro farma melhor no automático.',
};

const POCOES = [501, 502, 503, 504, 601];

window.BUILDS = [
// ============================== ESPADACHIM ==============================
{
  id: 'cavaleiro-tyr', classe: 'Knight', nome: 'Cavaleiro — Impacto de Tyr (Espada 2 mãos)', tags: ['up', 'masmorra'],
  caminho: ['Novice', 'Swordman', 'Knight'],
  resumo: 'Corpo a corpo com dano em área. Impacto de Tyr acerta o alvo e quem está em volta, e é a skill física de área mais forte do jogo clássico.',
  porque: [
    'STR é o dano. Impacto de Tyr escala com ATK, então cada 10 de STR dá bônus extra (pré-renovação: STR²/100).',
    'DEX garante acerto (HIT = nível + DEX). Monstro de masmorra 70+ tem esquiva alta; sem DEX você erra muito.',
    'VIT dá HP (+1% por ponto) e defesa, porque o Cavaleiro fica no meio do grupo. No idle, morrer custa tempo de caçada.',
    'AGI fica baixa: Rapidez com Duas Mãos já dá velocidade de ataque, e Tyr é skill (não depende de AGI).',
  ],
  fases: [
    { nv: '1–10 (Aprendiz)', stats: { str: 12, agi: 5, vit: 9, int: 1, dex: 10, luk: 1 }, foco: 'Habilidades Básicas 9. Bata em Poring/Lunático com a Faca da Conta.', porque: 'STR e DEX primeiro para matar rápido enquanto a EXP é 100%.' },
    { nv: '11–40 (Espadachim)', stats: { str: 40, agi: 10, vit: 25, int: 1, dex: 25, luk: 1 }, foco: 'Golpe Fulminante para matar, Aumentar Recuperação de HP para economizar poção.', porque: 'STR 40 dá o bônus de dano do degrau de 10. VIT 25 aguenta Zenorc e Soldadinhos.' },
    { nv: '41–49 (Espadachim)', stats: { str: 50, agi: 10, vit: 30, int: 1, dex: 30, luk: 1 }, foco: 'Pegue Job 40 com Impacto Explosivo e mude para Cavaleiro.', porque: 'Não fique no 1º job além do necessário: a 2ª classe é o grande salto.' },
    { nv: '50–70 (Cavaleiro)', stats: { str: 70, agi: 10, vit: 45, int: 10, dex: 45, luk: 1 }, foco: 'Impacto de Tyr 10 + Rapidez com Duas Mãos.', porque: 'INT 10 para a reserva de SP de Tyr (13 SP por uso). DEX 45 para acertar High Orc.' },
    { nv: '71–99 (Cavaleiro)', stats: { str: 90, agi: 10, vit: 70, int: 20, dex: 60, luk: 1 }, foco: 'Masmorras com grupos de monstros. Anubis com arma sagrada no fim.', porque: 'STR 90 (degrau de bônus). VIT 70 para aguentar Anubis e Medusa. INT 20 evita ficar sem SP.' },
  ],
  skills: [
    ['NV_BASIC', 9, 'Obrigatório para virar 1ª classe.'],
    ['SM_SWORD', 1, 'Pré-requisito.'], ['SM_TWOHAND', 10, '+ATK com espada de duas mãos e requisito de Rapidez.'],
    ['SM_BASH', 10, 'Dano principal até virar Cavaleiro.'], ['SM_RECOVERY', 10, 'Regenera HP no idle: menos gasto de poção.'],
    ['SM_MAGNUM', 5, 'Requisito de Impacto de Tyr.'], ['SM_PROVOKE', 5, 'Requisito de Vigor.'], ['SM_ENDURE', 1, 'Não para ao apanhar.'],
    ['KN_TWOHANDQUICKEN', 10, '+30% velocidade de ataque. É o que substitui a AGI.'],
    ['KN_BOWLINGBASH', 10, 'A skill da build: dano em área.'],
    ['KN_SPEARMASTERY', 1, 'Requisito de Perfurar.'], ['KN_PIERCE', 5, 'Requisito de Estocada/Brandir (opcional).'],
    ['KN_AUTOCOUNTER', 5, 'Contra-ataque crítico; sobra de pontos.'],
  ],
  equip: [
    { fase: 'Início', itens: [9000121, 1116, 2224, 2501, 2403], porque: 'Kataná (4.000z) é a melhor 2 mãos barata. Óculos de Proteção custam 40z e dão DEF 5.' },
    { fase: 'Provisório (nv 18–33)', itens: [1154, 2307, 2405, 2226], porque: 'Espada Bastarda [2] (45.000z, Einbroch) com 2 slots. Refine até +6 sem risco.' },
    { fase: 'Final de loja (nv 33+)', itens: [1157, 2314, 2228, 2505, 2627], porque: 'Espada de Duas Mãos [1] (120.000z, Einbroch). Cota de Malha DEF 8, Elmo DEF 6. Cinto [1] é acessório com slot vendido em loja.' },
    { fase: 'Sonho (drop)', itens: [1168, 1163], porque: 'Zweihander (Doppelganger MVP) e Claymore (Seyren Windsor).' },
  ],
  cartas: [
    [4092, 'Arma', 'Esqueleto Operário: +15% vs tamanho médio (a maioria dos monstros de masmorra).'],
    [4126, 'Arma', 'Minorous: +15% vs grande.'], [4035, 'Arma', 'Hidra: +20% vs Humanoide (Orcs).'],
    [4097, 'Armadura', 'Matyr / Peco Peco: +10% HP.'], [4133, 'Capa', 'Raydric: -20% dano Neutro (quase todo ataque de monstro).'],
    [4064, 'Acessório', 'Zerom: DES +3.'],
  ],
  cuidados: ['Espada de duas mãos não usa escudo: VIT compensa.', 'Impacto de Tyr gasta SP; leve Poções Azuis (50z) se faltar SP.'],
},
{
  id: 'templario-crux', classe: 'Crusader', nome: 'Templário — Crux Divinum (dano sagrado)', tags: ['up', 'masmorra'],
  caminho: ['Novice', 'Swordman', 'Crusader'],
  resumo: 'Tanque com dano sagrado. Crux Divinum mistura ATK e MATK e é forte contra mortos-vivos e demônios (Glast Heim, Payon).',
  porque: [
    'STR e INT juntas: Crux Divinum soma dano físico e mágico, então as duas contam.',
    'VIT alta porque o Templário usa escudo e aguenta muito. Bloqueio e Escudo Refletor funcionam em combate.',
    'DEX para acertar e para conjurar mais rápido.',
    'Elemento sagrado ignora a fraqueza que mortos-vivos têm contra arma neutra.',
  ],
  fases: [
    { nv: '1–10 (Aprendiz)', stats: { str: 12, agi: 1, vit: 10, int: 5, dex: 10, luk: 1 }, foco: 'Habilidades Básicas 9.', porque: 'Base para matar sozinho.' },
    { nv: '11–49 (Espadachim)', stats: { str: 45, agi: 1, vit: 35, int: 15, dex: 30, luk: 1 }, foco: 'Golpe Fulminante, Aumentar Recuperação de HP.', porque: 'Espadachim é físico: STR primeiro.' },
    { nv: '50–70 (Templário)', stats: { str: 55, agi: 1, vit: 55, int: 35, dex: 40, luk: 1 }, foco: 'Fé 10 (+HP), Crux Divinum, Bloqueio.', porque: 'Fé dá +200 HP por nível e resistência sagrada.' },
    { nv: '71–99 (Templário)', stats: { str: 72, agi: 1, vit: 82, int: 50, dex: 52, luk: 1 }, foco: 'Glast Heim (Raydric, Dark Frame), depois Anubis.', porque: 'VIT 80 + escudo: quase não morre. INT 50 sustenta Crux.' },
  ],
  skills: [
    ['NV_BASIC', 9, ''], ['SM_SWORD', 10, 'Espada de 1 mão com escudo.'], ['SM_RECOVERY', 10, 'Menos poção.'], ['SM_BASH', 10, 'Dano até a 2ª classe.'],
    ['SM_PROVOKE', 5, ''], ['SM_ENDURE', 1, ''],
    ['CR_TRUST', 10, '+HP e resistência sagrada.'], ['CR_AUTOGUARD', 10, 'Chance de bloquear ataques físicos.'],
    ['CR_HOLYCROSS', 10, 'A skill da build.'], ['CR_SHIELDCHARGE', 5, 'Requisito.'], ['CR_SHIELDBOOMERANG', 3, 'Requisito/ataque à distância.'],
    ['CR_REFLECTSHIELD', 10, 'Devolve dano corpo a corpo.'], ['CR_DEFENDER', 1, 'Opcional contra arqueiros.'],
  ],
  equip: [
    { fase: 'Início', itens: [9000121, 1107, 2101, 2224, 2501, 2403], porque: 'Lâmina + Vembrassa (escudo barato).' },
    { fase: 'Provisório', itens: [1122, 2103, 2309, 2405], porque: 'Sabre de Impacto [2] (48.000z, Prontera).' },
    { fase: 'Final de loja', itens: [1128, 2105, 2316, 2228, 2505], porque: 'Haedonggum, Escudo (DEF 6, Comodo), Armadura Metálica (DEF 10).' },
  ],
  cartas: [[4058, 'Escudo', 'Sapo de Thara: -30% dano de Humanoide.'], [4045, 'Escudo', 'Besouro-Chifre: -35% dano à distância.'], [4133, 'Capa', 'Raydric.'], [4031, 'Armadura', 'Peco Peco: +10% HP.']],
  cuidados: ['Crux Magnum (Grand Cross) gasta HP e é outra build (INT/VIT); não misture.', 'Redenção e Divina Providência não têm efeito em combate aqui: não gaste pontos nelas.'],
},
// ============================== MAGO ==============================
{
  id: 'bruxo-aoe', classe: 'Wizard', nome: 'Bruxo — Nevasca / Meteoros (área)', tags: ['up', 'masmorra'],
  caminho: ['Novice', 'Mage', 'Wizard'],
  resumo: 'O limpador de mapas. Magias em área matam grupos inteiros; ideal para up rápido em mapas cheios.',
  porque: [
    'INT é dano mágico (MATK) e SP. Cada magia escala direto com MATK.',
    'DEX reduz conjuração: 150 de DEX (somando bônus) zera o tempo de conjuração variável no pré-renovação. Aqui a conjuração não é interrompida, então DEX é puro ganho de velocidade.',
    'VIT um pouco para não morrer de um golpe. O resto vai para INT/DEX.',
    'AGI e STR inúteis: mago não bate.',
  ],
  fases: [
    { nv: '1–10 (Aprendiz)', stats: { str: 1, agi: 1, vit: 5, int: 15, dex: 12, luk: 1 }, foco: 'Habilidades Básicas 9.', porque: 'Já prepara INT para virar Mago.' },
    { nv: '11–49 (Mago)', stats: { str: 1, agi: 1, vit: 12, int: 57, dex: 40, luk: 1 }, foco: 'Lanças de Fogo/Gelo/Relâmpago 10, Rajada Congelante.', porque: 'Escolha o elemento contra o alvo: fogo em terra, vento em água.' },
    { nv: '50–70 (Bruxo)', stats: { str: 1, agi: 1, vit: 20, int: 77, dex: 57, luk: 1 }, foco: 'Nevasca 10, Trovão de Júpiter.', porque: 'Nevasca congela e mata em área.' },
    { nv: '71–99 (Bruxo)', stats: { str: 1, agi: 1, vit: 40, int: 99, dex: 88, luk: 1 }, foco: 'Chuva de Meteoros, Pântano dos Mortos.', porque: 'INT 99 e DEX ~85 (+bônus) chega perto de conjuração instantânea.' },
  ],
  skills: [
    ['NV_BASIC', 9, ''], ['MG_SRECOVERY', 10, 'Regeneração de SP: é o que sustenta o idle.'],
    ['MG_FIREBOLT', 10, ''], ['MG_COLDBOLT', 10, ''], ['MG_LIGHTNINGBOLT', 10, ''], ['MG_SOULSTRIKE', 10, 'Contra mortos-vivos/fantasmas.'],
    ['MG_FROSTDIVER', 10, ''], ['MG_THUNDERSTORM', 1, 'Requisito.'], ['MG_NAPALMBEAT', 4, 'Requisito.'], ['MG_FIREBALL', 5, 'Requisito.'],
    ['MG_SIGHT', 1, 'Requisito.'], ['MG_ENERGYCOAT', 1, 'Reduz dano gastando SP.'],
    ['WZ_STORMGUST', 10, 'A principal: área + congelamento.'], ['WZ_JUPITEL', 10, 'Alvo único forte.'], ['WZ_VERMILION', 10, 'Área de vento.'],
    ['WZ_METEOR', 10, 'Área de fogo.'], ['WZ_QUAGMIRE', 5, 'Deixa os monstros lentos.'], ['WZ_SIGHTRASHER', 1, 'Requisito.'], ['WZ_FIREPILLAR', 1, 'Requisito.'],
  ],
  equip: [
    { fase: 'Início', itens: [1601, 2301, 2501, 2403], porque: 'Bastão (100z) + roupas baratas.' },
    { fase: 'Provisório', itens: [1607, 2321, 2232, 2401], porque: 'Cajado [2] (19.000z). Manto de Seda DEFM +10 (Comodo).' },
    { fase: 'Final de loja', itens: [1610, 2332, 2230, 2505, 2627], porque: 'Cetro [1] (90.000z). Capacete de Schallern DEFM +3.' },
    { fase: 'Sonho (drop)', itens: [1614, 1616], porque: 'Bastão Xamista / Cajado do Vento.' },
  ],
  cartas: [[4022, 'Armadura', 'Esporo: VIT +2 (aguenta mais).'], [4100, 'Capa', 'Sohee: +15% SP.'], [4052, 'Capacete', 'Salgueiro Ancião: INT +2.'], [4064, 'Acessório', 'Zerom: DES +3 (conjuração).'], [4010, 'Escudo', 'Salgueiro: SP +80.']],
  cuidados: ['Barreira de Gelo não tem efeito em combate aqui.', 'Leve Poção Azul (50z). Sem SP o Bruxo não faz nada.'],
},
{
  id: 'sabio-bolt', classe: 'Sage', nome: 'Sábio — Magias de alvo + Fúria da Terra', tags: ['up'],
  caminho: ['Novice', 'Mage', 'Sage'],
  resumo: 'Mago de alvo único com Conjuração Livre e Estudo de Livros. Mais seguro que o Bruxo em mapas espalhados.',
  porque: [
    'INT/DEX como o Bruxo: dano e velocidade de conjuração.',
    'Desejo Arcano (auto-magia) NÃO tem efeito em combate aqui: a build clássica de Sábio batedor não funciona. Por isso só a versão conjuradora.',
    'Fúria da Terra e Coluna de Pedra dão opção de terra contra alvos de vento.',
    'Mudança Elemental e Encantar Arma ajudam o grupo.',
  ],
  fases: [
    { nv: '1–10 (Aprendiz)', stats: { str: 1, agi: 1, vit: 5, int: 15, dex: 12, luk: 1 }, foco: 'Habilidades Básicas.', porque: '' },
    { nv: '11–49 (Mago)', stats: { str: 1, agi: 1, vit: 12, int: 57, dex: 40, luk: 1 }, foco: 'Lanças 10 e Rajada Congelante.', porque: 'Mesma rota do Mago.' },
    { nv: '50–99 (Sábio)', stats: { str: 1, agi: 1, vit: 45, int: 99, dex: 85, luk: 1 }, foco: 'Estudo de Livros (livro como arma), Fúria da Terra 5.', porque: 'VIT um pouco maior que o Bruxo porque não mata em área.' },
  ],
  skills: [
    ['NV_BASIC', 9, ''], ['MG_SRECOVERY', 10, ''], ['MG_FIREBOLT', 10, ''], ['MG_COLDBOLT', 10, ''], ['MG_LIGHTNINGBOLT', 10, ''],
    ['MG_SOULSTRIKE', 10, ''], ['MG_FROSTDIVER', 5, ''],
    ['SA_ADVANCEDBOOK', 10, 'Velocidade e ATK com livro.'], ['SA_FREECAST', 10, 'Anda enquanto conjura.'], ['WZ_EARTHSPIKE', 5, ''], ['WZ_HEAVENDRIVE', 5, ''],
    ['SA_DRAGONOLOGY', 5, 'INT +1 e dano vs dragão.'], ['SA_FLAMELAUNCHER', 1, 'Requisito/grupo.'],
  ],
  equip: [
    { fase: 'Início', itens: [1601, 2301, 2501, 2403], porque: '' },
    { fase: 'Sábio', itens: [1550, 2321, 2232, 2627], porque: 'Livro [3] (60.000z, Prontera) com 3 slots.' },
    { fase: 'Final', itens: [1551, 2332, 2230, 2505], porque: 'Bíblia (Prontera) ou drop de Druida Maligno.' },
  ],
  cartas: [[4052, 'Capacete', 'Salgueiro Ancião: INT +2.'], [4100, 'Capa', 'Sohee.'], [4064, 'Acessório', 'Zerom.']],
  cuidados: ['Não gaste ponto em Desejo Arcano, Abracadabra, Cancelar Magia ou Criar Conversor: sem efeito em combate.'],
},
// ============================== ARQUEIRO ==============================
{
  id: 'cacador-dex', classe: 'Hunter', nome: 'Caçador — DEX/AGI Rajada + Falcão', tags: ['up', 'masmorra'],
  caminho: ['Novice', 'Archer', 'Hunter'],
  resumo: 'O mais seguro para idle. Ataca de longe, flecha custa 6z e o falcão dispara sozinho.',
  porque: [
    'DEX é tudo no arqueiro: ATK do arco, acerto e um pouco de velocidade. DEX 99 é obrigatório.',
    'AGI dá velocidade de ataque e esquiva: mais flechas por segundo e menos dano levado.',
    'LUK um pouco ajuda o Ataque Aéreo automático (a chance de auto-falcão cresce com LUK).',
    'Flecha elemental (fogo, água, vento, prata) é o seu "trocar de arma": compre na loja por 6z.',
  ],
  fases: [
    { nv: '1–10 (Aprendiz)', stats: { str: 1, agi: 10, vit: 1, int: 1, dex: 20, luk: 1 }, foco: 'Habilidades Básicas.', porque: '' },
    { nv: '11–49 (Arqueiro)', stats: { str: 10, agi: 40, vit: 10, int: 1, dex: 55, luk: 1 }, foco: 'Olhos de Coruja 10, Olhos de Águia, Rajada de Flechas 10.', porque: 'STR 10 só para carregar flechas e loot.' },
    { nv: '50–70 (Caçador)', stats: { str: 10, agi: 55, vit: 12, int: 1, dex: 77, luk: 5 }, foco: 'Garras de Aço, Ataque Aéreo, Flagelo das Feras.', porque: 'Les e High Orc com flecha certa.' },
    { nv: '71–99 (Caçador)', stats: { str: 15, agi: 80, vit: 35, int: 1, dex: 99, luk: 25 }, foco: 'Mavka, Congelador, Anubis com flecha de prata.', porque: 'DEX 99 fecha o dano. VIT 25 para sobreviver a Anubis.' },
  ],
  skills: [
    ['NV_BASIC', 9, ''], ['AC_OWL', 10, '+DES (dano e acerto).'], ['AC_VULTURE', 10, '+alcance e acerto.'], ['AC_CONCENTRATION', 10, 'Buff de AGI/DES.'],
    ['AC_DOUBLE', 10, 'Dano principal.'], ['AC_SHOWER', 1, 'Opcional/requisito.'], ['AC_CHARGEARROW', 1, 'Empurrão.'],
    ['HT_BEASTBANE', 10, 'Dano vs Bruto/Inseto.'], ['HT_FALCON', 1, 'Requisito do falcão (sem efeito por si só).'],
    ['HT_STEELCROW', 10, 'Dano do falcão.'], ['HT_BLITZBEAT', 5, 'Falcão automático.'], ['HT_DETECTING', 1, ''],
    ['HT_SKIDTRAP', 1, 'Requisito.'], ['HT_LANDMINE', 1, 'Requisito.'], ['HT_ANKLESNARE', 5, 'Prende o monstro.'],
  ],
  equip: [
    { fase: 'Início', itens: [1704, 1750, 2224, 2501, 2403], porque: 'Arco Composto [3] (5.000z). Flecha normal 2z.' },
    { fase: 'Provisório', itens: [1710, 1752, 1754, 2307, 2405], porque: 'Besta [2] (34.000z). Flechas de fogo e cristal (água) 6z.' },
    { fase: 'Final de loja', itens: [1714, 1751, 1755, 2330, 2226, 2505, 2627], porque: 'Gakkung [1] (84.000z). Malha (+1 DES). Flecha de prata contra Anubis/mortos-vivos.' },
    { fase: 'Sonho (drop)', itens: [1716, 1737], porque: 'Gakkung [2] (Lady Tanee) / Asas de Ixion.' },
  ],
  cartas: [[4092, 'Arma', 'Esqueleto Operário (médio).'], [4094, 'Capa/Acessório*', 'Esqueleto Arqueiro: +10% dano à distância.'], [4064, 'Acessório', 'Zerom: DES +3.'], [4004, 'Acessório', 'Drops: DES +1.'], [4133, 'Capa', 'Raydric.']],
  cuidados: ['Adestrar Ave aparece como "sem efeito em combate": confirme no jogo que o falcão é alugado. Se não for, a build segue forte só com Rajada.', 'Arco sem flecha não ataca: configure reposição no idle.'],
},
{
  id: 'bardo-suporte', classe: 'Bard', nome: 'Bardo — Flecha Melódica + músicas', tags: ['suporte', 'grupo'],
  caminho: ['Novice', 'Archer', 'Bard'],
  resumo: 'Atirador com instrumento e músicas para o grupo. Só personagem masculino.',
  porque: ['DEX/AGI como arqueiro para a Flecha Melódica.', 'INT um pouco para o SP das músicas.', 'Brilha em grupo (Crepúsculo Sangrento dá velocidade de ataque; Poema de Bragi reduz conjuração).'],
  fases: [
    { nv: '1–49 (Arqueiro)', stats: { str: 10, agi: 40, vit: 10, int: 1, dex: 55, luk: 1 }, foco: 'Rota do Arqueiro.', porque: '' },
    { nv: '50–99 (Bardo)', stats: { str: 15, agi: 72, vit: 36, int: 32, dex: 99, luk: 1 }, foco: 'Lições de Música 10, Flecha Melódica 5, uma música principal.', porque: 'Solo: Flecha Melódica. Grupo: Crepúsculo/Bragi.' },
  ],
  skills: [['NV_BASIC', 9, ''], ['AC_OWL', 10, ''], ['AC_VULTURE', 10, ''], ['AC_DOUBLE', 10, ''], ['AC_CONCENTRATION', 5, ''],
    ['BA_MUSICALLESSON', 10, ''], ['BA_MUSICALSTRIKE', 5, ''], ['BA_ASSASSINCROSS', 10, 'Velocidade de ataque do grupo.'], ['BA_POEMBRAGI', 10, 'Conjuração do grupo.'], ['BA_WHISTLE', 1, 'Requisito.'], ['BA_DISSONANCE', 1, 'Requisito.'], ['BD_ADAPTATION', 1, ''], ['BD_ENCORE', 1, '']],
  equip: [{ fase: 'Bardo', itens: [1907, 1752, 2330, 2226, 2405], porque: 'Violão (94.000z): maior ATK de loja.' }],
  cartas: [[4092, 'Arma', ''], [4064, 'Acessório', '']], cuidados: ['Solo é mais lento que o Caçador. Escolha Bardo se for jogar em grupo.'],
},
{
  id: 'odalisca-suporte', classe: 'Dancer', nome: 'Odalisca — Estilingue + danças', tags: ['suporte', 'grupo'],
  caminho: ['Novice', 'Archer', 'Dancer'],
  resumo: 'Versão feminina do Bardo, com chicote. Só personagem feminino.',
  porque: ['DEX/AGI para o Estilingue.', 'Danças de suporte (Dança Cigana reduz SP, Beijo da Sorte dá crítico).'],
  fases: [
    { nv: '1–49 (Arqueira)', stats: { str: 10, agi: 40, vit: 10, int: 1, dex: 55, luk: 1 }, foco: 'Rota do Arqueiro.', porque: '' },
    { nv: '50–99 (Odalisca)', stats: { str: 15, agi: 72, vit: 36, int: 32, dex: 99, luk: 1 }, foco: 'Lições de Dança 10, Estilingue 5.', porque: '' },
  ],
  skills: [['NV_BASIC', 9, ''], ['AC_OWL', 10, ''], ['AC_VULTURE', 10, ''], ['AC_DOUBLE', 10, ''], ['DC_DANCINGLESSON', 10, ''], ['DC_THROWARROW', 5, ''], ['DC_SERVICEFORYOU', 10, ''], ['DC_FORTUNEKISS', 10, ''], ['DC_HUMMING', 1, 'Requisito.']],
  equip: [{ fase: 'Odalisca', itens: [1956, 1752, 2330, 2226, 2405], porque: 'Azorrague (64.000z, Comodo).' }],
  cartas: [[4092, 'Arma', ''], [4064, 'Acessório', '']], cuidados: ['Assim como o Bardo, rende mais em grupo.'],
},
// ============================== NOVIÇO ==============================
{
  id: 'sacerdote-suporte', classe: 'Priest', nome: 'Sacerdote — Suporte (INT/DEX/VIT)', tags: ['suporte', 'grupo'],
  caminho: ['Novice', 'Acolyte', 'Priest'],
  resumo: 'Curador e buffer. Torna qualquer grupo muito mais rápido e seguro.',
  porque: ['INT aumenta a Cura e o SP.', 'DEX reduz conjuração.', 'VIT para sobreviver: o suporte morre e o grupo inteiro para.'],
  fases: [
    { nv: '1–49 (Noviço)', stats: { str: 1, agi: 1, vit: 20, int: 50, dex: 30, luk: 1 }, foco: 'Curar, Bênção, Aumentar Agilidade, Proteção Divina.', porque: 'Use maça para matar sozinho até o grupo.' },
    { nv: '50–99 (Sacerdote)', stats: { str: 1, agi: 1, vit: 60, int: 92, dex: 80, luk: 1 }, foco: 'Kyrie Eleison, Magnificat, Glória, Santuário, Impositio.', porque: '' },
  ],
  skills: [['NV_BASIC', 9, ''], ['AL_HEAL', 10, ''], ['AL_BLESSING', 10, ''], ['AL_INCAGI', 10, ''], ['AL_DP', 10, ''], ['AL_ANGELUS', 5, ''], ['AL_CURE', 1, ''], ['AL_PNEUMA', 1, ''],
    ['PR_KYRIE', 10, ''], ['PR_MAGNIFICAT', 5, 'Dobra regeneração de SP.'], ['PR_GLORIA', 5, ''], ['PR_IMPOSITIO', 5, ''], ['PR_SUFFRAGIUM', 3, ''], ['PR_SANCTUARY', 10, ''], ['PR_LEXAETERNA', 1, 'Dobra o próximo dano.'], ['PR_ASPERSIO', 5, '']],
  equip: [{ fase: 'Início', itens: [1501, 2323, 2216, 2403], porque: 'Clava (240z), Escapulário, Solidéu (Freira de Prontera).' }, { fase: 'Final de loja', itens: [1513, 2325, 2216, 2505, 2608], porque: 'Manto Sagrado, Rosário.' }],
  cartas: [[4052, 'Capacete', 'INT +2.'], [4100, 'Capa', ''], [4031, 'Armadura', 'HP +10%.']],
  cuidados: ['Teleporte, Portal, Revelação e Aqua Benedicta não têm efeito em combate aqui. Pneuma pede Portal 4 como requisito.', 'Ressuscitar não tem efeito em combate.'],
},
{
  id: 'sacerdote-tu', classe: 'Priest', nome: 'Sacerdote — Esconjurar/Magnus (caçador de mortos-vivos)', tags: ['up', 'masmorra'],
  caminho: ['Novice', 'Acolyte', 'Priest'],
  resumo: 'Sacerdote que upa sozinho matando mortos-vivos (Payon, Glast Heim, Anubis).',
  porque: ['INT para Magnus Exorcismus e SP.', 'LUK aumenta a chance de Esconjurar matar na hora.', 'DEX para conjurar rápido. VIT para aguentar as tentativas.'],
  fases: [
    { nv: '1–49 (Noviço)', stats: { str: 1, agi: 1, vit: 20, int: 50, dex: 30, luk: 1 }, foco: 'Luz Divina (missão base 31/job 30), Flagelo do Mal.', porque: '' },
    { nv: '50–99 (Sacerdote)', stats: { str: 1, agi: 1, vit: 50, int: 92, dex: 70, luk: 40 }, foco: 'Esconjurar 10, Magnus 10.', porque: 'LUK 40 para Esconjurar. Rota da wiki: Firelock → gl_church → Anubis.' },
  ],
  skills: [['NV_BASIC', 9, ''], ['AL_HEAL', 10, ''], ['AL_BLESSING', 10, ''], ['AL_INCAGI', 1, ''], ['AL_DP', 10, ''], ['AL_DEMONBANE', 10, ''], ['AL_HOLYLIGHT', 1, ''], ['AL_CRUCIS', 4, ''],
    ['PR_TURNUNDEAD', 10, ''], ['PR_MAGNUS', 10, ''], ['PR_LEXAETERNA', 1, ''], ['PR_KYRIE', 10, ''], ['PR_MAGNIFICAT', 5, ''], ['PR_IMPOSITIO', 1, '']],
  equip: [{ fase: 'Final de loja', itens: [1513, 2325, 2216, 2505, 2608], porque: '' }],
  cartas: [[4052, 'Capacete', ''], [4031, 'Armadura', '']], cuidados: ['Magnus gasta Gema Azul no clássico; a carta Abelha-Rainha diz que no beta nenhuma skill gasta gema. Confirme no jogo.'],
},
{
  id: 'monge-combo', classe: 'Monk', nome: 'Monge — Combo (STR/AGI/DEX)', tags: ['up', 'masmorra'],
  caminho: ['Novice', 'Acolyte', 'Monk'],
  resumo: 'Corpo a corpo veloz com Combo Triplo automático e Impacto Psíquico contra defesa alta.',
  porque: ['STR para dano.', 'AGI para velocidade (Combo Triplo dispara em ataques normais).', 'DEX para acertar.', 'Impacto Psíquico causa mais dano quanto MAIOR a defesa do alvo: ótimo contra Sleeper, Golem.'],
  fases: [
    { nv: '1–49 (Noviço de batalha)', stats: { str: 40, agi: 40, vit: 10, int: 1, dex: 20, luk: 1 }, foco: 'Maça, Bênção, Aumentar Agilidade, Flagelo do Mal.', porque: 'Noviço com STR/AGI mata sozinho.' },
    { nv: '50–99 (Monge)', stats: { str: 82, agi: 82, vit: 32, int: 10, dex: 52, luk: 1 }, foco: 'Punhos de Ferro 10, Combo Triplo 10, Cair das Pétalas, Impacto Psíquico 5.', porque: '' },
  ],
  skills: [['NV_BASIC', 9, ''], ['AL_DP', 10, ''], ['AL_DEMONBANE', 10, ''], ['AL_HEAL', 3, ''], ['AL_INCAGI', 10, ''], ['AL_BLESSING', 10, ''],
    ['MO_IRONHAND', 10, ''], ['MO_CALLSPIRITS', 5, ''], ['MO_TRIPLEATTACK', 10, ''], ['MO_DODGE', 10, ''], ['MO_INVESTIGATE', 5, ''], ['MO_SPIRITSRECOVERY', 5, ''], ['MO_CHAINCOMBO', 5, ''], ['MO_COMBOFINISH', 3, '']],
  equip: [{ fase: 'Noviço', itens: [1505, 1504, 2224, 2501, 2403], porque: 'Maça (3.200z).' }, { fase: 'Monge', itens: [1805, 1807, 2335, 2226, 2505], porque: 'Soco Inglês [2] (64.000z) ou Punho (106.000z), Einbroch.' }],
  cartas: [[4092, 'Arma', ''], [4035, 'Arma', ''], [4031, 'Armadura', ''], [4133, 'Capa', '']], cuidados: ['Punho Supremo de Asura não é bom para farm contínuo: gasta todo o SP.'],
},
// ============================== MERCADOR ==============================
{
  id: 'ferreiro-zeny', classe: 'Blacksmith', nome: 'Ferreiro — Farmador de Zeny (AGI/STR/DEX)', tags: ['zeny', 'up'],
  caminho: ['Novice', 'Merchant', 'Blacksmith'],
  resumo: 'Personagem de zeny: bate rápido no automático, carrega muito loot e vende com Superfaturar.',
  porque: [
    'Superfaturar 10: até +24% na venda ao NPC. Como todo zeny aqui é loot vendido, isso multiplica a renda inteira. (Teto: nenhum item vende acima do menor preço de compra.)',
    'STR para dano e carga (+30 por ponto). Ferreiro farmador precisa de espaço para loot.',
    'AGI para velocidade de ataque: Adrenalina Pura (+velocidade com machado/maça) + AGI = muitos golpes.',
    'DEX para acertar. Manejo Perfeito tira a penalidade de tamanho e Força Violenta aumenta o dano.',
  ],
  fases: [
    { nv: '1–10 (Aprendiz)', stats: { str: 12, agi: 8, vit: 5, int: 1, dex: 10, luk: 1 }, foco: 'Habilidades Básicas.', porque: '' },
    { nv: '11–49 (Mercador)', stats: { str: 45, agi: 30, vit: 15, int: 1, dex: 25, luk: 1 }, foco: 'Aumentar Capacidade 5 → Desconto 3 → Superfaturar 10 → Usar Carrinho 10 (no 10 o carrinho não reduz a velocidade). Mammonita só se sobrar zeny.', porque: 'Faça Superfaturar cedo: todo loot vendido daqui em diante rende mais.' },
    { nv: '50–70 (Ferreiro)', stats: { str: 60, agi: 50, vit: 25, int: 1, dex: 40, luk: 1 }, foco: 'Adrenalina Pura 5, Perícia em Armamento, Força Violenta.', porque: '' },
    { nv: '71–99 (Ferreiro)', stats: { str: 82, agi: 78, vit: 36, int: 1, dex: 58, luk: 1 }, foco: 'Manejo Perfeito, Amplificar Poder. Mapas de bom loot.', porque: 'STR 80 = +2400 de carga para loot.' },
  ],
  skills: [
    ['NV_BASIC', 9, ''], ['MC_INCCARRY', 3, 'Requisito (e mais carga, confirme no jogo).'], ['MC_DISCOUNT', 3, 'Requisito.'],
    ['MC_OVERCHARGE', 10, 'O motor do zeny. Teste no jogo: venda um item antes e depois de aprender.'],
    ['MC_PUSHCART', 10, 'Deixe no 10: abaixo disso o carrinho reduz a velocidade de movimento. Também dá espaço para loot e é requisito de Cavalo-de-Pau.'], ['MC_MAMMONITE', 5, 'Dano extra, mas gasta zeny por golpe.'], ['MC_LOUD', 1, 'STR +4.'],
    ['BS_HILTBINDING', 1, 'STR +1, ATK +4.'], ['BS_WEAPONRESEARCH', 10, '+ATK e +acerto.'], ['BS_SKINTEMPER', 1, 'Requisito.'],
    ['BS_HAMMERFALL', 1, 'Requisito.'], ['BS_ADRENALINE', 5, 'Velocidade de ataque com machado/maça.'], ['BS_WEAPONPERFECT', 5, 'Sem penalidade de tamanho.'],
    ['BS_OVERTHRUST', 5, '+ATK.'], ['BS_MAXIMIZE', 5, 'Dano máximo sempre.'],
  ],
  equip: [
    { fase: 'Início', itens: [9000121, 1301, 2224, 2501, 2403], porque: 'Machado [3] (1.000z).' },
    { fase: 'Provisório', itens: [1354, 2307, 2405, 2226], porque: 'Marreta [2] (31.000z, Einbroch).' },
    { fase: 'Final de loja', itens: [1360, 2314, 2228, 2505, 2627], porque: 'Machado de Duas Mãos [1] (110.000z).' },
    { fase: 'Sonho (drop)', itens: [1364, 1387], porque: 'Machado Impetuoso / Machado Gigante.' },
  ],
  cartas: [[4092, 'Arma', ''], [4126, 'Arma', ''], [4233, 'Armadura', 'Leopardo Filhote: SOR +3 e armadura indestrutível (Mercador).'], [4133, 'Capa', '']],
  cuidados: ['Forjas, Encontrar Minério, Ganância e Consertar Armas não têm efeito em combate aqui: não gaste pontos.', 'Quase todas as skills de Mercador (exceto Mammonita, Cavalo-de-Pau, Grito de Guerra) têm selo "Sem efeito em combate". Superfaturar é passiva de venda: confirme no balcão.'],
},
{
  id: 'alquimista-acido', classe: 'Alchemist', nome: 'Alquimista — Terror Ácido (STR/DEX/INT)', tags: ['up', 'zeny'],
  caminho: ['Novice', 'Merchant', 'Alchemist'],
  resumo: 'Alquimista de combate. Terror Ácido ignora a defesa do monstro e, aqui, não gasta frasco.',
  porque: [
    'Terror Ácido não consome Frasco de Ácido neste servidor (nota da wiki): dano alto sem custo de material.',
    'STR e DEX aumentam o dano do Terror Ácido; INT dá SP para usá-lo sem parar.',
    'Também tem Superfaturar (vem do Mercador), então serve de farmador de zeny.',
    'Homunculus funciona em combate e ajuda a matar.',
  ],
  fases: [
    { nv: '11–49 (Mercador)', stats: { str: 40, agi: 15, vit: 20, int: 10, dex: 30, luk: 1 }, foco: 'Superfaturar 10 cedo.', porque: '' },
    { nv: '50–99 (Alquimista)', stats: { str: 80, agi: 20, vit: 55, int: 45, dex: 70, luk: 1 }, foco: 'Pesquisa de Poções 5 (requisito), Terror Ácido 5, Homunculus.', porque: 'Rota da wiki: Argiope → High Orc → Rybio → Medusa.' },
  ],
  skills: [['NV_BASIC', 9, ''], ['MC_INCCARRY', 3, ''], ['MC_DISCOUNT', 3, ''], ['MC_OVERCHARGE', 10, ''], ['MC_PUSHCART', 3, ''],
    ['AM_AXEMASTERY', 10, ''], ['AM_LEARNINGPOTION', 5, 'Requisito.'], ['AM_PHARMACY', 6, 'Requisito de Monstro Planta (sem efeito em combate).'], ['AM_ACIDTERROR', 5, 'A skill da build.'], ['AM_DEMONSTRATION', 5, 'Fogo em área.'], ['AM_REST', 1, ''], ['AM_CALLHOMUN', 1, ''], ['AM_RESURRECTHOMUN', 1, '']],
  equip: [{ fase: 'Final de loja', itens: [1360, 2314, 2228, 2505, 2627], porque: '' }],
  cartas: [[4092, 'Arma', ''], [4233, 'Armadura', '']],
  cuidados: ['Não espere lucro de Preparar Poção: sem efeito em combate e sem mercado (veja Regras).'],
},
// ============================== GATUNO ==============================
{
  id: 'assassino-katar', classe: 'Assassin', nome: 'Assassino — Katar + Lâminas Destruidoras', tags: ['up', 'masmorra'],
  caminho: ['Novice', 'Thief', 'Assassin'],
  resumo: 'Katar com Lâminas Destruidoras (Sonic Blow). A build de duas adagas NÃO funciona aqui.',
  porque: [
    'Perícia com Mão Direita/Esquerda tem selo "Sem efeito em combate": com duas armas você perde metade do ATK. Por isso katar.',
    'STR para dano das Lâminas Destruidoras.',
    'AGI para velocidade e esquiva (o Assassino não tem VIT para aguentar).',
    'DEX para acertar.',
  ],
  fases: [
    { nv: '1–10', stats: { str: 10, agi: 12, vit: 1, int: 1, dex: 8, luk: 1 }, foco: '', porque: '' },
    { nv: '11–49 (Gatuno)', stats: { str: 38, agi: 50, vit: 10, int: 1, dex: 24, luk: 1 }, foco: 'Ataque Duplo 10, Perícia em Esquiva 10.', porque: '' },
    { nv: '50–99 (Assassino)', stats: { str: 80, agi: 90, vit: 25, int: 10, dex: 45, luk: 1 }, foco: 'Perícia com Katar 10, Lâminas Destruidoras 10, Envenenar Arma.', porque: 'INT 10 para o SP das Lâminas.' },
  ],
  skills: [['NV_BASIC', 9, ''], ['TF_DOUBLE', 10, 'Com adaga no 1º job.'], ['TF_MISS', 10, 'Esquiva.'], ['TF_POISON', 10, 'Requisito.'], ['TF_STEAL', 1, ''], ['TF_HIDING', 1, ''],
    ['AS_KATAR', 10, ''], ['AS_SONICBLOW', 10, 'A skill da build.'], ['AS_ENCHANTPOISON', 5, ''], ['AS_CLOAKING', 2, 'Requisito.'], ['AS_GRIMTOOTH', 5, 'Ataque escondido em área.']],
  equip: [
    { fase: 'Gatuno', itens: [9000121, 1216, 2224, 2501, 2403], porque: 'Stiletto [2] (39.000z).' },
    { fase: 'Assassino', itens: [1250, 1254, 2335, 2226, 2505, 2627], porque: 'Jur [2] (39.000z) → Jamadhar (74.400z). Traje de Gatuno (AGI +1).' },
  ],
  cartas: [[4092, 'Arma', ''], [4035, 'Arma', ''], [4133, 'Capa', ''], [4285, 'Capa', 'Choco: esquiva.']],
  cuidados: ['Nunca invista em Perícia com Mão Direita/Esquerda.'],
},
{
  id: 'arruaceiro-farm', classe: 'Rogue', nome: 'Arruaceiro — Farm (Mãos Leves + Afanar)', tags: ['zeny', 'up'],
  caminho: ['Novice', 'Thief', 'Rogue'],
  resumo: 'O farmador que pega drops extras sozinho. Mãos Leves conjura Furto automaticamente a cada golpe.',
  porque: [
    'Mãos Leves (até 20%) dispara Furto automaticamente: cada monstro pode dar um drop extra antes de morrer.',
    'Afanar tira zeny do monstro. DEX e LUK aumentam a chance de Furto e Afanar.',
    'STR/AGI para matar rápido com adaga (Ataque Duplo).',
    'Plágio funciona: copia a última skill que o monstro usou em você.',
  ],
  fases: [
    { nv: '11–49 (Gatuno)', stats: { str: 35, agi: 45, vit: 10, int: 1, dex: 35, luk: 1 }, foco: 'Ataque Duplo 10, Furto 10.', porque: 'Furto 10 = 62% de chance base.' },
    { nv: '50–99 (Arruaceiro)', stats: { str: 72, agi: 80, vit: 32, int: 1, dex: 62, luk: 22 }, foco: 'Mãos Leves 10, Afanar, Apunhalar.', porque: 'Rota da wiki: Les → ein_dun01 → Seal/Galapago → Congelador → Medusa.' },
  ],
  skills: [['NV_BASIC', 9, ''], ['TF_DOUBLE', 10, ''], ['TF_MISS', 10, ''], ['TF_STEAL', 10, 'Base de Mãos Leves.'], ['TF_HIDING', 1, ''],
    ['RG_SNATCHER', 10, 'Furto automático.'], ['RG_STEALCOIN', 10, 'Zeny do monstro.'], ['RG_BACKSTAP', 10, ''], ['RG_RAID', 5, ''], ['RG_INTIMIDATE', 5, ''], ['RG_PLAGIARISM', 5, '']],
  equip: [{ fase: 'Gatuno', itens: [1216, 2224, 2501, 2403], porque: '' }, { fase: 'Arruaceiro', itens: [1222, 1219, 2335, 2226, 2505, 2627], porque: 'Damascus [1] (98.000z) ou Gladius [2].' }],
  cartas: [[4092, 'Arma', ''], [4426, 'Armadura', 'Byorgue: +10% ATQ para Arruaceiro.'], [4133, 'Capa', '']],
  cuidados: ['Túnel de Fuga, Graffiti, Faxina, Malandragem e Extorquir não têm efeito em combate.'],
},
// ============================== CLASSES EXPANDIDAS ==============================
{
  id: 'superaprendiz', classe: 'Supernovice', nome: 'Super Aprendiz — AGI/STR', tags: ['up'],
  caminho: ['Novice', 'Supernovice'],
  resumo: 'Usa skills de várias 1ª classes. O conjunto do Anjo Guardião cai fácil e é exclusivo dele.',
  porque: ['STR/AGI/DEX com adaga e Ataque Duplo.', 'O Conjunto do Anjo cai a 30% de monstros fracos: Mastering (escudo), Eclipse (armadura), Sapo-Cururu (chapéu), Vocal (sapatos), Lobo Errante (capa).', 'É a classe mais barata de equipar.'],
  fases: [{ nv: '1–99', stats: { str: 75, agi: 80, vit: 42, int: 1, dex: 52, luk: 1 }, foco: 'Ataque Duplo 10, Perícia em Esquiva, Golpe Fulminante, Aumentar Recuperação de HP.', porque: '' }],
  skills: [['NV_BASIC', 9, ''], ['TF_DOUBLE', 10, ''], ['TF_MISS', 10, ''], ['SM_RECOVERY', 10, ''], ['SM_BASH', 5, ''], ['SM_SWORD', 10, '']],
  equip: [{ fase: 'Anjo (drop fácil)', itens: [2116, 2355, 5125, 2420, 2521], porque: 'Todos a 30% de drop.' }, { fase: 'Arma', itens: [1216, 1219], porque: '' }],
  cartas: [[4092, 'Arma', '']], cuidados: [],
},
{
  id: 'justiceiro-rifle', classe: 'Gunslinger', nome: 'Justiceiro — Rifle/Espingarda DEX', tags: ['up', 'masmorra'],
  caminho: ['Novice', 'Gunslinger'],
  resumo: 'Atirador de 1ª classe expandida, com muitas skills funcionando. Dano à distância alto.',
  porque: ['DEX é dano e acerto das armas de fogo.', 'AGI para velocidade. Rastrear o Alvo e Ataque Concentrado dão dano de alvo único.', 'Espingarda + Desperado/Disparo Espalhado para área.'],
  fases: [{ nv: '1–99', stats: { str: 15, agi: 75, vit: 40, int: 1, dex: 99, luk: 30 }, foco: 'Olhos de Serpente 10, Rastrear o Alvo 10, Ataque Concentrado.', porque: 'LUK para Cara ou Coroa.' }],
  skills: [['NV_BASIC', 9, ''], ['GS_GLITTERING', 5, ''], ['GS_SNAKEEYE', 10, ''], ['GS_SINGLEACTION', 10, ''], ['GS_TRACKING', 10, ''], ['GS_CHAINACTION', 10, ''], ['GS_DESPERADO', 10, ''], ['GS_SPREADATTACK', 10, '']],
  equip: [{ fase: 'Início', itens: [13100, 13200], porque: 'Pistola + Projétil 2z.' }, { fase: 'Meio', itens: [13151, 13155], porque: 'Ciclone (rifle) / Rosa Negra (espingarda).' }, { fase: 'Final', itens: [13165], porque: 'Carabina.' }],
  cartas: [[4092, 'Arma', '']], cuidados: ['Não tem 2ª classe: o nível de classe vai até 70.'],
},
{
  id: 'ninja-magico', classe: 'Ninja', nome: 'Ninja — Ninjutsu mágico (INT/DEX)', tags: ['up'],
  caminho: ['Novice', 'Ninja'],
  resumo: 'Ninja conjurador. Todas as 23 skills funcionam em combate aqui.',
  porque: ['INT para dano das magias ninja (Pétalas Flamejantes, Lâmina de Vento, Dragão Explosivo).', 'DEX para conjuração.', 'Perícia Ninja aumenta o dano mágico.'],
  fases: [{ nv: '1–99', stats: { str: 1, agi: 25, vit: 35, int: 99, dex: 78, luk: 1 }, foco: 'Perícia Ninja 10, Pétalas Flamejantes 10, Lâmina de Vento 10, Lança Congelante 10.', porque: '' }],
  skills: [['NV_BASIC', 9, ''], ['NJ_NINPOU', 10, ''], ['NJ_KOUENKA', 10, ''], ['NJ_HUUJIN', 10, ''], ['NJ_HYOUSENSOU', 10, ''], ['NJ_BAKUENRYU', 5, ''], ['NJ_UTSUSEMI', 5, 'Defesa.']],
  equip: [{ fase: 'Início', itens: [1201, 2117], porque: 'Proteção de Braço (escudo do Ninja).' }], cartas: [[4052, 'Capacete', '']], cuidados: [],
},
{
  id: 'taekwon-chutes', classe: 'Taekwon', nome: 'Taekwon — Chutes (AGI/STR)', tags: ['up'],
  caminho: ['Novice', 'Taekwon'],
  resumo: 'Lutador desarmado com chutes automáticos por postura.',
  porque: ['AGI para velocidade: as posturas disparam chutes nos ataques normais.', 'STR para dano dos chutes.', 'Trégua/Retiro Rápido recuperam HP/SP.'],
  fases: [{ nv: '1–99', stats: { str: 75, agi: 88, vit: 36, int: 1, dex: 48, luk: 1 }, foco: 'Corrida, Posturas e chutes, Chute Aéreo.', porque: '' }],
  skills: [['NV_BASIC', 9, ''], ['TK_RUN', 7, ''], ['TK_READYSTORM', 1, ''], ['TK_STORMKICK', 7, ''], ['TK_READYTURN', 1, ''], ['TK_TURNKICK', 7, ''], ['TK_READYDOWN', 1, ''], ['TK_DOWNKICK', 7, ''], ['TK_JUMPKICK', 7, ''], ['TK_HPTIME', 10, ''], ['TK_SPTIME', 10, '']],
  equip: [{ fase: 'Geral', itens: [2224, 2335, 2405], porque: 'Luta sem arma.' }], cartas: [[4133, 'Capa', '']], cuidados: ['Missão Taekwon não tem efeito em combate.'],
},
];
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
/* Pure Potter + "Combina com" (principal/secundário) para todas as builds. */

window.BUILDS.push({
  id: 'alquimista-potter', classe: 'Alchemist', nome: 'Alquimista — Pure Potter (fabricar poções)', tags: ['zeny', 'suporte'], extra: 'potter',
  caminho: ['Novice', 'Merchant', 'Alchemist'],
  resumo: 'Alquimista feito para fabricar poções: DEX e LUK no máximo para a maior chance de sucesso. Com o up offline, ele sobe de nível sozinho com a ajuda do Homunculus.',
  servidor: 'Veredito revisado (considerando o up offline): como 2º ou 3º personagem, VALE, mas o lucro depende de duas coisas: de onde vem a Erva Branca e se você tem VIP. (1) Fabricar deve funcionar: Preparar Poção tem o selo "Sem efeito em combate", o mesmo de Criar Conversor do Sábio, e a missão da Mishuna confirma que o Sábio "fabrica o próprio conversor sempre que precisar". O selo quer dizer "não age na luta", não "não existe". Mesmo assim, teste com 1 manual. (2) Com o up offline, ser fraco em combate quase não pesa: o Pure sobe enquanto você está fora, o Homunculus faz boa parte do dano e há 4 vagas grátis de personagem. (3) Sem VIP: só dá para vender ao NPC. A poção paga ≈372z contra ≈74z da erva crua, um ganho de ≈250z por erva. Bom para multiplicar o loot de erva do seu principal, mas não é renda principal, porque a erva só cai de monstros nível 43+. (4) Com VIP (os dois lados): aí é negócio. Todo mundo upa offline gastando poção, o NPC cobra 600z na Branca, e você pode vender por menos e ainda comprar Erva Branca de outros jogadores, que só ganham ≈60–74z dela no NPC.',
  porque: [
    'Up offline: o tempo que o Pure leva para chegar ao Job 50 sai do seu tempo fora do jogo. O custo real de ter o personagem é quase zero.',
    'O Homunculus luta pelo Pure. Os atributos dele não dependem dos seus, então DEX/LUK no Alquimista não deixam o Homunculus fraco.',
    'Fórmula de sucesso (pré-renovação): Pesquisa de Poções ×0,5% + Preparar Poção ×3% + Job ×0,2% + INT/2 ×0,1% + DEX ×0,1% + LUK ×0,1% + ~25% de bônus das poções Vermelha/Amarela/Branca.',
    'DEX e LUK valem o mesmo (0,1% por ponto) e INT vale a metade. Por isso o Pure leva DEX e LUK a 99.',
    'Job 50 dá +10%: suba a classe até o fim antes de produzir em massa.',
    'Superfaturar 10 (do Mercador) aumenta a venda da poção pronta em até 24%.',
    'Os atributos do Pure somam no máximo uns +20%. Pesquisa e Preparar Poção já dão 35%, e o Job 50 mais 10%.',
  ],
  fases: [
    { nv: '1–10 (Aprendiz)', stats: { str: 1, agi: 1, vit: 5, int: 1, dex: 14, luk: 12 }, foco: 'Habilidades Básicas 9.', porque: 'DEX e LUK desde o início, porque é o destino da build.' },
    { nv: '11–49 (Mercador)', stats: { str: 1, agi: 1, vit: 7, int: 1, dex: 52, luk: 47 }, foco: 'Superfaturar 10. Deixe upando offline em mapa fraco (Poring, Esporo, Metaling) e use a Praça de EXP.', porque: 'Até o Homunculus chegar, um DEX/LUK puro mata devagar: escolha mapas abaixo do seu nível.' },
    { nv: '50–99 (Alquimista)', stats: { str: 1, agi: 1, vit: 7, int: 1, dex: 99, luk: 99 }, foco: 'Bioética → Vaporizar → Despertar Homunculus logo no Job 1–4. Depois Pesquisa de Poções 10 e Preparar Poção 10. Chegue ao Job 50 antes de produzir em massa.', porque: 'O Homunculus vira o seu dano no up offline. DEX 99 + LUK 99 ≈ +20% de chance.' },
  ],
  skills: [
    ['NV_BASIC', 9, ''], ['MC_INCCARRY', 3, 'Requisito.'], ['MC_DISCOUNT', 3, 'Requisito.'], ['MC_OVERCHARGE', 10, 'Vende a poção pronta por até +24%.'], ['MC_PUSHCART', 3, 'Espaço para as ervas.'],
    ['AM_BIOETHICS', 1, 'Requisito do Homunculus. Pegue PRIMEIRO.'], ['AM_REST', 1, ''], ['AM_CALLHOMUN', 1, 'O Homunculus faz o dano no up offline.'], ['AM_RESURRECTHOMUN', 3, 'Revive o Homunculus se ele morrer.'],
    ['AM_LEARNINGPOTION', 10, '+5% de chance e +50% de cura das poções.'], ['AM_PHARMACY', 10, '+30% de chance. A skill da build.'],
    ['AM_ACIDTERROR', 5, 'Algum dano seu além do Homunculus.'], ['AM_AXEMASTERY', 2, 'Sobra de pontos.'],
  ],
  equip: [
    { fase: 'Poção Branca (dá para fazer)', itens: [7144, 509, 713, 7134], porque: 'Manual Vol.1 (100.000z) + Erva Branca + Garrafa Vazia (não é vendida, mas cai a 20% de Muka, Sapo de Rodda e Ovo de Andre) + Vasilha de Mistura (8z, consumida a cada tentativa).' },
    { fase: 'Poção Compacta (bloqueada pelos dados)', itens: [7133, 504, 1092, 1061], porque: 'Manual Vol.8 (240.000z) + Poção Branca + Tubo de Ensaio + Areia Estelar de Bruxa. O Tubo de Ensaio não é vendido em loja nem dropa de nenhum monstro nos dados da wiki: sem ele não há Compacta. Confirme no jogo antes de comprar o manual.' },
    { fase: 'Para lutar um pouco', itens: [1301, 2103, 2307, 2405, 2226], porque: '' },
  ],
  cartas: [[4001, 'Acessório', 'Poring: SOR +2.'], [4004, 'Acessório', 'Drops: DES +1.'], [4064, 'Acessório', 'Zerom: DES +3.'], [4233, 'Armadura', 'Leopardo Filhote: SOR +3.']],
  cuidados: ['Se ESTE personagem for o que farma offline, não faça o Pure: DEX/LUK não matam os monstros nível 43–58 que dropam Erva Branca. Faça o Alquimista de batalha (Terror Ácido + Homunculus) com Preparar Poção 10: ≈79% de sucesso, mas farma a própria erva.', 'Poção Compacta: o Tubo de Ensaio não tem fonte nos dados do servidor (nem loja, nem drop). Não compre o Manual Vol.8 (240.000z) antes de achar onde conseguir tubos no jogo.', 'Teste antes de investir: compre 1 Manual Vol.1 (100.000z) e 10 Vasilhas e tente fabricar. A evidência (missão do Conversor) é boa, mas não é confirmação.', 'A fabricação é uma ação sua, não do modo offline: você precisa entrar no jogo para fabricar os lotes.', 'Poção Vermelha dá prejuízo: a erva vende 9z e a poção 7z. Só fabrique Branca e Amarela.', 'Poção Azul não compensa: o NPC vende por 50z.', 'Sem VIP, não troque o Ferreiro de zeny pelo Potter: o Superfaturar do Ferreiro vale para TODO o loot, o Potter só multiplica a erva.'],
});
// O up offline muda a conta do Potter: atualiza os textos gerais
window.REGRAS.splice(1, 0, { t: 'O up é offline; só masmorra exige jogar', d: 'O personagem continua caçando enquanto você está fora (informação de quem joga; a wiki só cita que "na Praça não dá para dormir"). Por isso personagem fraco em combate custa só tempo offline, e ter 2–4 personagens é natural: 4 vagas grátis por conta.' });
window.REGRAS.find(r => r.t.startsWith('Troca e loja')).d = 'A skill Comércio do Mercador existe, mas a regra do servidor (página "Troca e loja de jogador") diz: "Só VIP abre loja de venda, e só VIP compra nela". Quem não é VIP só olha a vitrine, e a troca direta também é só entre dois VIPs. Sem VIP você vende ao NPC; com VIP, vende só para outros VIPs. Fabricar poção sem VIP só multiplica o valor das ervas que você farma. Para confirmar no jogo: pegue Comércio 1 (exige Usar Carrinho 3, que exige Aumentar Capacidade de Carga 5) e tente abrir a loja sem VIP.';
window.DUPLA.nota = 'Pure Potter, revisado: com o up offline, ele passa a valer como 3º personagem, ao lado da dupla Zeny + Up. Sem VIP ele só multiplica a Erva Branca que o seu principal farma (≈+250z por erva) e abastece suas poções; com VIP vira negócio de verdade (vender poção abaixo dos 600z do NPC e comprar erva de outros jogadores). Ele não substitui o Ferreiro de zeny, porque o Superfaturar do Ferreiro vale para todo o loot. Veja a build Pure Potter.';
{ const d = window.DESCARTADAS.findIndex(x => x.nome.startsWith('Alquimista "pure poter"')); if (d >= 0) window.DESCARTADAS.splice(d, 1); }

window.PARES = {
  'alquimista-potter': [['templario-gc', 'Principal', 'Crux Magnum gasta 20% do HP por uso: é a build que MAIS consome Poção Branca. A rota alternativa do Templário (gl_church) é o mapa do Druida Maligno, que dropa Erva Branca (22%). O principal farma a erva e o Potter devolve em poção.'], ['sacerdote-tu', 'Principal', 'A rota da wiki passa pelo gl_church (Druida Maligno, Erva Branca 22%).'], ['cavaleiro-tyr', 'Principal', 'Tanque corpo a corpo que gasta muita poção no idle.']],
  'alquimista-homunculus': [['cacador-dex', 'Principal', 'O Alquimista farma zeny com Superfaturar; o Caçador upa rápido e seguro.'], ['sacerdote-suporte', 'Secundário', 'Cura em grupo, já que o Homunculus não pode ser curado com poção.']],
  'alquimista-acido': [['cacador-dex', 'Principal', 'Um farma zeny, o outro upa.'], ['alquimista-potter', 'Alternativa', 'Pegue Preparar Poção 10 nesta mesma build em vez de criar um Pure (≈79% contra ≈90%).']],
  'ferreiro-zeny': [['cacador-dex', 'Principal', 'O Caçador upa e entra em masmorra; o Ferreiro vende o loot dos dois com Superfaturar.'], ['bruxo-aoe', 'Principal', 'O Bruxo mata grupos rápido; o Ferreiro transforma o loot em zeny.']],
  'ferreiro-carrinho': [['cacador-dex', 'Principal', 'Upa enquanto o Ferreiro farma.'], ['sacerdote-suporte', 'Secundário', 'Cura em grupo enquanto o Cavalo-de-Pau bate em área.']],
  'arruaceiro-farm': [['bruxo-aoe', 'Principal', 'O Arruaceiro farma drops extras; o Bruxo sobe de nível em mapas cheios.'], ['ferreiro-zeny', 'Secundário', 'Use o Ferreiro só para VENDER o loot com Superfaturar.']],
  'arruaceiro-arco': [['templario-crux', 'Principal', 'Tanque para masmorra.'], ['ferreiro-zeny', 'Secundário', 'Vende o loot com Superfaturar.']],
  'cacador-dex': [['ferreiro-zeny', 'Secundário', 'Vende o loot do Caçador com Superfaturar (+24%).'], ['sacerdote-suporte', 'Secundário', 'Grupo: +10% de EXP e cura.']],
  'cacador-falcao': [['ferreiro-zeny', 'Secundário', 'Renda.'], ['alquimista-potter', 'Secundário', 'Se o Caçador gastar muita poção.']],
  'cacador-armadilha': [['ferreiro-zeny', 'Secundário', 'Cada armadilha custa 150z: precisa de renda.']],
  'bruxo-aoe': [['sacerdote-suporte', 'Secundário', 'Magnificat dobra a regeneração de SP: é o que mais acelera um Bruxo.'], ['ferreiro-zeny', 'Secundário', 'O Bruxo gasta Poção Azul; o Ferreiro paga a conta.']],
  'bruxo-jupitel': [['ferreiro-zeny', 'Secundário', 'Renda.']],
  'sabio-bolt': [['ferreiro-zeny', 'Secundário', 'Renda.']],
  'sabio-suporte': [['cavaleiro-tyr', 'Principal', 'Encanta a espada com o elemento do mapa.'], ['assassino-katar', 'Principal', 'Encantar Arma no katar.']],
  'cavaleiro-tyr': [['sacerdote-suporte', 'Secundário', 'Cura e Kyrie mantêm o Cavaleiro no meio do grupo.'], ['alquimista-potter', 'Secundário', 'Abastece Poção Branca.'], ['ferreiro-zeny', 'Secundário', 'Renda.']],
  'cavaleiro-agi': [['ferreiro-zeny', 'Secundário', 'Renda.'], ['sacerdote-suporte', 'Secundário', 'Aumentar Agilidade + Bênção.']],
  'cavaleiro-lanca': [['sabio-suporte', 'Secundário', 'Encanta a lança contra Anubis e Golems.']],
  'templario-crux': [['ferreiro-zeny', 'Secundário', 'Renda.']],
  'templario-gc': [['alquimista-potter', 'Secundário', 'Crux Magnum gasta HP: Poção Branca de graça muda tudo. Você farma Druida Maligno (Erva Branca) e ele fabrica.'], ['sacerdote-suporte', 'Secundário', 'Cura em grupo.']],
  'templario-lanca': [['ferreiro-zeny', 'Secundário', 'Renda.']],
  'sacerdote-suporte': [['cavaleiro-tyr', 'Principal', 'O suporte só rende com alguém batendo.'], ['bruxo-aoe', 'Principal', 'Magnificat no Bruxo.']],
  'sacerdote-tu': [['alquimista-potter', 'Secundário', 'O mesmo mapa (gl_church) dropa Erva Branca.'], ['ferreiro-zeny', 'Secundário', 'Renda.']],
  'sacerdote-batalha': [['ferreiro-zeny', 'Secundário', 'Renda.']],
  'monge-combo': [['ferreiro-zeny', 'Secundário', 'Renda.'], ['alquimista-potter', 'Secundário', 'O Monge corpo a corpo gasta poção.']],
  'assassino-katar': [['ferreiro-zeny', 'Secundário', 'Renda.'], ['sacerdote-suporte', 'Secundário', 'Cura em grupo.']],
  'assassino-critico': [['ferreiro-zeny', 'Secundário', 'Renda.']],
  'bardo-suporte': [['cacador-dex', 'Principal', 'Crepúsculo Sangrento acelera o Caçador.']],
  'odalisca-suporte': [['cacador-dex', 'Principal', 'Danças no Caçador.']],
  'superaprendiz': [['ferreiro-zeny', 'Secundário', 'Renda.']], 'superaprendiz-mago': [['ferreiro-zeny', 'Secundário', 'Renda.']],
  'justiceiro-rifle': [['ferreiro-zeny', 'Secundário', 'Renda.']], 'justiceiro-pistola': [['ferreiro-zeny', 'Secundário', 'Renda.']],
  'ninja-magico': [['ferreiro-zeny', 'Secundário', 'Renda.']], 'ninja-arremesso': [['ferreiro-zeny', 'Secundário', 'Renda.']],
  'taekwon-chutes': [['ferreiro-zeny', 'Secundário', 'Renda.']],
};
// Job máximo das classes de 1 só job (as outras: 50)
window.JOBMAX = { Supernovice: 99, Gunslinger: 70, Ninja: 70, Taekwon: 50 };
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
  Object.assign(B('cavaleiro-tyr').fases[2], { foco: 'Suba o Espadachim até o Job 50, gaste os 49 pontos (Impacto Explosivo 10 incluído) e só então vire Cavaleiro.', porque: 'Os Jobs 41–50 dão os 10 pontos que a build usa; a troca exige todos os pontos gastos.' });
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

  // ---------- Ordem do passo a passo: nenhuma skill antes do pré-requisito completo ----------
  const DB = window.DB, CID = {}; DB.playable.forEach(p => CID[p.nome] = p.id);
  for (const b of window.BUILDS) {
    const cl = DB.classes[CID[b.classe]]; if (!cl) continue;
    const n2c = {}, req = {};
    for (const [sid, , pre] of cl.tree) { const s = DB.skills[sid]; if (s) { n2c[s.n] = s.code; req[s.code] = pre || ''; } }
    const need = code => /Nenhum/.test(req[code] || 'Nenhum') ? [] : req[code].split(/,\s*/).map(x => x.match(/^(.*)\s(\d+)$/)).filter(Boolean).map(m => [n2c[m[1].trim()], +m[2]]).filter(x => x[0]);
    const have = {}, out = [], pend = b.skills.slice();
    while (pend.length) {
      let i = pend.findIndex(([code]) => need(code).every(([rc, n]) => (have[rc] || 0) >= n));
      if (i < 0) i = 0; // requisito fora da build: mantém a ordem original
      const [r] = pend.splice(i, 1); out.push(r); have[r[0]] = (have[r[0]] || 0) + r[1];
    }
    b.skills = out;
  }
})();

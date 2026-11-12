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

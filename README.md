# Codex de Builds — RO Classic Idle

> Guia completo de builds para o **RO Classic Idle** — servidor pré-renovação com combate 100% automático (idle). Todas as builds são filtradas pelas regras reais do servidor: só contam skills com selo "Funciona em combate", zeny vem exclusivamente de loot vendido ao NPC, e troca entre jogadores exige VIP.

## O que tem aqui

| | |
|---|---|
| **35 builds** | cobrindo todas as 17 classes jogáveis, da novice às 2ªs classes |
| **9 builds de farm de zeny** | com rota de spots por nível, loot/abate calculado do DB e equipamento mínimo |
| **360/548 skills verificadas** | com selo de combate confirmado na wiki oficial |
| **1.897 itens · 419 monstros · 249 mapas** | banco de dados completo da wiki |
| **Sem servidor, sem internet** | página estática — abre no browser com `node server.js` |

## Como rodar

```bash
git clone https://github.com/Luscaswolf/Ragnarokwiki
cd Ragnarokwiki
node server.js
# Abre http://localhost:3000
```

O servidor injeta hot-reload — qualquer mudança em `.js`, `.html` ou `.css` recarrega o browser automaticamente.

## Páginas

| Página | O que tem |
|---|---|
| **Como começar** | Guia para jogadores novos: qual build fazer primeiro, quanto custa, como configurar o idle |
| **Builds** | Atributos por fase de nível, skills com popup de pré-requisitos, equipamento, cartas, rota de up e rota de farm de zeny |
| **Guia de Zeny** | Progressão completa de spots por nível com loot/abate calculado, todas as builds de zeny e dicas de configuração |
| **Regras do servidor** | O que muda em relação ao RO clássico, builds descartadas e por quê, skills sem efeito em combate |
| **Planejador** | Distribua atributos livremente e veja custo em pontos, derivados e comparação com as fases da build |
| **Banco de dados** | Busca de itens, cartas, monstros, mapas e skills — clique num mapa para ver o loot/abate estimado |

## O que torna este servidor diferente

- **Combate automático (idle):** o personagem luta sozinho. Só contam skills com selo *"Funciona em combate"* — builds clássicas como Assassino de duas adagas ou Sábio auto-magia não funcionam aqui.
- **Zeny = loot vendido ao NPC:** nenhum monstro dá moeda direta. A renda depende do mapa certo para o nível e, opcionalmente, do Superfaturar do Ferreiro (+24% em tudo que você vende).
- **Sem troca entre jogadores sem VIP:** builds de fabricação (Pure Potter) só valem como 3º personagem com VIP dos dois lados.
- **Conjuração não é interrompida:** Bruxo e Sábio funcionam muito melhor do que no RO clássico.

## Estrutura do projeto

```
index.html              layout, estilos e roteamento de abas
server.js               servidor HTTP local com hot-reload (Node.js puro, sem deps)
app/
  app.js                renderização das abas, busca, planejador, banco de dados
  calc.js               fórmulas pré-renovação: custo de atributos, derivados, Preparar Poção
  db.js                 banco compacto gerado da wiki (não editar à mão)
  builds-all.js         todas as builds + regras do servidor + patches de distribuição final
  img/dp/               sprites locais (card, item, job, map, mob, skill) — 212 mapas em .webp
tools/                  scripts de geração e verificação (Node.js / Python)
```

## Cada build contém

- **Por que essa build** — o que a torna viável neste servidor especificamente
- **Atributos por fase** — alvo ao fim de cada faixa de nível, com verificação de pontos
- **Skills em ordem de Job** — com popup de pré-requisitos ao passar o mouse no ícone
- **Equipamento** — inicial → provisório → final de loja → drops raros
- **Cartas** — só as que fazem diferença, com explicação
- **Rota de up** — mapa por mapa da wiki oficial do servidor
- **Rota de farm de zeny** — spots ordenados por nível com loot/abate calculado do DB, equipamento mínimo e explicação de por que farmar lá
- **Como configurar o idle** — reposição automática, controle de peso, Praça de EXP

## Editando builds

As builds ficam em `app/builds-all.js`. Cada build referencia:

- **Skills pelo código** (ex.: `BS_ADRENALINE`) — o app mostra nome e selo do servidor
- **Itens pelo ID** — o app mostra nome, preço e onde dropa/compra
- **Atributos por fase** — o alvo é o valor ao *fim* da faixa de nível

Após editar, valide com:

```bash
node tools/validate.js      # itens/skills existem e selos de combate
node tools/prereq.js        # pré-requisitos de skill e orçamento de pontos de Job
node tools/stats_check.js   # atributos × tabela real de pontos do servidor
node tools/sobras.js        # pontos de atributo e skill sobrando (meta: 0)
```

## Atualizando o banco de dados

```bash
# 1. Baixe o dump novo da wiki (console do browser na wiki oficial)
# 2. Coloque em data/ro-wiki-dump.json
python tools/build_db.py    # regera app/db.js
node tools/validate.js      # verifica integridade
```

## Créditos

- **Dados:** wiki oficial do RO Classic Idle (roclassicidle.com.br/wiki)
- **Sprites:** Divine Pride (static.divine-pride.net), armazenadas localmente em `app/img/dp/`
- Ragnarok Online é marca registrada da Gravity Co., Ltd. Projeto de fã, sem fins lucrativos.

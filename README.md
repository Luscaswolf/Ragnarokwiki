# Ragnarok Wiki — Builds RO Classic Idle

Guia offline de builds para o **RO Classic Idle** (servidor pré-renovação, com combate automático).
É uma página estática: abra o `index.html` no navegador (duplo clique) e pronto. Não precisa de servidor nem de internet.

As builds partem dos guias clássicos pré-renovação e são filtradas pelas regras deste servidor, com dados tirados da wiki oficial (roclassicidle.com.br/wiki, dump de 05/11/2026).

## Abas

| Aba | O que faz |
|---|---|
| **Início** | Visão geral e atalhos. Toque na ☆ de uma build (barra lateral ou título) para favoritá-la: as favoritas ficam no topo do Início e da barra lateral (salvo no navegador) |
| **Builds** | Todas as classes: atributos por fase de nível, skills, equipamentos (onde dropa / quem vende), cartas e rota de up, com passo a passo nível a nível |
| **Zeny + Up** | Recomenda uma dupla: 1 personagem para fazer zeny e 1 para upar/masmorra |
| **Regras do servidor** | O que muda neste servidor e por que algumas builds clássicas não funcionam (ex.: só contam skills com selo "Funciona em combate") |
| **Planejador** | Mexa nos atributos e veja o custo em pontos e os atributos derivados. Dá para calibrar a fórmula de custo com os seus pontos reais e continuar a partir dos atributos atuais |
| **Banco de dados** | Busca de itens, cartas, monstros, mapas e skills. Clicar num mapa mostra uma estimativa de zeny por abate |

## Estrutura

```
index.html            página principal (layout, estilos e abas)
app/
  app.js              lógica da interface (navegação, renderização das abas)
  calc.js             fórmulas pré-renovação: custo de atributos, pontos por nível,
                      simulação da distribuição de pontos, chance de Preparar Poção
  db.js               banco compacto gerado a partir do dump da wiki (não editar à mão)
  builds.js           regras do servidor (REGRAS) + builds (BUILDS)
  builds2..4.js       mais builds (BUILDS.push) e correções
  builds5.js          distribuição final: todos os pontos de skill e atributo usados
  img/dp/             sprites (card, item, job, map, mob, skill) da Divine Pride
data/
  ro-wiki-dump.json   banco completo baixado da wiki (fonte do db.js)
  ro-wiki-codigo.json código de adaptação da wiki (referência)
  ro-wiki-motor.json  motor de cálculo da wiki (referência)
tools/                scripts de geração e verificação (ver abaixo)
LEIA-ME.txt           instruções curtas de uso
```

## Editando as builds

As builds ficam em `app/builds*.js`. Cada build referencia:

- **skills pelo código** (ex.: `HT_TALKIEBOX`) — o app mostra o nome e o selo do servidor;
- **itens pelo ID** — o app mostra nome, preço e onde dropa;
- **atributos por fase** — o alvo é o valor ao **fim** da faixa de nível; o app confere se os pontos fecham.

Depois de editar, rode as verificações (precisa de Node.js):

```bash
node tools/prereq.js       # pré-requisitos de skill e pontos de Job
node tools/stats_check.js  # atributos x tabela real de pontos do servidor
node tools/validate.js     # itens/skills existem e selos de combate
node tools/sobras.js       # pontos de atributo e de skill que sobram (meta: 0)
node tools/ordem.js        # passo a passo: nenhuma skill antes do pré-requisito
```

A 1ª classe é planejada até o **Job 50** (49 pontos): suba até o Job 50, gaste tudo na ordem da build e só então troque de classe. Todas as builds usam todos os pontos de skill de cada classe e terminam o nível 99 com 0 ou 1 ponto de atributo sobrando (1 só quando todo próximo ponto custa 2 ou mais).

## Atualizando os dados da wiki

1. Com a wiki aberta, baixe de novo o `ro-wiki-dump.json` pelo console (F12) e coloque em `data/`.
2. Regere o banco e valide:

```bash
python tools/build_db.py   # regera app/db.js
node tools/validate.js
```

### Sprites

As sprites já estão em `app/img/dp`. Para baixar de novo:

- `tools/sprites.txt` tem a lista (URL e destino); ou
- cole `tools/baixar-sprites-console.js` no console da wiki para gerar `ro-wiki-sprites.json` e rode `python tools/extract_sprites.py`.

## Ferramentas (`tools/`)

| Script | Uso |
|---|---|
| `build_db.py` | Compacta `data/ro-wiki-dump.json` em `app/db.js` |
| `validate.js` | Confere builds contra o banco (itens, skills, selos de combate) |
| `prereq.js` | Confere pré-requisitos de skill e orçamento de pontos de Job |
| `stats_check.js` | Confere as fases de atributos com a tabela real de pontos do servidor |
| `ordem.js` | Confere se a ordem das skills (passo a passo do Job) respeita os pré-requisitos |
| `sobras.js` | Mostra quantos pontos de atributo e de skill sobram em cada build |
| `check_steps.js <build-id>` | Gera uma página de teste com o passo a passo de uma build |
| `check_cal.js <restantes>` | Testa a calibração da fórmula de custo de atributos |
| `check_me.js` | Testa "continuar a partir dos meus atributos" |
| `baixar-sprites-console.js` | Script para o console da wiki que baixa as sprites |
| `extract_sprites.py` | Extrai `ro-wiki-sprites.json` para `app/img/` |
| `flatten.py`, `q.py` | Utilitários de inspeção do dump e do banco |

## Créditos

- Dados: wiki do RO Classic Idle.
- Sprites: Divine Pride.
- Ragnarok Online é marca da Gravity Co., Ltd. Projeto de fã, sem fins lucrativos.

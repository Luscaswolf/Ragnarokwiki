// Fórmulas pré-renovação (as mesmas usadas pelo RO Classic Idle, fonte pre-renewal)
window.CALC = {
  // custo para subir um atributo de x para x+1
  // Fórmulas candidatas de custo por ponto (x = valor atual do atributo). A página se calibra com o jogo:
  // o jogador informa nível, atributos base e pontos restantes, e fica a fórmula que bate exatamente.
  FORMULAS: {
    A: { nome: '2 até 9; 3 a partir de 10; 4 a partir de 20…', f: x => Math.floor(x / 10) + 2 },
    B: { nome: '2 até 10; 3 a partir de 11; 4 a partir de 21… (clássica)', f: x => Math.floor((x - 1) / 10) + 2 },
    C: { nome: '2 até 8; 3 a partir de 9; 4 a partir de 19…', f: x => Math.floor((x + 1) / 10) + 2 },
    D: { nome: '2 até 4; 3 a partir de 5; 4 a partir de 15…', f: x => Math.floor((x + 5) / 10) + 2 },
    E: { nome: '1 + ⌊x/5⌋ (renovação alternativa)', f: x => Math.floor(x / 5) + 1 },
  },
  formula: 'A',
  passo(x) { return this.FORMULAS[this.formula].f(x); },
  // devolve as fórmulas que explicam exatamente os pontos restantes informados
  calibrar(L, st, restantes) {
    return Object.keys(this.FORMULAS).filter(k => {
      const f = this.FORMULAS[k].f; let c = 0;
      for (const v of Object.values(st)) for (let x = 1; x < v; x++) c += f(x);
      return this.pontos(L) - c === restantes;
    });
  },
  custoAttr(v) { let c = 0; for (let x = 1; x < v; x++) c += this.passo(x); return c; },
  custo(st) { return ['str','agi','vit','int','dex','luk'].reduce((a, k) => a + this.custoAttr(st[k] || 1), 0); },
  // pontos totais disponíveis no nível base L (48 iniciais + ganho por nível)
  // pontos ganhos AO CHEGAR no nível L (tabela real do servidor quando disponível)
  ganho(L) { const t = window.DB && window.DB.pontosPorNivel; return t && t[L] != null ? t[L] : (L === 1 ? 48 : Math.floor((L - 1) / 5) + 3); },
  pontos(L) { let p = 0; for (let l = 1; l <= L; l++) p += this.ganho(l); return p; },
  faseNivel(nv) { const m = String(nv).match(/(\d+)\s*[–-]\s*(\d+)/); return m ? +m[2] : (+(String(nv).match(/\d+/) || [99])[0]); },
  // Chance de Preparar Poção (fórmula do rAthena pré-renovação; o servidor usa fonte pre-renewal, não confirmado na wiki)
  // bonus: Vermelha/Amarela/Branca recebem +20% e +0,1–10% aleatório (média ~25%)
  farmacia({ int = 1, dex = 1, luk = 1, job = 50, pesquisa = 10, preparar = 10, bonus = 25 }) {
    const p = pesquisa * 0.5 + preparar * 3 + job * 0.2 + Math.floor(int / 2) * 0.1 + dex * 0.1 + luk * 0.1 + bonus;
    return Math.max(0, Math.min(100, p));
  },
  // distribui pontos nível a nível em direção às metas das fases (mantém os atributos equilibrados rumo ao alvo)
  // inicio (opcional): { L, st } = nível e atributos base atuais; a simulação continua do nível L+1
  simular(fases, inicio) {
    const st = { str: 1, agi: 1, vit: 1, int: 1, dex: 1, luk: 1 }, K = Object.keys(st), out = [];
    let livre = 0, L0 = 1;
    if (inicio) { Object.assign(st, inicio.st); livre = inicio.restantes != null ? inicio.restantes : this.pontos(inicio.L) - this.custo(st); L0 = inicio.L + 1; }
    let ini = { ...st }, fi = 0;
    for (let L = L0; L <= 99; L++) {
      livre += this.ganho(L); const antes = { ...st };
      while (fi < fases.length && L > this.faseNivel(fases[fi].nv)) { fi++; ini = { ...st }; }
      if (fi >= fases.length) break;
      // meta da fase atual; quando ela estiver completa, já começa a da próxima (pontos não ficam parados)
      let fa = fi, base = ini;
      for (;;) {
        const alvo = fases[fa].stats;
        let best = null, bp = 2;
        for (const k of K) {
          const t = alvo[k] || 1; if (st[k] >= t) continue;
          const prog = (st[k] - base[k]) / Math.max(1, t - base[k]);
          if (prog < bp && this.passo(st[k]) <= livre) { bp = prog; best = k; }
        }
        if (best) { livre -= this.passo(st[best]); st[best]++; continue; }
        const completa = K.every(k => st[k] >= (alvo[k] || 1));
        if (completa && fa + 1 < fases.length) { fa++; base = { ...st }; continue; }
        break;
      }
      out.push({ L, st: { ...st }, livre, ganho: this.ganho(L), add: K.filter(k => st[k] > antes[k]).map(k => [k, st[k] - antes[k]]) });
    }
    return out;
  },
  derivados(st, L) {
    const s = k => st[k] || 1, b10 = Math.floor(s('str') / 10);
    return {
      'ATK de status (corpo a corpo)': s('str') + b10 * b10 + Math.floor(s('dex') / 5) + Math.floor(s('luk') / 5),
      'ATK de status (distância)': s('dex') + Math.floor(s('dex') / 10) ** 2 + Math.floor(s('str') / 5) + Math.floor(s('luk') / 5),
      'MATK mín–máx': `${s('int') + Math.floor(s('int') / 7) ** 2}–${s('int') + Math.floor(s('int') / 5) ** 2}`,
      'Acerto (HIT)': L + s('dex'),
      'Esquiva (FLEE)': L + s('agi'),
      'Crítico': (1 + s('luk') * 0.3).toFixed(1) + '%',
      'HP extra pela VIT': '+' + s('vit') + '%',
      'Conjuração restante': Math.max(0, Math.round((1 - s('dex') / 150) * 100)) + '%',
      'Carga extra pela STR': '+' + (s('str') - 1) * 30,
    };
  },
};

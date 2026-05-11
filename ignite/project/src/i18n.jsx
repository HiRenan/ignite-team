// Bilingual dictionary — kept deliberately high-level to avoid revealing technical details.
const DICT = {
  pt: {
    nav: { mission: "Missão", solution: "Solução", impact: "Impacto", award: "Conquista", team: "Time", contact: "Contato" },
    lang: "EN",
    hero: {
      eyebrow: "ACT IN SPACE 2026 · WORLD FINALS · BORDEAUX",
      title1: "Enxergar",
      title2: "o invisível.",
      title3: "Do espaço.",
      sub: "O IGNITE transforma dados orbitais em decisões que evitam apagões antes que eles aconteçam.",
      cta: "EXPLORE A MISSÃO",
      ctaSecondary: "FALE COM O TIME",
      scroll: "ROLE PARA EXPLORAR",
      coords: "47°09′N · 0°39′W · ORBIT 512 KM"
    },
    mission: {
      kicker: "01 — O PROBLEMA",
      title: "Uma árvore caída.\nMilhões no escuro.",
      body: "A vegetação que cresce próxima a linhas de transmissão é uma das maiores causas de apagões no mundo. Monitorar toda a rede é caro, lento e quase sempre reativo.",
      stats: [
        { n: "70%", l: "dos apagões em grandes redes têm origem em vegetação e clima" },
        { n: "R$ bi", l: "em perdas operacionais anuais para concessionárias" },
        { n: "24/7", l: "de inspeção hoje depende de sobrevoo ou equipes em campo" }
      ]
    },
    solution: {
      kicker: "02 — A ABORDAGEM",
      title: "Um novo ponto de vista.",
      body: "Combinamos imageamento orbital de ponta com processamento inteligente para identificar, à distância, apenas o que realmente representa risco. Menos ruído. Mais precisão. Decisões na hora certa.",
      pillars: [
        { t: "Orbital", d: "Cobertura contínua de vastas extensões de rede, sem sair do solo." },
        { t: "Seletivo", d: "Foco cirúrgico nos pontos que realmente importam." },
        { t: "Eficiente", d: "Menos aquisições, menos custo, mais decisão." }
      ]
    },
    how: {
      kicker: "03 — COMO FUNCIONA",
      title: "Três camadas.\nUma resposta.",
      steps: [
        { n: "01", t: "Observar", d: "A Terra é observada continuamente a centenas de quilômetros de altitude." },
        { n: "02", t: "Interpretar", d: "A informação certa é extraída antes mesmo de chegar ao solo." },
        { n: "03", t: "Agir", d: "A concessionária recebe apenas o que importa, pronto para decisão." }
      ]
    },
    impact: {
      kicker: "04 — IMPACTO",
      title: "A escala do que está em jogo.",
      nums: [
        { n: "−85%", l: "de dados redundantes processados" },
        { n: "10×", l: "mais eficiente que inspeção tradicional" },
        { n: "∞", l: "de redes monitoráveis em paralelo" }
      ]
    },
    award: {
      kicker: "05 — A CONQUISTA",
      title: "Airbus Prize.\nFinais Mundiais.",
      body: "Entre centenas de times do mundo inteiro, o IGNITE foi reconhecido nas Finais Mundiais do ACT IN SPACE 2026, em Bordeaux, com o Airbus Partner Award.",
      badges: ["ACT IN SPACE 2026", "WORLD FINALS", "BORDEAUX, FR", "AIRBUS PARTNER AWARD"]
    },
    team: {
      kicker: "06 — O TIME",
      title: "Cinco. Uma missão.",
      body: "Engenheiros, desenvolvedores e curiosos obcecados em resolver problemas reais com tecnologia espacial."
    },
    cta: {
      kicker: "07 — CONTATO",
      title: "Vamos construir\no próximo capítulo.",
      body: "Estamos abertos a conversas com concessionárias, parceiros e quem acredita que a próxima grande revolução em infraestrutura virá de cima.",
      button: "Fale com o time",
      secondary: "LinkedIn do time"
    },
    footer: { rights: "IGNITE · 2026 · Todos os direitos reservados", origin: "Feito entre o Brasil e Bordeaux" }
  },
  en: {
    nav: { mission: "Mission", solution: "Solution", impact: "Impact", award: "Award", team: "Team", contact: "Contact" },
    lang: "PT",
    hero: {
      eyebrow: "ACT IN SPACE 2026 · WORLD FINALS · BORDEAUX",
      title1: "Seeing",
      title2: "the unseen.",
      title3: "From space.",
      sub: "IGNITE turns orbital data into decisions that prevent blackouts before they happen.",
      cta: "EXPLORE THE MISSION",
      ctaSecondary: "TALK TO THE TEAM",
      scroll: "SCROLL TO EXPLORE",
      coords: "47°09′N · 0°39′W · ORBIT 512 KM"
    },
    mission: {
      kicker: "01 — THE PROBLEM",
      title: "One fallen tree.\nMillions in the dark.",
      body: "Vegetation growing near transmission lines is one of the leading causes of blackouts worldwide. Monitoring every inch of the grid is expensive, slow and almost always reactive.",
      stats: [
        { n: "70%", l: "of major grid outages trace back to vegetation and weather" },
        { n: "$B", l: "in yearly operational losses for utility companies" },
        { n: "24/7", l: "inspection today still depends on flights or ground teams" }
      ]
    },
    solution: {
      kicker: "02 — THE APPROACH",
      title: "A new point of view.",
      body: "We combine cutting-edge orbital imaging with intelligent processing to identify, from a distance, only what actually poses a risk. Less noise. More precision. Decisions at the right time.",
      pillars: [
        { t: "Orbital", d: "Continuous coverage of vast networks without ever leaving the ground." },
        { t: "Selective", d: "Surgical focus on the points that really matter." },
        { t: "Efficient", d: "Fewer acquisitions. Lower cost. Faster action." }
      ]
    },
    how: {
      kicker: "03 — HOW IT WORKS",
      title: "Three layers.\nOne answer.",
      steps: [
        { n: "01", t: "Observe", d: "Earth is observed continuously from hundreds of kilometers above." },
        { n: "02", t: "Interpret", d: "The right information is extracted before it even reaches the ground." },
        { n: "03", t: "Act", d: "The utility receives only what matters — ready for decision." }
      ]
    },
    impact: {
      kicker: "04 — IMPACT",
      title: "The scale of what's at stake.",
      nums: [
        { n: "−85%", l: "of redundant data processed" },
        { n: "10×", l: "more efficient than traditional inspection" },
        { n: "∞", l: "of networks monitorable in parallel" }
      ]
    },
    award: {
      kicker: "05 — THE AWARD",
      title: "Airbus Prize.\nWorld Finals.",
      body: "Among hundreds of teams from around the world, IGNITE was recognized at the World Finals of ACT IN SPACE 2026, in Bordeaux, with the Airbus Partner Award.",
      badges: ["ACT IN SPACE 2026", "WORLD FINALS", "BORDEAUX, FR", "AIRBUS PARTNER AWARD"]
    },
    team: {
      kicker: "06 — THE TEAM",
      title: "Five. One mission.",
      body: "Engineers, developers and endlessly curious minds obsessed with solving real problems through space technology."
    },
    cta: {
      kicker: "07 — CONTACT",
      title: "Let's build\nthe next chapter.",
      body: "We're open to conversations with utilities, partners and anyone who believes the next big leap in infrastructure will come from above.",
      button: "Get in touch",
      secondary: "Team on LinkedIn"
    },
    footer: { rights: "IGNITE · 2026 · All rights reserved", origin: "Built between Brazil and Bordeaux" }
  }
};

window.DICT = DICT;

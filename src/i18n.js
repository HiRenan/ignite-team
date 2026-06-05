// Bilingual dictionary — kept deliberately high-level to avoid revealing technical details.
export const DICT = {
  pt: {
    nav: { mission: 'Missão', solution: 'Solução', impact: 'Impacto', award: 'Conquista', team: 'Time', contact: 'Contato' },
    lang: 'EN',
    skip: 'Pular para o conteúdo',
    hero: {
      runner: 'IGNITE — ORBITAL OBSERVATION MISSION · 2026',
      kicker: 'PLATE 01 / OBSERVATION',
      lines: ['Vê', 'o que', 'as redes', 'esquecem.'],
      sub: 'Dados orbitais que evitam apagões antes que eles aconteçam — Airbus Partner Award · ACT IN SPACE 2026.',
      cta: 'Ler a missão',
      coordsLat: '47.16°N',
      coordsLon: '0.65°W',
      coordsAlt: '512 KM ALT',
      coordsNextPass: 'NEXT PASS',
      coordsHeading: 'HEADING',
      coordsOrbits: 'ORBITS',
      nextPass: 'T −08:42',
      heading: '098.4°',
      orbits: '01 247',
      live: 'LIVE',
      // Hint shown over the hero imagery — works for both mouse and touch.
      hint: 'Passe o cursor ou arraste para revelar a detecção',
      // Real description of the hero imagery for screen readers / SEO (the visual
      // layers themselves are aria-hidden so this is announced exactly once).
      imageAlt:
        'Vista aérea de satélite de uma floresta cortada por linhas de transmissão; sob o cursor, a leitura da IA destaca em laranja a vegetação que representa risco para a rede.',
    },
    mission: {
      kicker: '01 — O PROBLEMA',
      title: 'Uma árvore caída.\nMilhões no escuro.',
      body: 'A vegetação que cresce próxima a linhas de transmissão é uma das maiores causas de apagões no mundo. Monitorar toda a rede é caro, lento e quase sempre reativo.',
      stats: [
        { n: '70%', l: 'dos apagões em grandes redes têm origem em vegetação e clima' },
        { n: 'R$ bi', l: 'em perdas operacionais anuais para concessionárias' },
        { n: '24/7', l: 'de inspeção hoje depende de sobrevoo ou equipes em campo' },
      ],
    },
    orbital: {
      kicker: '02 — DE ONDE OBSERVAMOS',
      title: 'Cobertura\norbital.',
      body: 'De centenas de quilômetros de altitude, um único sensor acompanha corredores inteiros de transmissão — do Brasil a Bordeaux — sem pisar no solo.',
      routeLabel: 'ROTA ORBITAL · FLORIANÓPOLIS → BORDEAUX',
      descentHint: 'Role para descer à superfície',
      satAlt:
        'Vista de satélite da superfície: uma floresta cortada por linhas de transmissão — o solo onde a descida orbital aterrissa.',
    },
    solution: {
      kicker: '03 — A ABORDAGEM',
      title: 'Um novo ponto de vista.',
      body: 'Combinamos imageamento orbital de ponta com processamento inteligente para identificar, à distância, apenas o que realmente representa risco. Menos ruído. Mais precisão. Decisões na hora certa.',
      pillars: [
        { t: 'Orbital', d: 'Cobertura contínua de vastas extensões de rede, sem sair do solo.' },
        { t: 'Seletivo', d: 'Foco cirúrgico nos pontos que realmente importam.' },
        { t: 'Eficiente', d: 'Menos aquisições, menos custo, mais decisão.' },
      ],
    },
    how: {
      kicker: '04 — COMO FUNCIONA',
      title: 'Três camadas.\nUma resposta.',
      steps: [
        { n: '01', t: 'Observar', d: 'A Terra é observada continuamente a centenas de quilômetros de altitude.' },
        { n: '02', t: 'Interpretar', d: 'A informação certa é extraída antes mesmo de chegar ao solo.' },
        { n: '03', t: 'Agir', d: 'A concessionária recebe apenas o que importa, pronto para decisão.' },
      ],
    },
    detection: {
      kicker: '05 — A DETECÇÃO',
      title: 'Onde a IA\nvê o risco.',
      body: 'O mesmo quadro, dois olhares: a captura orbital crua e a leitura do nosso modelo, que acende em laranja a vegetação em rota de colisão com a rede.',
      labelBefore: 'CAPTURA · CO3D',
      labelAfter: 'RISCO DETECTADO',
      altBefore: 'Vista aérea de satélite de uma floresta cortada por linhas de transmissão, sem marcações.',
      altAfter: 'A mesma vista de satélite no modo de detecção: a cena escurece e a vegetação de risco próxima às linhas aparece destacada em laranja.',
      steps: [
        { t: 'Captura', d: 'O satélite registra o corredor da linha de transmissão em alta resolução.' },
        { t: 'Detecção', d: 'Nosso modelo separa o ruído e acende a vegetação que ameaça a rede.' },
        { t: 'Decisão', d: 'A concessionária recebe só o que importa e age antes do apagão.' },
      ],
    },
    impact: {
      kicker: '06 — IMPACTO',
      title: 'A escala do que está em jogo.',
      nums: [
        { n: '−85%', l: 'de dados redundantes processados' },
        { n: '10×', l: 'mais eficiente que inspeção tradicional' },
        { n: '∞', l: 'de redes monitoráveis em paralelo' },
      ],
    },
    award: {
      kicker: '07 — A CONQUISTA',
      title: 'Airbus Prize.\nFinais Mundiais.',
      body: 'Entre centenas de times do mundo inteiro, o IGNITE foi reconhecido nas Finais Mundiais do ACT IN SPACE 2026, em Bordeaux, com o Airbus Partner Award.',
      badges: ['ACT IN SPACE 2026', 'WORLD FINALS', 'BORDEAUX, FR', 'AIRBUS PARTNER AWARD'],
    },
    team: {
      kicker: '08 — O TIME',
      title: 'Cinco. Uma missão.',
      body: 'Engenheiros, desenvolvedores e curiosos obcecados em resolver problemas reais com tecnologia espacial.',
      quote: 'Cinco mentes. Uma órbita. Uma missão que começa do espaço e aterriza onde a infraestrutura mais precisa.',
      credits: { event: 'EVENTO', stage: 'ETAPA', result: 'RESULTADO' },
    },
    cta: {
      kicker: '09 — CONTATO',
      title: 'Vamos construir\no próximo capítulo.',
      body: 'Estamos abertos a conversas com concessionárias, parceiros e quem acredita que a próxima grande revolução em infraestrutura virá de cima.',
      button: 'Fale com o time',
      secondary: 'LinkedIn do time',
    },
    footer: { rights: 'IGNITE · 2026 · Todos os direitos reservados', origin: 'Feito entre o Brasil e Bordeaux' },
  },
  en: {
    nav: { mission: 'Mission', solution: 'Solution', impact: 'Impact', award: 'Award', team: 'Team', contact: 'Contact' },
    lang: 'PT',
    skip: 'Skip to content',
    hero: {
      runner: 'IGNITE — ORBITAL OBSERVATION MISSION · 2026',
      kicker: 'PLATE 01 / OBSERVATION',
      lines: ['Sees', 'what', 'power grids', 'miss.'],
      sub: 'Orbital data that prevents blackouts before they happen — Airbus Partner Award, ACT IN SPACE 2026.',
      cta: 'Read the mission',
      coordsLat: '47.16°N',
      coordsLon: '0.65°W',
      coordsAlt: '512 KM ALT',
      coordsNextPass: 'NEXT PASS',
      coordsHeading: 'HEADING',
      coordsOrbits: 'ORBITS',
      nextPass: 'T −08:42',
      heading: '098.4°',
      orbits: '01 247',
      live: 'LIVE',
      // Hint shown over the hero imagery — works for both mouse and touch.
      hint: 'Hover or drag to reveal the detection',
      // Real description of the hero imagery for screen readers / SEO (the visual
      // layers themselves are aria-hidden so this is announced exactly once).
      imageAlt:
        'Aerial satellite view of a forest crossed by transmission lines; under the cursor, the AI reading highlights in orange the vegetation that poses a risk to the grid.',
    },
    mission: {
      kicker: '01 — THE PROBLEM',
      title: 'One fallen tree.\nMillions in the dark.',
      body: 'Vegetation growing near transmission lines is one of the leading causes of blackouts worldwide. Monitoring every inch of the grid is expensive, slow and almost always reactive.',
      stats: [
        { n: '70%', l: 'of major grid outages trace back to vegetation and weather' },
        { n: '$B', l: 'in yearly operational losses for utility companies' },
        { n: '24/7', l: 'inspection today still depends on flights or ground teams' },
      ],
    },
    orbital: {
      kicker: '02 — WHERE WE OBSERVE',
      title: 'Orbital\ncoverage.',
      body: 'From hundreds of kilometers up, a single sensor follows entire transmission corridors — from Brazil to Bordeaux — without ever touching the ground.',
      routeLabel: 'ORBITAL ROUTE · FLORIANÓPOLIS → BORDEAUX',
      descentHint: 'Scroll to descend to the surface',
      satAlt:
        'Satellite view of the surface: a forest crossed by power transmission lines — the ground the orbital descent lands on.',
    },
    solution: {
      kicker: '03 — THE APPROACH',
      title: 'A new point of view.',
      body: 'We combine cutting-edge orbital imaging with intelligent processing to identify, from a distance, only what actually poses a risk. Less noise. More precision. Decisions at the right time.',
      pillars: [
        { t: 'Orbital', d: 'Continuous coverage of vast networks without ever leaving the ground.' },
        { t: 'Selective', d: 'Surgical focus on the points that really matter.' },
        { t: 'Efficient', d: 'Fewer acquisitions. Lower cost. Faster action.' },
      ],
    },
    how: {
      kicker: '04 — HOW IT WORKS',
      title: 'Three layers.\nOne answer.',
      steps: [
        { n: '01', t: 'Observe', d: 'Earth is observed continuously from hundreds of kilometers above.' },
        { n: '02', t: 'Interpret', d: 'The right information is extracted before it even reaches the ground.' },
        { n: '03', t: 'Act', d: 'The utility receives only what matters — ready for decision.' },
      ],
    },
    detection: {
      kicker: '05 — THE DETECTION',
      title: 'Where AI\nsees the risk.',
      body: "The same frame, two readings: the raw orbital capture and our model's interpretation, lighting up — in orange — the vegetation on a collision course with the grid.",
      labelBefore: 'CAPTURE · CO3D',
      labelAfter: 'RISK DETECTED',
      altBefore: 'Aerial satellite view of forest crossed by transmission lines, with no markings.',
      altAfter: 'The same satellite view in detection mode: the scene darkens and the risk vegetation near the lines is highlighted in orange.',
      steps: [
        { t: 'Capture', d: 'The satellite records the transmission-line corridor in high resolution.' },
        { t: 'Detection', d: 'Our model cuts through the noise and lights up the vegetation threatening the grid.' },
        { t: 'Decision', d: 'The utility receives only what matters — and acts before the blackout.' },
      ],
    },
    impact: {
      kicker: '06 — IMPACT',
      title: "The scale of what's at stake.",
      nums: [
        { n: '−85%', l: 'of redundant data processed' },
        { n: '10×', l: 'more efficient than traditional inspection' },
        { n: '∞', l: 'of networks monitorable in parallel' },
      ],
    },
    award: {
      kicker: '07 — THE AWARD',
      title: 'Airbus Prize.\nWorld Finals.',
      body: 'Among hundreds of teams from around the world, IGNITE was recognized at the World Finals of ACT IN SPACE 2026, in Bordeaux, with the Airbus Partner Award.',
      badges: ['ACT IN SPACE 2026', 'WORLD FINALS', 'BORDEAUX, FR', 'AIRBUS PARTNER AWARD'],
    },
    team: {
      kicker: '08 — THE TEAM',
      title: 'Five. One mission.',
      body: 'Engineers, developers and endlessly curious minds obsessed with solving real problems through space technology.',
      quote: 'Five minds. One orbit. A mission that begins in space and lands where infrastructure needs it most.',
      credits: { event: 'EVENT', stage: 'STAGE', result: 'RESULT' },
    },
    cta: {
      kicker: '09 — CONTACT',
      title: "Let's build\nthe next chapter.",
      body: "We're open to conversations with utilities, partners and anyone who believes the next big leap in infrastructure will come from above.",
      button: 'Get in touch',
      secondary: 'Team on LinkedIn',
    },
    footer: { rights: 'IGNITE · 2026 · All rights reserved', origin: 'Built between Brazil and Bordeaux' },
  },
};

// Generates the profile banner in a graphite pencil-sketch style.
// usage: node .github/scripts/banner.js
// Writes profile-assets/banner-{light,dark}.svg (desktop, 1200x300) and
// profile-assets/banner-mobile-{light,dark}.svg (phones, 600x556, name card above graph card).
const fs = require('fs');
const path = require('path');
const out = path.join(__dirname, '..', '..', 'profile-assets');
// Patrick Hand (SIL OFL), a 7 KB woff2 subset, embedded so the labels look the same on every device.
const font = fs.readFileSync(path.join(__dirname, 'banner-font.css'), 'utf8').trim();

const palettes = {
  light: {
    paper0: '#f5f2eb', paper1: '#ebe6dc',
    grain: '0 0 0 0 0.16  0 0 0 0 0.15  0 0 0 0 0.14  0.55 0 0 0 -0.18',
    name: '#141414', role: '#2e2e2e', tag: '#4a4744',
    base: '#8f897f', upper: '#1c1c1c', lower: '#3d3b38',
    node: '#f5f2eb', dot: '#141414', ring: '#f5f2eb', pulse: '#2a2a2a',
    label: '#3f3c39', underline: '#1c1c1c',
  },
  dark: {
    paper0: '#1d1d1f', paper1: '#262628',
    grain: '0 0 0 0 0.92  0 0 0 0 0.91  0 0 0 0 0.89  0.35 0 0 0 -0.12',
    name: '#f7f6f3', role: '#dedbd4', tag: '#b8b4ab',
    base: '#6a6761', upper: '#efede8', lower: '#c2beb5',
    node: '#1f1f21', dot: '#f7f6f3', ring: '#1f1f21', pulse: '#e2dfd8',
    label: '#bdb9b0', underline: '#efede8',
  },
};

// [main line start, upper branch, lower branch, merge point]
const sets = [
  ['idea', 'frontend', 'backend', 'shipped'],
  ['idea', 'web', 'mobile', 'shipped'],
  ['commit', 'compare', 'merge', 'deploy'],
  ['2023', 'intern', 'associate', 'engineer'],
  ['now', 'CI/CD', 'AI integration', 'next'],
];
const pos = { upper: [905, 70], lower: [980, 236], merge: [1064, 132], start: [762, 180] };

const defs = (p) => `  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${p.paper0}"/>
      <stop offset="1" stop-color="${p.paper1}"/>
    </linearGradient>
    <!-- paper grain -->
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="7" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="${p.grain}"/>
    </filter>
    <!-- slight wobble so strokes look hand drawn -->
    <filter id="pencil" x="-2%" y="-10%" width="104%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="3" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="pencil2" x="-2%" y="-10%" width="104%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="11" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="pencilsoft" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.2" numOctaves="1" seed="5" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="1.2" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <style>
      ${font}
      .sans { font-family: 'Segoe UI', Ubuntu, -apple-system, 'Helvetica Neue', Arial, sans-serif; }
      .hand { font-family: 'Patrick Hand Embed', 'Segoe Print', 'Bradley Hand', 'Comic Sans MS', 'Comic Neue', cursive; }
      .pulse { transform-box: fill-box; transform-origin: center; animation: pulse 2.4s ease-out infinite; }
      @keyframes pulse { 0% { opacity: .45; transform: scale(1); } 100% { opacity: 0; transform: scale(2.6); } }
      .lbl { opacity: 0; animation: cycle 20s linear infinite both; }
      .l1 { opacity: 1; animation-delay: -0.5s; }
      .l2 { animation-delay: 3.5s; }
      .l3 { animation-delay: 7.5s; }
      .l4 { animation-delay: 11.5s; }
      .l5 { animation-delay: 15.5s; }
      @keyframes cycle { 0% { opacity: 0; } 2% { opacity: 1; } 18% { opacity: 1; } 20% { opacity: 0; } 100% { opacity: 0; } }
      @media (prefers-reduced-motion: reduce) { .pulse { animation: none; opacity: 0; } }
    </style>
  </defs>`;

const paper = (x, y, w, h) => `  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="url(#bg)"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" filter="url(#grain)"/>`;

// Name, role and tagline. s sets the type sizes for the layout.
const intro = (p, x, y, s) => `  <!-- hand-drawn underline -->
  <g fill="none" stroke="${p.underline}" stroke-linecap="round" filter="url(#pencil)">
    <path d="M${x} ${y} c 18 -3, 38 -2, 58 -1" stroke-width="6"/>
    <path d="M${x + 2} ${y + 3} c 20 -2, 38 -1, 52 -2" stroke-width="2.5" opacity=".55"/>
  </g>
  <text x="${x}" y="${y + s.nameY}" class="sans" font-size="${s.name}" font-weight="800" fill="${p.name}">Anesh Somanath Majalikar</text>
  <text x="${x}" y="${y + s.roleY}" class="sans" font-size="${s.role}" font-weight="700" fill="${p.role}">Software Engineer · Full Stack (PERN)</text>
  <text x="${x}" y="${y + s.tag1Y}" class="sans" font-size="${s.tag}" font-weight="600" fill="${p.tag}">React to PostgreSQL in TypeScript.</text>
  <text x="${x}" y="${y + s.tag2Y}" class="sans" font-size="${s.tag}" font-weight="600" fill="${p.tag}">New domain, built end to end.</text>`;

const lines = (p, dx, dy) => `
    <path d="M760 150 H1150" stroke="${p.base}" transform="translate(${dx} ${dy})"/>
    <path d="M830 150 C 860 150, 860 92, 890 92 H970 C 1000 92, 1000 150, 1050 150" stroke="${p.upper}" transform="translate(${dx} ${dy})"/>
    <path d="M930 150 C 955 150, 955 208, 980 208 H1020 C 1045 208, 1045 150, 1100 150" stroke="${p.lower}" transform="translate(${dx} ${dy})"/>`;

// Git graph motif in desktop coordinates (x 760 to about 1180, y 50 to 245).
const graph = (p) => {
  const labels = sets.map((s, i) => `    <g class="lbl l${i + 1}">
      <text x="${pos.upper[0]}" y="${pos.upper[1]}">${s[1]}</text>
      <text x="${pos.lower[0]}" y="${pos.lower[1]}">${s[2]}</text>
      <text x="${pos.merge[0]}" y="${pos.merge[1]}">${s[3]}</text>
      <text x="${pos.start[0]}" y="${pos.start[1]}">${s[0]}</text>
    </g>`).join('\n');
  return `  <!-- git graph motif, sketched: a main stroke plus a faint second pass -->
  <g fill="none" stroke-width="2" stroke-linecap="round" opacity=".5" filter="url(#pencil2)">${lines(p, 1.5, -1.5)}
  </g>
  <g fill="none" stroke-width="4.2" stroke-linecap="round" filter="url(#pencil)">${lines(p, 0, 0)}
  </g>
  <g stroke-width="3.4" filter="url(#pencilsoft)">
    <circle cx="790" cy="150" r="8" fill="${p.node}" stroke="${p.base}"/>
    <circle cx="830" cy="150" r="8" fill="${p.node}" stroke="${p.base}"/>
    <circle cx="905" cy="92" r="8" fill="${p.node}" stroke="${p.upper}"/>
    <circle cx="955" cy="92" r="8" fill="${p.node}" stroke="${p.upper}"/>
    <circle cx="930" cy="150" r="8" fill="${p.node}" stroke="${p.base}"/>
    <circle cx="1000" cy="208" r="8" fill="${p.node}" stroke="${p.lower}"/>
    <circle cx="1100" cy="150" r="8" fill="${p.node}" stroke="${p.lower}"/>
  </g>
  <circle class="pulse" cx="1050" cy="150" r="11" fill="${p.pulse}"/>
  <circle cx="1050" cy="150" r="11" fill="${p.dot}" stroke="${p.ring}" stroke-width="3"/>

  <!-- five label sets cycle, 4s each: delivery, web and mobile, versioning, journey, next -->
  <g class="hand" font-size="20" font-weight="700" fill="${p.label}">
${labels}
  </g>`;
};

const head = (w, h) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="t d">
  <title id="t">Anesh Somanath Majalikar</title>
  <desc id="d">Software Engineer, full stack (PERN). React to PostgreSQL in TypeScript. New domain, built end to end.</desc>`;

const desktop = (p) => `${head(1200, 300)}
${defs(p)}

${paper(0, 0, 1200, 300)}

${intro(p, 64, 73, { name: 50, role: 24, tag: 19, nameY: 59, roleY: 101, tag1Y: 139, tag2Y: 165 })}

${graph(p)}
</svg>
`;

// Phones: two cards. The graph is scaled 1.2x and centred in the lower card.
const mobile = (p) => `${head(600, 556)}
${defs(p)}

${paper(0, 0, 600, 250)}
${intro(p, 32, 48, { name: 38, role: 24, tag: 21, nameY: 56, roleY: 98, tag1Y: 140, tag2Y: 170 })}

${paper(0, 266, 600, 290)}
  <g transform="translate(48 411) scale(1.2) translate(-760 -145)">
${graph(p)}
  </g>
</svg>
`;

for (const [name, p] of Object.entries(palettes)) {
  fs.writeFileSync(path.join(out, `banner-${name}.svg`), desktop(p));
  fs.writeFileSync(path.join(out, `banner-mobile-${name}.svg`), mobile(p));
}
console.log('banners written');

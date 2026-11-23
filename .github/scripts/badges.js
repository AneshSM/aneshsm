// Generates the README badge rows as SVGs whose tiles share the row width evenly.
// usage: node .github/scripts/badges.js [YYYY-MM]
// The optional argument stands in for today's month, for testing.
//
// Each row is written for both GitHub themes and two widths:
// profile-assets/badges-<row>-<theme>.svg puts every tile on one line (desktop),
// and badges-<row>-mobile-<theme>.svg wraps to two columns (phones).
// When the last line has one tile, that tile takes the full width.
// Tiles are neutral cards with a pencil outline, logo and underline in the brand
// colour, darkened or lightened until it has 3:1 contrast with the card.
// The script also sets the experience count in the README alt text.
const fs = require('fs');
const path = require('path');
const logos = require('./logos.js');

const root = path.join(__dirname, '..', '..');
const out = path.join(root, 'profile-assets');

// Full years since the career start month, February 2023.
const today = process.argv[2] || new Date().toISOString().slice(0, 7);
const [year, month] = today.split('-').map(Number);
const years = year - 2023 - (month < 2 ? 1 : 0);

const rows = {
  stats: {
    title: `Experience: ${years}+ years. Stack: PERN and TypeScript. Web and mobile: React and React Native. AI-assisted: Claude Code and MCP.`,
    tiles: [
      { label: 'EXPERIENCE', value: `${years}+ years`, bg: '#c2410c' },
      { label: 'STACK', value: 'PERN + TypeScript', bg: '#1d4ed8' },
      { label: 'WEB + MOBILE', value: 'React · React Native', bg: '#047857' },
      { label: 'AI-ASSISTED', value: 'Claude Code + MCP', bg: '#7c3aed' },
    ],
  },
  bi: {
    title: 'Qlik Sense, Power BI, Microsoft Fabric, Microsoft Entra',
    tiles: [
      { value: 'Qlik Sense', bg: '#009848', logo: 'qlik' },
      { value: 'Power BI', bg: '#f2c811', logo: 'powerbi' },
      { value: 'Microsoft Fabric', bg: '#117865' },
      { value: 'Microsoft Entra', bg: '#0078d4' },
    ],
  },
  tools: {
    title: 'Jest, Playwright, Prettier, Firebase, Claude Code',
    tiles: [
      { value: 'Jest', bg: '#c21325', logo: 'jest' },
      { value: 'Playwright', bg: '#2ead33', logo: 'playwright' },
      { value: 'Prettier', bg: '#f7b93e', logo: 'prettier' },
      { value: 'Firebase', bg: '#dd2c00', logo: 'firebase' },
      { value: 'Claude Code', bg: '#d97757', logo: 'anthropic' },
    ],
  },
};

const layouts = {
  desktop: { suffix: '', width: 1200, cols: 4, gap: 12, pad: 20, statH: 80, techH: 64, label: 14, labelY: 31, value: 23, valueY: 62, tech: 22, logo: 28 },
  mobile: { suffix: '-mobile', width: 600, cols: 2, gap: 12, pad: 20, statH: 88, techH: 72, label: 15, labelY: 34, value: 24, valueY: 68, tech: 24, logo: 30 },
};

// Card and text colours per GitHub theme.
const themes = {
  light: { fill: '#ebe6dc', text: '#141414', label: '#4a4744' },
  dark: { fill: '#303034', text: '#efede8', label: '#b8b4ab' },
};

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const toHex = (c) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
const luminance = (hex) => {
  const [r, g, b] = rgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// Darken (light theme) or mix towards white (dark theme) in 2% steps until it passes.
function themed(hex, theme) {
  const c = rgb(hex);
  for (let i = 0; i <= 50; i++) {
    const t = i * 0.02;
    const mixed = toHex(theme === themes.light ? c.map((v) => v * (1 - t)) : c.map((v) => v + (255 - v) * t));
    if (contrast(mixed, theme.fill) >= 3) return mixed;
  }
  return hex;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const defs = `  <defs>
    <filter id="pencil" x="-2%" y="-10%" width="104%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="3" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="pencil2" x="-2%" y="-10%" width="104%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="11" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>`;

const underline = (x, y, c) => `  <g fill="none" stroke="${c}" stroke-linecap="round" filter="url(#pencil)">
    <path d="M${x} ${y} c 16 -2, 34 -2, 52 -1" stroke-width="3.5"/>
    <path d="M${x + 2} ${y + 2.5} c 18 -1.5, 32 -1, 44 -1.5" stroke-width="1.5" opacity=".55"/>
  </g>`;

function tile(t, x, y, w, h, L, theme) {
  const c = themed(t.bg, theme);
  const parts = [
    `  <rect x="${x + 2}" y="${y + 2}" width="${w - 4}" height="${h - 4}" rx="10" fill="${theme.fill}"/>`,
    `  <rect x="${x + 3.5}" y="${y + 2.5}" width="${w - 6}" height="${h - 6}" rx="10" fill="none" stroke="${c}" stroke-width="1.5" opacity=".45" filter="url(#pencil2)"/>`,
    `  <rect x="${x + 2}" y="${y + 2}" width="${w - 4}" height="${h - 4}" rx="10" fill="none" stroke="${c}" stroke-width="2.2" filter="url(#pencil)"/>`,
  ];
  if (t.label) {
    parts.push(`  <text x="${x + L.pad}" y="${y + L.labelY}" font-size="${L.label}" font-weight="700" letter-spacing="1.5" fill="${theme.label}">${esc(t.label)}</text>`);
    parts.push(`  <text x="${x + L.pad}" y="${y + L.valueY}" font-size="${L.value}" font-weight="700" fill="${theme.text}">${esc(t.value)}</text>`);
    parts.push(underline(x + L.pad, y + L.valueY + 12, c));
  } else {
    let tx = x + L.pad;
    if (t.logo) {
      const s = L.logo / 24;
      const ly = y + (h - L.logo) / 2;
      parts.push(`  <path transform="translate(${tx} ${ly}) scale(${s})" d="${logos[t.logo]}" fill="${c}"/>`);
      tx += L.logo + 12;
    }
    const ty = y + h / 2 + L.tech * 0.35;
    parts.push(`  <text x="${tx}" y="${ty}" font-size="${L.tech}" font-weight="700" fill="${theme.text}">${esc(t.value)}</text>`);
    parts.push(underline(tx, ty + L.tech / 2, c));
  }
  return parts.join('\n');
}

function svg(row, L, theme) {
  const h = row.tiles[0].label ? L.statH : L.techH;
  const lines = [];
  for (let i = 0; i < row.tiles.length; i += L.cols) lines.push(row.tiles.slice(i, i + L.cols));
  const height = lines.length * h + (lines.length - 1) * L.gap;
  const body = lines.map((line, r) => {
    const w = (L.width - (line.length - 1) * L.gap) / line.length;
    return line.map((t, c) => tile(t, +(c * (w + L.gap)).toFixed(2), r * (h + L.gap), +w.toFixed(2), h, L, theme)).join('\n');
  }).join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${L.width}" height="${height}" viewBox="0 0 ${L.width} ${height}" role="img" aria-labelledby="t">
  <title id="t">${esc(row.title)}</title>
  <style>text { font-family: 'Segoe UI', Ubuntu, -apple-system, 'Helvetica Neue', Arial, sans-serif; }</style>
${defs}
${body}
</svg>
`;
}

for (const [name, row] of Object.entries(rows)) {
  for (const L of Object.values(layouts)) {
    for (const [themeName, theme] of Object.entries(themes)) {
      fs.writeFileSync(path.join(out, `badges-${name}${L.suffix}-${themeName}.svg`), svg(row, L, theme));
    }
  }
}

const readme = path.join(root, 'README.md');
fs.writeFileSync(readme, fs.readFileSync(readme, 'utf8').replace(/Experience: \d+\+ years/g, `Experience: ${years}+ years`));

console.log(`badges written, experience: ${years}+ years (as of ${today})`);

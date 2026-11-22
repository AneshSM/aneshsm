// Generates the README badge rows as SVGs whose tiles share the row width evenly.
// usage: node .github/scripts/badges.js [YYYY-MM]
// The optional argument stands in for today's month, for testing.
//
// Each row is written twice: profile-assets/badges-<row>.svg puts every tile on
// one line (desktop), and badges-<row>-mobile.svg wraps to two columns (phones).
// When the last line has one tile, that tile takes the full width.
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
    title: `Experience: ${years}+ years. Stack: PERN and TypeScript. BI platforms: Qlik and Power BI. AI-assisted: Claude Code and MCP.`,
    tiles: [
      { label: 'EXPERIENCE', value: `${years}+ years`, bg: '#c2410c' },
      { label: 'STACK', value: 'PERN + TypeScript', bg: '#1d4ed8' },
      { label: 'BI PLATFORMS', value: 'Qlik · Power BI', bg: '#047857' },
      { label: 'AI-ASSISTED', value: 'Claude Code + MCP', bg: '#7c3aed' },
    ],
  },
  bi: {
    title: 'Qlik Sense, Power BI, Microsoft Fabric, Microsoft Entra',
    tiles: [
      { value: 'Qlik Sense', bg: '#009848', logo: 'qlik' },
      { value: 'Power BI', bg: '#f2c811', fg: '#000000', logo: 'powerbi' },
      { value: 'Microsoft Fabric', bg: '#117865' },
      { value: 'Microsoft Entra', bg: '#0078d4' },
    ],
  },
  tools: {
    title: 'Playwright, Prettier, Claude Code',
    tiles: [
      { value: 'Playwright', bg: '#2ead33', logo: 'playwright' },
      { value: 'Prettier', bg: '#1a2b34', logo: 'prettier', logoFg: '#f7b93e' },
      { value: 'Claude Code', bg: '#d97757', logo: 'anthropic' },
    ],
  },
};

const layouts = {
  desktop: { suffix: '', width: 1200, cols: 4, gap: 12, pad: 20, statH: 80, techH: 64, label: 14, labelY: 31, value: 23, valueY: 62, tech: 22, logo: 28 },
  mobile: { suffix: '-mobile', width: 600, cols: 2, gap: 12, pad: 20, statH: 88, techH: 72, label: 15, labelY: 34, value: 24, valueY: 68, tech: 24, logo: 30 },
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function tile(t, x, y, w, h, L) {
  const fg = t.fg || '#ffffff';
  const parts = [`  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${t.bg}"/>`];
  if (t.label) {
    parts.push(`  <text x="${x + L.pad}" y="${y + L.labelY}" font-size="${L.label}" font-weight="700" letter-spacing="1.5" fill="${fg}" fill-opacity=".85">${esc(t.label)}</text>`);
    parts.push(`  <text x="${x + L.pad}" y="${y + L.valueY}" font-size="${L.value}" font-weight="700" fill="${fg}">${esc(t.value)}</text>`);
  } else {
    let tx = x + L.pad;
    if (t.logo) {
      const s = L.logo / 24;
      const ly = y + (h - L.logo) / 2;
      parts.push(`  <path transform="translate(${tx} ${ly}) scale(${s})" d="${logos[t.logo]}" fill="${t.logoFg || fg}"/>`);
      tx += L.logo + 12;
    }
    parts.push(`  <text x="${tx}" y="${y + h / 2 + L.tech * 0.35}" font-size="${L.tech}" font-weight="700" fill="${fg}">${esc(t.value)}</text>`);
  }
  return parts.join('\n');
}

function svg(row, L) {
  const h = row.tiles[0].label ? L.statH : L.techH;
  const lines = [];
  for (let i = 0; i < row.tiles.length; i += L.cols) lines.push(row.tiles.slice(i, i + L.cols));
  const height = lines.length * h + (lines.length - 1) * L.gap;
  const body = lines.map((line, r) => {
    const w = (L.width - (line.length - 1) * L.gap) / line.length;
    return line.map((t, c) => tile(t, +(c * (w + L.gap)).toFixed(2), r * (h + L.gap), +w.toFixed(2), h, L)).join('\n');
  }).join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${L.width}" height="${height}" viewBox="0 0 ${L.width} ${height}" role="img" aria-labelledby="t">
  <title id="t">${esc(row.title)}</title>
  <style>text { font-family: 'Segoe UI', Ubuntu, -apple-system, 'Helvetica Neue', Arial, sans-serif; }</style>
${body}
</svg>
`;
}

for (const [name, row] of Object.entries(rows)) {
  for (const L of Object.values(layouts)) {
    fs.writeFileSync(path.join(out, `badges-${name}${L.suffix}.svg`), svg(row, L));
  }
}

const readme = path.join(root, 'README.md');
fs.writeFileSync(readme, fs.readFileSync(readme, 'utf8').replace(/Experience: \d+\+ years/g, `Experience: ${years}+ years`));

console.log(`badges written, experience: ${years}+ years (as of ${today})`);

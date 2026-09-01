const fs = require('fs');

function extractTab(file, marker) {
    const code = fs.readFileSync(file, 'utf8');
    const startMarker = `const ${marker} = \``;
    const start = code.indexOf(startMarker);
    if (start === -1) return '';
    const end = code.indexOf('`;', start);
    return code.substring(start + startMarker.length, end);
}

const base = fs.readFileSync('base_page.cjs', 'utf8');
let pageCode = base.substring(base.indexOf('`') + 1, base.lastIndexOf('`'));

// Extract contents
const vargaTab = extractTab('update_planets.cjs', 'vargaTab');
const maitriTab = extractTab('update_planets.cjs', 'maitriTab');
const planetsTab = extractTab('update_planets.cjs', 'planetsTab');
const analysisTab = extractTab('add_predictions.cjs', 'analysisTab');
const basicTab = extractTab('add_predictions.cjs', 'basicTab');
const dasaTab = extractTab('add_predictions.cjs', 'dasaTab');
const nakTab = extractTab('add_nakshatra_tab.cjs', 'nakTab');
const mangalTab = extractTab('add_mangal_tab.cjs', 'mangalTab');
const transitTab = extractTab('add_transit_tab.cjs', 'transitTab');
const sadeTab = extractTab('add_sade_sati.cjs', 'sadeSatiTab');
const ashtakaTab = extractTab('add_ashtakavarga.cjs', 'ashtakaTab');
const shadbalaTab = extractTab('add_shadbala.cjs', 'shadbalaTab');
const sudarshanaTab = extractTab('add_sudarshana.cjs', 'sudarshanaTab');

// Find insertion point in base (after Rasi chart TabsContent)
const insertPoint = pageCode.indexOf('</TabsContent>') + 14;

const allTabs = [
    vargaTab, maitriTab, planetsTab, analysisTab, basicTab, dasaTab,
    nakTab, mangalTab, transitTab, sadeTab, ashtakaTab, shadbalaTab, sudarshanaTab
].join('\n\n');

pageCode = pageCode.substring(0, insertPoint) + '\n' + allTabs + pageCode.substring(insertPoint);

fs.writeFileSync('src/app/charts/[id]/page.tsx', pageCode);
console.log('Compiled perfectly!');

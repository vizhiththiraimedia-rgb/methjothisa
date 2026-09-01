const fs = require('fs');

// 1. Fix free-horoscope page (Suspense)
const freeHoroscopePath = 'src/app/free-horoscope/page.tsx';
let freeContent = fs.readFileSync(freeHoroscopePath, 'utf8');

// If already wrapped, skip
if (!freeContent.includes('function FreeHoroscopeContent')) {
  // Add React import if missing
  if (!freeContent.includes('import React')) {
    freeContent = freeContent.replace('"use client";\n', '"use client";\nimport React, { Suspense } from "react";\n');
  } else if (!freeContent.includes('Suspense')) {
    freeContent = freeContent.replace('import React', 'import React, { Suspense }');
  }

  // Rename export default function FreeHoroscopePage to function FreeHoroscopeContent
  freeContent = freeContent.replace('export default function FreeHoroscopePage', 'function FreeHoroscopeContent');

  // Add the wrapper at the end
  freeContent += `\n\nexport default function FreeHoroscopePage() {\n  return (\n    <Suspense fallback={<div className="min-h-screen pt-24 pb-12 flex items-center justify-center">Loading...</div>}>\n      <FreeHoroscopeContent />\n    </Suspense>\n  );\n}\n`;
  
  fs.writeFileSync(freeHoroscopePath, freeContent);
  console.log('Fixed free-horoscope');
}

// 2. Fix api/reports/route.ts
const reportsRoutePath = 'src/app/api/reports/route.ts';
if (fs.existsSync(reportsRoutePath)) {
  let reportsContent = fs.readFileSync(reportsRoutePath, 'utf8');
  if (!reportsContent.includes('export const dynamic')) {
    reportsContent = `export const dynamic = 'force-dynamic';\n` + reportsContent;
    fs.writeFileSync(reportsRoutePath, reportsContent);
    console.log('Fixed api/reports');
  }
}

// 3. Fix api/prokerala/test/route.ts
const prokeralaRoutePath = 'src/app/api/prokerala/test/route.ts';
if (fs.existsSync(prokeralaRoutePath)) {
  let prokeralaContent = fs.readFileSync(prokeralaRoutePath, 'utf8');
  if (!prokeralaContent.includes('export const dynamic')) {
    prokeralaContent = `export const dynamic = 'force-dynamic';\n` + prokeralaContent;
    fs.writeFileSync(prokeralaRoutePath, prokeralaContent);
    console.log('Fixed api/prokerala/test');
  }
}

console.log('Done');

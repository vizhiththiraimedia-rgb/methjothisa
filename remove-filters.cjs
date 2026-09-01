const fs = require('fs');

let content = fs.readFileSync('src/app/consult/page.tsx', 'utf8');

// Find the filter div and remove it
const filterDivRegex = /<div className="flex flex-wrap items-center justify-center gap-4 mb-8">[\s\S]*?<\/div>\s*<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">/;

if (filterDivRegex.test(content)) {
  content = content.replace(filterDivRegex, '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">');
  fs.writeFileSync('src/app/consult/page.tsx', content);
  console.log('Removed filters successfully');
} else {
  console.log('Filter div not found');
}

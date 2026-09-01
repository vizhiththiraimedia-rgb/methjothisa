const fs = require('fs');

let data = JSON.parse(fs.readFileSync('original_page.json', 'utf8')).content;
const lines = data.split('\n');
let newLines = [];
let started = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('The following code has been modified')) {
    started = true;
    continue;
  }
  if (lines[i].includes('The above content shows the entire')) {
    break;
  }
  
  if (started) {
    const match = lines[i].match(/^\d+:\s?(.*)$/);
    if (match) {
      newLines.push(match[1]);
    }
  }
}

fs.writeFileSync('src/app/charts/[id]/page.tsx', newLines.join('\n'));
console.log('Restored original page of length', newLines.length);

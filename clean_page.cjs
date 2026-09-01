const fs = require('fs');
let data = JSON.parse(fs.readFileSync('original_page.json', 'utf8')).content;

// Find where the code actually starts
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
    // Strip "1: ", "10: ", "123: "
    const match = lines[i].match(/^\d+:\s(.*)$/);
    if (match) {
      newLines.push(match[1]);
    } else {
      newLines.push(lines[i]); // empty lines might just be empty
    }
  }
}

fs.writeFileSync('src/app/charts/[id]/page.tsx', newLines.join('\n'));

const fs = require('fs');
const current = fs.readFileSync('./src/components/astrology/chart-renderer.tsx', 'utf8');
const backup = fs.readFileSync('./src/components/astrology/chart-renderer.tsx.bak', 'utf8');

// Replace the combined if condition with just kendare
let newCode = current.replace(
  'if (style === "kendare" || style === "south" || style === "north") {',
  'if (style === "kendare") {'
);

// Extract South, North, East from backup
const southStart = backup.indexOf('// South Indian Chart');
const oldReturnNull = backup.lastIndexOf('return null;');
const additionalStyles = backup.substring(southStart, oldReturnNull);

// Inject additional styles before the final return null in newCode
const newReturnNull = newCode.lastIndexOf('return null;');
newCode = newCode.substring(0, newReturnNull) + '\n' + additionalStyles + '\n  return null;\n}\n';

fs.writeFileSync('./src/components/astrology/chart-renderer.tsx', newCode);
console.log('Merged successfully');

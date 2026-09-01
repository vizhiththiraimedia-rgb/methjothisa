const fs = require('fs');
let c = fs.readFileSync('prisma/schema.prisma', 'utf8');
c = c.replace('@@map(" celebrities)', '@@map("celebrities")');
fs.writeFileSync('prisma/schema.prisma', c);

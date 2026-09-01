const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const chart = await prisma.chart.findFirst();
  console.log(chart.planetaryPositions);
}
main().finally(() => prisma.$disconnect());

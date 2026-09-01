const fs = require('fs');
let content = fs.readFileSync('src/app/charts/[id]/page.tsx', 'utf8');

// Add import for ChartRenderer and useState
if (!content.includes('ChartRenderer')) {
  content = content.replace('import { Button } from "@/components/ui/button"', 'import { Button } from "@/components/ui/button"\nimport { ChartRenderer } from "@/components/astrology/chart-renderer"');
}

// Add state to ChartDetailPage
if (!content.includes('const [chartStyle, setChartStyle]')) {
  content = content.replace('export default function ChartDetailPage({ params }: { params: { id: string } }) {', 'export default function ChartDetailPage({ params }: { params: { id: string } }) {\n  const [chartStyle, setChartStyle] = useState<"south" | "north" | "east">("south");');
}

// Find the Rasi Chart tab content and replace the grid with ChartRenderer
const chartTabStart = content.indexOf('<TabsContent value="chart">');
const cardContentStart = content.indexOf('<CardContent className="flex justify-center', chartTabStart);
const cardContentEnd = content.indexOf('</CardContent>', cardContentStart);

const newCardContent = `<CardContent className="flex flex-col items-center p-6">
                    <div className="flex gap-2 justify-center mb-6 bg-muted/50 p-1 rounded-lg">
                      <Button variant={chartStyle === 'north' ? 'default' : 'ghost'} size="sm" onClick={() => setChartStyle('north')}>North Indian</Button>
                      <Button variant={chartStyle === 'south' ? 'default' : 'ghost'} size="sm" onClick={() => setChartStyle('south')}>South Indian</Button>
                      <Button variant={chartStyle === 'east' ? 'default' : 'ghost'} size="sm" onClick={() => setChartStyle('east')}>East Indian</Button>
                    </div>
                    <ChartRenderer planets={planets} style={chartStyle} />
                  `;

content = content.substring(0, cardContentStart) + newCardContent + content.substring(cardContentEnd);

fs.writeFileSync('src/app/charts/[id]/page.tsx', content);

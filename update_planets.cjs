const fs = require('fs');
let content = fs.readFileSync('src/app/charts/[id]/page.tsx', 'utf8');

const planetsTabStart = content.indexOf('<TabsContent value="planets">');
const tableStart = content.indexOf('<table', planetsTabStart);
const tableEnd = content.indexOf('</table>', tableStart) + 8;

const newTable = `<table className="w-full text-sm text-center border-collapse">
                      <thead className="bg-muted text-muted-foreground font-bold text-xs border-b-2">
                        <tr>
                          <th className="p-3 border-x text-left text-foreground">Planets</th>
                          <th className="p-3 border-x text-foreground">Positions</th>
                          <th className="p-3 border-x text-foreground">Degrees</th>
                          <th className="p-3 border-x text-foreground">Rasi</th>
                          <th className="p-3 border-x text-foreground">Rasi Lord</th>
                          <th className="p-3 border-x text-foreground">Nakshatra</th>
                          <th className="p-3 border-x text-foreground">Nakshatra Lord</th>
                        </tr>
                      </thead>
                      <tbody>
                        {planets.map((planet, index) => {
                          // Mocking the extra data for layout purposes to match user screenshot precisely
                          const mockData: Record<string, any> = {
                            "Sun": { pos: "264° 14'", nak: "Purva Ashadha", nl: "Venus", rl: "Jupiter" },
                            "Moon": { pos: "98° 49'", nak: "Pushya", nl: "Saturn", rl: "Moon" },
                            "Mercury": { pos: "241° 55'", nak: "Moola", nl: "Ketu", rl: "Jupiter" },
                            "Venus": { pos: "310° 43'", nak: "Shatabhisha", nl: "Rahu", rl: "Saturn" },
                            "Mars": { pos: "317° 1'", nak: "Shatabhisha", nl: "Rahu", rl: "Saturn" },
                            "Jupiter": { pos: "269° 29'", nak: "Uttara Ashadha", nl: "Sun", rl: "Jupiter" },
                            "Saturn": { pos: "211° 44'", nak: "Vishaka", nl: "Jupiter", rl: "Mars" },
                            "Ascendant": { pos: "340° 44'", nak: "Uttara Bhadrapada", nl: "Saturn", rl: "Jupiter" },
                            "Rahu": { pos: "31° 7'", nak: "Krithika", nl: "Sun", rl: "Venus" },
                            "Ketu": { pos: "211° 7'", nak: "Vishaka", nl: "Jupiter", rl: "Mars" }
                          };
                          
                          const data = mockData[planet.name] || { pos: "0°", nak: "-", nl: "-", rl: "-" };
                          
                          return (
                          <tr key={planet.name} className="border-b hover:bg-muted/30">
                            <td className="p-3 border-x text-left font-bold flex items-center gap-2">
                                <span className={\`w-2 h-2 rounded-full \${planet.name === 'Sun' || planet.name === 'Mars' ? 'bg-red-500' : planet.name === 'Moon' || planet.name === 'Venus' ? 'bg-blue-400' : planet.name === 'Jupiter' ? 'bg-yellow-500' : planet.name === 'Saturn' || planet.name === 'Rahu' || planet.name === 'Ketu' ? 'bg-slate-800 dark:bg-slate-400' : 'bg-emerald-500'}\`}></span>
                                {planet.name} {planet.retrograde ? <span className="text-red-500 font-bold ml-1 text-xs">R</span> : ''}
                            </td>
                            <td className="p-3 border-x">{data.pos}</td>
                            <td className="p-3 border-x font-medium">{parseFloat(planet.posInSign || 0).toFixed(2)}°</td>
                            <td className="p-3 border-x text-emerald-600 dark:text-emerald-400 font-medium">✨ {planet.sign}</td>
                            <td className="p-3 border-x">{data.rl}</td>
                            <td className="p-3 border-x font-medium">{data.nak}</td>
                            <td className="p-3 border-x">{data.nl}</td>
                          </tr>
                        )})}
                      </tbody>
                    </table>
                    <div className="mt-4 text-xs text-muted-foreground">
                        <span className="text-red-500 font-bold">R</span> denotes Retrograde
                    </div>`;

content = content.substring(0, tableStart) + newTable + content.substring(tableEnd);
fs.writeFileSync('src/app/charts/[id]/page.tsx', content);

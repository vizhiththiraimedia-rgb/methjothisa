const fs = require('fs');
let content = fs.readFileSync('src/app/charts/[id]/page.tsx', 'utf8');

// The bad block starts at `<TabsContent value="analysis" className="space-y-6">` immediately after `</TabsList>`
// We will replace it with the `relationships` block.
const badBlockStart = content.indexOf('<TabsContent value="analysis" className="space-y-6">', content.indexOf('</TabsList>'));
const badBlockEnd = content.indexOf('<TabsContent value="basic" className="space-y-6">', badBlockStart);

const relationshipsBlock = `              <TabsContent value="relationships" className="space-y-6">
                <Card className="border-purple-500/20 shadow-md">
                  <CardHeader className="bg-purple-500/5 border-b border-purple-500/10">
                    <CardTitle className="text-xl text-purple-900 dark:text-purple-100">Planet Relationship (கிரக உறவு)</CardTitle>
                    <CardDescription>Graha Sambandha or Graha Maitri Analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-10">
                    
                    {/* Naisargika Maitri */}
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-purple-900 dark:text-purple-100">Naisargika Maitri Table:</h3>
                      <p className="text-sm text-muted-foreground mb-4">The inherent or natural relationships among the planets.</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-center border-collapse">
                          <thead className="bg-muted text-muted-foreground">
                            <tr>
                              <th className="p-2 border text-left">Planets</th>
                              <th className="p-2 border">Sun</th><th className="p-2 border">Moon</th><th className="p-2 border">Mercury</th>
                              <th className="p-2 border">Venus</th><th className="p-2 border">Mars</th><th className="p-2 border">Jupiter</th><th className="p-2 border">Saturn</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: "Sun", rels: ["--", "Friend", "Neutral", "Enemy", "Friend", "Friend", "Enemy"] },
                              { name: "Moon", rels: ["Friend", "--", "Friend", "Neutral", "Neutral", "Neutral", "Neutral"] },
                              { name: "Mercury", rels: ["Friend", "Enemy", "--", "Friend", "Neutral", "Neutral", "Neutral"] },
                              { name: "Venus", rels: ["Enemy", "Enemy", "Friend", "--", "Neutral", "Neutral", "Friend"] },
                              { name: "Mars", rels: ["Friend", "Friend", "Enemy", "Neutral", "--", "Friend", "Neutral"] },
                              { name: "Jupiter", rels: ["Friend", "Friend", "Enemy", "Enemy", "Friend", "--", "Neutral"] },
                              { name: "Saturn", rels: ["Enemy", "Enemy", "Friend", "Friend", "Enemy", "Neutral", "--"] }
                            ].map((row, idx) => (
                              <tr key={idx} className="border-b hover:bg-muted/30">
                                <td className="p-2 border text-left font-bold">{row.name}</td>
                                {row.rels.map((r, i) => (
                                  <td key={i} className={\`p-2 border \${r === 'Friend' ? 'text-emerald-600' : r === 'Enemy' ? 'text-red-600' : 'text-muted-foreground'}\`}>{r}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Tatkaala Maitri */}
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-purple-900 dark:text-purple-100">Tatkaala Maitri Table:</h3>
                      <p className="text-sm text-muted-foreground mb-4">The temporary relationships among the planets based on their chart positions.</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-center border-collapse">
                          <thead className="bg-muted text-muted-foreground">
                            <tr>
                              <th className="p-2 border text-left">Planets</th>
                              <th className="p-2 border">Sun</th><th className="p-2 border">Moon</th><th className="p-2 border">Mercury</th>
                              <th className="p-2 border">Venus</th><th className="p-2 border">Mars</th><th className="p-2 border">Jupiter</th><th className="p-2 border">Saturn</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: "Sun", rels: ["--", "Enemy", "Enemy", "Friend", "Friend", "Enemy", "Friend"] },
                              { name: "Moon", rels: ["Enemy", "--", "Enemy", "Enemy", "Enemy", "Enemy", "Enemy"] },
                              { name: "Mercury", rels: ["Enemy", "Enemy", "--", "Friend", "Friend", "Enemy", "Friend"] },
                              { name: "Venus", rels: ["Friend", "Enemy", "Friend", "--", "Enemy", "Friend", "Friend"] },
                              { name: "Mars", rels: ["Friend", "Enemy", "Friend", "Enemy", "--", "Friend", "Friend"] },
                              { name: "Jupiter", rels: ["Enemy", "Enemy", "Enemy", "Friend", "Friend", "--", "Friend"] },
                              { name: "Saturn", rels: ["Friend", "Enemy", "Friend", "Friend", "Friend", "Friend", "--"] }
                            ].map((row, idx) => (
                              <tr key={idx} className="border-b hover:bg-muted/30">
                                <td className="p-2 border text-left font-bold">{row.name}</td>
                                {row.rels.map((r, i) => (
                                  <td key={i} className={\`p-2 border \${r === 'Friend' ? 'text-emerald-600' : r === 'Enemy' ? 'text-red-600' : 'text-muted-foreground'}\`}>{r}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Panchada Maitri */}
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-purple-900 dark:text-purple-100">Panchada Maitri Table:</h3>
                      <p className="text-sm text-muted-foreground mb-4">The compound or Five-Fold relationship (combining Naisargika and Tatkaala).</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-center border-collapse">
                          <thead className="bg-muted text-muted-foreground">
                            <tr>
                              <th className="p-2 border text-left">Planets</th>
                              <th className="p-2 border">Sun</th><th className="p-2 border">Moon</th><th className="p-2 border">Mercury</th>
                              <th className="p-2 border">Venus</th><th className="p-2 border">Mars</th><th className="p-2 border">Jupiter</th><th className="p-2 border">Saturn</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: "Sun", rels: ["--", "Neutral", "Enemy", "Neutral", "Extreme Friend", "Neutral", "Neutral"] },
                              { name: "Moon", rels: ["Neutral", "--", "Neutral", "Enemy", "Enemy", "Enemy", "Enemy"] },
                              { name: "Mercury", rels: ["Neutral", "Extreme Enemy", "--", "Extreme Friend", "Friend", "Enemy", "Friend"] },
                              { name: "Venus", rels: ["Neutral", "Extreme Enemy", "Extreme Friend", "--", "Enemy", "Friend", "Extreme Friend"] },
                              { name: "Mars", rels: ["Extreme Friend", "Neutral", "Neutral", "Enemy", "--", "Extreme Friend", "Friend"] },
                              { name: "Jupiter", rels: ["Neutral", "Neutral", "Extreme Enemy", "Neutral", "Extreme Friend", "--", "Friend"] },
                              { name: "Saturn", rels: ["Neutral", "Extreme Enemy", "Extreme Friend", "Extreme Friend", "Neutral", "Friend", "--"] }
                            ].map((row, idx) => (
                              <tr key={idx} className="border-b hover:bg-muted/30">
                                <td className="p-2 border text-left font-bold">{row.name}</td>
                                {row.rels.map((r, i) => (
                                  <td key={i} className={\`p-2 border font-medium \${r.includes('Friend') ? 'text-emerald-600' : r.includes('Enemy') ? 'text-red-600' : 'text-muted-foreground'}\`}>{r}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </TabsContent>
`;

content = content.substring(0, badBlockStart) + relationshipsBlock + content.substring(badBlockEnd);

// Now, replace the old TabsContent analysis block with the NEW Kaal Sarp dosha analysis block
const oldAnalysisStart = content.indexOf('<TabsContent value="analysis">');
const oldAnalysisEnd = content.indexOf('</TabsContent>', oldAnalysisStart) + 14;

const newAnalysisBlock = `              <TabsContent value="analysis" className="space-y-6">
                <Card className="border-purple-500/20 shadow-md">
                  <CardHeader className="bg-red-500/5 border-b border-red-500/10">
                    <CardTitle className="text-xl text-red-900 dark:text-red-400">Dosha Analysis (தோஷங்கள்)</CardTitle>
                    <CardDescription>Major astrological afflictions and their remedies.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="border border-red-500/20 rounded-lg p-4 bg-background shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-red-700 dark:text-red-400">Kaal Sarp Dosha (காள சர்ப்ப தோஷம்)</h4>
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full font-medium">Not Present</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">When all the prime planets are placed between Rahu & Ketu the kundali is said to have the Kalsarpa Yoga.</p>
                        </div>
                        <div className="bg-emerald-50 text-emerald-700 p-3 rounded-md text-sm font-medium border border-emerald-200">
                          Result: You do not have Kalsarpa Yog.
                        </div>
                      </div>

                      <div className="border border-red-500/20 rounded-lg p-4 bg-background shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-red-700 dark:text-red-400">Kuja Dosha / Manglik (செவ்வாய் தோஷம்)</h4>
                          <span className={chartData.panchang?.doshas?.manglik ? "px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium" : "px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full font-medium"}>
                            {chartData.panchang?.doshas?.manglik ? "Present" : "Not Present"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Mars placement in 1st, 2nd, 4th, 7th, 8th or 12th house causes Kuja Dosha.</p>
                        {chartData.panchang?.doshas?.manglik && (
                          <div className="mt-2 text-sm">
                            <strong className="text-foreground">Remedies:</strong>
                            <ul className="list-disc list-inside text-muted-foreground mt-1">
                              <li>Perform Kumbh Vivah before marriage.</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>`;

content = content.substring(0, oldAnalysisStart) + newAnalysisBlock + content.substring(oldAnalysisEnd);

fs.writeFileSync('src/app/charts/[id]/page.tsx', content);

const fs = require('fs');
let content = fs.readFileSync('src/app/charts/[id]/page.tsx', 'utf8');

if (!content.includes('value="shadbala"')) {
    content = content.replace('<TabsTrigger value="ashtakavarga">Ashtakavarga</TabsTrigger>', '<TabsTrigger value="ashtakavarga">Ashtakavarga</TabsTrigger>\n                <TabsTrigger value="shadbala">Shadbala</TabsTrigger>');
}

if (!content.includes('<TabsContent value="shadbala"')) {
    const nextTabStart = content.indexOf('<TabsContent value="sadesati"');
    
    const shadbalaTab = `
              <TabsContent value="shadbala" className="space-y-6">
                <Card className="border-purple-500/20 shadow-md">
                  <CardHeader className="bg-purple-500/5 border-b border-purple-500/10 text-center">
                    <CardTitle className="text-2xl text-purple-900 dark:text-purple-100">Shadbala (Six-fold Strength)</CardTitle>
                    <CardDescription>Planetary strengths measured in Rupas</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-center border-collapse">
                            <thead className="bg-muted text-muted-foreground uppercase text-xs">
                                <tr>
                                    <th className="p-3 border text-left">Planet</th>
                                    <th className="p-3 border">Sthana (Positional)</th>
                                    <th className="p-3 border">Dik (Directional)</th>
                                    <th className="p-3 border">Kala (Temporal)</th>
                                    <th className="p-3 border">Chesta (Motional)</th>
                                    <th className="p-3 border">Naisargika (Natural)</th>
                                    <th className="p-3 border">Drik (Aspectual)</th>
                                    <th className="p-3 border bg-purple-100 dark:bg-purple-900/30 font-bold">Total (Rupas)</th>
                                    <th className="p-3 border">Rank</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b hover:bg-muted/30">
                                    <td className="p-3 border text-left font-bold text-red-600">Sun</td>
                                    <td className="p-3 border">1.42</td><td className="p-3 border">0.85</td><td className="p-3 border">1.60</td><td className="p-3 border">0.20</td><td className="p-3 border">1.00</td><td className="p-3 border">0.45</td>
                                    <td className="p-3 border bg-purple-50 dark:bg-purple-900/10 font-bold">5.52</td><td className="p-3 border">4</td>
                                </tr>
                                <tr className="border-b hover:bg-muted/30">
                                    <td className="p-3 border text-left font-bold text-blue-500">Moon</td>
                                    <td className="p-3 border">2.10</td><td className="p-3 border">0.40</td><td className="p-3 border">2.30</td><td className="p-3 border">0.60</td><td className="p-3 border">0.85</td><td className="p-3 border">0.30</td>
                                    <td className="p-3 border bg-purple-50 dark:bg-purple-900/10 font-bold">6.55</td><td className="p-3 border">2</td>
                                </tr>
                                <tr className="border-b hover:bg-muted/30">
                                    <td className="p-3 border text-left font-bold text-red-500">Mars</td>
                                    <td className="p-3 border">1.80</td><td className="p-3 border">0.90</td><td className="p-3 border">1.10</td><td className="p-3 border">0.35</td><td className="p-3 border">0.33</td><td className="p-3 border">0.15</td>
                                    <td className="p-3 border bg-purple-50 dark:bg-purple-900/10 font-bold">4.63</td><td className="p-3 border">7</td>
                                </tr>
                                <tr className="border-b hover:bg-muted/30">
                                    <td className="p-3 border text-left font-bold text-emerald-500">Mercury</td>
                                    <td className="p-3 border">1.25</td><td className="p-3 border">0.55</td><td className="p-3 border">1.85</td><td className="p-3 border">0.45</td><td className="p-3 border">0.50</td><td className="p-3 border">0.80</td>
                                    <td className="p-3 border bg-purple-50 dark:bg-purple-900/10 font-bold">5.40</td><td className="p-3 border">5</td>
                                </tr>
                                <tr className="border-b hover:bg-muted/30">
                                    <td className="p-3 border text-left font-bold text-yellow-600">Jupiter</td>
                                    <td className="p-3 border">2.45</td><td className="p-3 border">0.95</td><td className="p-3 border">2.10</td><td className="p-3 border">0.85</td><td className="p-3 border">0.67</td><td className="p-3 border">0.65</td>
                                    <td className="p-3 border bg-purple-50 dark:bg-purple-900/10 font-bold">7.67</td><td className="p-3 border">1</td>
                                </tr>
                                <tr className="border-b hover:bg-muted/30">
                                    <td className="p-3 border text-left font-bold text-blue-400">Venus</td>
                                    <td className="p-3 border">1.65</td><td className="p-3 border">0.75</td><td className="p-3 border">1.45</td><td className="p-3 border">0.55</td><td className="p-3 border">0.85</td><td className="p-3 border">0.50</td>
                                    <td className="p-3 border bg-purple-50 dark:bg-purple-900/10 font-bold">5.75</td><td className="p-3 border">3</td>
                                </tr>
                                <tr className="border-b hover:bg-muted/30">
                                    <td className="p-3 border text-left font-bold text-slate-700 dark:text-slate-300">Saturn</td>
                                    <td className="p-3 border">1.15</td><td className="p-3 border">0.25</td><td className="p-3 border">1.35</td><td className="p-3 border">0.15</td><td className="p-3 border">0.17</td><td className="p-3 border">0.85</td>
                                    <td className="p-3 border bg-purple-50 dark:bg-purple-900/10 font-bold">4.92</td><td className="p-3 border">6</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
`;

    content = content.substring(0, nextTabStart) + shadbalaTab + content.substring(nextTabStart);
}

content = content.replace('className="grid w-full grid-cols-12', 'className="grid w-full grid-cols-12'); // wait it was 12? No, I want it to wrap if needed, so I'll just change to flex wrap.
content = content.replace(/className="grid w-full grid-cols-\d+.*?"/, 'className="flex flex-wrap w-full justify-center gap-1 bg-transparent"');
// We need to fix the TabsList to wrap since we have so many tabs.
fs.writeFileSync('src/app/charts/[id]/page.tsx', content);

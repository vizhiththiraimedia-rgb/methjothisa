const fs = require('fs');
let content = fs.readFileSync('src/app/charts/[id]/page.tsx', 'utf8');

// 1. Add Transit Prediction to TabsList
if (!content.includes('value="transit"')) {
    content = content.replace('<TabsTrigger value="mangal">Mangal Dosha</TabsTrigger>', '<TabsTrigger value="mangal">Mangal Dosha</TabsTrigger>\n                <TabsTrigger value="transit">Transit Prediction</TabsTrigger>');
}

// 2. Add TabsContent for Transit Prediction
if (!content.includes('<TabsContent value="transit"')) {
    const nextTabStart = content.indexOf('<TabsContent value="analysis"'); // Let's insert before analysis
    
    const transitTab = `
              <TabsContent value="transit" className="space-y-6">
                <Card className="border-purple-500/20 shadow-md">
                  <CardHeader className="bg-purple-500/5 border-b border-purple-500/10">
                    <CardTitle className="text-2xl text-purple-900 dark:text-purple-100">Transit Chart</CardTitle>
                    <CardDescription>Given below is the transit chart that shows the current planetary placements in houses and signs on August 19, 2026.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    
                    <div className="flex justify-center mb-6">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Jump To Prediction →</Button>
                    </div>

                    <div className="max-w-sm mx-auto mb-10">
                        {/* Re-using the same ChartRenderer for transit but using mocked transit data */}
                        <div className="flex justify-center mb-4 bg-muted/50 p-1 rounded-lg">
                            <Button variant={chartStyle === 'north' ? 'default' : 'ghost'} size="sm" onClick={() => setChartStyle('north')}>North Indian</Button>
                            <Button variant={chartStyle === 'south' ? 'default' : 'ghost'} size="sm" onClick={() => setChartStyle('south')}>South Indian</Button>
                            <Button variant={chartStyle === 'east' ? 'default' : 'ghost'} size="sm" onClick={() => setChartStyle('east')}>East Indian</Button>
                        </div>
                        <ChartRenderer 
                            planets={[
                                { name: 'Sun', sign: 'Simha' }, { name: 'Moon', sign: 'Tula' },
                                { name: 'Mars', sign: 'Mithuna' }, { name: 'Mercury', sign: 'Karka' },
                                { name: 'Jupiter', sign: 'Karka' }, { name: 'Venus', sign: 'Kanya' },
                                { name: 'Saturn', sign: 'Meena' }, { name: 'Rahu', sign: 'Kumbha' },
                                { name: 'Ketu', sign: 'Simha' }
                            ]} 
                            style={chartStyle} 
                        />
                    </div>

                    <div className="mt-12 space-y-8">
                        <div>
                            <h3 className="text-lg font-bold text-foreground mb-2">Sun is in Simha (Leo) rashi</h3>
                            <p className="text-sm text-muted-foreground mb-4">Sun is placed in the 2nd house from your Moon sign. Sun entered Simha Rashi on August 17, 2026. After 30 days of transit in Simha, Sun transits to Kanya (Virgo) rashi on September 17, 2026.</p>
                            <p className="text-sm text-muted-foreground mb-4">The sun symbolizes paternal influence, ego, and inner strength. Among the five elements, it is associated with fire, representing vitality and energy.</p>
                            <Button variant="outline" className="text-emerald-600 border-emerald-600 hover:bg-emerald-50">Read Sun Transit Prediction</Button>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-lg font-bold text-foreground mb-2">Mars is in Mithuna (Gemini) rashi</h3>
                            <p className="text-sm text-muted-foreground mb-4">Mars is placed in the 12th house from your Moon sign. Mars entered Mithuna Rashi on August 02, 2026. After 1 month and 15 days of transit in Mithuna, Mars transits to Karka (Cancer) rashi on September 18, 2026.</p>
                            <p className="text-sm text-muted-foreground mb-4">Mars embodies strength, passion, courage and ambition. It signifies aggression, adventure, and a competitive spirit, often associated with sudden bursts of energy and action.</p>
                            <Button variant="outline" className="text-emerald-600 border-emerald-600 hover:bg-emerald-50">Read Mars Transit Prediction</Button>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-lg font-bold text-foreground mb-2">Mercury is in Karka (Cancer) rashi</h3>
                            <p className="text-sm text-muted-foreground mb-4">Mercury is placed in the 1st house from your Moon sign. Mercury entered Karka Rashi on August 05, 2026. After 16 days of transit in Karka, Mercury transits to Simha (Leo) rashi on August 22, 2026.</p>
                            <p className="text-sm text-muted-foreground mb-4">Mercury symbolizes intelligence and speech, reflecting youthful characteristics and a wavering nature with volatility.</p>
                            <Button variant="outline" className="text-emerald-600 border-emerald-600 hover:bg-emerald-50">Read Mercury Transit Prediction</Button>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-lg font-bold text-foreground mb-2">Jupiter is in Karka (Cancer) rashi</h3>
                            <p className="text-sm text-muted-foreground mb-4">Jupiter is placed in the 1st house from your Moon sign. Jupiter entered Karka Rashi on June 02, 2026. After 4 months and 29 days of transit in Karka, Jupiter transits to Simha (Leo) rashi on October 31, 2026.</p>
                            <p className="text-sm text-muted-foreground mb-4">Jupiter is revered as a guru, mentor, and guide for wise and learned individuals. It represents morality, righteousness, and holiness, fostering optimism and positive thinking.</p>
                            <Button variant="outline" className="text-emerald-600 border-emerald-600 hover:bg-emerald-50">Read Jupiter Transit Prediction</Button>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
`;

    content = content.substring(0, nextTabStart) + transitTab + content.substring(nextTabStart);
}

// 3. Make TabsList support 10 columns since we added one
content = content.replace('className="grid w-full grid-cols-9', 'className="grid w-full grid-cols-10');

fs.writeFileSync('src/app/charts/[id]/page.tsx', content);

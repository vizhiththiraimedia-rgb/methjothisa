const fs = require('fs');
let content = fs.readFileSync('src/app/charts/[id]/page.tsx', 'utf8');

// 1. Add Mangal Dosha to TabsList
if (!content.includes('value="mangal"')) {
    content = content.replace('<TabsTrigger value="nakshatra">Nakshatra</TabsTrigger>', '<TabsTrigger value="nakshatra">Nakshatra</TabsTrigger>\n                <TabsTrigger value="mangal">Mangal Dosha</TabsTrigger>');
}

// 2. Add TabsContent for Mangal Dosha
if (!content.includes('<TabsContent value="mangal"')) {
    const nextTabStart = content.indexOf('<TabsContent value="analysis"');
    
    const mangalTab = `
              <TabsContent value="mangal" className="space-y-6">
                <Card className="border-purple-500/20 shadow-md">
                  <CardHeader className="bg-purple-500/5 border-b border-purple-500/10 text-center">
                    <CardTitle className="text-2xl text-purple-900 dark:text-purple-100">Mangal Dosha Analysis Report</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6 text-center">
                    <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">The person is Manglik</h3>
                        <p className="text-muted-foreground mb-4">The person is Manglik and since Mars is positioned in the 12th house, it indicates <strong>mild Manglik Dosha</strong></p>
                        
                        <p className="text-muted-foreground mb-2">However The person's Mangal dosha has been cancelled due to following reasons:</p>
                        <ul className="text-left max-w-2xl mx-auto space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> Mangal dosha is cancelled as Mars is in Kumbha, in the 12th house in your horoscope.</li>
                            <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> In your Horoscope, Venus conjoin Mars in the 12th house of Kumbha, which nullifies Mangal Dosha.</li>
                        </ul>
                    </div>

                    <div className="pt-6 border-t border-border/50">
                        <h3 className="text-lg font-bold text-foreground mb-4 text-left">Lagna Chart</h3>
                        <div className="flex justify-center mb-6 bg-muted/50 p-1 rounded-lg max-w-sm mx-auto">
                            <Button variant={chartStyle === 'north' ? 'default' : 'ghost'} size="sm" onClick={() => setChartStyle('north')}>North Indian</Button>
                            <Button variant={chartStyle === 'south' ? 'default' : 'ghost'} size="sm" onClick={() => setChartStyle('south')}>South Indian</Button>
                            <Button variant={chartStyle === 'east' ? 'default' : 'ghost'} size="sm" onClick={() => setChartStyle('east')}>East Indian</Button>
                        </div>
                        <ChartRenderer planets={planets} style={chartStyle} />
                    </div>

                    <div className="pt-6 border-t border-border/50 text-left">
                        <h3 className="text-lg font-bold text-foreground mb-4">How to Cancel Negative Effect of Manglik Dosha</h3>
                        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                            <li>It is considered that if a manglik person marries to another manglik person then the manglik dosha gets cancelled and has no effect.</li>
                            <li>Worship Lord Hanuman by reciting Hanuman Chalisa daily &amp; visit the temple of Lord Hanuman on Tuesdays.</li>
                            <li>The ill effects of Manglik Dosha can be cancelled by performing a "Kumbh Vivah" in which the manglik marries a banana tree, a peepal tree, or a statue of God Vishnu before the actual wedding.</li>
                            <li>The ill effects of Manglik Dosha can be reduced with the application of Special Pooja, Mantras, Gemstones and Charities.</li>
                            <li>Donate blood on a Tuesday in every three months, if health permits.</li>
                            <li>Feed birds with something sweet.</li>
                            <li>Worship banyan tree with milk mixed with something sweet.</li>
                            <li>Start a fast in a rising moon period on a Tuesday.</li>
                        </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
`;

    content = content.substring(0, nextTabStart) + mangalTab + content.substring(nextTabStart);
}

// 3. Make TabsList support 9 columns since we added one
content = content.replace('className="grid w-full grid-cols-8', 'className="grid w-full grid-cols-9');

fs.writeFileSync('src/app/charts/[id]/page.tsx', content);

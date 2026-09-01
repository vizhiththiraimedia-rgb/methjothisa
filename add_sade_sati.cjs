const fs = require('fs');
let content = fs.readFileSync('src/app/charts/[id]/page.tsx', 'utf8');

// 1. Add Sade Sati to TabsList
if (!content.includes('value="sadesati"')) {
    content = content.replace('<TabsTrigger value="transit">Transit Prediction</TabsTrigger>', '<TabsTrigger value="transit">Transit</TabsTrigger>\n                <TabsTrigger value="sadesati">Sade Sati</TabsTrigger>');
}

// 2. Add TabsContent for Sade Sati
if (!content.includes('<TabsContent value="sadesati"')) {
    const nextTabStart = content.indexOf('<TabsContent value="transit"');
    
    const sadeSatiTab = `
              <TabsContent value="sadesati" className="space-y-6">
                <Card className="border-purple-500/20 shadow-md">
                  <CardHeader className="bg-purple-500/5 border-b border-purple-500/10 text-center">
                    <CardTitle className="text-2xl text-purple-900 dark:text-purple-100">Shani Sade Sati Report</CardTitle>
                    <CardDescription>Analysis of Saturn's 7.5 year transit across your Moon sign</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-foreground mb-2">Sade Sati Status</h3>
                        <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full font-bold text-lg mb-4 shadow-sm border border-emerald-200">
                            Currently NOT in Sade Sati
                        </div>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Sade Sati is the 7½ years long period of Saturn (Shani). This astrological phase is much feared by those who believe in Indian Astrology. This is a period with many challenges, but also a time of great achievements and recognition.
                        </p>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="text-lg font-bold text-foreground mb-4">Sade Sati Phases for your Chart</h3>
                        <p className="text-sm text-muted-foreground mb-6">Your Moon sign is <strong>Karka (Cancer)</strong>. Saturn's transit over Mithuna (12th), Karka (1st), and Simha (2nd) will constitute your Sade Sati periods.</p>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="bg-muted text-muted-foreground">
                                    <tr>
                                        <th className="p-3 border">Phase</th>
                                        <th className="p-3 border">Sign</th>
                                        <th className="p-3 border">Start Date</th>
                                        <th className="p-3 border">End Date</th>
                                        <th className="p-3 border">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b hover:bg-muted/30">
                                        <td className="p-3 border font-medium">Phase 1 (Rising)</td>
                                        <td className="p-3 border">Mithuna</td>
                                        <td className="p-3 border">July 13, 2034</td>
                                        <td className="p-3 border">August 27, 2036</td>
                                        <td className="p-3 border"><span className="text-amber-600 font-medium">Upcoming</span></td>
                                    </tr>
                                    <tr className="border-b hover:bg-muted/30">
                                        <td className="p-3 border font-medium">Phase 2 (Peak)</td>
                                        <td className="p-3 border">Karka</td>
                                        <td className="p-3 border">August 28, 2036</td>
                                        <td className="p-3 border">October 22, 2038</td>
                                        <td className="p-3 border"><span className="text-amber-600 font-medium">Upcoming</span></td>
                                    </tr>
                                    <tr className="border-b hover:bg-muted/30">
                                        <td className="p-3 border font-medium">Phase 3 (Setting)</td>
                                        <td className="p-3 border">Simha</td>
                                        <td className="p-3 border">October 23, 2038</td>
                                        <td className="p-3 border">January 27, 2041</td>
                                        <td className="p-3 border"><span className="text-amber-600 font-medium">Upcoming</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="text-lg font-bold text-foreground mb-4">Remedies for Sade Sati</h3>
                        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                            <li>Chant the Hanuman Chalisa on Tuesdays and Saturdays.</li>
                            <li>Offer mustard oil to Lord Shani on Saturdays.</li>
                            <li>Donate black clothes, black sesame seeds, or iron utensils to the needy.</li>
                            <li>Wear a 14-mukhi Rudraksha or a Blue Sapphire (after consulting an astrologer).</li>
                            <li>Perform the Shani Shanti Puja to appease Lord Saturn.</li>
                        </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
`;

    content = content.substring(0, nextTabStart) + sadeSatiTab + content.substring(nextTabStart);
}

// 3. Make TabsList support 11 columns since we added one
content = content.replace('className="grid w-full grid-cols-10', 'className="grid w-full grid-cols-11');

fs.writeFileSync('src/app/charts/[id]/page.tsx', content);

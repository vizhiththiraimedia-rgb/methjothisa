const fs = require('fs');
let content = fs.readFileSync('src/app/charts/[id]/page.tsx', 'utf8');

if (!content.includes('value="ashtakavarga"')) {
    content = content.replace('<TabsTrigger value="sadesati">Sade Sati</TabsTrigger>', '<TabsTrigger value="sadesati">Sade Sati</TabsTrigger>\n                <TabsTrigger value="ashtakavarga">Ashtakavarga</TabsTrigger>');
}

if (!content.includes('<TabsContent value="ashtakavarga"')) {
    const nextTabStart = content.indexOf('<TabsContent value="sadesati"');
    
    const ashtakaTab = `
              <TabsContent value="ashtakavarga" className="space-y-6">
                <Card className="border-purple-500/20 shadow-md">
                  <CardHeader className="bg-purple-500/5 border-b border-purple-500/10 text-center">
                    <CardTitle className="text-2xl text-purple-900 dark:text-purple-100">Ashtakavarga System</CardTitle>
                    <CardDescription>Planetary point scores (Bindus) for each sign</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                    
                    <div>
                        <h3 className="text-lg font-bold text-foreground mb-4 text-center">Sarvashtakavarga (Total Bindus)</h3>
                        <p className="text-sm text-muted-foreground mb-6 text-center">The total score of all 7 planets in each zodiac sign. A score above 28 is considered strong and highly favorable.</p>
                        
                        <div className="max-w-sm mx-auto">
                            {/* Re-use the South Indian Chart style for SAV bindus */}
                            <div className="w-full aspect-square bg-[#FDFBF7] dark:bg-card border-2 border-purple-500 rounded-sm relative overflow-hidden shadow-inner font-body">
                                <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                                    <div className="border border-purple-500/20 p-2 relative flex flex-col items-center justify-center hover:bg-purple-500/5">
                                        <span className="text-[10px] text-muted-foreground absolute top-1 left-1 opacity-50">12</span>
                                        <span className="text-xl font-bold text-emerald-600">30</span>
                                    </div>
                                    <div className="border border-purple-500/20 p-2 relative flex flex-col items-center justify-center hover:bg-purple-500/5">
                                        <span className="text-[10px] text-muted-foreground absolute top-1 left-1 opacity-50">1</span>
                                        <span className="text-xl font-bold text-amber-600">25</span>
                                    </div>
                                    <div className="border border-purple-500/20 p-2 relative flex flex-col items-center justify-center hover:bg-purple-500/5">
                                        <span className="text-[10px] text-muted-foreground absolute top-1 left-1 opacity-50">2</span>
                                        <span className="text-xl font-bold text-emerald-600">29</span>
                                    </div>
                                    <div className="border border-purple-500/20 p-2 relative flex flex-col items-center justify-center hover:bg-purple-500/5">
                                        <span className="text-[10px] text-muted-foreground absolute top-1 left-1 opacity-50">3</span>
                                        <span className="text-xl font-bold text-emerald-600">32</span>
                                    </div>
                                    
                                    <div className="border border-purple-500/20 p-2 relative flex flex-col items-center justify-center hover:bg-purple-500/5">
                                        <span className="text-[10px] text-muted-foreground absolute top-1 left-1 opacity-50">11</span>
                                        <span className="text-xl font-bold text-emerald-600">34</span>
                                    </div>
                                    <div className="col-span-2 row-span-2 flex flex-col items-center justify-center border border-purple-500/20 p-4">
                                        <h3 className="font-display text-xl font-bold text-purple-900/60 dark:text-purple-100/40 text-center">Sarvashtakavarga<br/>(SAV)</h3>
                                        <span className="mt-2 text-sm font-bold text-purple-600">Total: 337</span>
                                    </div>
                                    <div className="border border-purple-500/20 p-2 relative flex flex-col items-center justify-center hover:bg-purple-500/5">
                                        <span className="text-[10px] text-muted-foreground absolute top-1 left-1 opacity-50">4</span>
                                        <span className="text-xl font-bold text-red-500">22</span>
                                    </div>
                                    
                                    <div className="border border-purple-500/20 p-2 relative flex flex-col items-center justify-center hover:bg-purple-500/5">
                                        <span className="text-[10px] text-muted-foreground absolute top-1 left-1 opacity-50">10</span>
                                        <span className="text-xl font-bold text-emerald-600">29</span>
                                    </div>
                                    <div className="border border-purple-500/20 p-2 relative flex flex-col items-center justify-center hover:bg-purple-500/5">
                                        <span className="text-[10px] text-muted-foreground absolute top-1 left-1 opacity-50">5</span>
                                        <span className="text-xl font-bold text-emerald-600">28</span>
                                    </div>
                                    
                                    <div className="border border-purple-500/20 p-2 relative flex flex-col items-center justify-center hover:bg-purple-500/5">
                                        <span className="text-[10px] text-muted-foreground absolute top-1 left-1 opacity-50">9</span>
                                        <span className="text-xl font-bold text-amber-600">27</span>
                                    </div>
                                    <div className="border border-purple-500/20 p-2 relative flex flex-col items-center justify-center hover:bg-purple-500/5">
                                        <span className="text-[10px] text-muted-foreground absolute top-1 left-1 opacity-50">8</span>
                                        <span className="text-xl font-bold text-emerald-600">31</span>
                                    </div>
                                    <div className="border border-purple-500/20 p-2 relative flex flex-col items-center justify-center hover:bg-purple-500/5">
                                        <span className="text-[10px] text-muted-foreground absolute top-1 left-1 opacity-50">7</span>
                                        <span className="text-xl font-bold text-red-500">24</span>
                                    </div>
                                    <div className="border border-purple-500/20 p-2 relative flex flex-col items-center justify-center hover:bg-purple-500/5">
                                        <span className="text-[10px] text-muted-foreground absolute top-1 left-1 opacity-50">6</span>
                                        <span className="text-xl font-bold text-amber-600">26</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                  </CardContent>
                </Card>
              </TabsContent>
`;

    content = content.substring(0, nextTabStart) + ashtakaTab + content.substring(nextTabStart);
}

content = content.replace('className="grid w-full grid-cols-11', 'className="grid w-full grid-cols-12');
fs.writeFileSync('src/app/charts/[id]/page.tsx', content);

const fs = require('fs');
let content = fs.readFileSync('src/app/charts/[id]/page.tsx', 'utf8');

if (!content.includes('value="sudarshana"')) {
    content = content.replace('<TabsTrigger value="shadbala">Shadbala</TabsTrigger>', '<TabsTrigger value="shadbala">Shadbala</TabsTrigger>\n                <TabsTrigger value="sudarshana">Sudarshana</TabsTrigger>');
}

if (!content.includes('<TabsContent value="sudarshana"')) {
    const nextTabStart = content.indexOf('<TabsContent value="sadesati"');
    
    const sudarshanaTab = `
              <TabsContent value="sudarshana" className="space-y-6">
                <Card className="border-purple-500/20 shadow-md">
                  <CardHeader className="bg-purple-500/5 border-b border-purple-500/10 text-center">
                    <CardTitle className="text-2xl text-purple-900 dark:text-purple-100">Sudarshana Chakra</CardTitle>
                    <CardDescription>Triple concentric chart representing Ascendant, Moon, and Sun perspectives</CardDescription>
                  </CardHeader>
                  <CardContent className="p-10 flex flex-col items-center">
                    <div className="relative w-80 h-80 rounded-full border-4 border-amber-500 flex items-center justify-center bg-amber-50/50 shadow-xl">
                        {/* Outer Ring - Sun */}
                        <div className="absolute inset-2 rounded-full border border-amber-300 opacity-50"></div>
                        
                        {/* Middle Ring - Moon */}
                        <div className="relative w-56 h-56 rounded-full border-4 border-slate-400 flex items-center justify-center bg-slate-50/80 shadow-md">
                            <div className="absolute inset-2 rounded-full border border-slate-300 opacity-50"></div>
                            
                            {/* Inner Ring - Ascendant */}
                            <div className="relative w-32 h-32 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-emerald-50/90 shadow-md">
                                <span className="font-bold text-emerald-800 text-center text-xs">Lagna<br/>(Ascendant)</span>
                            </div>
                            
                            <span className="absolute top-2 font-bold text-slate-600 text-xs">Moon</span>
                        </div>
                        
                        <span className="absolute top-4 font-bold text-amber-700 text-xs">Sun</span>
                        
                        {/* Spokes */}
                        <div className="absolute inset-0 border-t-2 border-border rotate-30"></div>
                        <div className="absolute inset-0 border-t-2 border-border rotate-60"></div>
                        <div className="absolute inset-0 border-t-2 border-border rotate-90"></div>
                        <div className="absolute inset-0 border-t-2 border-border rotate-120"></div>
                        <div className="absolute inset-0 border-t-2 border-border rotate-150"></div>
                        <div className="absolute inset-0 border-t-2 border-border rotate-180"></div>
                    </div>
                    
                    <p className="mt-8 text-sm text-muted-foreground max-w-lg text-center">
                        The Sudarshana Chakra is a unique Vedic astrology chart that aligns the 12 houses from three different reference points simultaneously: The Ascendant (Inner), The Moon (Middle), and The Sun (Outer).
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
`;

    content = content.substring(0, nextTabStart) + sudarshanaTab + content.substring(nextTabStart);
}

fs.writeFileSync('src/app/charts/[id]/page.tsx', content);

const fs = require('fs');
let code = fs.readFileSync('./src/app/charts/[id]/page.tsx', 'utf8');

// Add premium tab trigger
code = code.replace(
  '{renderTabTrigger("transit", language === \'si\' ? "???? ???" : "Live Transit")}',
  '{renderTabTrigger("transit", language === \'si\' ? "???? ???" : "Live Transit")}\n              {renderTabTrigger("premium", language === \'si\' ? "?????????? ?????????" : "Premium Karma & Remedies")}'
);

// Add premium tab content
const premiumTabContent = \
            <TabsContent value="premium" className="space-y-6">
              <Card className="shadow-md border-amber-200 bg-amber-50 relative overflow-hidden">
                {/* Premium Lock Overlay */}
                <div className="absolute inset-0 z-10 backdrop-blur-sm bg-white/40 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg mb-4">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2">{language === 'si' ? "??? ?????????? ????????" : "Premium Feature"}</h3>
                  <p className="text-slate-600 max-w-md mb-6">{language === 'si' ? "???? ???? ???, ?? ???, ?? ????? ??? ???? ??????? ?????????? (????) ????????? ?????????? ??? ????????." : "Unlock deep karmic analysis, wealth yogas, and personalized remedial measures (Poojas) based on your unique birth chart."}</p>
                  <Link href="/pricing">
                    <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xl border-0">
                      <Sparkles className="w-5 h-5 mr-2" />
                      {language === 'si' ? "?????????? ???????" : "Unlock Full Horoscope Book"}
                    </Button>
                  </Link>
                </div>

                <CardHeader>
                  <CardTitle className="text-slate-800 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500" /> 
                    {language === 'si' ? "?????? ???? ?????????" : "Deep Karmic Analysis"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 opacity-30 select-none">
                  <div className="space-y-8 pointer-events-none">
                    <div className="space-y-3">
                      <div className="h-6 bg-slate-300 rounded w-1/3"></div>
                      <div className="h-4 bg-slate-200 rounded w-full"></div>
                      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                      <div className="h-4 bg-slate-200 rounded w-4/6"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-6 bg-slate-300 rounded w-1/4"></div>
                      <div className="h-24 bg-slate-200 rounded w-full"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-6 bg-slate-300 rounded w-1/2"></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-32 bg-slate-200 rounded"></div>
                        <div className="h-32 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
\;

code = code.replace(
  '</TabsContent>\\n\\n          </Tabs>',
  '</TabsContent>\\n\\n' + premiumTabContent + '\\n          </Tabs>'
);

// Add Crown to imports
if (!code.includes('Crown')) {
    code = code.replace('Calendar, MapPin', 'Calendar, MapPin, Crown');
}

fs.writeFileSync('./src/app/charts/[id]/page.tsx', code);
console.log('Premium tab added to chart page');

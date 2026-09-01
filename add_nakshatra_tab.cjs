const fs = require('fs');
let content = fs.readFileSync('src/app/charts/[id]/page.tsx', 'utf8');

// 1. Add Nakshatra to TabsList
if (!content.includes('value="nakshatra"')) {
    content = content.replace('<TabsTrigger value="basic">Basic</TabsTrigger>', '<TabsTrigger value="basic">Basic</TabsTrigger>\n                <TabsTrigger value="nakshatra">Nakshatra</TabsTrigger>');
}

// 2. Add TabsContent for Nakshatra
if (!content.includes('<TabsContent value="nakshatra"')) {
    const nextTabStart = content.indexOf('<TabsContent value="basic"');
    
    const nakshatraTab = `
              <TabsContent value="nakshatra" className="space-y-6">
                <Card className="border-purple-500/20 shadow-md">
                  <CardHeader className="bg-purple-500/5 border-b border-purple-500/10 text-center">
                    <CardTitle className="text-2xl text-purple-900 dark:text-purple-100">Your Nakshatra and Zodiac</CardTitle>
                    <CardDescription>Janma Nakshatra is <span className="font-bold text-lg text-blue-600">Pushya</span></CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <table className="w-full text-sm text-left border-collapse">
                      <tbody>
                        <tr className="border-b">
                          <td className="p-4 font-medium text-muted-foreground w-1/3 border-r">Date &amp; Time</td>
                          <td className="p-4">January 8, 1985 - 11:14 AM +0530</td>
                        </tr>
                        <tr className="border-b bg-muted/10">
                          <td className="p-4 font-medium text-muted-foreground border-r">Weekday</td>
                          <td className="p-4">Tuesday</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 font-medium text-muted-foreground border-r">Nakshatra</td>
                          <td className="p-4 font-bold">Pushya, 2nd Pada<br/><span className="text-xs font-normal text-muted-foreground">Jan 08, 01:43:50 AM - Jan 09, 12:43:14 AM</span></td>
                        </tr>
                        <tr className="border-b bg-muted/10">
                          <td className="p-4 font-medium text-muted-foreground border-r">Chandra Rasi (Janma Rasi)</td>
                          <td className="p-4">Karka</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 font-medium text-muted-foreground border-r">Ganam</td>
                          <td className="p-4">Deva</td>
                        </tr>
                        <tr className="border-b bg-muted/10">
                          <td className="p-4 font-medium text-muted-foreground border-r">Deity</td>
                          <td className="p-4">Brihaspati</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 font-medium text-muted-foreground border-r">Animal Sign</td>
                          <td className="p-4">Sheep</td>
                        </tr>
                        <tr className="border-b bg-muted/10">
                          <td className="p-4 font-medium text-muted-foreground border-r">Zodiac Sign</td>
                          <td className="p-4 text-blue-500">Capricorn</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 font-medium text-muted-foreground border-r">Birth Stone</td>
                          <td className="p-4">Blue Sapphire</td>
                        </tr>
                        <tr className="border-b bg-muted/10">
                          <td className="p-4 font-medium text-muted-foreground border-r">First Syllable</td>
                          <td className="p-4">He, He, Ho, Da</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 font-medium text-muted-foreground border-r">Best Direction</td>
                          <td className="p-4">East</td>
                        </tr>
                        <tr className="border-b bg-muted/10">
                          <td className="p-4 font-medium text-muted-foreground border-r">Colour</td>
                          <td className="p-4">Black Mixed with Red</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 font-medium text-muted-foreground border-r">Symbol</td>
                          <td className="p-4">Flower (The udder of a cow, a circle, an arrow)</td>
                        </tr>
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </TabsContent>
`;

    content = content.substring(0, nextTabStart) + nakshatraTab + content.substring(nextTabStart);
}

// 3. Make TabsList support 8 columns since we added one
content = content.replace('className="grid w-full grid-cols-7', 'className="grid w-full grid-cols-8');

fs.writeFileSync('src/app/charts/[id]/page.tsx', content);

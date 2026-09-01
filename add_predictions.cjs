const fs = require('fs');
let content = fs.readFileSync('src/app/charts/[id]/page.tsx', 'utf8');

const basicTabStart = content.indexOf('<TabsContent value="basic" className="space-y-6">');
const nextTabStart = content.indexOf('<TabsContent value="chart">', basicTabStart);

// We want to insert the predictions card at the bottom of the basic tab, right before `</TabsContent>`
const endOfBasicTab = content.lastIndexOf('</TabsContent>', nextTabStart);

const predictionsCard = `
                <Card className="border-purple-500/20 shadow-md mt-6">
                  <CardHeader className="bg-purple-500/5 border-b border-purple-500/10">
                    <CardTitle className="text-xl text-purple-900 dark:text-purple-100">Panchang Predictions</CardTitle>
                    <CardDescription>Detailed astrological readings based on your birth panchang</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-lg text-purple-800 dark:text-purple-300">Weekday: Tuesday</h4>
                        <p className="text-sm text-muted-foreground mt-1">Individuals born on a Tuesday are characterized by their daring words and deeds. They possess a calling related to royalty, displaying blood-red eyes, sweet speech, and a patient disposition. Those born on this day are known for their courage, strategic thinking, and practical approach to life. According to ancient texts, they have a sharp intellect, longevity, and strength and often take on leadership roles within their families. Despite potential challenges, individuals born on a Tuesday are considered resilient, valiant, and dedicated to the well-being of their loved ones.</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-bold text-lg text-purple-800 dark:text-purple-300">Nakshatra: Pushya</h4>
                        <p className="text-sm text-muted-foreground mt-1">Individuals born in Pushyami will be fortunate, possessing a healthy body, devoted to their parents, holding faith in their religion, humble, respected in society, and filled with the joys of wealth and other pleasures. According to the Parijat, those born under Pushyami are favorites of both Gods and Brahmins, wealthy, intelligent, cherished by kings, and well-connected. Other astrological texts describe a person born in Pushyami as one who is connected to gods, dharma, and wealth, blessed with sons, knowledgeable, calm-natured, graceful, and happy. This nakshatra is believed to minimize negative traits, emphasizing positive qualities in an individual.</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-bold text-lg text-purple-800 dark:text-purple-300">Rasi: Karka</h4>
                        <p className="text-sm text-muted-foreground mt-1">Individuals born with the Moon in Cancer will possess a quick but crooked gait, elevated buttocks, and a penchant for building large houses. Despite experiencing fluctuating wealth akin to the waxing and waning Moon, they are fortunate, valiant, and endowed with astrological knowledge. They have a sensuous and passionate nature, a grateful disposition, and a proclivity for residing abroad. Their eloquent speech and wisdom make them wise and benevolent, capable of enduring hardships with fortitude. Subject to emotional influences, they are dear to family and friends, honor gods and teachers, and find joy in water, parks, and music. If the Moon is in Kataka, they lead a wandering life, passionate and eloquent, driven by a heart impassioned with love.</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-bold text-lg text-purple-800 dark:text-purple-300">Tithi: Krishna Paksha Dwitiya</h4>
                        <p className="text-sm text-muted-foreground mt-1">A person born on Dwitiya, the second lunar day, is known to be truthful, happy from birth, boastful, and diligent in their work. They will possess abundance in splendour, cattle, strength, fame, and wealth. They are considered generous, compassionate, virtuous, wise, morally upright, and renowned for their fame. The astrological perspective suggests that those born on Dvitiya are radiant and endowed with abundant strength and fame. However, contrasting views in folklore mention that a person born on Dvitiya may have a perpetual attraction to someone else's spouse, lack purity, and exhibit traits of theft and lovelessness.</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-bold text-lg text-purple-800 dark:text-purple-300">Karana: Taitila</h4>
                        <p className="text-sm text-muted-foreground mt-1">The individual born under Taitila Karana is charming, delicate, and adept in various arts. Endowed with a keen intellect and a lively perspective, he excels in eloquent speech. According to the astrological insights of ancient texts, the Taitila Karana native is virtuous, speaking softly and impressively, embodying purity of thought and quick-wittedness.</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-bold text-lg text-purple-800 dark:text-purple-300">Yoga: Vishkambha</h4>
                        <p className="text-sm text-muted-foreground mt-1">A person born under Vishkumbha Yoga is destined to triumph over enemies, amass wealth and livestock. Endowed with physical beauty, the individual cherishes family, home, and spouse, excelling in various endeavors with wealth and skills. According to astrological texts, such a person is joyful with kin, independent in tasks, and deeply devoted to enhancing physical allure.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
`;

content = content.substring(0, endOfBasicTab) + predictionsCard + content.substring(endOfBasicTab);

// Also need to make sure Separator is imported
if (!content.includes('import { Separator }')) {
  content = content.replace('import { Button } from "@/components/ui/button"', 'import { Button } from "@/components/ui/button"\nimport { Separator } from "@/components/ui/separator"');
}

fs.writeFileSync('src/app/charts/[id]/page.tsx', content);

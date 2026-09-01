const fs = require('fs');
let content = fs.readFileSync('src/app/charts/[id]/page.tsx', 'utf8');

const targetString = `</table>
                  </CardContent>
                </Card>
              </TabsContent>`;

const detailedCard = `</table>
                  </CardContent>
                </Card>
                
                <Card className="border-purple-500/20 shadow-md">
                  <CardHeader className="bg-purple-500/5 border-b border-purple-500/10">
                    <CardTitle className="text-xl text-purple-900 dark:text-purple-100">About Pushya Nakshatra</CardTitle>
                    <CardDescription>Detailed analysis of your Janma Nakshatra</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
                    <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">Basic Information</h3>
                        <p>Derivative of the Sanskrit word "Pushti" which also means nourishment; Pushya nakshatra exists in the cosmic firmament as a collection of three stars. Marked by an absence of brightness; the constellation of Pushya nakshatra was said to be similar to a cow's udder. Ruled by the planetary force of Saturn and divine force of Jupiter, Pushya nakshatra's general characteristics relate to yielding, caring and nurturing. The qualities of prosperity, auspiciousness and kindness also come under its purview. On account of its general characteristics of generosity, protection, expansion and helpfulness; Pushya is one of the most lovable nakshatras.</p>
                    </div>
                    <Separator />
                    <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">General Characteristics &amp; Personality Traits</h3>
                        <p className="mb-2">Personality traits of natives born under the nourishing influence of Pushya nakshatra include energized zeal to expand, care and protect. With most of their activities centering on the domain of this material world, natives born under the birth star of Pushya are zealously protective of their family, society or community to which they belong.</p>
                        <p className="mb-2">In their behavioral characteristics, they display an aura of balanced calmness and patience. With their strong regard for the roots, natives of Pushya nakshatra are seldom found to be indecent, vulgar and non ethical. They are found working towards their goal with patience, perseverance and concentration.</p>
                        <p>Kind benevolence, philanthropy and humanitarian approach apart from cool and collected mannerisms are their leading positive traits. Despite their essential positivism, some of the minor negative traits include orthodoxy, narrow-mindedness and possessiveness. Natives of Pushya nakshatra with their protective mannerism may turn out to be fiercely possessive.</p>
                    </div>
                    <Separator />
                    <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">Career Options</h3>
                        <p>With the interplay of knowledge, method and concentration, they excel in careers related to counseling, public administration, planning and research. They also make good priests or clergies. Careers related to geology, development of land and its various forms are also appealing to the natives of Pushya nakshatra. Thus they are equally successful as aquatic biologists, land or agricultural merchants. Capitalizing on their qualities to build, create and expand they can shape out as excellent philosophers, religious leaders, teachers and professors.</p>
                    </div>
                    <Separator />
                    <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">Compatibility and Incompatibility</h3>
                        <p>With male sheep being its primary phallic symbol, Pushya nakshatra is most compatible with Krittika nakshatra- its feminine counterpart. With sheep's essential compatibility to buffalo; Hasta and Swati are compatible to Pushya Nakshatra. However, birth stars such as Chitra, Dhanistha, Vishaka and Purva Bhadrapada are non compatible to Pushya nakshatra.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>`;

content = content.replace(targetString, detailedCard);

fs.writeFileSync('src/app/charts/[id]/page.tsx', content);

"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Sun, Moon, Star, Zap, Shield, Heart, TrendingUp } from "lucide-react";
import Link from "next/link";

const ZODIAC_SIGNS: Record<string, { name: string; dates: string; icon: string; element: string; rulingPlanet: string; color: string }> = {
  aries: { name: "Aries (Mesha)", dates: "Mar 21 - Apr 19", icon: "♈", element: "Fire", rulingPlanet: "Mars", color: "from-red-500 to-orange-500" },
  taurus: { name: "Taurus (Vrishabha)", dates: "Apr 20 - May 20", icon: "♉", element: "Earth", rulingPlanet: "Venus", color: "from-green-500 to-emerald-500" },
  gemini: { name: "Gemini (Mithuna)", dates: "May 21 - Jun 20", icon: "♊", element: "Air", rulingPlanet: "Mercury", color: "from-yellow-500 to-amber-500" },
  cancer: { name: "Cancer (Karka)", dates: "Jun 21 - Jul 22", icon: "♋", element: "Water", rulingPlanet: "Moon", color: "from-blue-500 to-cyan-500" },
  leo: { name: "Leo (Simha)", dates: "Jul 23 - Aug 22", icon: "♌", element: "Fire", rulingPlanet: "Sun", color: "from-orange-500 to-yellow-500" },
  virgo: { name: "Virgo (Kanya)", dates: "Aug 23 - Sep 22", icon: "♍", element: "Earth", rulingPlanet: "Mercury", color: "from-green-600 to-teal-500" },
  libra: { name: "Libra (Tula)", dates: "Sep 23 - Oct 22", icon: "♎", element: "Air", rulingPlanet: "Venus", color: "from-pink-500 to-rose-500" },
  scorpio: { name: "Scorpio (Vrischika)", dates: "Oct 23 - Nov 21", icon: "♏", element: "Water", rulingPlanet: "Mars & Ketu", color: "from-purple-600 to-indigo-600" },
  sagittarius: { name: "Sagittarius (Dhanus)", dates: "Nov 22 - Dec 21", icon: "♐", element: "Fire", rulingPlanet: "Jupiter", color: "from-orange-600 to-red-500" },
  capricorn: { name: "Capricorn (Makara)", dates: "Dec 22 - Jan 19", icon: "♑", element: "Earth", rulingPlanet: "Saturn", color: "from-slate-500 to-zinc-600" },
  aquarius: { name: "Aquarius (Kumbha)", dates: "Jan 20 - Feb 18", icon: "♒", element: "Air", rulingPlanet: "Saturn & Rahu", color: "from-cyan-500 to-blue-500" },
  pisces: { name: "Pisces (Meena)", dates: "Feb 19 - Mar 20", icon: "♓", element: "Water", rulingPlanet: "Jupiter", color: "from-indigo-500 to-purple-500" },
};

const HOROSCOPE_DATA: Record<string, { daily: string; weekly: string; monthly: string; yearly: string; personality: string; strengths: string[]; weaknesses: string[]; career: string; love: string; health: string }> = {
  aries: {
    daily: "Today brings an incredible surge of high energy and initiative that will push you to take bold steps in your ongoing projects. The planetary alignments suggest that taking the lead will be highly beneficial, but you must consciously pace yourself to avoid burnout. Watch out for impulsive decisions regarding financial investments. Trust your gut instincts, but verify facts before making significant commitments. Your natural leadership will inspire those around you to perform better.",
    monthly: "This month brings dynamic planetary alignments in your career house. Expect significant breakthroughs in your projects, and your financial prospects look positive. Take time to focus on personal relationships to maintain harmony.",
    yearly: "This year is a transformative journey for Aries. Major changes in professional directions and long-term financial security are highlighted. Embrace new opportunities and stay determined through challenging transits.",
    weekly: "This week heavily favors new beginnings, entrepreneurial ventures, and stepping up into leadership roles. Your natural confidence and fiery disposition will attract unique opportunities, particularly in your professional sphere. However, Mars transits suggest that you should practice patience when dealing with family members. A major breakthrough is possible around midweek if you remain focused and avoid unnecessary arguments. Channel your abundant energy into productive physical activities to maintain emotional balance.",
    personality: "Aries (Mesha) individuals are known for their pioneering spirit, unyielding courage, and fiercely independent nature. As the first sign of the zodiac, you possess a natural drive to lead and conquer challenges head-on. You are straightforward, detest deception, and prefer to face life's obstacles with raw honesty and enthusiasm.",
    strengths: ["Courageous", "Determined", "Confident", "Optimistic", "Honest", "Passionate", "Pioneering", "Dynamic"],
    weaknesses: ["Impulsive", "Short-tempered", "Aggressive", "Impatient", "Reckless", "Overly competitive"],
    career: "You excel in highly competitive environments and natural leadership positions. Entrepreneurship, sports, military, engineering, and first-responder careers suit your dynamic energy perfectly. You prefer being the boss rather than taking orders.",
    love: "In love, you seek exciting, passionate, and straightforward relationships without mind games. You are fiercely loyal but require a partner who can match your high energy and respect your need for independence. Best matches include Leo, Sagittarius, and sometimes Gemini.",
    health: "Aries rules the head and brain, making you susceptible to tension headaches, migraines, and stress-related issues. Regular, vigorous exercise is absolutely essential to channel your abundant energy and prevent anger build-up."
  },
  taurus: {
    daily: "Today is a powerful day to focus entirely on stability, grounding, and practical matters. Financial opportunities may present themselves through unexpected channels, perhaps related to real estate or long-term investments. The Moon's aspect suggests that taking a slow, methodical approach to your tasks will yield the best results. Avoid rushing into new agreements; instead, carefully read the fine print. Spend your evening enjoying the simple comforts of home, a good meal, and the company of loved ones to recharge your spirit.",
    monthly: "This month is focused on stability, home life, and careful financial planning. Venus is guiding you to build deeper connections with family and close friends. A slow, steady approach will yield the best results.",
    yearly: "This year brings solid progress and grounding for Taurus. Your perseverance will pay off, particularly in real estate, partnerships, and career advancement. Remain flexible to get the most out of upcoming changes.",
    weekly: "This week promises steady, tangible progress in your most important endeavors. Your legendary patience and perseverance will finally be rewarded with solid results, particularly in career and financial sectors. Venus brings a harmonious energy to your personal relationships, making it an excellent time to resolve old conflicts. You may feel a strong urge to beautify your surroundings or invest in luxury items. Remember to remain flexible when unexpected schedule changes occur towards the weekend.",
    personality: "Taurus (Vrishabha) individuals are the bedrock of the zodiac—reliable, deeply patient, and fiercely devoted to their loved ones. Ruled by Venus, you have a profound appreciation for beauty, art, good food, and material comforts. You value emotional and financial security above all else, preferring a predictable, stable life over chaotic adventures.",
    strengths: ["Reliable", "Patient", "Practical", "Devoted", "Responsible", "Stable", "Sensual", "Hardworking"],
    weaknesses: ["Stubborn", "Possessive", "Materialistic", "Resistant to change", "Uncompromising", "Slow to act"],
    career: "You thrive in stable, well-compensated roles where your methodical nature is valued. Finance, banking, real estate, agriculture, art, and culinary fields are excellent choices. You build wealth slowly but surely.",
    love: "You seek long-term, deeply stable relationships built on trust, loyalty, and physical affection. You are a devoted partner who provides incredible security, though you can be possessive. Best matches are Virgo, Capricorn, and Cancer.",
    health: "Taurus rules the throat, neck, and vocal cords. You are prone to sore throats, thyroid issues, and stiff necks. Because you love rich foods and comfort, maintaining a consistent exercise routine is crucial to prevent sluggishness."
  },
  gemini: {
    daily: "Communication and intellect are highly illuminated today. Your mind is buzzing with brilliant ideas, making this an excellent day for writing, speaking, or networking. Express your ideas clearly, but ensure you also listen actively to others. A piece of surprising news might change your perspective on a current problem.",
    monthly: "This month brings mental stimulation, social connections, and quick opportunities. Communication is your superpower. Your creative ideas will get noticed, so share them confidently with your team.",
    yearly: "This year offers immense learning, travel, and personal growth for Gemini. You will expand your network and find new avenues for self-expression. Focus on consistency to achieve your long-term ambitions.",
    weekly: "A week of immense intellectual stimulation and social connections awaits you. Learning, teaching, and short-distance travel are highly favored by Mercury's current transit. You will find yourself juggling multiple tasks effortlessly. Just be careful not to spread yourself too thin or make promises you cannot keep.",
    personality: "Geminis (Mithuna) are deeply curious, highly adaptable, and incredibly witty. Represented by the Twins, you have a dual nature that allows you to see multiple sides of any situation. You love variety, constant mental stimulation, and sharing ideas with everyone you meet.",
    strengths: ["Gentle", "Affectionate", "Curious", "Adaptable", "Quick learner", "Versatile", "Witty"],
    weaknesses: ["Nervous", "Inconsistent", "Indecisive", "Easily distracted", "Superficial"],
    career: "You excel in fast-paced environments requiring quick thinking and communication. Media, journalism, writing, teaching, sales, and technology are ideal fields where your versatility can shine.",
    love: "You require constant mental stimulation and communication in relationships. A partner must first be your best friend and intellectual equal. Best matches are Libra, Aquarius, and Aries.",
    health: "Gemini rules the nervous system, lungs, and hands. Pay close attention to respiratory health and nerve-related stress. Meditation, deep breathing exercises, and digital detoxes help maintain your mental balance."
  },
  cancer: {
    daily: "Your emotional intuition is exceptionally strong today. Trust your gut feelings, especially in complex decision-making processes. You may feel a strong desire to retreat to the safety of your home and care for your loved ones. Pay attention to your dreams tonight, as they may hold important subconscious messages.",
    monthly: "This month emphasizes self-care, emotional intelligence, and financial balance. Take a step back from busy routines to recharge. Your intuition is highly accurate right now—trust it in decision-making.",
    yearly: "This year brings healing, emotional depth, and home-centric happiness for Cancer. Relationships will strengthen, and you will build a solid foundation for your future goals. Stay true to your nurturing values.",
    weekly: "Focus deeply on home, family matters, and your inner emotional world this week. Your nurturing nature will bring great comfort to those around you. Real estate deals or home improvement projects are highly favored. Be careful not to absorb the negative emotions of others; set healthy emotional boundaries.",
    personality: "Cancers (Karka) are highly intuitive, deeply emotional, and fiercely protective of their loved ones. Like the Crab, you have a hard outer shell to protect your soft, sensitive interior. You value home, family, security, and emotional connection above worldly ambitions.",
    strengths: ["Tenacious", "Highly imaginative", "Loyal", "Emotional", "Sympathetic", "Persuasive", "Nurturing"],
    weaknesses: ["Moody", "Pessimistic", "Suspicious", "Manipulative", "Insecure", "Clingy"],
    career: "You excel in nurturing, caregiving, and protective roles. Healthcare, psychology, hospitality, real estate, and human resources are excellent choices where your empathy is a massive asset.",
    love: "You seek deep, soul-level emotional connections and absolute security. You love deeply and are incredibly fiercely loyal. Best matches are Scorpio, Pisces, and Taurus.",
    health: "Cancer rules the chest, stomach, and digestive system. Watch for digestive issues brought on by emotional stress. Comfort foods are tempting, but maintaining a balanced diet and emotional well-being is vital."
  },
  leo: {
    daily: "Your natural charisma and regal aura shine brightly today. Leadership opportunities will present themselves naturally, and others will look to you for guidance. It is an excellent day for creative expression and public speaking. Just ensure you share the spotlight and acknowledge the contributions of your team.",
    monthly: "This month is your time to shine, Leo! Your natural charisma is at an all-time high, attracting new opportunities in both work and love. Express yourself boldly, but remain mindful of others' feelings.",
    yearly: "This year is filled with cosmic promise, career expansion, and creative triumphs for Leo. Leadership roles and long-awaited recognition are on the horizon. Stay humble and continue to inspire your peers.",
    weekly: "A fantastic week filled with creativity, romance, and self-expression. The planetary energy encourages you to take center stage and showcase your unique talents to the world. Financial gains through creative projects are highly possible. Remain generous but avoid extravagant spending just to impress others.",
    personality: "Leos (Simha) are the royalty of the zodiac—confident, generous, fiercely loyal, and dramatically charismatic. Ruled by the Sun, you have a warm heart and love being appreciated, admired, and respected by your peers.",
    strengths: ["Creative", "Passionate", "Generous", "Warm-hearted", "Cheerful", "Humorous", "Charismatic"],
    weaknesses: ["Arrogant", "Stubborn", "Self-centered", "Lazy", "Inflexible", "Egoistic"],
    career: "You excel in leadership positions and highly creative fields. Entertainment, politics, management, entrepreneurship, and luxury goods suit your desire for status and self-expression.",
    love: "You seek passionate, dramatic, and deeply devoted romance. You treat your partners like royalty and expect the same in return. Best matches are Aries, Sagittarius, and Gemini.",
    health: "Leo rules the heart, spine, and upper back. Pay close attention to cardiovascular health. Regular physical activity, particularly activities that allow you to express yourself like dance, keeps you vibrant."
  },
  virgo: {
    daily: "Details matter more than ever today. Your sharp analytical skills will help solve complex problems that others have missed. It is an excellent day to organize your workspace, refine your routines, and focus on your health. Avoid being overly critical of yourself and others if things aren't perfectly flawless.",
    monthly: "This month highlights organization, health, and meticulous planning. Your analytical skills are sharpest now, making it a great time to organize your finances and workspace. Focus on details.",
    yearly: "This year focuses on health improvement, skill development, and career advancement for Virgo. Methodical effort will lead to major milestones. Embrace teamwork and trust the process of growth.",
    weekly: "A highly productive week for organization, self-improvement, and service. You will find great satisfaction in perfecting your systems and helping others streamline their lives. Career recognition may come through your meticulous attention to detail. Remember to schedule time for relaxation to avoid mental burnout.",
    personality: "Virgos (Kanya) are deeply analytical, highly practical, and incredibly detail-oriented. You strive for perfection and efficiency in absolutely everything you do. You have a pure heart and show your love by being useful and helping others improve their lives.",
    strengths: ["Loyal", "Analytical", "Kind", "Hardworking", "Practical", "Critical thinker", "Meticulous"],
    weaknesses: ["Shy", "Worrying", "Overly critical", "Workaholic", "Perfectionist", "Anxious"],
    career: "You excel in analytical, precise, and service-oriented roles. Healthcare, accounting, research, editing, data analysis, and administration are ideal fields where your precision is invaluable.",
    love: "You show love through practical acts of service rather than grand romantic gestures. You seek a partner who is reliable, neat, and intellectually stimulating. Best matches are Taurus, Capricorn, and Cancer.",
    health: "Virgo rules the digestive system and intestines. Watch for stomach issues caused by anxiety and overthinking. A strict routine, clean diet, and mindfulness practices are essential for your well-being."
  },
  libra: {
    daily: "Balance, justice, and harmony are heavily emphasized today. Focus your energy on nurturing relationships and forming strategic partnerships. It is a wonderful day to engage with art, beauty, or to redecorate your space. If conflicts arise, your natural diplomacy will easily smooth things over.",
    monthly: "This month Venus brings harmony, love, and artistic inspiration into your life. It is the perfect time to build bridges, resolve old misunderstandings, and enjoy the beauty of shared experiences.",
    yearly: "This year brings deep relationship transformations, personal growth, and balance for Libra. You will establish meaningful connections and find a comfortable rhythm between work and home life.",
    weekly: "A beautiful week for diplomacy, aesthetics, and social connections. Your charm is at an all-time high, making this a great time for negotiations, signing contracts, or starting new collaborations. You may struggle with making a major decision—weigh the pros and cons carefully, but ultimately trust your heart.",
    personality: "Libras (Tula) are the diplomats of the zodiac—gracious, peace-loving, and highly social. Ruled by Venus, you possess a deep appreciation for art, beauty, and symmetry. You seek absolute balance and harmony in all aspects of life and deeply despise injustice.",
    strengths: ["Cooperative", "Diplomatic", "Gracious", "Fair-minded", "Social", "Intellectual", "Charming"],
    weaknesses: ["Indecisive", "Avoids confrontations", "Self-pity", "Carries grudges", "People-pleasing"],
    career: "You excel in roles requiring diplomacy, aesthetics, and partnership. Law, mediation, design, fashion, public relations, and human resources suit your fair-minded nature perfectly.",
    love: "Relationships are central to your life. You seek a harmonious, intellectually stimulating, and aesthetically pleasing partnership. Best matches are Gemini, Aquarius, and Leo.",
    health: "Libra rules the kidneys and lower back. Pay strict attention to hydration and kidney health. Finding a perfect balance between work, social life, and deep relaxation is key to your vitality."
  },
  scorpio: {
    daily: "Deep transformation and hidden truths are highlighted today. Your investigative instincts are razor-sharp, allowing you to see through superficial matters to the core of any issue. Embrace change and deep self-reflection. Avoid getting entangled in power struggles or giving in to feelings of jealousy.",
    monthly: "This month brings deep transformation, inner strength, and focused determination. You are capable of overcoming any obstacles in your path. Keep your plans confidential until they are ready.",
    yearly: "This year is a powerful period of renewal, financial growth, and spiritual deepening for Scorpio. Your resourcefulness will be key to success. Embrace positive shifts and let go of the past.",
    weekly: "A week of intense emotional insights, research, and personal regeneration awaits. Trust your powerful intuition regarding financial investments or joint resources. You may uncover a secret that changes your perspective entirely. Use this intense energy to cut out toxic habits and rebuild stronger foundations.",
    personality: "Scorpios (Vrischika) are intensely passionate, fiercely resourceful, and profoundly determined. You are the most intense sign of the zodiac, seeking deep, transformative, and authentic experiences. You guard your secrets closely but are a fiercely loyal and protective friend to those you trust.",
    strengths: ["Resourceful", "Brave", "Passionate", "Stubborn", "True friend", "Determined", "Intuitive"],
    weaknesses: ["Distrusting", "Jealous", "Manipulative", "Resentful", "Secretive", "Vindictive"],
    career: "You excel in investigative, crisis-management, and power-oriented roles. Research, psychology, surgery, forensics, finance, and occult sciences suit your desire to probe the unknown.",
    love: "You seek intense, soulful, and deeply passionate connections. Casual dating does not interest you; you want absolute loyalty and emotional merging. Best matches are Cancer, Pisces, and Virgo.",
    health: "Scorpio rules the reproductive system and elimination organs. Emotional holding can manifest as physical toxicity. Deep psychological healing and regular detoxification practices are highly beneficial."
  },
  sagittarius: {
    daily: "The call for adventure and expansion is incredibly strong today. Expand your horizons through higher learning, reading, or planning a long journey. Your natural optimism will inspire everyone you interact with. Just be careful not to promise more than you can realistically deliver in your enthusiasm.",
    monthly: "This month is filled with optimism, learning, and adventure. Broaden your horizons through study or short travel. Your enthusiasm will infect others, opening new doors of collaboration.",
    yearly: "This year offers incredible adventure, wisdom, and personal expansion for Sagittarius. Long-term goals will begin to manifest, and you will discover new horizons in both career and personal life.",
    weekly: "A fantastic week filled with boundless optimism, philosophical exploration, and potential travel. New ideas, cultures, or spiritual philosophies will deeply inspire you. Professional growth is highly favored if you take a calculated risk. Remember to exercise tact when sharing your brutally honest opinions.",
    personality: "Sagittarians (Dhanus) are the adventurous, optimistic, and philosophical wanderers of the zodiac. You possess an insatiable thirst for knowledge, truth, and freedom. You love exploring new cultures and despise feeling confined by strict rules or routines.",
    strengths: ["Generous", "Idealistic", "Great sense of humor", "Adventurous", "Philosophical", "Honest"],
    weaknesses: ["Promises more than can deliver", "Impatient", "Blunt", "Tactless", "Careless"],
    career: "You excel in fields involving travel, higher education, and broad vision. Teaching, publishing, law, tourism, philosophy, and international business suit your expansive nature.",
    love: "You seek absolute freedom and exciting adventure in your relationships. A partner must be a fellow explorer who doesn't try to fence you in. Best matches are Aries, Leo, and Libra.",
    health: "Sagittarius rules the hips, thighs, and liver. Stay highly active to burn off excess energy, but avoid overindulgence in rich foods and alcohol to protect your liver health."
  },
  capricorn: {
    daily: "Your legendary discipline and focus will bring excellent rewards today. Concentrate entirely on your long-term goals, career ambitions, and practical responsibilities. Superiors will take note of your hard work and dedication. Ensure you take a moment to rest, as you tend to overwork yourself.",
    monthly: "This month emphasizes discipline, professional responsibilities, and long-term security. Saturn guides you to take calculated risks and stay focused on your tasks. Success is built step-by-step.",
    yearly: "This year is a major period of consolidation, career milestones, and material achievement for Capricorn. Hard work will be recognized and rewarded. Focus on building stable, enduring structures.",
    weekly: "A powerful week for building, structuring, and achieving major milestones. Your strategic planning and relentless hard work will lead to significant professional recognition or financial gain. Dealings with authority figures or government entities are favored. Make sure to carve out quality time for your family amidst your ambitious pursuits.",
    personality: "Capricorns (Makara) are the ultimate masters of discipline, responsibility, and ambition. You value structure, tradition, and tangible achievement. Like the mountain goat, you steadily and patiently climb to the highest peaks of success, overcoming any obstacle in your path.",
    strengths: ["Responsible", "Disciplined", "Self-controlled", "Good managers", "Ambitious", "Patient"],
    weaknesses: ["Unforgiving", "Condescending", "Cynical", "Pessimistic", "Overly serious"],
    career: "You excel in highly structured environments requiring intense management and strategic vision. Corporate leadership, finance, engineering, government, and architecture suit you perfectly.",
    love: "You take love seriously and seek a stable, committed, and traditional relationship. You show love by providing security and building a solid future together. Best matches are Taurus, Virgo, and Scorpio.",
    health: "Capricorn rules the bones, joints, knees, and teeth. Watch for arthritis or calcium deficiencies. Maintaining a balanced work-life rhythm and practicing flexibility exercises is crucial."
  },
  aquarius: {
    daily: "Innovation, progressive thinking, and sudden insights are highly favored today. Your unique, out-of-the-box ideas can bring positive, disruptive change to your workplace or community. It is a great day to engage with technology, science, or humanitarian causes. Embrace your individuality.",
    monthly: "This month brings innovative ideas, unique perspectives, and social engagement. Your visionary thinking is highly needed. Collaborate with like-minded individuals to bring your ideas to life.",
    yearly: "This year is a major turning point, bringing career expansion and personal liberation for Aquarius. Trust your unique path, embrace forward-thinking ideas, and build community connections.",
    weekly: "A highly stimulating week for social networking, group activities, and intellectual pursuits. Connecting with like-minded communities will open exciting new doors for your future goals. You may feel a strong urge to rebel against outdated systems. Channel this energy into constructive, progressive changes rather than mere rebellion.",
    personality: "Aquarians (Kumbha) are fiercely independent, highly original, and deeply humanitarian. You are the visionaries of the zodiac, always looking toward the future and valuing collective progress over outdated traditions. You march to the beat of your own drum and cherish your freedom.",
    strengths: ["Progressive", "Original", "Independent", "Humanitarian", "Intellectual", "Friendly", "Inventive"],
    weaknesses: ["Runs from emotion", "Temperamental", "Compulsive", "Aloof", "Unpredictable"],
    career: "You excel in innovative, unconventional, and humanitarian fields. Technology, science, astronomy, social work, aviation, and progressive politics suit your forward-thinking nature.",
    love: "You seek a relationship rooted in deep friendship and supreme intellectual connection. A partner must respect your need for immense personal space and freedom. Best matches are Gemini, Libra, and Sagittarius.",
    health: "Aquarius rules the circulatory system, ankles, and calves. Pay close attention to blood circulation. Stay hydrated, engage in aerobic activities, and manage your highly active nervous system."
  },
  pisces: {
    daily: "Your psychic intuition and creative imagination are exceptionally sharp today. Pay close attention to your dreams, gut feelings, and subtle synchronicities. Creative, artistic, and spiritual pursuits are highly favored. It's a good day to retreat slightly from the harsh realities of the world and recharge your sensitive soul.",
    monthly: "This month is a highly intuitive, creative, and spiritual period. Venus and Jupiter bring positive energies to your creative projects and relationships. Take time to meditate and connect with your inner self.",
    yearly: "This year holds great spiritual growth, artistic triumphs, and emotional healing for Pisces. You will deepen your intuition and find creative outlets for your feelings. Trust in your inner guidance.",
    weekly: "A profoundly deep week of emotional healing, imagination, and spiritual connection. Trust your inner voice implicitly when making decisions. You may feel highly empathetic to the suffering of others—be sure to shield your own energy so you aren't drained. Artistic projects will flow effortlessly.",
    personality: "Pisceans (Meena) are incredibly intuitive, deeply artistic, and endlessly compassionate. As the final sign of the zodiac, you possess a profound connection to the spiritual realm and the collective unconscious. You are highly adaptable but can sometimes struggle with earthly boundaries.",
    strengths: ["Compassionate", "Artistic", "Intuitive", "Gentle", "Wise", "Imaginative", "Empathetic"],
    weaknesses: ["Fearful", "Escapist", "Overly trusting", "Sad", "Victimized", "Lacks boundaries"],
    career: "You excel in creative, healing, and spiritual fields. Arts, music, psychology, healthcare, charity work, and maritime professions suit your compassionate and imaginative soul.",
    love: "You seek a deeply soulful, romantic, and almost magical connection. You love unconditionally and are incredibly devoted, but must avoid partners who take advantage of your gentle nature. Best matches are Cancer, Scorpio, and Taurus.",
    health: "Pisces rules the feet, lymphatic system, and immune system. You are highly sensitive to environmental toxins and stress. Rest, creative expression, and foot massages are deeply healing for you."
  }
};


const HOROSCOPE_DATA_SI: Record<string, { daily: string; weekly: string; monthly: string; yearly: string; personality: string; strengths: string[]; weaknesses: string[]; career: string; love: string; health: string }> = {
  aries: {
    daily: "අද දවස ඔබට ඉහළ ශක්තියක් සහ ක්‍රියාශීලී බවක් ගෙනදෙයි. නව ව්‍යාපෘති ආරම්භ කිරීමටත් නායකත්වය ගැනීමටත් සුදුසු දවසකි. නමුත් අනවශ්‍ය ලෙස කලබල වීමෙන් වළකින්න.",
    weekly: "මේ සතිය ව්‍යාපාරික කටයුතු සහ නායකත්ව වගකීම් භාරගැනීමට ඉතා යහපත් වේ. පවුලේ සාමාජිකයන් සමඟ ඉවසීමෙන් කටයුතු කරන්න. සති මැදදී වෘත්තීයමය වශයෙන් ජයග්‍රහණ හිමිවිය හැක.",
    monthly: "මෙම මාසයේ වෘත්තීය ක්ෂේත්‍රයේ කැපී පෙනෙන ප්‍රගතියක් අත්කරගත හැකිය. මූල්‍ය කටයුතු සාර්ථක වන අතර, පවුලේ සමගිය ආරක්ෂා කර ගැනීමට අවධානය යොමු කරන්න.",
    yearly: "වසර පුරාම රැකියා ක්ෂේත්‍රයේ නව අවස්ථා උදාවේ. දිගුකාලීන මූල්‍ය ආයෝජනවලට සුදුසු කාලයකි. උත්සාහය සහ කැපවීම තුළින් ඉහළම ප්‍රතිඵල ළඟා කරගත හැකිය.",
    personality: "මේෂ ලග්න හිමියන් යනු උපතින්ම නායකත්ව ගතිගුණ සහ දැඩි ධෛර්යයක් ඇති අයයි. ඔවුන් සෘජු, අවංක මෙන්ම ඕනෑම අභියෝගයකට නොබියව මුහුණ දෙන පුද්ගලයන් වේ.",
    strengths: ["ධෛර්යසම්පන්න", "විශ්වාසවන්ත", "සුබවාදී", "ක්‍රියාශීලී", "අවංක"],
    weaknesses: ["ඉක්මන්කෝපී", "නොඉවසිලිමත්", "කලබලකාරී"],
    career: "", love: "", health: ""
  },
  taurus: {
    daily: "අද දවස මූල්‍යමය කටයුතු සහ ස්ථාවරත්වය පිළිබඳව අවධානය යොමු කිරීමට සුදුසුය. ඉවසීමෙන් යුතුව තීරණ ගන්න. සන්ධ්‍යා කාලය පවුලේ අය සමඟ සතුටින් ගත කිරීමට හැකිවේ.",
    weekly: "වෘත්තීය සහ මූල්‍ය අංශවල ස්ථාවර ප්‍රගතියක් සතිය පුරාම දැකිය හැකිය. Venus ග්‍රහයාගේ පිහිටීම නිසා පවුලේ පැරණි ගැටලු විසඳා ගැනීමට අවස්ථාව සැලසේ.",
    monthly: "නිවස සහ පවුලේ කටයුතු කෙරෙහි වැඩි අවධානයක් යොමුකළ යුතු මාසයකි. ආර්ථික වශයෙන් සාර්ථක වන අතර නව ආදායම් මාර්ග කෙරෙහි මඟ පෑදේ.",
    yearly: "වෘෂභ ලග්න හිමියන්ට මෙවර වෘත්තීය ජයග්‍රහණ සහ ඉඩකඩම් ලැබීමේ වාසනාව උදාවේ. ඉවසීමෙන් කටයුතු කිරීමෙන් දිගුකාලීන ප්‍රතිලාභ රැසක් හිමි කරගත හැකිය.",
    personality: "වෘෂභ ලග්න හිමියන් යනු අතිශය විශ්වාසවන්ත, ඉවසිලිවන්ත සහ ප්‍රායෝගික පුද්ගලයන් වේ. ඔවුන් ජීවිතයේ සුඛවිහරණය මෙන්ම ආර්ථික සුරක්ෂිතභාවය අගය කරති.",
    strengths: ["විශ්වාසවන්ත", "ඉවසිලිවන්ත", "ප්‍රායෝගික", "වගකීම් සහගත"],
    weaknesses: ["දැඩි මතධාරී", "වෙනස්කම්වලට අකමැති"],
    career: "", love: "", health: ""
  },
  gemini: {
    daily: "අද දවස සන්නිවේදනයට සහ බුද්ධිමය කටයුතුවලට ඉතා යහපත් වේ. නව අදහස් මතු වන අතර, මිතුරන් සමඟ සාකච්ඡාවලින් සාර්ථක ප්‍රතිඵල උදාවේ.",
    weekly: "ඉගෙනීම් කටයුතුවලට සහ ගමන් බිමන්වලට සතිය ඉතා සුදුසුය. එකවර වැඩ කිහිපයක් සාර්ථකව නිම කිරීමට හැකියාව ලැබෙනු ඇත.",
    monthly: "ඔබගේ නිර්මාණශීලී අදහස් රැකියා ස්ථානයේ ඇගයීමට ලක්වන මාසයකි. අන් අය සමඟ සහයෝගයෙන් කටයුතු කිරීමෙන් වැඩි ජයග්‍රහණ ප්‍රමාණයක් ලබාගත හැක.",
    yearly: "නව සබඳතා ගොඩනැඟෙන සහ දැනුම වර්ධනය කරගත හැකි වසරකි. ව්‍යාපෘති කිහිපයක් සාර්ථකව නිම කිරීමට හැකිවන අතර ස්ථාවර භාවය රැක ගැනීමට උත්සාහ කරන්න.",
    personality: "මිථුන ලග්න හිමියන් යනු ඉතා සන්නිවේදනශීලී, බුද්ධිමත් සහ ඕනෑම පරිසරයකට ඉක්මනින් හැඩගැසිය හැකි පුද්ගලයන් වේ. ඔවුන් නව දැනුම සොයා යාමට ප්‍රිය කරති.",
    strengths: ["බුද්ධිමත්", "සන්නිවේදනශීලී", "හිතකාමී", "නම්‍යශීලී"],
    weaknesses: ["චංචල සිතුවිලි", "තීරණ ගැනීමට අපහසුව"],
    career: "", love: "", health: ""
  },
  cancer: {
    daily: "අද දවස සන්සුන්ව ගත කිරීමටත් සෞඛ්‍යය පිළිබඳ අවධානය යොමු කිරීමටත් සුදුසුය. ඔබගේ සහජ බුද්ධිය (intuition) අද දවසේ තීරණ ගැනීමට මඟ පෙන්වනු ඇත.",
    weekly: "සබඳතා ශක්තිමත් වන සතියකි. පවුලේ කටයුතු සහ නිවසේ අලුත්වැඩියාවන් සඳහා සුදුසු කාලයකි. මානසික සන්සුන්භාවය රැක ගැනීමට උත්සාහ කරන්න.",
    monthly: "මූල්‍ය කළමනාකරණය කෙරෙහි වැඩි අවධානයක් යොමුකළ යුතු මාසයකි. පවුලේ අයගේ සහයෝගය ලැබෙන අතර සන්සුන්ව කටයුතු කිරීම වැදගත් වේ.",
    yearly: "කටක ලග්න හිමියන්ට මෙවර ආධ්‍යාත්මික සුවය සහ පවුලේ සතුට ළඟා වේ. ජීවිතයේ ස්ථාවර පදනමක් ගොඩනැඟීමට හැකිවන වසරකි.",
    personality: "කටක ලග්න හිමියන් යනු ඉතා සංවේදී, කරුණාවන්ත සහ තම පවුලට අතිශයින් ලැදි පුද්ගලයන් වේ. ඔවුන්ගේ සහජ බුද්ධිය සහ ආරක්ෂණ ගතිගුණය කැපී පෙනේ.",
    strengths: ["කරුණාවන්ත", "සංවේදී", "ආරක්ෂාකාරී", "සහජ බුද්ධිය"],
    weaknesses: ["අධි සංවේදී", "කනස්සල්ලට පත්වීම"],
    career: "", love: "", health: ""
  },
  leo: {
    daily: "අද දවස ඔබගේ නායකත්වය සහ ප්‍රශංසාව කැපී පෙනෙන දවසකි. ඔබගේ ආකර්ෂණීය බව නිසා රැකියාවේ මෙන්ම පවුලේ ද කැපී පෙනෙනු ඇත.",
    weekly: "වෘත්තීය ක්ෂේත්‍රයේ නව වගකීම් සහ උසස්වීම් ලැබීමට ඉඩ ඇති සතියකි. ඔබගේ නිර්මාණශීලී කුසලතා වැඩිදියුණු කර ගැනීමට අවස්ථාව ලැබේ.",
    monthly: "සමාජ සබඳතා ශක්තිමත් වන අතර රැකියා ස්ථානයේ කැපී පෙනෙන ජයග්‍රහණ හිමිවේ. අන් අය සමඟ කටයුතු කිරීමේදී නම්‍යශීලී වන්න.",
    yearly: "සිංහ ලග්න හිමියන්ට වෘත්තීය වශයෙන් ඉහළම ගෞරවයක් සහ ඇගයීමක් ලැබෙන වසරකි. ඔබගේ දිගුකාලීන අරමුණු රැසක් සාර්ථක කරගත හැකිය.",
    personality: "සිංහ ලග්න හිමියන් යනු උපතින්ම ආත්මවිශ්වාසය ඇති, එඩිතර සහ ත්‍යාගශීලී පුද්ගලයන් වේ. ඔවුන් ඕනෑම පිරිසක් අතර කැපී පෙනෙන ආකර්ෂණයක් හිමිකර ගනී.",
    strengths: ["එඩිතර", "ත්‍යාගශීලී", "ආත්මවිශ්වාසය", "කරුණාවන්ත"],
    weaknesses: ["දැඩි මතධාරී", "අහංකාරී"],
    career: "", love: "", health: ""
  },
  virgo: {
    daily: "අද දවස ඔබගේ දෛනික වැඩකටයුතු සැලසුම් සහගතව කිරීමට ඉතා සුදුසුය. සෞඛ්‍ය කෙරෙහි අවධානය යොමු කරන්න. විස්තර කෙරෙහි සූක්ෂ්ම වීමෙන් වාසි අත්වේ.",
    weekly: "කන්‍යා ලග්න හිමියන්ට කුසලතා වර්ධනයට සහ රැකියා ප්‍රගතියට සුදුසු සතියකි. සැලසුම් සහගත උත්සාහය නිසා බලාපොරොත්තු වූ ප්‍රතිඵල හිමිවේ.",
    monthly: "මූල්‍ය සහ රැකියා කටයුතු ඉතා ක්‍රමානුකූලව පවත්වා ගැනීමට හැකිවන මාසයකි. පවුලේ අය සමඟ සුවදතාවය වැඩිදියුණු කරගන්න.",
    yearly: "මෙම වසර සෞඛ්‍ය දියුණුවට සහ රැකියා ස්ථානයේ කැපී පෙනෙන ජයග්‍රහණ ලබා ගැනීමට උපකාරී වේ. ක්‍රමානුකූල උත්සාහය සාර්ථකත්වයට මඟ පාදයි.",
    personality: "කන්‍යා ලග්න හිමියන් යනු ඉතා ක්‍රමානුකූල, බුද්ධිමත් සහ විස්තර කෙරෙහි දැඩි අවධානයක් යොමු කරන, සේවය කිරීමට කැපවූ පුද්ගලයන් වේ.",
    strengths: ["විශ්ලේෂණාත්මක", "ක්‍රමානුකූල", "විශ්වාසවන්ත", "කඩිසර"],
    weaknesses: ["අධික විවේචනාත්මක", "සැක සහිත සිතුවිලි"],
    career: "", love: "", health: ""
  },
  libra: {
    daily: "අද දවස ආදරය, සාමය සහ කලාත්මක කටයුතුවලට ඉතා යහපත් වේ. පවුලේ සාමාජිකයන් අතර පැරණි අමනාපකම් විසඳා ගැනීමට අවස්ථාව උදාවේ.",
    weekly: "සබඳතා සහ හවුල් ව්‍යාපාර සාර්ථක වන සතියකි. Venus ග්‍රහයාගේ බලපෑම නිසා ජීවිතයේ සමතුලිතතාවය සහ සතුට ළඟා වේ.",
    monthly: "නිර්මාණශීලී ව්‍යාපෘතිවලින් ඉහළ ප්‍රතිලාභ ලැබිය හැකි මාසයකි. රැකියා සහ පවුල් ජීවිතය සමබරව පවත්වා ගැනීමට හැකිවනු ඇත.",
    yearly: "තුලා ලග්න හිමියන්ට මෙවර විවාහ සබඳතා සහ හවුල් ව්‍යාපාර සාර්ථක කරගත හැක. ජීවිතයේ නව සමතුලිතතාවයක් සහ සැනසීමක් උදාවන වසරකි.",
    personality: "තුලා ලග්න හිමියන් යනු සාමය, සාධාරණත්වය සහ අලංකාරය අගය කරන පුද්ගලයන් වේ. ඔවුන් ඕනෑම සබඳතාවයක සමතුලිතතාවය රැක ගැනීමට ප්‍රිය කරති.",
    strengths: ["සාමකාමී", "සාධාරණ", "කලාත්මක", "රාජ්‍යතාන්ත්‍රික"],
    weaknesses: ["තීරණ ගැනීමට අපහසුව", "සැකය"],
    career: "", love: "", health: ""
  },
  scorpio: {
    daily: "අද දවස ගැඹුරු සිතුවිලි සහ අධිෂ්ඨානය මතුකරන දවසකි. අභියෝග හමුවේ නොසැලී සිටීමට ඔබට ශක්තිය හිමිවේ. ඔබගේ සැලසුම් රහසිගතව තබාගන්න.",
    weekly: "වෘත්තීය වශයෙන් රහසිගත උපාය මාර්ග සාර්ථක වන සතියකි. ආධ්‍යාත්මික සහ මනෝවිද්‍යාත්මක කටයුතුවලින් සැනසීමක් අත්වනු ඇත.",
    monthly: "බාධක මැද වුවද ඔබගේ නොපසුබට උත්සාහය නිසා කැපී පෙනෙන ජයග්‍රහණ ලැබිය හැකි මාසයකි. මූල්‍යමය තත්ත්වය යහපත් වේ.",
    yearly: "වෘශ්චික ලග්න හිමියන්ට මෙවර ආත්මශක්තිය සහ ධනය වර්ධනය කරගත හැකි වසරකි. පැරණි ගැටලුවලින් මිදී අලුත් ජීවන මාවතක් තෝරා ගැනීමට හැකිවේ.",
    personality: "වෘශ්චික ලග්න හිමියන් යනු දැඩි කැපවීමක්, තියුණු බුද්ධියක් සහ අසීමිත මානසික ශක්තියක් ඇති, අබිරහස් මෙන්ම ආකර්ෂණීය පුද්ගලයන් වේ.",
    strengths: ["දැඩි කැපවීම", "නිර්භීත", "විශ්වාසවන්ත", "තියුණු බුද්ධිය"],
    weaknesses: ["ඊර්ෂ්‍යාකාරී", "රහසිගත", "පළිගැනීමේ සිතුවිලි"],
    career: "", love: "", health: ""
  },
  sagittarius: {
    daily: "අද දවස සුබවාදී හැඟීම් සහ ඉගෙනීමේ කටයුතුවලට යහපත් වේ. කෙටි ගමන් බිමන්වලින් නව අවස්ථා උදාවන අතර, උද්‍යෝගිමත් බව වර්ධනය වේ.",
    weekly: "ව්‍යාපාරික කටයුතු සහ අධ්‍යාපනය සඳහා ඉතා යහපත් සතියකි. නව දැනුම සොයා යාමටත්, සබඳතා පුළුල් කර ගැනීමටත් අවස්ථාව ලැබේ.",
    monthly: "විදේශ ගමන් හෝ උසස් අධ්‍යාපන කටයුතු සඳහා සුදුසුම මාසයකි. ඔබගේ අරමුණු සාර්ථක කර ගැනීමට මිතුරන්ගේ සහයෝගය ලැබේ.",
    yearly: "ධනු ලග්න හිමියන්ට ඉතා වාසනාවන්ත, වික්‍රමාන්විත සහ බලාපොරොත්තු රැසක් ඉටුවන වසරකි. වෘත්තීය මෙන්ම පුද්ගලික ජීවිතයේ ද විශාල දියුණුවක් ලබයි.",
    personality: "ධනු ලග්න හිමියන් යනු අතිශය සුබවාදී, නිදහස අගය කරන, සත්‍ය ගවේෂණයට ප්‍රිය කරන සහ වික්‍රමාන්විත පුද්ගලයන් වේ.",
    strengths: ["සුබවාදී", "ත්‍යාගශීලී", "සත්‍යවාදී", "උද්‍යෝගිමත්"],
    weaknesses: ["ඉවසීමක් නොමැතිකම", "අවදානම් ගැනීම"],
    career: "", love: "", health: ""
  },
  capricorn: {
    daily: "අද දවස ඔබගේ රැකියාවේ වගකීම් සහ විනයානුකූල බව පෙන්වීමට ඉතා සුදුසුය. කලබල නොවී සැලසුම් සහගතව වැඩ කරන්න. සාර්ථකත්වය ලැබෙනු ඇත.",
    weekly: "මකර ලග්න හිමියන්ට රැකියාවේ කැපී පෙනෙන ඇගයීම් ලැබෙන සතියකි. දැඩි කැපවීම නිසා බලාපොරොත්තු වූ මූල්‍ය ප්‍රතිලාභ හිමි කරගත හැක.",
    monthly: "දිගුකාලීන ව්‍යාපාරික සැලසුම් සකස් කිරීමට සුදුසු මාසයකි. ඔබගේ විනයානුකූල උත්සාහය නිසා ආර්ථික ස්ථාවරත්වය තවදුරටත් ශක්තිමත් වේ.",
    yearly: "වෘත්තීය ජීවිතයේ ඉහළම ජයග්‍රහණ සහ ස්ථාවරත්වයක් ගොඩනැඟිය හැකි වසරකි. ඔබගේ උත්සාහයට සහ මහන්සියට sරිලන ඉහළම ප්‍රතිඵල හිමිවේ.",
    personality: "මකර ලග්න හිමියන් යනු අතිශය විනයානුකූල, ප්‍රායෝගික, ඉලක්ක කරා නොනැවතී යන, වගකීම් සහගත සහ යථාර්ථවාදී පුද්ගලයන් වේ.",
    strengths: ["විනයානුකූල", "ප්‍රායෝගික", "නොනැවතී යන උත්සාහය", "යථාර්ථවාදී"],
    weaknesses: ["සීතල සිතුවිලි", "සැක සහිත බව", "සීමාව ඉක්මවා වැඩ කිරීම"],
    career: "", love: "", health: ""
  },
  aquarius: {
    daily: "අද දවස නව අදහස් මතු වන සහ සමාජයීය සබඳතාවලට යහපත් වන දවසකි. සහයෝගී කටයුතුවලින් සාර්ථක ප්‍රතිඵල බලාපොරොත්තු විය හැකිය.",
    weekly: "නැවුම් නිර්මාණශීලී අදහස් ක්‍රියාවට නැංවිය හැකි සතියකි. පොදු හෝ ප්‍රජා සේවා කටයුතුවලට සම්බන්ධ වීමට අවස්ථාව උදාවේ.",
    monthly: "සගයන් සමඟ නව ව්‍යාපෘති සැලසුම් කිරීමට සහ මිත්‍ර සබඳතා වර්ධනය කර ගැනීමට සුදුසු මාසයකි. වෘත්තීයමය වශයෙන් සාර්ථක වේ.",
    yearly: "කුම්භ ලග්න හිමියන්ට නව පෙරළිකාර අවස්ථා රැසක් උදාවන වසරකි. ව්‍යාපාරික ක්ෂේත්‍රයේ නව ජයග්‍රහණ ලැබෙන අතර, සමාජ පිළිගැනීම ඉහළ යයි.",
    personality: "කුම්භ ලග්න හිමියන් යනු ස්වාධීන, මානුෂීය ගුණාංග ඇති, පෙරළිකාර සහ නව්‍ය අදහස් ඇති අනාගතවාදී පුද්ගලයන් වේ.",
    strengths: ["නිර්මාණශීලී", "ස්වාධීන", "හිතකාමී", "මානුෂීය ගතිගුණ"],
    weaknesses: ["තනිව සිටීමට ප්‍රිය කිරීම", "තීරණ වෙනස් නොකිරීම"],
    career: "", love: "", health: ""
  },
  pisces: {
    daily: "අද දවස ආධ්‍යාත්මික සුවය, සහජ බුද්ධිය සහ කලාත්මක කටයුතුවලට ඉතා යහපත් වේ. මානසික නිදහස අගය කරන්න. සන්සුන්ව කාලය ගත කරන්න.",
    weekly: "නිර්මාණශීලී කටයුතු සහ සහයෝගීතාවයන් සාර්ථක වන සතියකි. ආධ්‍යාත්මික සුවය ලැබෙන අතර, සබඳතාවල සමීප බව වැඩිවේ.",
    monthly: "කලාත්මක සහ නිර්මාණශීලී ව්‍යාපෘතිවලින් ඉහළ ප්‍රගතියක් ලැබිය හැකි මාසයකි. ඔබගේ සහජ බුද්ධිය නිසා නිවැරදි මූල්‍ය තීරණ ගැනීමට හැකිවේ.",
    yearly: "මීන ලග්න හිමියන්ට උසස් ආධ්‍යාත්මික ප්‍රගතියක්, නිර්මාණශීලී සාර්ථකත්වයක් සහ මානසික සුවයක් ලැබෙන ඉතා වාසනාවන්ත වසරකි.",
    personality: "මීන ලග්න හිමියන් යනු අතිශය සහජ බුද්ධියක් ඇති, කරුණාවන්ත, කලාත්මක සිතුවිලි ඇති සහ ගැඹුරු ආධ්‍යාත්මික ලැදියාවක් ඇති පුද්ගලයන් වේ.",
    strengths: ["සහජ බුද්ධිය", "කරුණාවන්ත", "කලාත්මක", "නිර්මාණශීලී"],
    weaknesses: ["අධි සංවේදී", "යථාර්ථයෙන් මිදීමට උත්සාහ කිරීම"],
    career: "", love: "", health: ""
  }
};

const ELEMENTS_SI: Record<string, string> = {
  "Fire": "තේජෝ (ගින්න)",
  "Earth": "පඨවි (පස)",
  "Air": "වායෝ (සුළඟ)",
  "Water": "ආපෝ (ජලය)"
};

const PLANETS_SI: Record<string, string> = {
  "Mars": "කුජ (අඟහරු)",
  "Venus": "සිකුරු",
  "Mercury": "බුධ",
  "Moon": "සඳු",
  "Sun": "රවි",
  "Jupiter": "ගුරු",
  "Saturn": "ශනි",
  "Saturn & Rahu": "ශනි සහ රාහු",
  "Mars & Ketu": "කුජ සහ කේතු"
};

const MONTHS_SI: Record<string, string> = {
  "Jan": "ජනවාරි",
  "Feb": "පෙබරවාරි",
  "Mar": "මාර්තු",
  "Apr": "අප්‍රේල්",
  "May": "මැයි",
  "Jun": "ජූනි",
  "Jul": "ජූලි",
  "Aug": "අගෝස්තු",
  "Sep": "සැප්තැම්බර්",
  "Oct": "ඔක්තෝබර්",
  "Nov": "නොවැම්බර්",
  "Dec": "දෙසැම්බර්"
};

export default function HoroscopePage() {
  const params = useParams();
  const { t, language } = useLanguage();
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily");
  const searchParams = useSearchParams();
  const queryPeriod = searchParams?.get("period");

  useEffect(() => {
    if (queryPeriod === "daily" || queryPeriod === "weekly" || queryPeriod === "monthly" || queryPeriod === "yearly") {
      setPeriod(queryPeriod);
    }
  }, [queryPeriod]);
  const signKey = Array.isArray(params?.sign) ? params.sign[0] : params?.sign || "aries";
  const sign = ZODIAC_SIGNS[signKey.toLowerCase()] || ZODIAC_SIGNS["aries"];
  const data = language === "si" ? (HOROSCOPE_DATA_SI[signKey.toLowerCase()] || HOROSCOPE_DATA_SI["aries"]) : (HOROSCOPE_DATA[signKey.toLowerCase()] || HOROSCOPE_DATA["aries"]);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <img 
            src={`/img/${signKey.charAt(0).toUpperCase() + signKey.slice(1).toLowerCase()}.PNG`} 
            alt={sign.name} 
            className="w-16 h-16 object-contain mx-auto mb-4" 
          />
          <h1 className={`text-4xl md:text-5xl ${language === 'si' ? 'elegant-sinhala text-transparent bg-clip-text bg-gradient-to-r from-[#a6192e] to-orange-500' : 'font-display text-[#1a365d]'} font-bold mb-2`}>
            {language === 'si' ? `${t('zodiac.' + signKey.toLowerCase())} ලග්න පලාඵල` : `${sign.name} Horoscope`}
          </h1>
          <p className="text-muted-foreground">
            {language === "si" 
              ? sign.dates.replace("Jan", "ජනවාරි").replace("Feb", "පෙබරවාරි").replace("Mar", "මාර්තු").replace("Apr", "අප්‍රේල්").replace("May", "මැයි").replace("Jun", "ජූනි").replace("Jul", "ජූලි").replace("Aug", "අගෝස්තු").replace("Sep", "සැප්තැම්බර්").replace("Oct", "ඔක්තෝබර්").replace("Nov", "නොවැම්බර්").replace("Dec", "දෙසැම්බර්") 
              : sign.dates} • {language === "si" ? (ELEMENTS_SI[sign.element] || sign.element) : sign.element} • {language === "si" ? (PLANETS_SI[sign.rulingPlanet] || sign.rulingPlanet) : sign.rulingPlanet}
          </p>

          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            <Button
              variant={period === "daily" ? "cosmic" : "outline"}
              onClick={() => setPeriod("daily")}
            >
              {t("horoscope.daily")}
            </Button>
            <Button
              variant={period === "weekly" ? "cosmic" : "outline"}
              onClick={() => setPeriod("weekly")}
            >
              {t("horoscope.weekly")}
            </Button>
            <Button
              variant={period === "monthly" ? "cosmic" : "outline"}
              onClick={() => setPeriod("monthly")}
            >
              {t("horoscope.monthly")}
            </Button>
            <Button
              variant={period === "yearly" ? "cosmic" : "outline"}
              onClick={() => setPeriod("yearly")}
            >
              {t("horoscope.yearly")}
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                {language === "si"
                  ? (period === "daily" ? "දෛනික පලාඵලය" :
                     period === "weekly" ? "සතිපතා පලාඵලය" :
                     period === "monthly" ? "මාසික පලාඵලය" : "වාර්ෂික පලාඵලය")
                  : (period === "daily" ? "Today's Prediction" :
                     period === "weekly" ? "Weekly Prediction" :
                     period === "monthly" ? "Monthly Prediction" : "Yearly Prediction")}
              </CardTitle>
              <CardDescription>
                {language === "si"
                  ? (period === "daily" ? "පවතින ග්‍රහ පිහිටීම් පදනම් කොට" :
                     period === "weekly" ? "ඉදිරි ග්‍රහ ගෝචරයන් පදනම් කොට" :
                     period === "monthly" ? "පවතින මාසික සූර්ය සංක්‍රමණයන් අනුව" : "වාර්ෂික ග්‍රහ චක්‍රයන් පදනම් කොට")
                  : (period === "daily" ? "Based on current planetary positions" :
                     period === "weekly" ? "Based on upcoming transits" :
                     period === "monthly" ? "Based on monthly solar alignments" : "Based on yearly planetary cycles")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                {period === "daily" ? data.daily :
                 period === "weekly" ? data.weekly :
                 period === "monthly" ? data.monthly : data.yearly}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-600" />
                  {t("horoscope.personality")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{data.personality}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-green-600" />
                  {t("horoscope.strengths")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {data.strengths.map((strength) => (
                    <span key={strength} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {strength}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-600" />
                  {t("horoscope.weaknesses")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {data.weaknesses.map((weakness) => (
                    <span key={weakness} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                      {weakness}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Career
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{data.career}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-600" />
                  Love & Relationships
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{data.love}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-orange-600" />
                  Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{data.health}</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href={`/free-horoscope?sign=${sign.name}`}>
              <Button variant="cosmic" size="lg" className="w-full sm:w-auto">
                Get Detailed Horoscope
              </Button>
            </Link>
            <Link href="/reports">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View All Reports
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

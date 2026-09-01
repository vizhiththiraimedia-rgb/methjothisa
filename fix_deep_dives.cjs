const fs = require('fs');
let code = fs.readFileSync('./src/app/charts/[id]/page.tsx', 'utf8');

const startIdx = code.indexOf('const openLagnaDeepDive');
const endIdx = code.indexOf('const planets =');

const fixedDeepDives = `const openLagnaDeepDive = () => {
    setActiveDeepDive({
      title: \`\${t("zodiac." + (SIGN_KEY_MAP[chartData.lagna?.toLowerCase()] || chartData.lagna?.toLowerCase())) || chartData.lagna} (Lagna / Ascendant)\`,
      badge: "Self & Life Destiny (Tanu Bhava)",
      icon: "🏹",
      overview: language === 'si' 
        ? \`ලග්නය යනු ඔබ උපන් මොහොතේ නැගෙනහිර ක්ෂිතිජයෙන් උදාවෙමින් පැවති රාශියයි. එය ඔබගේ මූලික අනන්‍යතාවය, ශාරීරික ශක්තිය, බාහිර පෙනුම සහ ඔබ ලෝකය දකින ආකාරය තීරණය කරයි.\`
        : \`Lagna is the rising sign on the eastern horizon at the exact moment of birth. It defines your core identity, physical vitality, outward persona, and the foundational lens through which you experience the universe.\`,
      psychology: language === 'si'
        ? \`මෙම ලග්නයෙන් උපන් අය විශේෂ චින්තන රටාවකින් සහ සහජ නායකත්ව ලක්ෂණ වලින් යුක්ත වේ. අරමුණක් කරා යාමේ සහජ හැකියාවක් මොවුන්ට ඇත.\`
        : \`Individuals born with this Ascendant are characterized by distinct cognitive pathways, natural instinct, and sharp perceptual faculties. You possess an innate drive to build purpose-driven milestones.\`,
      astrologicalImpact: language === 'si'
        ? \`පළමු භාවය (කේන්ද්‍ර සහ ත්‍රිකෝණස්ථානයක් ලෙස) ඔබගේ කේන්ද්‍රයේ ප්‍රධාන ආරක්ෂකයා ලෙස ක්‍රියා කරයි. ධනය (2), ධෛර්යය (3), දේපල (4), බුද්ධිය (5) සහ රැකියාව (10) යන සියල්ල ලග්නය මත පදනම්ව තීරණය වේ.\`
        : \`As the 1st House (Kendra & Trikona simultaneously), your Ascendant acts as the prime guardian of your chart. Placements from Lagna establish all 12 life dimensions: wealth (2nd), courage (3rd), property (4th), intelligence (5th), and career (10th).\`,
      remedies: language === 'si'
        ? \`ඔබේ ලග්නාධිපති ග්‍රහයා ශක්තිමත් කිරීම සඳහා උදෑසන භාවනා කිරීම සහ අදාළ ග්‍රහයාට ගැළපෙන මැණික් පැලඳීම සුදුසුය.\`
        : \`Strengthen your Lagna Lord through conscious morning meditation, and aligning decisions with your natural elemental energy.\`
    });
  };

  const openRasiDeepDive = () => {
    setActiveDeepDive({
      title: \`\${t("zodiac." + (SIGN_KEY_MAP[chartData.moonSign?.toLowerCase()] || chartData.moonSign?.toLowerCase())) || chartData.moonSign} (Moon Sign / Rasi)\`,
      badge: "Mind & Emotional Subconscious (Chandra)",
      icon: "🌙",
      overview: language === 'si'
        ? \`චන්ද්‍ර රාශිය (ජන්ම රාශිය) මගින් ඔබගේ යටි සිත, චිත්තවේගීය සමතුලිතතාවය, සහජ ප්‍රතික්‍රියා සහ මතකය පාලනය කරයි. වෛදික ජ්‍යෝතිෂයට අනුව මනස සෞඛ්‍ය සම්පන්න වීමට ලග්නය මෙන්ම චන්ද්‍ර රාශියද ඉතා වැදගත් වේ.\`
        : \`Moon Sign (Janma Rasi) governs your subconscious mind, emotional equilibrium, instinctual reactions, memory retention, and how you internalize experiences. In Vedic astrology, the Moon is as crucial as the Ascendant for psychological health.\`,
      psychology: language === 'si'
        ? \`මෙම රාශියේ චන්ද්‍රයා පිහිටීම නිසා ඔබ ගැඹුරු සංවේදී බවකින් සහ ඉහළ නිර්මාණශීලී පරිකල්පනයකින් යුක්ත වේ. පවුලේ අයට සහ හිතවතුන්ට දැඩි රැකවරණයක් ලබා දෙයි.\`
        : \`With the Moon placed here, your mind operates with acute intuitive receptivity. You possess deep empathetic sensitivity, high creative imagination, and a strong protective instinct toward family, allies, and creative projects.\`,
      astrologicalImpact: language === 'si'
        ? \`ඔබගේ විංශෝත්තරී මහ දශාවන් සහ ගෝචර ගමන් සඳහා පදනම වන්නේ චන්ද්‍ර රාශියයි. ගුරු සහ ශනි ග්‍රහයන් චන්ද්‍රයා මතින් ගමන් කිරීමේදී වෘත්තීය සහ ජීවිතයේ විශාල පෙරළි සිදුවේ.\`
        : \`Your Moon sign is the foundation for all Vimshottari Mahadasha timing and Gocharam (transit) impacts. Favorable transits of Jupiter and Saturn over your Moon create major career surges and emotional breakthroughs.\`,
      remedies: language === 'si'
        ? \`සඳුදා දිනවල 'ඕම් නමඃ ශිවාය' හෝ 'ඕම් චන්ද්‍රාය නමඃ' ගායනා කිරීම, රිදී ආභරණ පැලඳීම සහ ජලය පානය කිරීමෙන් චන්ද්‍ර බලය වර්ධනය කරගත හැක.\`
        : \`Honor Moon energy with silver ornaments, drinking water from silver vessels, maintaining emotional hydration, and reciting 'Om Namah Shivaya' or 'Om Chandraya Namaha' on Mondays.\`
    });
  };

  const openNakshatraDeepDive = () => {
    setActiveDeepDive({
      title: \`\${chartData.nakshatra} (Birth Star / Nakshatra)\`,
      badge: \`Pada \${chartData.pada} · Karmic Blueprint\`,
      icon: "✨",
      overview: language === 'si'
        ? \`\${chartData.nakshatra} යනු ඔබ උපන් මොහොතේ චන්ද්‍රයා ගමන් කළ නැකතයි. මෙයින් ඔබගේ කර්ම ශක්තිය, සුවිශේෂී දක්ෂතා, සහජ ගතිගුණ සහ අධ්‍යාත්මික සම්බන්ධතාවය පෙන්නුම් කරයි.\`
        : \`\${chartData.nakshatra} is the lunar mansion presiding at your birth. It reveals your soul's karmic blueprint, unique talents, temperament, and spiritual alignment.\`,
      psychology: language === 'si'
        ? \`මෙම නැකතේ බලපෑමෙන් ඔබ ස්වාභාවිකවම පෝෂණය කිරීමේ හැකියාව, නොපසුබට උත්සාහය සහ ගැඹුරු බුද්ධියක් ප්‍රදර්ශනය කරයි. \${chartData.pada} වන පාදය ඔබගේ මානසික විනය තහවුරු කරයි.\`
        : \`You naturally radiate nurturing power, perseverance, intellectual depth, and unwavering loyalty. Pada \${chartData.pada} anchors your mental discipline and ethical focus.\`,
      astrologicalImpact: language === 'si'
        ? \`මෙම නැකතට අධිපති ග්‍රහයාගෙන් ඔබගේ ජීවිතයේ පළමු විංශෝත්තරී දශාව ආරම්භ විය. එය ඔබගේ ජීවිතයේ හැරවුම් ලක්ෂ්‍යයන්හිදී බුද්ධිමය ආරක්ෂාව සහ අධ්‍යාත්මික උසස්වීම ලබා දෙයි.\`
        : \`The planetary ruler of this star initiated your life's first Vimshottari Dasha period. It grants continuous wisdom, intellectual protection, and spiritual elevation throughout life transitions.\`,
      remedies: language === 'si'
        ? \`සෑම මසකම චන්ද්‍රයා \${chartData.nakshatra} නැකත මතින් ගමන් කරන දිනවල ආගමික වතාවත්වල නිරත වීම සහ ආහාර දානමාන පිරිනැමීම ඉතා සුබදායකය.\`
        : \`Connect with divine energy during monthly Moon transits over \${chartData.nakshatra}. Support charitable endeavors aligned with food nourishment and educational patronage.\`
    });
  };

  const openDashaDeepDive = () => {
    setActiveDeepDive({
      title: \`Vimshottari Dasha Timeline\`,
      badge: "Karmic Timing Engine",
      icon: "⏳",
      overview: language === 'si'
        ? \`විංශෝත්තරී දශා ක්‍රමය යනු මිනිස් ආයුෂ වසර 120ක් ලෙස සලකා ජීවිතයේ සිදුවීම් පාලනය කරන ග්‍රහ කාලසටහනයි. එක් එක් මහ දශාවන් මගින් ජීවිතයට අදාළ විශේෂ අවස්ථාවන් සහ පරිවර්තනයන් ඇති කරයි.\`
        : \`The Vimshottari Dasha system is the 120-year cycle of planetary periods that controls the unfolding of life events. Each Mahadasha activates specific houses, bringing tailored opportunities, career shifts, and personal evolution.\`,
      psychology: language === 'si'
        ? \`එක් දශාවකින් තවත් දශාවකට මාරු වීමේදී දැඩි මනෝවිද්‍යාත්මක වෙනස්කම් සිදුවේ. ග්‍රහයාගේ ස්වභාවය අනුව ඔබගේ අරමුණු, වටිනාකම් සහ සබඳතා වෙනස් වීමට ලක්වේ.\`
        : \`Transitions between Dasha periods mark profound psychological transformations. As you shift from one planetary ruler to another, your ambitions, values, relationships, and energetic focus evolve accordingly.\`,
      astrologicalImpact: language === 'si'
        ? \`ඔබගේ උපත සිදුවී ඇත්තේ \${chartData.vimshottariDasa?.[0]?.formatted?.split(':')[0]?.trim() || 'මෙම දශාවෙන්'} වන අතර, තවත් \${chartData.vimshottariDasa?.[0]?.formatted?.split(':')[1]?.trim() || 'යම් කාලයක්'} ඉතිරිව ඇත. මෙය ඔබගේ අධ්‍යාපනය, විවාහය සහ ධනය ඉපයීමේ කාලරේඛාව තීරණය කරයි.\`
        : \`Your birth opened with \${chartData.vimshottariDasa?.[0]?.formatted?.split(':')[0]?.trim() || 'this Dasha'}, with a balance of \${chartData.vimshottariDasa?.[0]?.formatted?.split(':')[1]?.trim() || 'remaining years'}. This sets the chronological roadmap for your education, marriage, wealth creation, and spiritual awakening.\`,
      remedies: language === 'si'
        ? \`දැනට පවතින මහ දශාධිපති ග්‍රහයාට අදාළ මන්ත්‍ර ගායනා කිරීම සහ එම ග්‍රහයා නියෝජනය කරන යහපත් ක්‍රියාවන්හි නිරත වීම සුදුසුය.\`
        : \`During any active Mahadasha, chant the dedicated planetary mantra and perform service aligned with that planet's archetypal energy.\`
    });
  };

  const handlePlanetClick = (p: any) => {
    setActiveDeepDive({
      title: \`\${p.name} in \${t("zodiac." + (SIGN_KEY_MAP[p.sign?.toLowerCase()] || p.sign?.toLowerCase())) || p.sign}\`,
      badge: \`House \${p.house} Placement\`,
      icon: "🪐",
      overview: language === 'si'
        ? \`\${p.name} ග්‍රහයා ඔබගේ කේන්ද්‍රයේ සුවිශේෂී විශ්වීය ශක්තියක් නියෝජනය කරයි. එය \${t("zodiac." + (SIGN_KEY_MAP[p.sign?.toLowerCase()] || p.sign?.toLowerCase())) || p.sign} රාශියේ අංශක \${p.degree.toFixed(2)} ක පිහිටා ඇත.\`
        : \`\${p.name} represents specific cosmic energy in your blueprint. In this chart, it is positioned in \${t("zodiac." + (SIGN_KEY_MAP[p.sign?.toLowerCase()] || p.sign?.toLowerCase())) || p.sign} at \${p.degree.toFixed(2)}°.\`,
      psychology: language === 'si'
        ? \`\${p.house} වැන්න හරහා ඔබගේ අවධානය සහ හැකියාවන් මෙහෙයවනු ලබයි. මෙම පිහිටීම මගින් අදාළ භාවය නියෝජනය කරන ජීවිතයේ අංශයන් කෙරෙහි ඔබගේ ප්‍රවේශය ගැඹුරින් බලපායි.\`
        : \`Channels focused energy and distinct capabilities into the matters of House \${p.house}. This placement deeply influences your approach to the life themes governed by this house.\`,
      astrologicalImpact: language === 'si'
        ? \`ප්‍රධාන ග්‍රහයෙකු ලෙස මෙම ග්‍රහයාගේ දෘෂ්ටිය ප්‍රතිවිරුද්ධ සහ ත්‍රිකෝණ ස්ථාන වෙත යොමු වීමෙන් එම අංශයන් වඩාත් සක්‍රීය වේ. \${p.house} වැන්නේ ක්‍රියාකාරීත්වය හරහා ඔබගේ දෛවය හැඩගස්වයි.\`
        : \`Radiates planetary aspects (Drishti) across opposing and trinal houses, bringing energetic momentum to those areas. As a key planet, its energy interacts with the \${p.house}th house to shape personal destiny.\`,
      remedies: language === 'si'
        ? \`\${p.name} ග්‍රහයාට අදාළ මන්ත්‍ර ගායනා කිරීම, උදෑසන භාවනා කිරීම සහ එම ග්‍රහයාගේ යහපත් ගතිගුණ ජීවිතයට එකතු කරගැනීමෙන් අපල සමනය වේ.\`
        : \`Honor \${p.name} with focused morning contemplation, dedicated mantra repetition, and conscious expression of its positive traits.\`
    });
  };

  `;

code = code.substring(0, startIdx) + fixedDeepDives + code.substring(endIdx);
fs.writeFileSync('./src/app/charts/[id]/page.tsx', code);
console.log('Fixed Deep Dives Section successfully');

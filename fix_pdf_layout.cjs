const fs = require('fs');
let code = fs.readFileSync('./src/app/charts/[id]/page.tsx', 'utf8');

const targetHeader = `<div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-purple-950 flex items-center gap-2">`;
const newHeader = `<div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-purple-950 flex items-center gap-2">`;

code = code.replace(targetHeader, newHeader);

const targetDesc = `Vedic Kendare, planetary coordinates, and birth status dashboard."}
        </p>
      </div>`;
const newDesc = `Vedic Kendare, planetary coordinates, and birth status dashboard."}
          </p>
        </div>
        <Button 
          onClick={handleDownloadPdf} 
          disabled={isGeneratingPdf} 
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-md flex items-center shrink-0"
        >
          {isGeneratingPdf ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
          {language === 'si' ? "PDF ලෙස බාගන්න" : "Download PDF Book"}
        </Button>
      </div>`;

code = code.replace(targetDesc, newDesc);

// Also restore openDashaDeepDive just in case it is still damaged
const damagedDasha = `overview: language === 'si'

  const handlePlanetClick`;

const restoredDasha = `overview: language === 'si'
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

  const handlePlanetClick`;

code = code.replace(damagedDasha, restoredDasha);

fs.writeFileSync('./src/app/charts/[id]/page.tsx', code);
console.log('Script completed');

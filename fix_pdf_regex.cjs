const fs = require('fs');
let code = fs.readFileSync('./src/app/charts/[id]/page.tsx', 'utf8');

const regex = /<div className="mb-8">[\s\S]*?<\/div>/;
const newHeader = `<div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-purple-950 flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-purple-600" />
            {language === 'si' ? "ලග්න සහ රාශි කේන්ද්‍ර විස්තරය" : "Astrology Studio & Birth Chart"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === 'si' ? "ලග්න කේන්ද්‍රය, රාශි සටහන් සහ උපන් ග්‍රහ පිහිටීම් පිළිබඳ සම්පූර්ණ විස්තරය." : "Vedic Kendare, planetary coordinates, and birth status dashboard."}
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

code = code.replace(regex, newHeader);
fs.writeFileSync('./src/app/charts/[id]/page.tsx', code);
console.log('Fixed Header');

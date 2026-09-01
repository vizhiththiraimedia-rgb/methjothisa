const fs = require('fs');

let code = fs.readFileSync('./src/app/charts/[id]/page.tsx', 'utf8');

// Add imports
code = code.replace(
  'import { ChartRenderer } from "@/components/astrology/chart-renderer";',
  'import { ChartRenderer } from "@/components/astrology/chart-renderer";\nimport html2canvas from "html2canvas";\nimport jsPDF from "jspdf";\nimport { Download } from "lucide-react";'
);

// Add download state
code = code.replace(
  'const [activeDeepDive, setActiveDeepDive] = useState<any>(null);',
  'const [activeDeepDive, setActiveDeepDive] = useState<any>(null);\n  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);\n\n  const handleDownloadPdf = async () => {\n    setIsGeneratingPdf(true);\n    try {\n      const element = document.getElementById("pdf-content-area");\n      if (!element) return;\n      \n      const canvas = await html2canvas(element, {\n        scale: 2,\n        useCORS: true,\n        logging: false,\n      });\n      \n      const imgData = canvas.toDataURL("image/png");\n      const pdf = new jsPDF("p", "mm", "a4");\n      \n      const pdfWidth = pdf.internal.pageSize.getWidth();\n      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;\n      \n      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);\n      pdf.save(\MethJothisa_Horoscope_\.pdf\);\n    } catch (error) {\n      console.error("PDF generation failed", error);\n    } finally {\n      setIsGeneratingPdf(false);\n    }\n  };\n'
);

// Add id to main container
code = code.replace(
  '<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">',
  '<div id="pdf-content-area" className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start bg-white p-4 rounded-xl">'
);

// Add button to header
code = code.replace(
  '<div className="mb-8">\\n        <h1 className="text-3xl',
  '<div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">\\n        <div>\\n          <h1 className="text-3xl'
);
code = code.replace(
  'birth status dashboard."}\\n        </p>\\n      </div>',
  'birth status dashboard."}\\n          </p>\\n        </div>\\n        <Button \\n          onClick={handleDownloadPdf} \\n          disabled={isGeneratingPdf} \\n          variant="outline" \\n          className="border-purple-300 text-purple-700 hover:bg-purple-50 shadow-sm"\\n        >\\n          {isGeneratingPdf ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}\\n          {language === "si" ? "PDF ??? ??????" : "Download PDF Book"}\\n        </Button>\\n      </div>'
);

fs.writeFileSync('./src/app/charts/[id]/page.tsx', code);
console.log('PDF export added to chart page');

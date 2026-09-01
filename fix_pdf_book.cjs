const fs = require('fs');
let code = fs.readFileSync('src/app/charts/[id]/page.tsx', 'utf8');

// 1. Import PDFBookGenerator
code = code.replace(
  'import { ChartRenderer } from "@/components/astrology/chart-renderer";',
  'import { ChartRenderer } from "@/components/astrology/chart-renderer";\nimport { PDFBookGenerator } from "@/components/astrology/pdf-book-generator";'
);

// 2. Rewrite handleDownloadPdf
const oldHandleDownload = /const handleDownloadPdf = async \(\) => \{[\s\S]*?setIsGeneratingPdf\(false\);\n    \}\n  \};/;
const newHandleDownload = `const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      const pages = document.querySelectorAll('.pdf-page');
      if (!pages || pages.length === 0) return;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;
        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          logging: false,
          width: 800,
          height: 1131
        });
        
        const imgData = canvas.toDataURL('image/png');
        
        if (i > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      }
      
      pdf.save(\`MethJothisa_Horoscope_\${chartData?.birthDetails?.fullName?.replace(/\\s+/g, '_') || 'chart'}.pdf\`);
    } catch (error) {
      console.error('PDF generation failed', error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };`;

code = code.replace(oldHandleDownload, newHandleDownload);

// 3. Inject PDFBookGenerator at the end of the return statement
const oldReturn = /<\/Tabs>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\);\s*\}/;
const newReturn = `</Tabs>
          </div>
        </div>
      </div>

      {/* Hidden PDF Book Generator Container */}
      {chartData && <PDFBookGenerator chartData={chartData} language={language} />}

    </div>
  );
}`;
code = code.replace(oldReturn, newReturn);

fs.writeFileSync('src/app/charts/[id]/page.tsx', code);
console.log('Successfully updated page.tsx with multi-page PDF generation!');

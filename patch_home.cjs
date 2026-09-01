const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add states
content = content.replace(
  '  const [selectedSign, setSelectedSign] = useState(ZODIAC_SIGNS[0]);',
  `  const [selectedSign, setSelectedSign] = useState(ZODIAC_SIGNS[0]);
  const [astrologers, setAstrologers] = useState<any[]>([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");

  useEffect(() => {
    fetch("/api/astrologers?active=true")
      .then((res) => res.json())
      .then((result) => { if (result.success) setAstrologers(result.data); });
  }, []);

  const filteredAstrologers = astrologers.filter((a) => {
    const catMatch = !filterCategory || a.category === filterCategory;
    const langMatch = !filterLanguage || (a.languages || "").toLowerCase().includes(filterLanguage.toLowerCase());
    return catMatch && langMatch;
  });`
);

// Add useEffect import if missing
if (!content.includes('import { useState, useEffect }')) {
  content = content.replace('import { useState }', 'import { useState, useEffect }');
}

// Replace select tags
content = content.replace(
  /<select className="rounded-md border border-input bg-background px-3 py-2 text-sm">[\s\S]*?<option>Category<\/option>[\s\S]*?<\/select>/,
  `<select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Category</option>
                  <option value="Annual Chart">Annual Chart</option>
                  <option value="Birth Chart">Birth Chart</option>
                  <option value="Business">Business</option>
                  <option value="Career">Career</option>
                  <option value="Love Marriage">Love Marriage</option>
                  <option value="Health">Health</option>
                </select>`
);

content = content.replace(
  /<select className="rounded-md border border-input bg-background px-3 py-2 text-sm">[\s\S]*?<option>Language<\/option>[\s\S]*?<\/select>/,
  `<input
                  type="text"
                  placeholder="Filter by language..."
                  value={filterLanguage}
                  onChange={(e) => setFilterLanguage(e.target.value)}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />`
);

// Replace ASTROLOGERS.map
content = content.replace(
  /\{ASTROLOGERS\.map\(\(astrologer, i\) => \(/,
  `{filteredAstrologers.map((astrologer) => (`
);

content = content.replace(
  /key=\{i\}/g,
  `key={astrologer.id || astrologer.name}`
);

content = content.replace(
  /astrologer\.img/g,
  `astrologer.photo || "https://ca-img.s3.ap-south-1.amazonaws.com/ca/mvcimages/acharya_anand.png"`
);

content = content.replace(
  /astrologer\.exp/g,
  `astrologer.experience`
);

content = content.replace(
  /href=\{astrologer\.href\}/g,
  `href={\`/consult/\${astrologer.id}\`}`
);

fs.writeFileSync('src/app/page.tsx', content);

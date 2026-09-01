const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Add \`const [celebrities, setCelebrities] = useState<any[]>([]);\` to the states
content = content.replace(
  '  const [offers, setOffers] = useState<any[]>([]);',
  `  const [offers, setOffers] = useState<any[]>([]);
  const [celebrities, setCelebrities] = useState<any[]>([]);`
);

// 2. Fetch celebrities in the existing useEffect
content = content.replace(
  'fetch("/api/offers?active=true")',
  `fetch("/api/celebrities?active=true")
      .then((res) => res.json())
      .then((result) => { if (result.success) setCelebrities(result.data); });

    fetch("/api/offers?active=true")`
);

// 3. Update CELEBRITIES.map to celebrities.map
content = content.replace(
  /\{CELEBRITIES\.map\(\(celeb, i\) => \(/,
  `{celebrities.map((celeb, i) => (`
);

content = content.replace(
  /celeb\.img/g,
  `celeb.photo || ""`
);

fs.writeFileSync('src/app/page.tsx', content);

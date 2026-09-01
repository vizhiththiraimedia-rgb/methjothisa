const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Add `const [offers, setOffers] = useState<any[]>([]);` to the states
content = content.replace(
  '  const [filterLanguage, setFilterLanguage] = useState("");',
  `  const [filterLanguage, setFilterLanguage] = useState("");
  const [offers, setOffers] = useState<any[]>([]);`
);

// 2. Fetch offers in the existing useEffect
content = content.replace(
  'fetch("/api/astrologers?active=true")',
  `fetch("/api/offers?active=true")
      .then((res) => res.json())
      .then((result) => { if (result.success) setOffers(result.data); });

    fetch("/api/astrologers?active=true")`
);

// 3. Update OFFERS.map to offers.map
content = content.replace(
  /\{OFFERS\.map\(\(offer, i\) => \(/,
  `{offers.map((offer, i) => (`
);

// 4. Update offer.img to offer.image || offer.img
content = content.replace(
  /offer\.img/g,
  `offer.image || ""`
);

// 5. Update offer.price to offer.discountedPrice
content = content.replace(
  /\{offer\.price\}/g,
  `{offer.discountedPrice ? \`₹\${offer.discountedPrice}\` : \`₹\${offer.price}\`}`
);

content = content.replace(
  /\{offer\.originalPrice\}/g,
  `{offer.originalPrice ? (typeof offer.originalPrice === 'number' ? \`₹\${offer.originalPrice}\` : offer.originalPrice) : ""}`
);

// 6. Handle languages array mapping from string
content = content.replace(
  /\{offer\.languages\.slice\(0, 4\)\.map/g,
  `{((typeof offer.languages === "string" ? offer.languages.split(",") : offer.languages) || []).slice(0, 4).map`
);

content = content.replace(
  /offer\.languages\.length/g,
  `((typeof offer.languages === "string" ? offer.languages.split(",") : offer.languages) || []).length`
);

fs.writeFileSync('src/app/page.tsx', content);

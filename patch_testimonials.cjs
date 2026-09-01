const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Add \`const [testimonials, setTestimonials] = useState<any[]>([]);\` to the states
content = content.replace(
  '  const [celebrities, setCelebrities] = useState<any[]>([]);',
  `  const [celebrities, setCelebrities] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);`
);

// 2. Fetch testimonials in the existing useEffect
content = content.replace(
  'fetch("/api/celebrities?active=true")',
  `fetch("/api/testimonials?active=true")
      .then((res) => res.json())
      .then((result) => { if (result.success) setTestimonials(result.data); });

    fetch("/api/celebrities?active=true")`
);

// 3. Update TESTIMONIALS.map to testimonials.map
content = content.replace(
  /\{TESTIMONIALS\.map\(\(testimonial, i\) => \(/,
  `{testimonials.map((testimonial, i) => (`
);

content = content.replace(
  /testimonial\.img/g,
  `testimonial.photo || ""`
);

fs.writeFileSync('src/app/page.tsx', content);

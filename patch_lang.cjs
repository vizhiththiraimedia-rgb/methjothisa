const fs = require('fs');
let c = fs.readFileSync('src/components/providers/language-provider.tsx', 'utf8');

c = c.replace(
  'const [language, setLanguageState] = useState<SupportedLanguage>("en");',
  `const [language, setLanguageState] = useState<SupportedLanguage>("en");
  const [dbTranslations, setDbTranslations] = useState<any>({});
  
  useEffect(() => {
    fetch("/api/translations")
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data) {
          setDbTranslations(result.data);
        }
      })
      .catch(console.error);
  }, []);`
);

c = c.replace(
  'let text = translations[language]?.[key] || translations["en"]?.[key] || key;',
  `let text = dbTranslations[language]?.[key] || translations[language]?.[key] || dbTranslations["en"]?.[key] || translations["en"]?.[key] || key;`
);

fs.writeFileSync('src/components/providers/language-provider.tsx', c);

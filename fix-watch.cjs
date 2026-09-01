const fs = require('fs');
let content = fs.readFileSync('src/components/forms/birth-chart-form.tsx', 'utf8');

// Remove it from the top
content = content.replace('  const birthPlaceValue = watch("birthPlace");\n', '');
content = content.replace('  const birthPlaceValue = watch("birthPlace");\r\n', '');

// Add it after useForm
content = content.replace(
  '    },\n  });',
  '    },\n  });\n\n  const birthPlaceValue = watch("birthPlace");'
);
content = content.replace(
  '    },\r\n  });',
  '    },\r\n  });\r\n\r\n  const birthPlaceValue = watch("birthPlace");'
);

fs.writeFileSync('src/components/forms/birth-chart-form.tsx', content);
console.log('Fixed watch initialization');

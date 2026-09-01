const fs = require('fs');
let content = fs.readFileSync('src/components/forms/birth-chart-form.tsx', 'utf8');

const useFormCodeMatch = content.match(/const \{ register, handleSubmit, setValue, watch, formState: \{ errors \} \} = useForm<BirthChartFormData>\(\{[\s\S]*?\}\);\r?\n\r?\n\s*const birthPlaceValue = watch\("birthPlace"\);/);

if (useFormCodeMatch) {
  const useFormCode = useFormCodeMatch[0];
  
  // Remove from current position
  content = content.replace(useFormCode, '');
  
  // Insert after refs/state
  const insertPoint = 'const dropdownRef = useRef<HTMLDivElement>(null);';
  content = content.replace(insertPoint, insertPoint + '\n\n  ' + useFormCode + '\n\n');
  
  fs.writeFileSync('src/components/forms/birth-chart-form.tsx', content);
  console.log('Fixed useForm order');
} else {
  console.log('Match not found');
}

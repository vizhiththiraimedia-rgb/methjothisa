const fs = require('fs');
let content = fs.readFileSync('src/components/forms/birth-chart-form.tsx', 'utf8');

if (!content.includes('useEffect')) {
  content = content.replace('import { useState } from "react";', 'import { useState, useEffect, useRef } from "react";');
}

const stateCode = `
  const [locations, setLocations] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const birthPlaceValue = watch("birthPlace");
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      if (!birthPlaceValue || birthPlaceValue.length < 2) {
        setLocations([]);
        return;
      }
      try {
        const res = await fetch(\`https://geocoding-api.open-meteo.com/v1/search?name=\${encodeURIComponent(birthPlaceValue)}&count=5&language=en&format=json\`);
        const data = await res.json();
        if (data.results) {
          setLocations(data.results);
          setShowDropdown(true);
        }
      } catch (e) {
        console.error(e);
      }
    };
    const timer = setTimeout(fetchLocations, 400);
    return () => clearTimeout(timer);
  }, [birthPlaceValue]);

  const handleSelectLocation = (loc: any) => {
    setValue("birthPlace", loc.name + (loc.admin1 ? ", " + loc.admin1 : ""));
    setValue("latitude", parseFloat(loc.latitude.toFixed(4)));
    setValue("longitude", parseFloat(loc.longitude.toFixed(4)));
    if (loc.timezone) setValue("timezone", loc.timezone);
    if (loc.country) setValue("country", loc.country);
    setShowDropdown(false);
  };
`;

content = content.replace('const [isLoading, setIsLoading] = useState(false);', 'const [isLoading, setIsLoading] = useState(false);\n' + stateCode);

content = content.replace('const { register, handleSubmit, formState: { errors } } = useForm<BirthChartFormData>({', 'const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<BirthChartFormData>({');

const inputReplacement = `
        <div className="relative" ref={dropdownRef}>
          <Input 
            label={language === "si" ? "උපන් ස්ථානය" : "Birth Place"} 
            {...register("birthPlace")} 
            error={errors.birthPlace?.message} 
            required 
            autoComplete="off"
            onFocus={() => { if(locations.length > 0) setShowDropdown(true); }}
          />
          {showDropdown && locations.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
              {locations.map((loc, i) => (
                <div 
                  key={i} 
                  className="px-4 py-2 hover:bg-muted cursor-pointer text-sm"
                  onClick={() => handleSelectLocation(loc)}
                >
                  <div className="font-medium">{loc.name}</div>
                  <div className="text-xs text-muted-foreground">{loc.admin1 ? loc.admin1 + ', ' : ''}{loc.country}</div>
                </div>
              ))}
            </div>
          )}
        </div>
`;

content = content.replace(/<Input label=\{language === "si" \? "උපන් ස්ථානය" : "Birth Place"\} \{\.\.\.register\("birthPlace"\)\} error=\{errors\.birthPlace\?\.message\} required \/>/, inputReplacement);

fs.writeFileSync('src/components/forms/birth-chart-form.tsx', content);
console.log('Done replacing autocomplete');

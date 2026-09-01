const fs = require('fs');
const path = require('path');

const template = fs.readFileSync(path.join(__dirname, 'src/app/daily-horoscope/page.tsx'), 'utf8');

const pages = [
  {
    dir: 'weekly-horoscope',
    component: 'WeeklyHoroscopePage',
    enTitle: 'Weekly Horoscope',
    siTitle: 'සතිපතා පලාඵල',
    enDesc: 'Your personalized weekly astrological insights and predictions.',
    siDesc: 'ඔබගේ ලග්නයට අනුව මේ සතියේ ග්‍රහ බලපෑම් නිවැරදිව දැනගන්න.'
  },
  {
    dir: 'monthly-horoscope',
    component: 'MonthlyHoroscopePage',
    enTitle: 'Monthly Horoscope',
    siTitle: 'මාසික පලාඵල',
    enDesc: 'Your personalized monthly astrological insights and predictions.',
    siDesc: 'ඔබගේ ලග්නයට අනුව මේ මාසයේ ග්‍රහ බලපෑම් නිවැරදිව දැනගන්න.'
  },
  {
    dir: 'yearly-horoscope',
    component: 'YearlyHoroscopePage',
    enTitle: 'Yearly Horoscope',
    siTitle: 'වාර්ෂික පලාඵල',
    enDesc: 'Your personalized yearly astrological insights and predictions.',
    siDesc: 'ඔබගේ ලග්නයට අනුව මේ වසරේ ග්‍රහ බලපෑම් නිවැරදිව දැනගන්න.'
  },
  {
    dir: 'career-horoscope',
    component: 'CareerHoroscopePage',
    enTitle: 'Career Horoscope',
    siTitle: 'රැකියා පලාඵල',
    enDesc: 'Astrological insights for your professional life and career growth.',
    siDesc: 'ඔබගේ රැකියාව සහ වෘත්තීය ජීවිතය පිළිබඳ ජ්‍යෝතිෂ අනාවැකි.'
  },
  {
    dir: 'wealth-horoscope',
    component: 'WealthHoroscopePage',
    enTitle: 'Wealth Horoscope',
    siTitle: 'ධන පලාඵල',
    enDesc: 'Astrological insights for your financial prosperity and wealth.',
    siDesc: 'ඔබගේ ආර්ථික තත්ත්වය සහ ධනය පිළිබඳ ජ්‍යෝතිෂ අනාවැකි.'
  },
  {
    dir: 'health-horoscope',
    component: 'HealthHoroscopePage',
    enTitle: 'Health Horoscope',
    siTitle: 'සෞඛ්‍ය පලාඵල',
    enDesc: 'Astrological insights for your physical and mental well-being.',
    siDesc: 'ඔබගේ සෞඛ්‍ය තත්ත්වය සහ මානසික සුවය පිළිබඳ ජ්‍යෝතිෂ අනාවැකි.'
  }
];

pages.forEach(p => {
  let content = template;
  
  content = content.replace(/export default function DailyHoroscopePage\(\) \{/, "export default function " + p.component + "() {");
  
  content = content.replace(/"Daily Horoscope"/g, '"' + p.enTitle + '"');
  content = content.replace(/"දෛනික පලාඵල"/g, '"' + p.siTitle + '"');
  
  content = content.replace(/"Your personalized daily astrological insights and predictions."/g, '"' + p.enDesc + '"');
  content = content.replace(/"ඔබගේ ලග්නයට අනුව අද දවසේ ග්‍රහ බලපෑම් නිවැරදිව දැනගන්න. දෛනික ජීවිතයේ තීරණ ගැනීමට සහ සාර්ථකත්වයට මෙය මඟ පෙන්වයි."/g, '"' + p.siDesc + '"');
  
  content = content.replace(/"Choose your zodiac sign to read today's horoscope"/g, '"Choose your zodiac sign to read your ' + p.enTitle.toLowerCase() + '"');
  content = content.replace(/"අද දවසේ පලාඵල කියවීම සඳහා කරුණාකර ඔබගේ ලග්නය තෝරන්න"/g, '"පලාඵල කියවීම සඳහා කරුණාකර ඔබගේ ලග්නය තෝරන්න"');
  
  const destPath = path.join(__dirname, 'src/app', p.dir, 'page.tsx');
  if (!fs.existsSync(path.dirname(destPath))) {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
  }
  fs.writeFileSync(destPath, content, 'utf8');
  console.log("Updated " + p.dir);
});

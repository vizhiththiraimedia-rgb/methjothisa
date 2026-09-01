const { execSync } = require('child_process');

const scripts = [
  'restore_perfect.cjs',
  'fix_base.cjs', // Creates the base with ChartRenderer already hooked up
  'update_planets.cjs', // Adds Planets, Varga, Maitri empty tabs but Planets table is full
  'add_predictions.cjs', // Basic, Analysis, Dasa
  'add_nakshatra_tab.cjs',
  'add_nakshatra_details.cjs',
  'add_mangal_tab.cjs',
  'add_transit_tab.cjs',
  'add_sade_sati.cjs',
  'add_ashtakavarga.cjs',
  'add_shadbala.cjs',
  'add_sudarshana.cjs'
];

for (const script of scripts) {
  console.log(`Running ${script}...`);
  execSync(`node ${script}`, { stdio: 'inherit' });
}
console.log("Done.");

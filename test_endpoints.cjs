require('dotenv').config({ path: '.env.local' });
const axios = require('axios');

async function testAPI() {
  try {
    const tokenRes = await axios.post('https://api.prokerala.com/token', 
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.PROKERALA_CLIENT_ID,
        client_secret: process.env.PROKERALA_CLIENT_SECRET
      }).toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    const token = tokenRes.data.access_token;
    const headers = { 'Authorization': `Bearer ${token}` };
    const params = { datetime: '1985-01-08T17:00:00Z', coordinates: '6.9271,79.8612', ayanamsa: 1 };

    const panchang = await axios.get('https://api.prokerala.com/v2/astrology/panchang', { headers, params }).catch(e => e.response.data);
    console.log("Panchang:", panchang.data ? "OK" : panchang);

    const mangal = await axios.get('https://api.prokerala.com/v2/astrology/mangal-dosha', { headers, params }).catch(e => e.response.data);
    console.log("Mangal:", mangal.data ? "OK" : mangal);

    const dasha = await axios.get('https://api.prokerala.com/v2/astrology/vimshottari-dasha', { headers, params }).catch(e => e.response.data);
    console.log("Dasha:", dasha.data ? "OK" : dasha);

  } catch(e) {
    console.error(e);
  }
}
testAPI();

const fs = require('fs');

// Update auth.ts
let authContent = fs.readFileSync('src/lib/auth.ts', 'utf8');
authContent = authContent.replace('const JWT_EXPIRES_IN = "15m";', 'const JWT_EXPIRES_IN = "7d";');
fs.writeFileSync('src/lib/auth.ts', authContent);

// Update login route
let loginContent = fs.readFileSync('src/app/api/auth/login/route.ts', 'utf8');
loginContent = loginContent.replace('maxAge: 15 * 60', 'maxAge: 7 * 24 * 60 * 60');
fs.writeFileSync('src/app/api/auth/login/route.ts', loginContent);

// Update signup route
let signupContent = fs.readFileSync('src/app/api/auth/signup/route.ts', 'utf8');
if(signupContent.includes('maxAge: 15 * 60')) {
  signupContent = signupContent.replace('maxAge: 15 * 60', 'maxAge: 7 * 24 * 60 * 60');
  fs.writeFileSync('src/app/api/auth/signup/route.ts', signupContent);
}

console.log('Fixed token expiration');

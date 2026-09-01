const fs = require('fs');
let content = fs.readFileSync('src/lib/auth.ts', 'utf8');

content = content.replace(
  '  const authHeader = req.headers.get("authorization");\n  if (!authHeader?.startsWith("Bearer ")) return null;\n\n  const token = authHeader.split(" ")[1];',
  '  const authHeader = req.headers.get("authorization");\n  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : req.cookies.get("access_token")?.value;\n  if (!token) return null;'
);
content = content.replace(
  '  const authHeader = req.headers.get("authorization");\r\n  if (!authHeader?.startsWith("Bearer ")) return null;\r\n\r\n  const token = authHeader.split(" ")[1];',
  '  const authHeader = req.headers.get("authorization");\r\n  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : req.cookies.get("access_token")?.value;\r\n  if (!token) return null;'
);

fs.writeFileSync('src/lib/auth.ts', content);
console.log('Fixed getCurrentUser');

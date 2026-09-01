const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let content = fs.readFileSync(schemaPath, 'utf8');

// Remove @db.Text
content = content.replace(/@db\.Text/g, '');

// Convert enum fields to String with defaults
const enumDefaults = {
  'Role': 'USER',
  'Theme': 'SYSTEM',
  'Gender': 'OTHER',
  'Ayanamsa': 'LAHIRI',
  'ChartSystem': 'SOUTH_INDIAN',
  'ChartType': 'RASI',
  'ReportType': 'PERSONALITY',
  'ReportMode': 'SIMPLE',
  'Plan': 'FREE',
  'SubscriptionStatus': 'ACTIVE',
  'PaymentStatus': 'PENDING',
  'PaymentGateway': 'STRIPE',
  'NotificationType': 'SYSTEM',
  'FavoriteType': 'CHART',
  'PostStatus': 'DRAFT',
  'CouponType': 'PERCENTAGE'
};

// Replace enum type usages with String + @default
Object.entries(enumDefaults).forEach(([enumName, defaultValue]) => {
  const regex = new RegExp(`(\\w+)\\s+${enumName}(\\??)`, 'g');
  content = content.replace(regex, (match, fieldName, optional) => {
    if (optional === '?') {
      return `${fieldName} String?`;
    }
    return `${fieldName} String @default("${defaultValue}")`;
  });
});

// Remove enum declarations
const enumRegex = /enum\s+\w+\s*\{[^}]+\}/g;
content = content.replace(enumRegex, '');

fs.writeFileSync(schemaPath, content);
console.log('Schema converted to SQLite-compatible format');

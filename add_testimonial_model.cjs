const fs = require('fs');
let c = fs.readFileSync('prisma/schema.prisma', 'utf8');

const model = `
model Testimonial {
  id          String   @id @default(cuid())
  name        String
  text        String
  photo       String?
  isActive    Boolean  @default(true)
  sortOrder   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("testimonials")
}
`;

c += model;
fs.writeFileSync('prisma/schema.prisma', c);

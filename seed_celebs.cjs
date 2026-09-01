const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CELEBRITIES = [
  { name: "Kamala Harris", photo: "https://ca-resources.s3.ap-south-1.amazonaws.com/logs/celebrity/celebrity_1136_Kamala-Harris-Astrology.jpg", href: "/celebrity/kamala-harris", slug: "kamala" },
  { name: "Donald Trump", photo: "https://ca-resources.s3.ap-south-1.amazonaws.com/logs/celebrity/celebrity_1128_Donald-Trump-2-1.jpg", href: "/celebrity/donald-trump", slug: "trump" },
  { name: "Anant Ambani", photo: "https://ca-resources.s3.ap-south-1.amazonaws.com/logs/celebrity/celebrity_1098_Anant-Ambani.jpg", href: "/celebrity/anant-ambani", slug: "anant" },
  { name: "Kylian Mbappe", photo: "https://ca-resources.s3.ap-south-1.amazonaws.com/logs/celebrity/celebrity_1037_Kylian-Mbappe-Astrology.jpg", href: "/celebrity/kylian-mbappe", slug: "mbappe" },
  { name: "Virat Kohli", photo: "https://ca-img.s3.ap-south-1.amazonaws.com/ca/mvcimages/virat-kohli.png", href: "/celebrity/virat-kohli", slug: "virat" },
  { name: "Priyanka Chopra", photo: "https://ca-img.s3.ap-south-1.amazonaws.com/ca/mvcimages/priyanka-chopra.png", href: "/celebrity/priyanka-chopra", slug: "priyanka" },
];

async function main() {
  for (const celeb of CELEBRITIES) {
    await prisma.celebrity.create({
      data: celeb
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());

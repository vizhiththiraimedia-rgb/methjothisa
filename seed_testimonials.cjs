const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const TESTIMONIALS = [
  {
    name: "Sri. Kanippayyur Narayanan Namboodiripad",
    text: "Astro-Vision Futuretech is the number one company providing astrological reports, which are very accurate. They are doing a great job by serving the people.",
    photo: "https://ca-img.s3.ap-south-1.amazonaws.com/ca/mvcimages/ca-desktop/kanippayyur.jpg",
  },
  {
    name: "Sri. M V Naranarayanan",
    text: "I have been using Astro-Vision mobile application for the past two years. It is very simple, useful and accurate. So, except Astro-Vision software, I am not using any other applications.",
    photo: "https://ca-img.s3.ap-south-1.amazonaws.com/ca/mvcimages/ca-desktop/m_v_naranarayanan.jpg",
  },
  {
    name: "Dr.C.V.B. Subrahmanyam",
    text: "In older days, without checking panchangam, people didn't even stepped out of their homes. But in today's world, Astro-Vision has come up with an application which gives you information about Rasi, Navamsham, Bhava etc.. which is really appreciative.",
    photo: "https://ca-img.s3.ap-south-1.amazonaws.com/ca/mvcimages/ca-desktop/subrahmanyam.jpg",
  },
  {
    name: "Smt. Gayatri Devi Vasudev",
    text: "The digital avatars of Jyotisha powered by Astro-Vision have spread awareness and are ideal to today's fast paced life.",
    photo: "https://ca-img.s3.ap-south-1.amazonaws.com/ca/mvcimages/ca-desktop/gayatri_devi_vasudev.jpg",
  }
];

async function main() {
  for (const t of TESTIMONIALS) {
    await prisma.testimonial.create({
      data: t
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());

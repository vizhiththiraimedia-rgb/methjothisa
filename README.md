# Methjothisa - Universal Astro Intelligence Platform

The Complete Global Astrology Intelligence Platform with AI-powered insights, mathematically accurate Swiss Ephemeris calculations, and multi-language support.

## Features

- **Accurate Birth Charts** - Swiss Ephemeris powered calculations
- **Multiple Ayanamsa Systems** - Lahiri, Raman, KP, True Chitrapaksha, Western Tropical, Sidereal
- **Vedic & Western Astrology** - Complete Vedic charting and Western natal analysis
- **AI-Powered Reports** - GPT-4, Claude, Gemini integration
- **20+ Languages** - Full i18n support
- **Multi-Platform** - Web, Android, iOS, Desktop
- **Enterprise Security** - JWT, OAuth, 2FA, GDPR compliant
- **PDF Export** - Share and download charts
- **Admin Panel** - Complete CMS and analytics

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Cache**: Redis
- **Auth**: JWT with refresh tokens
- **Astrology**: Swiss Ephemeris integration

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 16+
- Redis (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd methjothisa
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your database credentials and API keys.

5. Run database migrations:
```bash
npx prisma migrate dev
npx prisma db seed
```

6. Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   ├── forms/             # Form components
│   ├── layout/            # Navbar, Footer
│   ├── providers/         # Context providers
│   └── ui/                # ShadCN UI components
├── lib/                   # Utilities, auth, prisma
├── services/              # Business logic, astrology engine
├── styles/                # Global CSS
├── types/                 # TypeScript types
└── utils/                 # Helper functions
prisma/
└── schema.prisma          # Database schema
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run typecheck` - TypeScript check
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run migrations
- `npm run db:seed` - Seed database
- `npm run test` - Run tests

## Deployment

### Docker

```bash
docker-compose up -d
```

### Environment Variables

See `.env.example` for all required variables.

## License

Proprietary - All rights reserved

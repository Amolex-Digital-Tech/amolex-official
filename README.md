# Amolex Website

A modern digital agency website built with Next.js, featuring client dashboards, admin management, and Telegram bot integration.

## Features

- **Marketing Website**: Services, portfolio, blog, about, contact pages
- **Client Dashboard**: Analytics, calendar, posts, reports, social media management
- **Admin Dashboard**: Client management, team management, testimonials
- **Telegram Integration**: Send messages to clients via Telegram bot
- **Supabase Backend**: Database, authentication, and real-time features

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Telegram Bot (via @BotFather)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Amolex-Digital-Tech/amolex-official.git
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
SUPABASE_JWT_SECRET=your_jwt_secret
DATABASE_URL=your_database_url
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_string
ADMIN_EMAIL=admin@amolex.tech
ADMIN_PASSWORD=your_password
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Telegram Setup

1. Create a bot via [@BotFather](https://t.me/BotFather) on Telegram
2. Get your bot token
3. Add the token to your environment variables
4. After deploying to Vercel, set the webhook:
   ```
   https://api.telegram.org/bot<YOUR_TOKEN>/setWebhook?url=https://your-vercel-app.com/api/telegram
   ```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: NextAuth.js
- **Deployment**: Vercel

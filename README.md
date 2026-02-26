# AutoFlow — Mechanic Workshop Management Web App

Next.js App Router prototype designed for glove-friendly workflows.

## Stack
- Next.js + TypeScript + Tailwind CSS
- Prisma schema (SQLite local dev, easy swap to Neon/Supabase on Vercel)
- dnd-kit for drag-and-drop in Garage dashboard

## Features implemented
- Garage dashboard with split layout (Agenda + Kanban board).
- Drag appointments into active workshop lanes.
- Vehicle lookup by plate with manual trigger and mock external API fallback.
- Visual identity picker (6 blueprint shapes + color selector).
- Vehicle profile with timeline + smart Tagliando warning + 3-step mega-form.
- Ufficio route with all unbilled jobs and one-click billing action.
- Prisma relational schema for Clients, Vehicles, Jobs, Appointments.
- Seed script with 5 vehicles and 10 jobs.

## Quickstart
```bash
cp .env.example .env
npm install
npm run db:push
npm run db:seed
npm run dev
```

## Vercel prep
- Set `DATABASE_URL` to Neon/Supabase connection string in Vercel env.
- Run migration/push on deploy using Prisma commands.

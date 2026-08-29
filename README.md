# Finly — AI-Powered Financial Management Platform

Finly is an intelligent, full-stack personal finance and expense tracking platform. It automates receipt extraction through Google Gemini AI, monitors multi-account liquidity, provides real-time budget tracking, visualizes transaction analytics, and executes automated financial reporting via scheduled background workflows.

## Key Features

- **Receipt Scanning:** Upload images of receipts or invoices. Google Gemini AI automatically extracts transaction type, total amount, category, date, and description to autofill records instantly.

- **Multi-Account Management:** Create, track, and manage multiple accounts (Personal, Savings, Investment, Business) with real-time balance calculations.

- **Smart Budget Thresholds:** Set monthly budget thresholds, visualize expenses against predefined limits with interactive progress bars, and receive proactive budget warnings.

- **Transaction Analytics & Visualization:** Interactive charts and breakdown tables displaying expense patterns, income flows, and category distributions.

- **Automated Background Workflows:** Powered by Inngest for running monthly summary emails, recurrent transaction triggers, and budget balance updates without blocking the UI.

- **Security & Authentication:** Protected route middleware, Clerk-based user authentication, and Arcjet rate-limiting/security shield integration.

- **Responsive Dark/Light UI:** Accessible interface designed with Tailwind CSS, Radix UI primitives, and `next-themes`.

## Tech Stack

| Domain | Technology / Library |
|---|---|
| **Framework** | Next.js (App Router, Server Actions) |
| **Language** | JavaScript (ES6+ / React) |
| **Styling & UI** | Tailwind CSS, Radix UI Primitives, Lucide Icons, Sonner Notifications |
| **Database & ORM** | PostgreSQL (Neon Serverless Postgres), Prisma ORM |
| **Authentication** | Clerk |
| **AI Intelligence** | Google Gemini Flash API (`@google/genai` / `@google/generative-ai`) |
| **Background Workflows** | Inngest |
| **Email Service** | React Email / Resend |
| **Security Shield** | Arcjet (Bot detection & rate limiting) |

## Project Structure

```text
Finly/
├── actions/                 # Next.js Server Actions (CRUD, accounts, budget, transactions)
│
├── app/
│   ├── (auth)/              # Clerk authentication routes (sign-in, sign-up)
│   │
│   ├── (main)/
│   │   ├── account/         # Account detail views and transaction records
│   │   ├── dashboard/       # Dashboard metrics, account cards, and budget indicators
│   │   └── transaction/     # Transaction creation and AI receipt scanner
│   │
│   ├── api/
│   │   └── inngest/         # Inngest webhook route for background pipelines
│   │
│   ├── components/          # Reusable UI components (header, footer, drawer modals)
│   ├── data/                # Static data (categories, guidelines)
│   ├── emails/              # Transactional email templates
│   ├── lib/                 # Client instances and utility helpers
│   │
│   └── prisma/
│       └── schema.prisma    # Database models (User, Account, Transaction, Budget)
```

## Getting Started

### Prerequisites

- Node.js 18.18.0 or higher
- npm, pnpm, or yarn
- A Neon PostgreSQL instance
- A Clerk account
- A Google AI Studio API Key
- An Inngest account

### Step-by-Step Installation

#### 1. Clone the repository

```bash
git clone https://github.com/HimJaiss/Finly.git
cd Finly
```

#### 2. Install project dependencies

```bash
npm install
```

#### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://<user>:<password>@<host>/<database>?sslmode=require"
DIRECT_URL="postgresql://<user>:<password>@<host>/<database>?sslmode=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"

# Google Gemini AI
GEMINI_API_KEY="AIzaSy..."

# Inngest Workflow Queue
INNGEST_EVENT_KEY="your-inngest-event-key"
INNGEST_SIGNING_KEY="your-inngest-signing-key"

# Resend Email Integration
RESEND_API_KEY="re_..."

# Arcjet Security & Rate Limiting
ARCJET_KEY="ajkey_..."
```

#### 4. Sync Prisma Database Schema

```bash
npx prisma generate
npx prisma db push
```

#### 5. Start the Development Server

```bash
npm run dev
```

#### 6. Start Inngest Dev Server (Optional, for local background jobs)

```bash
npx inngest-cli@latest dev
```

Visit `http://localhost:3000` to view the application.

## AI Receipt Extraction Workflow

```text
[ Receipt Image ]
        |
        ↓
[ Gemini Flash Vision API ] → Extracts: Total, Date, Category, Merchant
        |
        ↓
[ Autofilled Transaction Form ] → User Reviews & Confirms
        |
        ↓
[ Neon Database via Prisma ] → Updates Account Balance & Category Budgets
```

## License

Copyright © 2026 Finly Inc. All rights reserved.

# L{CORE} Console

Internal management dashboard for City Chain operations.

Built by [Locale Network](https://github.com/Locale-Network).

## Overview

L{CORE} Console is the operational dashboard for managing and monitoring City Chain infrastructure. It provides interfaces for attestation management, operator monitoring, and system administration.

## Features

- **Attestation Explorer** - Browse and search verified attestations
- **Operator Dashboard** - Monitor operator status and performance
- **Task Management** - View and manage attestation tasks
- **Analytics** - System metrics and usage analytics
- **Admin Controls** - Configuration and access management

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS + shadcn/ui
- **Auth**: Privy
- **State**: Zustand + React Query
- **Database**: Supabase

## Development

### Prerequisites

- Node.js 20+
- pnpm

### Setup

```bash
# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env.local

# Configure environment variables
# - NEXT_PUBLIC_PRIVY_APP_ID
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY

# Start development server
pnpm dev
```

The app will be available at `http://localhost:3001`.

### Build

```bash
# Production build
pnpm build

# Start production server
pnpm start
```

## Project Structure

```text
console-platform/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── ...           # Feature components
│   ├── lib/              # Utilities and helpers
│   ├── hooks/            # Custom React hooks
│   └── stores/           # Zustand stores
├── public/               # Static assets
└── ...config files
```

## Environment Variables

| Variable                        | Description                 |
|---------------------------------|-----------------------------|
| `NEXT_PUBLIC_PRIVY_APP_ID`      | Privy application ID        |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL        |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key      |
| `NEXT_PUBLIC_CHAIN_ID`          | Target chain ID             |
| `NEXT_PUBLIC_ATTESTOR_RPC`      | Attestor WebSocket endpoint |

## Related Projects

| Repository                                                          | Description              |
|---------------------------------------------------------------------|--------------------------|
| [locale-city-chain](https://github.com/Locale-Network/locale-city-chain) | City Chain infrastructure |
| [lcore-sdk](https://github.com/Modern-Society-Labs/lcore-sdk)       | Core SDK                 |

## Internal Use Only

This repository is for Locale Network internal use. For public documentation, see [City Chain](https://github.com/Locale-Network/locale-city-chain).

## License

Proprietary - Locale Network

# Superteam Academy

Superteam Brazil is building the ultimate learning platform for Solana-native developers -- an open-source, interactive education hub that takes builders from zero to deploying production-ready dApps.

Think "Codecademy meets Cyfrin Updraft" for Solana: gamified progression, interactive coding challenges, on-chain credentials, and a community-driven learning experience built for crypto natives.

## Overview
This platform is a production-ready learning management system (LMS) for Solana development. Features include:
- Interactive, project-based courses with integrated code editing.
- Gamification with XP, streaks, and achievements.
- On-chain credentials (soulbound Metaplex Core NFTs) for course completions.
- Internationalization support (Portuguese, Spanish, English).
- Fully open-source and forkable by other communities.

## Tech Stack
- **Frontend Framework**: React + Next.js 16+ (App Router)
- **Language**: strict TypeScript
- **Styling**: Tailwind CSS, PostCSS, Shadcn UI, Framer Motion
- **Headless CMS**: Sanity CMS
- **Database**: PostgreSQL with Drizzle ORM
- **Auth**: Better Auth, Solana Wallet Adapter
- **Blockchain**: Solana Web3.js, Anchor Framework, Metaplex Core
- **Analytics**: PostHog, Google Analytics
- **Error Tracking**: Sentry

## On-Chain Gamification System
The platform's logic connects to an Anchor program at [github.com/solanabr/superteam-academy](https://github.com/solanabr/superteam-academy).
- **XP**: A soulbound fungible token (Token-2022). Level = floor(sqrt(xp / 100)).
- **Credentials**: Metaplex Core NFTs, soulbound via PermanentFreezeDelegate. They upgrade as the learner progresses.
- **Achievements**: Represented on-chain through `AchievementType` and `AchievementReceipt` PDAs, backing soulbound Metaplex Core NFTs.
- **Streaks**: A frontend-managed daily activity tracker.

## Setup Instructions

### Prerequisites
- Node.js (v20+)
- [Bun](https://bun.sh/)
- Rust & Cargo
- Solana CLI
- Anchor CLI

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/exyreams/superteam-academy.git
   cd superteam-academy
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Configure Environment Variables**
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   *Note: You must properly configure `BACKEND_SIGNER_KEYPAIR` and `XP_MINT_KEYPAIR` to interact with the on-chain features alongside your PostgreSQL `DATABASE_URL`.*

4. **Initialize Database Schema**
   Push the schema to your database.
   ```bash
   bun run db:push
   ```

5. **Start the Development Server**
   ```bash
   bun run dev
   ```
   Open `http://localhost:3000` with your browser to see the result.

## Development Scripts
- `bun run check`: Check code formatting and linting (Biome).
- `bun run typecheck`: Run strict TypeScript checks.
- `bun run format`: Auto-format codebase.
- `bun run lint:fix`: Fix linting errors.

## Repositories & Contacts
- **Repository URL**: [https://github.com/exyreams/superteam-academy](https://github.com/exyreams/superteam-academy)
- **Contact Email**: [exyreams@gmail.com](mailto:exyreams@gmail.com)
- **Twitter**: [@SuperteamBR](https://twitter.com/SuperteamBR)
- **Discord**: [discord.gg/superteambrasil](https://discord.gg/superteambrasil)

## Contributing & Security
Feel free to read through our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

If you discover a security vulnerability, please refer to our [Security Policy](SECURITY.md) and email us at exyreams@gmail.com.

## License
This project is distributed under the MIT License. See `LICENSE` for more information.

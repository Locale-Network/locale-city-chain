# Locale City Chain

Production implementation of the L{CORE} SDK for Locale Network's decentralized city data infrastructure.

Built on [lcore-sdk](https://github.com/Modern-Society-Labs/lcore-sdk) by [Modern Society Labs](https://github.com/Modern-Society-Labs).

## Overview

Locale City Chain enables cities and municipalities to:
- **Verify off-chain data** from trusted sources via TEE attestation
- **Store attestations** in a deterministic, auditable rollup
- **Control access** to sensitive data with granular permissions
- **Define schemas** for standardized data providers

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Locale City Chain                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────┐    ┌─────────────────────────────┐ │
│  │      Attestor       │    │      City Chain Rollup      │ │
│  │                     │    │                             │ │
│  │  - TLS Verification │    │  - Attestation Storage      │ │
│  │  - ZK Proofs        │───▶│  - Access Control           │ │
│  │  - TEE Signing      │    │  - Provider Schemas         │ │
│  │                     │    │  - Data Discovery           │ │
│  └─────────────────────┘    └─────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

```
locale-city-chain/
├── attestor/                 # Attestation infrastructure
│   ├── src/
│   │   ├── server/           # Attestor server
│   │   ├── providers/        # Data providers
│   │   └── utils/            # Utilities
│   └── package.json
├── cartesi/                  # City Chain rollup
│   ├── src/
│   │   ├── lcore-main.ts     # City Chain entry point
│   │   ├── lcore-db.ts       # Attestation schema
│   │   ├── handlers/
│   │   │   ├── lcore-attestation.ts  # Attestation CRUD
│   │   │   ├── lcore-access.ts       # Access control
│   │   │   ├── lcore-schema.ts       # Provider schemas
│   │   │   └── lcore-discovery.ts    # Data discovery
│   │   └── utils/
│   └── package.json
├── docs/                     # Public documentation
└── README.md
```

## City Chain Features

### Attestation Management

Store and retrieve verified attestations:

```typescript
// Create attestation
POST /attestation/create
{
  "bucket_id": "utility-bills",
  "provider_hash": "0x...",
  "data": { ... },
  "signature": "0x..."
}

// Query attestations
POST /attestation/query
{
  "bucket_id": "utility-bills",
  "filters": { "provider": "electric-company" }
}
```

### Access Control

Granular permissions for data access:

```typescript
// Grant access
POST /access/grant
{
  "bucket_id": "utility-bills",
  "grantee": "0x...",
  "permissions": ["read", "query"]
}

// Revoke access
POST /access/revoke
{
  "grant_id": "..."
}
```

### Provider Schemas

Define standardized data formats:

```typescript
// Register schema
POST /schema/register
{
  "provider_hash": "0x...",
  "schema": {
    "type": "object",
    "properties": { ... }
  }
}
```

### Data Discovery

Aggregate statistics and search:

```typescript
// Get bucket stats
POST /discovery/stats
{
  "bucket_id": "utility-bills"
}

// Search attestations
POST /discovery/search
{
  "query": "electric",
  "filters": { ... }
}
```

## Database Schema

### Core Tables

| Table | Purpose |
|-------|---------|
| `attestations` | Verified data attestations |
| `attestation_buckets` | Logical groupings of attestations |
| `attestation_data` | Attestation payload storage |
| `access_grants` | Permission management |
| `provider_schemas` | Data format definitions |
| `schema_admins` | Schema management permissions |

## Quick Start

### Prerequisites

- Node.js 18+
- Docker (for Cartesi)
- Foundry (optional, for contract development)

### Installation

```bash
# Clone the repository
git clone https://github.com/Locale-Network/locale-city-chain.git
cd locale-city-chain

# Install attestor dependencies
cd attestor && npm install

# Install cartesi dependencies
cd ../cartesi && npm install
```

### Configuration

```bash
# Attestor configuration
cp attestor/.env.example attestor/.env
# Edit with your configuration

# Cartesi configuration
export ROLLUP_HTTP_SERVER_URL=http://localhost:5004
```

### Running

```bash
# Terminal 1: Start attestor
cd attestor && npm run start

# Terminal 2: Start Cartesi rollup
cd cartesi && npx @cartesi/cli run
```

## Deployment

### EigenCloud (TEE)

```bash
# Build Docker image
cd attestor && npm run docker:build

# Get image hash for TEE registration
npm run docker:image-hash

# Deploy to EigenCloud platform
```

### Cartesi Mainnet

```bash
# Build for production
cd cartesi && npm run build

# Deploy using Cartesi CLI
npx @cartesi/cli deploy --network mainnet
```

## Documentation

See [attestor/docs/](attestor/docs/) for setup guides:
- [QUICKSTART.md](attestor/docs/QUICKSTART.md) - 15-minute deployment guide
- [EXTERNAL_SERVICES.md](attestor/docs/EXTERNAL_SERVICES.md) - EigenCloud & Cartesi setup

## Related Projects

| Repository | Description |
|------------|-------------|
| [lcore-sdk](https://github.com/Modern-Society-Labs/lcore-sdk) | Generic SDK template |
| [attestor-core](https://github.com/Modern-Society-Labs/attestor-core) | Attestation infrastructure |
| [lcore-console](https://github.com/Locale-Network/lcore-console) | Management dashboard |

## License

AGPL v3

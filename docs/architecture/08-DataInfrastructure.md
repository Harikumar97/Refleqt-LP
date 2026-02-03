# Subsystem 8: Data Infrastructure

*Raptor analogy: The Test Stand and Manufacturing Infrastructure* — the engine is impressive, but without the test stand (McGregor), launch pads (Boca Chica), and manufacturing (Hawthorne/Starbase), it doesn't fly. Infrastructure enables everything else.

---

## The Client-Heavy Architecture

Unlike typical SaaS with server-heavy compute, Refleqt inverts the model:

```
TRADITIONAL SAAS:              REFLEQT:
┌─────────────┐               ┌─────────────┐
│   Client    │               │   Client    │
│  (thin UI)  │               │ (thick app) │
└──────┬──────┘               └──────┬──────┘
       │                             │
       │ Everything                  │ Auth, sync,
       │ goes to server              │ marketplace only
       │                             │
       ▼                             ▼
┌─────────────┐               ┌─────────────┐
│   Server    │               │   Server    │
│ (all logic) │               │  (thin API) │
│ (all compute)               │  (no ML)    │
│ (all storage)               │  (metadata) │
└─────────────┘               └─────────────┘
```

**Why client-heavy?**

1. **Privacy**: Business context never leaves user's machine (except via their own API key)
2. **Cost**: Refleqt pays ~$0 for compute. No LLM API costs. No GPU costs.
3. **Offline capability**: Desktop app works without internet (except for LLM calls)
4. **Speed**: Local compute is faster than round-trip to server

---

## Client-Side Stack (Desktop App)

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Local DB** | SQLite | Structured data (profiles, calendar, beliefs) |
| **Vector Store** | sqlite-vec or LanceDB | Embeddings for semantic search |
| **ML Runtime** | ONNX Runtime | Run trained models locally |
| **Job Queue** | In-process queue | Async processing without server |
| **File Storage** | Local filesystem | Audio files, exports, cache |
| **LLM Client** | HTTP client | Calls to user's API key (OpenAI/Anthropic) |
| **Sync Layer** | Custom | Periodic sync to server for backup/marketplace |

---

## Server-Side Stack (Minimal)

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Auth** | Supabase Auth or Auth0 | User authentication |
| **API** | FastAPI or Hono | Thin endpoints for sync, marketplace |
| **Database** | PostgreSQL | User accounts, marketplace data, creator pool |
| **Object Storage** | S3 or R2 | Backup of user data (encrypted, user-controlled) |
| **Job Queue** | None needed | All heavy processing is client-side |

---

## What Lives Where

| Data Type | Client | Server | Why |
|-----------|--------|--------|-----|
| Business Context Profile | Yes | Encrypted backup | Privacy — raw context never on server |
| Calendar entries | Yes | Encrypted backup | User's operational data |
| CDT beliefs | Yes | No | Model state stays local |
| Generated outputs | Yes | No | LLM outputs via user's key |
| Performance data | Yes | No | Attribution is local |
| User account | Yes | Yes | Auth requires server |
| Creator profiles | No | Yes | Marketplace is centralized |
| Marketplace transactions | No | Yes | Payments require server |

---

## V1 — Proof of Concept (Free Tier)

*Raptor 1: McGregor test stand. Prove the engine fires.*

V1 infrastructure is minimal:

### Web Playground (browser-only)

- IndexedDB for local storage (calendar, context)
- No backend except auth
- LLM calls go directly to user's API endpoint
- No sync, no backup — browser-only persistence
- Limited to ~10MB storage (browser limits)

### Desktop App (Electron or Tauri)

- SQLite for all structured data
- Local filesystem for audio/files
- No server sync yet
- ML models bundled with app (~50-100MB)
- Embedding generation via user's API key (OpenAI embeddings endpoint)

### Server (near-zero)

- Auth only (Supabase free tier)
- No database beyond auth tables
- No compute, no storage
- Cost: ~$0-10/month total

### V1 Specifications

| Metric | Value |
|--------|-------|
| Server cost | ~$0-10/month |
| Client storage | SQLite + filesystem |
| Sync | None |
| Marketplace | None |
| Offline mode | Full (except LLM calls) |

---

## V2 — Production Optimization

*Raptor 2: Starbase manufacturing. Production at scale.*

### Client Enhancements

- sqlite-vec for local vector search (no external embedding service needed for retrieval)
- ONNX models for local ML inference (classification, ranking, scoring)
- Incremental sync to server for backup
- Export/import for data portability
- Multi-device support via sync

### Server Additions

- PostgreSQL for user accounts + marketplace
- S3/R2 for encrypted backups (user-controlled encryption keys)
- Creator pool database
- Transaction ledger for marketplace
- Basic admin dashboard

### Desktop App

- Auto-updates
- Background sync
- Local model fine-tuning support (future: on-device CDT training)
- Platform-specific optimizations (Apple Silicon, CUDA)

### V2 Specifications

| Metric | Value |
|--------|-------|
| Server cost | ~$50-200/month (at 1000 users) |
| Client storage | SQLite + sqlite-vec + local files |
| Sync | Incremental, encrypted |
| Marketplace | Operational |
| Offline mode | Full (except LLM + sync) |

---

## V3 — Deep Integration

*Raptor 3: Fully integrated launch system.*

### Client Evolution

- On-device CDT fine-tuning for power users (Apple M-series, NVIDIA GPUs)
- Local small language model (1-3B params) for basic suggestions without API calls
- P2P sync option (bypass server entirely for teams)
- Edge functions for pre-processing before LLM calls
- Hardware acceleration for vector operations

### Server Evolution

- Global CDN for app distribution + assets
- Aggregated analytics (anonymized) for cross-user learning
- Marketplace matching runs as serverless functions
- Geographic redundancy for marketplace uptime
- Creator payout automation (Stripe Connect)

### Hybrid Compute

System dynamically decides: local model or API call?

```
┌─────────────────────────────────────────────────────────┐
│                    TASK CLASSIFIER                       │
└─────────────────────────┬───────────────────────────────┘
                          │
            ┌─────────────┴─────────────┐
            │                           │
            ▼                           ▼
    ┌───────────────┐           ┌───────────────┐
    │  Simple Task  │           │ Complex Task  │
    │               │           │               │
    │ Local Model   │           │ API Call      │
    │ (free, fast)  │           │ (user's key)  │
    │               │           │ (higher qual) │
    └───────────────┘           └───────────────┘
```

- Simple tasks -> local (free, fast)
- Complex tasks -> API (user's key, higher quality)
- Adaptive based on device capability detection

### V3 Specifications

| Metric | Value |
|--------|-------|
| Server cost | ~$500-2000/month (at 10000 users) |
| Client storage | SQLite + local LLM + on-device training |
| Sync | P2P option + cloud backup |
| Marketplace | Fully automated |
| Offline mode | Full including basic AI (local model) |

---

## Cost Model Evolution

| Metric | V1 | V2 | V3 |
|--------|----|----|-----|
| Server cost/month | $0-10 | $50-200 | $500-2000 |
| Users supported | 100s | 1000s | 10000s |
| Cost per user/month | ~$0 | ~$0.10-0.20 | ~$0.05-0.20 |
| User API cost (their expense) | $1-10 | $1-10 | $0.50-5 (local model reduces) |
| Refleqt LLM cost | $0 | $0 | $0 (BYOK) |
| Refleqt GPU cost | $0 | $0 | $0 (client-side) |

---

## The Manufacturing Infrastructure Lesson

SpaceX built Starbase specifically for Starship — a purpose-built factory for a purpose-built rocket. They didn't try to use existing aerospace facilities designed for old paradigms.

Refleqt's infrastructure is purpose-built for the BYOK + client-side paradigm:

- Not trying to be AWS with massive server fleets
- Not paying for GPU clusters like OpenAI
- Client-heavy architecture matches the cost structure of a bootstrapped startup
- Server is thin by design, not by constraint

**The evolution:**

- **V1**: Test stand (prove it works, minimal infrastructure)
- **V2**: Production line (support real users, add sync + marketplace)
- **V3**: Integrated manufacturing (optimize for scale, add redundancy)

---

## Database Schema Overview

### Client-Side (SQLite)

```
businesses           -> local business profile
calendar_entries     -> marketing artifacts
context_extractions  -> processed context from inputs
cdt_beliefs          -> current CDT belief state
embeddings           -> vector store for semantic search
recommendation_log   -> tracked recommendations + outcomes
performance_records  -> attribution data
settings             -> user preferences
sync_state           -> last sync timestamps
```

### Server-Side (PostgreSQL)

```
users                -> accounts, auth
subscriptions        -> billing state
creators             -> creator pool
creator_performance  -> reputation data
marketplace_listings -> available execution maps
transactions         -> payment ledger
sync_metadata        -> what's synced where (not the data itself)
```

---

## Sparse Batch Architecture

No Kafka. No Flink. No real-time streaming. Everything is batch:

| Process | Timing | Location |
|---------|--------|----------|
| Calendar saves | Processed immediately | Local, sync later |
| Audio processing | Queued, processed when idle | Local |
| Tooling extraction | Monthly batch | OAuth connect -> pull -> disconnect |
| CDT training | Monthly batch | Local, when user has power |
| Sync | Incremental | When online |
| Marketplace matching | On-demand | When brief submitted |

**Why batch?**

Real-time is expensive and unnecessary. Marketing intelligence doesn't need sub-second latency. Sparse batch matches the natural cadence of marketing work.

```
Marketing Workflow Cadence:
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  DAILY          WEEKLY           MONTHLY         QUARTERLY │
│    │               │                │                │     │
│    ▼               ▼                ▼                ▼     │
│ Calendar       Performance      CDT Training    Strategy   │
│ Updates        Review           Batch           Refresh    │
│                                                            │
│ [immediate]    [batch OK]       [batch OK]     [batch OK]  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

No need for streaming infrastructure when the use case doesn't require it.

---

## Evolution Summary

| Metric | V1 | V2 | V3 |
|--------|----|----|-----|
| Server monthly cost | $0-10 | $50-200 | $500-2000 |
| Refleqt LLM/GPU cost | $0 | $0 | $0 |
| Client storage tech | SQLite | SQLite + sqlite-vec | SQLite + local LLM |
| Sync | None | Encrypted cloud | P2P + cloud |
| Offline capability | Full (except LLM) | Full (except LLM) | Full including basic AI |
| On-device ML | Bundled ONNX | Bundled ONNX | ONNX + local LLM + training |

---

## Key Architectural Decisions

### Why BYOK (Bring Your Own Key)?

```
Traditional SaaS AI:           Refleqt BYOK:
┌─────────────────┐           ┌─────────────────┐
│ User request    │           │ User request    │
│       │         │           │       │         │
│       ▼         │           │       ▼         │
│ ┌───────────┐   │           │ ┌───────────┐   │
│ │ Our API   │   │           │ │ Client    │   │
│ │ Key       │   │           │ │ App       │   │
│ └─────┬─────┘   │           │ └─────┬─────┘   │
│       │         │           │       │         │
│       ▼         │           │       ▼         │
│ ┌───────────┐   │           │ ┌───────────┐   │
│ │ LLM API   │   │           │ │ User's    │   │
│ │ (we pay)  │   │           │ │ API Key   │   │
│ └───────────┘   │           │ └─────┬─────┘   │
│                 │           │       │         │
│ Cost: $$$       │           │       ▼         │
│ per user        │           │ ┌───────────┐   │
│                 │           │ │ LLM API   │   │
└─────────────────┘           │ │ (they pay)│   │
                              │ └───────────┘   │
                              │                 │
                              │ Cost: $0        │
                              │ for Refleqt     │
                              └─────────────────┘
```

### Why Client-Side ML?

1. **Zero GPU costs** — user's hardware runs inference
2. **Privacy by default** — data never leaves device
3. **Offline capability** — works without internet
4. **Lower latency** — no network round-trip
5. **Scales for free** — more users = more distributed compute

### Why Sparse Batch?

| Streaming Architecture | Batch Architecture |
|------------------------|-------------------|
| Kafka, Flink, etc. | Simple job queues |
| Always-on infrastructure | On-demand processing |
| $1000s/month baseline | ~$0 baseline |
| Sub-second latency | Minutes-to-hours latency |
| Overkill for marketing | Right-sized for marketing |

---

## Infrastructure Comparison

```
┌─────────────────────────────────────────────────────────────────┐
│                    TYPICAL AI SAAS                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  GPU Clusters         API Gateway         Load Balancers        │
│  ($10K+/mo)           ($500/mo)           ($200/mo)             │
│       │                    │                   │                 │
│       └────────────────────┴───────────────────┘                 │
│                            │                                     │
│                     ┌──────┴──────┐                              │
│                     │  Database   │                              │
│                     │  Clusters   │                              │
│                     │  ($500/mo)  │                              │
│                     └─────────────┘                              │
│                                                                  │
│  Total: $10K-50K/month before first user                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    REFLEQT (V1)                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Supabase Auth (free tier)                                       │
│       │                                                          │
│       └──────> That's it.                                        │
│                                                                  │
│  Total: $0-10/month                                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Summary

The infrastructure philosophy follows the Raptor/Starship principle: purpose-built for the mission.

**V1 (Test Stand)**: Prove the engine fires with near-zero infrastructure cost. Auth-only server, everything else client-side.

**V2 (Manufacturing)**: Scale to thousands of users with sync, marketplace, and proper backup infrastructure. Still no compute costs.

**V3 (Integrated System)**: Add redundancy, local LLMs, P2P sync, and full automation. Server costs grow but per-user costs stay minimal.

The client-heavy architecture isn't a limitation — it's the core insight that makes Refleqt viable as a bootstrapped product competing against VC-funded alternatives.

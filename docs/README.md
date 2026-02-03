# Refleqt Documentation

## Documentation Structure

```
docs/
├── architecture/     → System architecture (Raptor-inspired V1→V2→V3 evolution)
├── theory/           → First-principles corporate theory foundation
├── ideation/         → Plain English product concepts
└── reference/        → Core technical reference documents
```

---

## Architecture (Raptor Evolution Framework)

The architecture follows SpaceX Raptor engine evolution principles — V1 (proof of concept) → V2 (production optimization) → V3 (deep integration).

| Document | Subsystem | Raptor Analogy |
|----------|-----------|----------------|
| [00-SystemOverview.md](architecture/00-SystemOverview.md) | Full System | Engine overview |
| [01-UserInputLayer.md](architecture/01-UserInputLayer.md) | Input Layer | Propellant injection |
| [02-ContextEngine.md](architecture/02-ContextEngine.md) | Context Engine | Combustion chamber |
| [03-CDT.md](architecture/03-CDT.md) | CDT (AI Core) | Turbopump + preburners |
| [04-OutputGeneration.md](architecture/04-OutputGeneration.md) | Output Generation | Nozzle |
| [05-CreatorMarketplace.md](architecture/05-CreatorMarketplace.md) | Creator Marketplace | Thrust vector control |
| [06-PerformanceAttribution.md](architecture/06-PerformanceAttribution.md) | Performance Attribution | Telemetry |
| [07-RecommendationEngine.md](architecture/07-RecommendationEngine.md) | Recommendation Engine | Regenerative cooling |
| [08-DataInfrastructure.md](architecture/08-DataInfrastructure.md) | Infrastructure | Test stand + factory |

**Legacy architecture docs** (from before Raptor framework):
- [RefleqtArchitecture_Detailed.md](architecture/RefleqtArchitecture_Detailed.md) — Full detailed architecture
- [RefleqtArchitecture_Simple.md](architecture/RefleqtArchitecture_Simple.md) — Flowchart version

---

## Theory

First-principles corporate theory foundation for Refleqt.

| Document | Description |
|----------|-------------|
| [RefleqtTheory_v1.md](theory/RefleqtTheory_v1.md) | Mathematical framework + corporate governance alignment |
| [RefleqtTheory.pdf](theory/RefleqtTheory.pdf) | Original handwritten notes (founder's raw thinking) |

---

## Ideation

Plain English product concepts for non-technical audiences.

| Document | Description |
|----------|-------------|
| [RefleqtIdeation_SoloFounder.md](ideation/RefleqtIdeation_SoloFounder.md) | How Refleqt works for solo founders, freemium model, context farming |

---

## Reference

Core technical reference documents.

| Document | Description |
|----------|-------------|
| [Refleqt Tech Doc Reference](reference/Refleqt%20Tech%20Doc%20Reference) | Original technical architecture reference |

---

## Key Architectural Principles

### BYOK (Bring Your Own Key)
Users provide their own LLM API keys. Refleqt pays $0 for AI inference.

### Client-Side Compute
Heavy processing runs on user's machine (desktop app). Server is thin — auth, sync, marketplace only.

### Sparse Batch
No real-time streaming. Monthly/daily batch processing. Matches natural cadence of marketing work.

### Full-Flow Data Utilization
100% of user input produces context. Every interaction — explicit or implicit — generates intelligence. No wasted data.

---

*Refleqt Documentation v2.0*

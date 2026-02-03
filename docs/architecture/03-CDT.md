# REFLEQT — Subsystem 3: CDT (Contextual Data Transformer)
### The Engine Core: Per-Customer AI Intelligence

---

## Raptor Analogy: The Turbopump + Preburners

The turbopump and preburners are Raptor's most complex subsystem. The preburners control mixture ratios to prevent thermal destruction (stoichiometric LOX/CH4 = 3,500K would melt turbines) while maximizing energy extraction. They run intentionally "off-stoichiometric" — fuel-rich or oxygen-rich — to keep temperatures survivable.

The CDT applies the same principle to data: **controlled mixture ratios prevent overfitting while maximizing belief accuracy**. Training data is intentionally imbalanced to keep the model in a productive learning zone.

---

## 1. What the CDT Is

Each customer gets a **Contextual Data Transformer** — a fine-tuned language model instance trained on their specific business context.

**Key distinction**: Not a shared model with customer-specific prompts. A dedicated model with a customer-specific adapter.

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CDT ARCHITECTURE                      │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              BASE MODEL (Shared)                 │   │
│  │  • Open-weight LLM (Llama/Mistral, 7B-13B)      │   │
│  │  • Stored once, used by all customers           │   │
│  │  • ~15-30GB on disk                             │   │
│  └─────────────────────────────────────────────────┘   │
│                          +                              │
│  ┌─────────────────────────────────────────────────┐   │
│  │           PER-CUSTOMER ADAPTER (Unique)          │   │
│  │  • LoRA/QLoRA fine-tuned weights                │   │
│  │  • ~50-200MB per customer                       │   │
│  │  • Contains customer-specific "beliefs"         │   │
│  └─────────────────────────────────────────────────┘   │
│                          =                              │
│  ┌─────────────────────────────────────────────────┐   │
│  │           CUSTOMER'S CDT (Runtime)               │   │
│  │  • Base + Adapter combined at inference         │   │
│  │  • Thinks in terms of THIS business             │   │
│  │  • Generates context-aware recommendations      │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### BYOK + Client-Side Context

**Critical architectural note**: The CDT doesn't run on Refleqt's servers.

- **V1-V2**: CDT inference uses user's API key (OpenAI/Anthropic). No per-customer fine-tuning — the "CDT" is prompt-engineered using RAG from the business context profile.
- **V3**: On-device fine-tuning for power users with capable hardware (Apple M-series, NVIDIA GPUs). True per-customer adapters, running locally.

---

## 2. Training Data Composition: The Mixture Ratio

Just as Raptor's preburners must run at precisely controlled oxidizer-to-fuel ratios, the CDT must train on precisely controlled data mixture ratios.

### Data Sources and Weights

| Source | Weight | Rationale |
|--------|--------|-----------|
| Onboarding data (structured) | Baseline | Foundation — doesn't change often |
| Activity extractions (recent 3 months) | High | Most recent team intelligence |
| Vent board entries (all time, recency-weighted) | Medium-High | Unfiltered founder cognition |
| Calendar entries + metadata | Medium | Operational patterns |
| Performance data (recent 6 months) | High | Ground truth — what actually works |
| Tooling extractions (recent 2 cycles) | Medium | External data validation |
| Prior CDT beliefs + outcomes | High | Reinforcement signal |

### The Non-Stoichiometric Principle

Training data is **intentionally imbalanced**:

- **Performance data (ground truth)** gets higher weight than vent board entries (subjective)
- **Recent data** gets higher weight than old data
- **Beliefs validated by outcomes** get reinforced; unvalidated beliefs decay

This prevents the model from:
- **Overheating** on subjective inputs (mirroring founder biases)
- **Freezing** on purely objective data (missing strategic intent)

The controlled imbalance keeps the CDT in the productive temperature zone.

---

## 3. The Belief System

The CDT maintains probabilistic beliefs about the business — assertions with confidence weights.

### Belief Schema

```
cdt_beliefs:
  belief_id          UUID
  business_id        UUID
  cdt_version        INTEGER
  belief_category    ENUM: audience | messaging | channel | timing | competitive
  belief_text        TEXT     -- "Operations managers respond to ROI-focused messaging"
  confidence         FLOAT    -- 0.0 to 1.0
  evidence_count     INTEGER  -- data points supporting this
  first_observed     TIMESTAMP
  last_reinforced    TIMESTAMP
  status             ENUM: active | weakening | exploring_alternative | deprecated
```

### Belief Lifecycle

```
New pattern observed in data
        │
        ▼
Belief created (confidence = 0.5, status = active)
        │
        ├── Subsequent data confirms pattern
        │   └── confidence += 0.1, evidence_count += 1, last_reinforced = now
        │
        ├── Subsequent data contradicts pattern
        │   └── confidence -= 0.15, status → weakening
        │
        ├── No new data for 3 months
        │   └── confidence -= 0.1/month (decay)
        │
        └── Confidence drops below 0.3
            └── status → exploring_alternative
            └── System generates alternative hypotheses
```

### Example Beliefs

| Category | Belief | Confidence | Evidence |
|----------|--------|------------|----------|
| Audience | "Enterprise buyers respond to security messaging" | 0.82 | 14 data points |
| Channel | "LinkedIn outperforms Twitter for B2B content" | 0.91 | 23 data points |
| Timing | "Tuesday 9am posts get highest engagement" | 0.67 | 8 data points |
| Messaging | "ROI-focused copy converts better than feature lists" | 0.75 | 11 data points |
| Competitive | "Competitor X is weak on mobile experience" | 0.58 | 4 data points |

---

## 4. Monthly Reinforcement Cycle

### The Cycle

```
Week 1-3: OBSERVATION
├── Collect all new data (activities, vents, calendar, performance)
├── Run tooling extraction (if connected)
├── Compare previous CDT predictions against actual outcomes
└── Calculate belief reinforcement scores:
    For each belief b_i:
      score = (predicted_outcome_alignment) × (data_recency_weight)
      If score > threshold → belief strengthens
      If score < threshold → belief weakens → exploration triggered

Week 4: SYNTHESIS & TRAINING
├── Assemble training dataset from all sources
├── Apply belief weights as data sampling weights:
│   • Strong beliefs → more training examples supporting them
│   • Weak beliefs → alternative examples included for exploration
├── Fine-tuning run executes (LoRA adapter update)
└── New CDT version produced: CDT_v{n+1}

Post-training: VALIDATION
├── Holdout test: 20% of recent performance data
├── New CDT generates test recommendations
├── Compare against actual outcomes on holdout
├── Quality metric: recommendation_accuracy + diversity_score
│   • Quality improves → deploy CDT_v{n+1}
│   • Quality degrades → rollback to CDT_v{n}, flag for review
└── Old adapter archived (never deleted)
```

---

## 5. V1 — Proof of Concept

*Raptor 1: First FFSC engine ever to fly. Proves the cycle works.*

### V1 Reality: No Fine-Tuning

In V1, the "CDT" is not a fine-tuned model. It's **RAG + prompt engineering** using the user's API key:

- Business Context Profile stored locally
- When user requests generation, context is retrieved (RAG)
- Context injected into prompt sent to OpenAI/Anthropic via user's key
- No per-customer model, no adapter, no fine-tuning
- "Beliefs" are extracted post-hoc from context — no formal belief system yet

### Why No Fine-Tuning in V1?

- Fine-tuning requires compute infrastructure (GPUs)
- BYOK model means Refleqt pays $0 for inference
- RAG + good prompts achieve 70-80% of fine-tuned quality
- V1 is about validating the concept, not optimizing

### V1 Specs

| Metric | Value |
|--------|-------|
| Model type | RAG + prompt engineering (via user's API) |
| Per-customer fine-tuning | None |
| Adapter storage | N/A |
| Belief system | Informal (context-derived) |
| Training cycle | N/A |
| Inference latency | 3-10 seconds (depends on user's API) |
| Refleqt compute cost | $0 |
| User API cost | ~$0.02-0.10 per generation |

---

## 6. V2 — Production Optimization

*Raptor 2: Spark ignition replaces toxic igniters. Production-ready.*

### V2 Enhancements

**Formal Belief System**:
- Explicit belief extraction from context
- Belief table with confidence scores
- Belief decay for stale beliefs
- Inspectable — user can see what the system "thinks"

**Smarter RAG**:
- Belief-weighted retrieval — high-confidence beliefs prioritize related context
- Hybrid search (vector + keyword + recency)
- Context quality scoring before injection

**Lightweight Local Models**:
- Small classifier models (ONNX) run locally for:
  - Template selection
  - Context relevance ranking
  - Quality scoring
- Reduces API calls by handling simple tasks locally

**Optional Cloud Fine-Tuning** (premium tier):
- Users can opt-in to periodic fine-tuning
- Refleqt runs training job on user's data (with permission)
- Produces customer-specific adapter
- Adapter stored encrypted, user-controlled

### V2 Specs

| Metric | Value |
|--------|-------|
| Model type | RAG + beliefs + local classifiers (via user's API) |
| Per-customer fine-tuning | Optional (premium) |
| Adapter storage | Cloud (encrypted, user-controlled) |
| Belief system | Formal (queryable belief table) |
| Training cycle | Monthly (for opted-in users) |
| Inference latency | 2-8 seconds (local pre-processing reduces API calls) |
| Refleqt compute cost | ~$5-20/trained customer/month (optional tier) |
| User API cost | ~$0.01-0.05 per generation (reduced via local ML) |

---

## 7. V3 — Deep Integration

*Raptor 3: Integrated turbopump housing. Maximum efficiency.*

### V3 Vision

**On-Device Fine-Tuning**:
- Power users with M2+ Macs or NVIDIA GPUs can train locally
- LoRA fine-tuning on 7B base model in 1-2 hours
- Adapter stays on user's device — never leaves
- Complete data sovereignty

**Continuous Learning**:
- Instead of monthly batch, micro-updates after significant context events
- New vent about competitor → adapter sees small gradient update within hours
- Always learning, never stale

**Mixture-of-Experts CDT**:
- Base model uses MoE architecture
- Different experts activate for different tasks (SEO, messaging, competitive)
- Per-customer adapters weight expert activation
- Better quality without more compute

**Belief-Driven Everything**:
- Beliefs directly control RAG retrieval (not just inform prompts)
- Beliefs predict before generation — "confidence: 0.85 this recommendation will work"
- Beliefs are explainable — every output includes belief attribution

**Cross-Customer Priors** (anonymized):
- New customers in same industry get warm-start beliefs from aggregate patterns
- "B2B SaaS companies typically see X pattern" as prior, refined with their data
- Faster time-to-value, no cold-start problem

**Distilled Inference Model**:
- Full adapter used for training
- Distilled smaller model used for fast inference
- Sub-2-second response times

### V3 Specs

| Metric | Value |
|--------|-------|
| Model type | On-device fine-tuned + distilled inference |
| Per-customer fine-tuning | Yes (local) |
| Adapter storage | Local device |
| Belief system | Full + attribution traces |
| Training | Continuous (micro-updates) |
| Inference latency | <2 seconds (distilled local model) |
| Refleqt compute cost | $0 (client-side) |
| User API cost | ~$0-0.02 per generation (mostly local) |

---

## 8. The Preburner Thermodynamics Lesson

In Raptor:
- Stoichiometric combustion = 3,500K = turbine destruction
- Fuel-rich preburner = ~800K = survivable, still extracts energy
- Oxygen-rich preburner = ~750K = survivable, fully gasifies oxidizer

The preburners run **intentionally off-optimal** to keep the system running.

In Refleqt:
- Training on only objective data = model misses strategic intent
- Training on only subjective data = model mirrors biases, ignores reality
- Controlled mixture = learns real patterns without overfitting to noise

The CDT runs on **intentionally imbalanced data** to keep beliefs accurate.

### Temperature Zones

| Zone | Raptor | CDT |
|------|--------|-----|
| Too cold | Not enough energy extracted | Beliefs too weak, no confidence |
| Optimal | Maximum efficiency without damage | Strong beliefs backed by evidence |
| Too hot | Turbine destruction | Overfitting to noise, false confidence |

The mixture ratio controls which zone you're in.

---

## 9. Evolution Summary

| Metric | V1 | V2 | V3 |
|--------|----|----|-----|
| Model type | RAG only | RAG + beliefs + local ML | On-device fine-tuned |
| Fine-tuning | None | Optional (cloud) | Local |
| Belief system | Informal | Formal (queryable) | Formal + attribution |
| Training cycle | N/A | Monthly | Continuous |
| Inference latency | 3-10s | 2-8s | <2s |
| Refleqt cost | $0 | $5-20/customer (optional) | $0 |
| User API cost | $0.02-0.10 | $0.01-0.05 | $0-0.02 |
| Cold-start quality | Poor | Moderate | Good (cross-customer priors) |
| Adapter location | N/A | Cloud (encrypted) | Local device |

---

## 10. Closing: The Engine Core

The CDT is the engine core of Refleqt — the most complex subsystem, the source of all intelligence.

Just as Raptor's turbopumps and preburners enable the full-flow staged combustion cycle that makes Raptor unique, the CDT enables the full-context marketing intelligence cycle that makes Refleqt unique.

The evolution from V1 → V3 mirrors Raptor's evolution:
- V1: Prove the concept works (RAG is good enough)
- V2: Optimize for production (beliefs + local ML reduce costs)
- V3: Deep integration (on-device fine-tuning, continuous learning, no external dependencies)

---

*CDT Subsystem v2.0 — The Raptor Core of Marketing Intelligence*

# REFLEQT — Full System Architecture
### Every Component, Every Data Flow, Every Decision

---

## 1. Architecture Overview

Refleqt has **7 core subsystems** that connect into a closed loop. Data enters from the left (user actions), flows through processing layers, produces outputs (recommendations, briefs, deliverables), and results feed back to the beginning.

```
USER LAYER          PROCESSING LAYER          OUTPUT LAYER           FEEDBACK LAYER
───────────         ────────────────          ────────────           ──────────────
Onboarding    ───→  Context Engine   ───→     CDT (Your AI)   ───→  Execution Maps
Calendar      ───→  Ingest Queue     ───→     Inference       ───→  Calendar Suggestions
Activities    ───→  Processing Jobs  ───→     Brief Generator ───→  Creator Assignment
Vent Board    ───→  Embedding        ───→     Marketplace     ───→  Deliverables
Tooling Extract──→  Profile Builder  ───→     Matching        ───→  Performance Data ──┐
                                                                                       │
                    ┌──────────────────────────────────────────────────────────────────┘
                    │
                    ▼
              FEEDBACK: Performance data → Context Engine → CDT retrains → Better outputs
```

---

## 2. Subsystem 1 — User Input Layer

Everything starts with humans putting information into the system. There are **6 input channels**, each capturing a different type of business intelligence.

### 2.1 Onboarding Intake

**What it is:** The first-time setup when a business joins Refleqt.

**Explicit data captured:**
- Business name, industry, size, stage (pre-revenue, seed, series A, growth, enterprise)
- Business model (B2B, B2C, B2B2C, marketplace, SaaS, services, ecommerce, hybrid)
- Revenue mechanics (subscription, one-time, usage-based, freemium, advertising, transaction fees)
- Target audience / ICP definition (industry, company size, job titles, geography, pain points)
- Competitive landscape (direct competitors, indirect competitors, aspirational competitors)
- Brand voice attributes (formal/casual, technical/accessible, bold/measured, playful/serious)
- Visual identity (colors, fonts, logo, style references)
- Product/service catalog (what you sell, pricing tiers, key features, differentiators)
- Current marketing stack (CMS, email platform, CRM, analytics, social tools)
- Current marketing state (what's working, what's not, what's been tried, what's never been tried)

**Implicit data captured (from how they answer, not what they answer):**
- Vocabulary patterns — which terms the founder uses naturally vs. avoids
- Emphasis signals — what they spend the most time explaining (indicates priority or frustration)
- Certainty levels — confident assertions vs. hedged language ("I think our ICP is..." vs. "Our ICP is...")
- Knowledge gaps — questions they skip or answer vaguely (indicates blind spots)
- Emotional charge — topics that trigger longer, more passionate responses (indicates core values or pain)

**Storage:**
- Explicit → structured records in PostgreSQL (business_profiles table, typed fields)
- Implicit → processed text stored as JSONB documents + embedded as vectors in pgvector

**Processing trigger:** Immediate. Onboarding responses are processed synchronously during the flow. The business context profile (β) is initialized from this data before the user finishes setup.

---

### 2.2 Marketing Calendar

**What it is:** The artifact ledger where users log their marketing activities. Detailed field architecture documented in the Ideation doc.

**Explicit data captured per entry:**

Core fields:
- Artifact type, title, status, owner, publish date
- Campaign grouping, funnel stage, ICP segment, buyer persona
- Strategic intent, competitive context

SEO fields:
- Primary keyword, secondary keywords, search intent
- Keyword difficulty, search volume, current ranking position
- SERP features, keyword cluster, internal link targets, featured snippet targeting

Technical SEO fields:
- URL slug, meta title, meta description, header structure
- Schema markup type, canonical URL, index status
- Core Web Vitals targets, mobile rendering status
- Image alt text inventory, anchor text plan, crawl directives

Distribution fields:
- Channel list, platform-specific parameters (LinkedIn hooks, Instagram format, email segments)
- Posting schedule, paid promotion budget, repurposing plan

Performance fields:
- Primary/secondary KPIs, UTM parameters, attribution model
- Conversion event definition, 30-day review date, lifetime value tag

**Implicit data captured:**
- Entry frequency — how often the user logs artifacts (marketing velocity)
- Field completion patterns — which fields they fill vs. skip (indicates knowledge level and priorities)
- Campaign clustering — how artifacts group together (reveals strategic themes)
- Funnel balance — ratio of TOFU/MOFU/BOFU artifacts (reveals funnel health)
- Channel concentration — how much goes to one channel vs. diversified (reveals distribution risk)
- Review behavior — do they come back for 30-day reviews? (reveals data-driven maturity)
- Status flow speed — how long artifacts stay in each status (reveals production bottlenecks)
- Keyword overlap — are they targeting the same keywords repeatedly? (reveals cluster strategy or lack thereof)
- Time-to-publish — gap between "Idea" and "Published" (reveals execution speed)

**Storage:**
- Explicit → PostgreSQL relational tables (calendar_entries, with foreign keys to campaigns, keywords, etc.)
- SEO fields → separate seo_metadata table linked to calendar entries
- Distribution fields → distribution_plans table (one-to-many per entry)
- Performance fields → performance_records table (updated over time as data arrives)
- Implicit patterns → computed nightly by a batch job, stored as analytics_snapshots in JSONB

**Processing triggers:**
- On-save: entry is categorized, tagged, and indexed (lightweight, <1 second)
- Nightly batch: pattern analysis runs across all entries for the business (implicit signals extracted)
- Monthly: aggregated patterns feed into CDT training data

---

### 2.3 Team Context Activities

**What it is:** Structured team exercises that produce alignment AND business context.

**Explicit data captured:**
- Activity type (Brand Voice Brawl, Competitor Roast, Customer Story Swap, Rant Round, Roadmap vs. Reality, etc.)
- Participants (who was involved, their roles)
- Audio recordings (voice notes, group discussions)
- Written summary/notes (one-page output the team produces)
- Duration (how long they actually spent)

**Implicit data captured:**
- Participation depth — how many team members engaged vs. just the founder
- Consistency — do they do activities regularly or just the first one?
- Output richness — word count, topic diversity, emotional range in the notes
- Inter-team alignment — do team members describe the business similarly or divergently? (divergence = alignment gap, itself a context signal)
- Activity preference — which types of activities they choose reveals what they think needs work
- Audio vs. text ratio — teams that prefer audio tend to be more spontaneous; text-heavy teams tend to be more structured

**Processing pipeline:**
```
Audio uploaded
    │
    ▼
Async job queued (job_type: audio_transcription)
    │
    ▼
Transcription service (Whisper API / Deepgram)
    │
    ▼
Raw transcript stored (object storage + document store)
    │
    ▼
Structured extraction job (LLM API call):
    ├── Key themes identified
    ├── Brand voice attributes extracted
    ├── Competitor mentions tagged
    ├── Customer insights flagged
    ├── Internal alignment gaps noted
    └── Emotional charge scored per topic
    │
    ▼
Extracted data → Business Context Profile (β_d dynamic layer)
    │
    ▼
Embeddings generated → Vector store (for semantic search across all context)
    │
    ▼
Recommendation lineage logged:
    "Activity X was recommended → Team completed it →
     Context Y was extracted → Confidence: high/medium/low"
```

**Storage:**
- Audio files → Object storage (S3), referenced by activity_id
- Transcripts → document store (JSONB in PostgreSQL or dedicated document DB)
- Extracted structured data → context_extractions table (linked to activity_id + business_id)
- Embeddings → pgvector or Pinecone
- Recommendation lineage → recommendation_outcomes table

---

### 2.4 Vent Board

**What it is:** Unstructured input channel. Founders dump thoughts, frustrations, observations, ideas whenever they want. No format requirements.

**Explicit data captured:**
- Raw text (any length)
- Optional tags the user adds
- Timestamp

**Implicit data captured:**
- Frequency and timing — venting at 11 PM vs. 9 AM signals different emotional states
- Topic recurrence — the same frustration mentioned 5 times is a core pain point, not a passing thought
- Sentiment trajectory — is the founder getting more positive or more negative over time?
- Vocabulary evolution — new terms appearing may signal a strategic shift the founder hasn't formally articulated yet
- Length patterns — short bursts = reactive frustration; long entries = deep strategic thinking

**Processing:**
- On-submit: async job queued
- LLM extraction: themes, entities, sentiment, actionable signals
- Stored as both raw text and structured extraction
- Embedded for semantic search
- Tagged with recurrence count if similar themes exist in prior entries

**Storage:** Same pattern as activities — raw in document store, extracted in structured tables, embedded in vector store.

---

### 2.5 Tooling Ecosystem Extraction

**What it is:** Monthly batch pull from the customer's existing marketing tools.

**Process:**
```
Month start
    │
    ▼
System triggers OAuth connection to authorized tools
    │
    ├── CRM (HubSpot, Salesforce, Pipedrive)
    │   └── Pull: deal stages, lead sources, conversion rates, pipeline velocity
    │
    ├── Analytics (Google Analytics, Mixpanel, Amplitude)
    │   └── Pull: traffic sources, top pages, conversion funnels, user behavior
    │
    ├── Social platforms (LinkedIn, Twitter, Instagram, Facebook)
    │   └── Pull: post performance, follower growth, engagement rates, top content
    │
    ├── Email platform (Mailchimp, ConvertKit, ActiveCampaign)
    │   └── Pull: open rates, click rates, unsubscribes, segment performance
    │
    ├── CMS (WordPress, Webflow, Ghost)
    │   └── Pull: content inventory, page performance, publishing cadence
    │
    └── Ad platforms (Google Ads, Meta Ads, LinkedIn Ads)
        └── Pull: spend, impressions, clicks, conversions, ROAS by campaign
    │
    ▼
Data normalized into unified schema
    │
    ▼
OAuth connections closed (no persistent access)
    │
    ▼
Normalized data → Context Profile (β_d dynamic layer)
    │
    ▼
Delta analysis: what changed since last extraction?
    │
    ▼
Significant changes flagged as signals for CDT training
```

**Storage:**
- Raw extractions → JSONB documents (versioned by extraction_date)
- Normalized metrics → time-series table (metric_name, value, date, source)
- Delta flags → signals table (signal_type, magnitude, source, extraction_id)

**Processing trigger:** Monthly scheduled job (cron). Not real-time. The system connects, pulls, disconnects. No persistent API connections.

---

### 2.6 Performance Data Import

**What it is:** Results data from deployed marketing artifacts, pulled from connected platforms.

**What's captured:**
- Per-artifact: impressions, reach, engagement (likes, comments, shares), clicks, CTR
- Conversion events: form fills, signups, demo bookings, purchases (attributed via UTMs)
- Revenue attribution: which artifacts contributed to which deals closing
- SEO performance: ranking position changes, organic traffic, backlinks acquired
- Email performance: opens, clicks, replies, unsubscribes per send

**Processing:** Daily or weekly batch pull (configurable per data source). Results mapped to specific calendar entries via UTM parameters and artifact IDs.

**Storage:** performance_records table, linked to calendar_entry_id. Time-series format for trend analysis.

---

## 3. Subsystem 2 — Context Engine

The Context Engine is the central processing layer. It takes raw input from all 6 channels and builds the **Business Context Profile (β)**.

### 3.1 The Ingest Queue

All input channels feed into a single async job queue.

```
┌─────────────────────────────────────────────────────┐
│                   INGEST QUEUE                       │
│                                                     │
│  Priority 1: User-facing (calendar saves, uploads)  │
│  Priority 2: Background (vent processing, patterns) │
│  Priority 3: Scheduled (tooling extraction, CDT)    │
│                                                     │
│  Implementation: Celery + Redis, or Bull + Redis,   │
│  or Temporal for complex workflows                  │
│                                                     │
│  Retry policy: 3 retries with exponential backoff   │
│  Dead letter queue for permanent failures           │
│  Monitoring: job counts, processing times, failures │
└─────────────────────────────────────────────────────┘
```

### 3.2 Processing Jobs

| Job Type | Input | Processing | Output | Avg Duration |
|----------|-------|-----------|--------|-------------|
| `transcribe_audio` | Audio file reference | External API (Whisper/Deepgram) | Raw transcript | 30-120 sec |
| `extract_context` | Text (transcript, vent entry, notes) | LLM API call with extraction prompt | Structured themes, entities, signals | 5-15 sec |
| `generate_embeddings` | Text chunks | Embedding API (OpenAI/Cohere) | Vector embeddings | 1-3 sec |
| `categorize_entry` | Calendar entry fields | Rule-based + lightweight LLM | Tags, categories, cluster assignments | <1 sec |
| `analyze_patterns` | All entries for a business | Batch computation | Implicit signal report | 10-30 sec |
| `compute_delta` | Current vs. previous extraction | Diff computation | Change signals | 5-10 sec |
| `map_performance` | Performance data + calendar entries | Join on UTMs + artifact IDs | Per-artifact performance records | 2-5 sec |
| `train_cdt` | All context for a business | Fine-tuning run (monthly) | Updated CDT model | 30-120 min |
| `generate_maps` | CDT inference + context | LLM generation | Execution map recommendations | 10-30 sec |
| `generate_brief` | Execution map + full context | LLM generation from CDT | Creator brief document | 15-45 sec |

### 3.3 The Business Context Profile (β)

The profile is not a single database record. It's a **composite view** across multiple storage layers:

```
Business Context Profile (β)
│
├── β_s: Static Foundation
│   ├── business_profiles table (structured)
│   ├── onboarding_responses (JSONB)
│   └── brand_assets (object storage references)
│
├── β_d: Dynamic Layer
│   ├── context_extractions table (from activities, vents, tooling)
│   ├── calendar_entries + seo_metadata + distribution_plans
│   ├── performance_records (time-series)
│   ├── signals table (flagged changes from delta analysis)
│   └── analytics_snapshots (nightly computed patterns)
│
├── β_i: Derived Intelligence
│   ├── cdt_beliefs table (probabilistic assertions with confidence weights)
│   ├── inferred_segments (AI-generated audience segments)
│   ├── recommendation_history (what was recommended + outcomes)
│   └── competitive_intelligence (aggregated competitive signals)
│
└── Vector Index
    └── All text context embedded and searchable semantically
        (enables: "find everything related to waste reduction")
```

**Read path:** When the CDT or any inference job needs context, it queries this composite view. A context retrieval for brief generation might look like:

```
1. Pull structured business profile (β_s)
2. Pull recent calendar entries matching the relevant campaign
3. Semantic search for top-10 most relevant context chunks (β_d vectors)
4. Pull current CDT beliefs relevant to the topic
5. Pull performance data for similar past artifacts
6. Assemble into a context window for the LLM
```

This is **Retrieval-Augmented Generation (RAG)** — the CDT doesn't memorize everything, it retrieves the most relevant context at inference time.

---

## 4. Subsystem 3 — The CDT (Contextual Data Transformer)

### 4.1 What the CDT Actually Is

The CDT is a **fine-tuned language model instance per customer**. It's not a shared model with different prompts. Each customer's CDT has been trained on their specific context, producing a model that "thinks" in terms of that business.

**Base model:** An open-weight LLM suitable for fine-tuning (Llama, Mistral, or equivalent)

**Fine-tuning approach:** LoRA (Low-Rank Adaptation) or QLoRA — parameter-efficient fine-tuning that creates a small adapter layer specific to each customer, rather than duplicating the entire base model.

**What this means practically:**
- Base model: ~7B-13B parameters, shared across all customers (stored once)
- Per-customer adapter: ~50-200MB, stores the customer-specific "beliefs"
- Inference: base model + customer adapter loaded at inference time
- Cost: fine-tuning runs on a single GPU for 1-4 hours per customer per month

### 4.2 Training Data Composition

Each monthly training cycle assembles a dataset from:

| Source | Weight | Why |
|--------|--------|-----|
| Onboarding data (structured) | Baseline | Foundation that doesn't change often |
| Activity extractions (recent 3 months) | High | Most recent team intelligence |
| Vent board entries (all time, recency-weighted) | Medium-High | Unfiltered founder cognition |
| Calendar entries + metadata | Medium | Reveals operational patterns |
| Performance data (recent 6 months) | High | What actually works vs. doesn't |
| Tooling extractions (recent 2 cycles) | Medium | External data ground truth |
| Prior CDT beliefs + outcomes | High | Reinforcement signal — what the CDT predicted vs. what happened |

Training data is formatted as instruction-response pairs:

```
Instruction: "Given this business context [context], what messaging angle
             would resonate for [ICP segment] on [channel]?"

Response:    [Derived from successful past artifacts + performance data]
```

### 4.3 Monthly Reinforcement Cycle

```
Week 1-3: OBSERVATION
├── All new data collected (activities, vents, calendar, performance)
├── New tooling extraction runs (if connected)
├── Previous CDT predictions compared against actual outcomes
└── Belief reinforcement scores calculated:
    For each belief bᵢ:
      score = (predicted outcome alignment) × (data recency weight)
      If score > threshold: belief strengthens
      If score < threshold: belief weakens → exploration triggered

Week 4: SYNTHESIS & TRAINING
├── Training dataset assembled from all sources
├── Belief weights applied as data sampling weights
│   (strong beliefs = more training examples supporting them)
│   (weak beliefs = alternative examples included for exploration)
├── Fine-tuning run executes (LoRA adapter update)
└── New CDT version produced: CDT_v{n+1}

Post-training: VALIDATION
├── Holdout test set: 20% of recent performance data
├── New CDT generates test recommendations
├── Compared against actual outcomes on holdout set
├── Quality metric: recommendation_accuracy + diversity_score
│   If quality improves → deploy CDT_v{n+1}
│   If quality degrades → rollback to CDT_v{n}, flag for review
└── Deployment: new adapter uploaded, old adapter archived (never deleted)
```

### 4.4 Belief System Storage

```sql
-- Simplified schema
CREATE TABLE cdt_beliefs (
    belief_id       UUID PRIMARY KEY,
    business_id     UUID REFERENCES businesses(id),
    cdt_version     INTEGER,
    belief_category TEXT,          -- 'audience', 'messaging', 'channel', 'timing', 'competitive'
    belief_text     TEXT,          -- "Operations managers respond to ROI-focused messaging"
    confidence      FLOAT,        -- 0.0 to 1.0
    evidence_count  INTEGER,      -- how many data points support this
    first_observed  TIMESTAMP,
    last_reinforced TIMESTAMP,
    status          TEXT           -- 'active', 'weakening', 'exploring_alternative', 'deprecated'
);
```

---

## 5. Subsystem 4 — Output Generation

### 5.1 Execution Maps

CDT generates complete marketing initiative packages:

```
CDT inference input:
├── Full business context (β) retrieved via RAG
├── Current market signals (from tooling + manual signals)
├── Current calendar state (what's planned, what gaps exist)
├── Performance patterns (what's working)
└── Competitive context (what competitors are doing)

CDT inference output (Execution Map):
├── Title and rationale ("Why now" explanation)
├── Contents list (every artifact included)
├── Per-artifact brief outline
├── Recommended timeline
├── Estimated cost (based on creator marketplace pricing)
├── Predicted success metrics (from belief system)
├── ICP/persona targeting
└── Distribution strategy per artifact
```

### 5.2 Creator Brief Generation

When a customer purchases an execution map, each artifact within it gets a full creator brief:

```
Brief generation input:
├── Execution map context
├── Full business context (β) — the creator never sees this raw
├── Artifact-specific requirements
├── Brand voice parameters
├── SEO parameters (if applicable)
├── Reference examples (from high-performing past artifacts)
└── Success metrics for this specific artifact

Brief generation output (what the creator sees):
├── Artifact type and format specifications
├── Target audience description (specific persona)
├── Key messages (3-5 core points, priority-ordered)
├── Tone and voice guidelines (with examples)
├── SEO requirements (keyword, header structure, meta)
├── Technical specifications (word count, dimensions, format)
├── What success looks like (measurable outcome)
├── What to avoid (common misalignments for this business)
└── Reference material (anonymized examples of what works)
```

The creator never knows the business name. They work from a context-rich brief that tells them everything they need without revealing identity.

### 5.3 Calendar Suggestions

Generated from CDT inference at lower cost/complexity than full execution maps:

```
Daily suggestion refresh:
├── Check current calendar state (gaps, upcoming deadlines)
├── Check recent performance data (what's working)
├── Check market signals (competitor moves, trending topics)
├── CDT generates 3-5 suggestions ranked by expected impact
└── Suggestions displayed as ghost entries on the calendar
```

---

## 6. Subsystem 5 — Creator Marketplace

### 6.1 Creator Matching

```
Brief generated
    │
    ▼
Matching algorithm:
    ├── Filter by specialization (B2B SaaS, ecommerce, etc.)
    ├── Filter by artifact type capability (copy, design, strategy)
    ├── Filter by availability (current workload < capacity)
    ├── Rank by performance score on similar briefs
    ├── Rank by historical quality for this artifact type
    └── Select top match (or top 3 for premium bidding)
    │
    ▼
Creator receives anonymized brief
    │
    ▼
Creator accepts/declines (SLA: respond within 24 hours)
    │
    ▼
If accepted → production begins → deliverable submitted → QA review
If declined → next-ranked creator receives brief
```

### 6.2 Creator Data Model

```
creators
├── creator_id
├── specializations[] (B2B_SaaS, ecommerce, DTC, fintech, healthcare...)
├── artifact_types[] (blog_copy, landing_page, ad_copy, email, design...)
├── tier (rising, proven, elite)
├── performance_score (rolling 90-day weighted average)
├── total_briefs_completed
├── acceptance_rate
├── avg_delivery_time
├── revision_rate (lower is better)
└── capacity (max concurrent briefs)

creator_performance (per completed brief)
├── brief_id
├── creator_id
├── quality_score (QA rating)
├── delivery_time (vs. SLA)
├── revision_count
├── customer_satisfaction
└── artifact_performance (post-deployment metrics, updated over time)
```

### 6.3 Payment Flow

```
Customer purchases execution map → Payment held in escrow
    │
    ▼
Creator completes artifact → Submits for QA
    │
    ▼
QA review (automated checks + human review for premium)
    │
    ├── Pass → Creator paid base fee from escrow
    │          Customer receives deliverable
    │          Performance tracking begins
    │
    └── Fail → Revision requested
               Creator revises and resubmits
               (Max 2 revision cycles, then escalation)
    │
    ▼ (30 days post-deployment)
Performance bonus check:
    ├── Artifact met success metric → Creator receives performance bonus
    └── Artifact underperformed → No bonus, data logged for matching improvement
```

---

## 7. Subsystem 6 — Performance Attribution

### 7.1 Tracking Chain

```
Artifact published with UTM parameters
    │
    ├── Web analytics → pageviews, time on page, bounce rate, scroll depth
    ├── Social metrics → impressions, engagement, shares, saves
    ├── Email metrics → opens, clicks, replies, unsubscribes
    ├── Ad metrics → impressions, clicks, CTR, CPC, conversions
    ├── SEO metrics → ranking position, organic impressions, organic clicks
    └── Conversion metrics → form fills, signups, demo bookings, purchases
    │
    ▼
All metrics mapped to calendar_entry_id via UTMs
    │
    ▼
Attribution model applied:
    ├── First-touch: credit to first interaction
    ├── Last-touch: credit to final interaction before conversion
    ├── Linear: equal credit across all touchpoints
    ├── Time-decay: more credit to recent touchpoints
    └── Position-based: 40% first, 40% last, 20% split middle
    │
    ▼
Per-artifact ROI calculated:
    Revenue attributed ÷ Cost of production = ROI
    │
    ▼
Performance data → β_d (dynamic context layer)
    │
    ▼
Feeds into next CDT training cycle
```

---

## 8. Subsystem 7 — Recommendation Engine

The meta-system that improves itself.

### 8.1 What Gets Tracked

Every recommendation the system makes is logged with its full chain:

```
recommendation_outcomes
├── recommendation_id
├── business_id
├── recommendation_type (activity, calendar_suggestion, execution_map)
├── recommendation_content (what was recommended)
├── recommended_at (timestamp)
├── user_action (accepted, ignored, modified, rejected)
├── action_timestamp
├── context_extracted (what the system learned from the outcome)
├── context_quality_score (how rich was the extracted context)
├── downstream_impact (did this recommendation improve future outputs?)
└── recommendation_model_version (which CDT version generated this)
```

### 8.2 Self-Improvement Loop

```
Aggregate all recommendation_outcomes monthly:
    │
    ├── Which activity types produce highest context_quality_score?
    ├── Which calendar suggestions have highest acceptance rate?
    ├── Which execution maps have highest purchase + performance rates?
    ├── Which brief structures produce lowest revision rates?
    └── Which creator matches produce highest performance scores?
    │
    ▼
Update recommendation policies:
    ├── Activity ordering: prioritize highest-context-yield activities for new businesses
    ├── Suggestion confidence thresholds: only show suggestions above X confidence
    ├── Map generation parameters: weight toward formats/channels that perform
    ├── Brief templates: evolve structure based on revision rate data
    └── Creator matching weights: adjust ranking factors based on outcome data
```

---

## 9. Database Schema Overview

### Core Tables

```
businesses              → Business identity and static profile
business_profiles       → Onboarding data (structured fields)
team_members            → Users within a business

calendar_entries        → Marketing artifacts on the calendar
seo_metadata            → SEO fields per calendar entry
distribution_plans      → Distribution parameters per calendar entry
performance_records     → Metrics per artifact (time-series)

activities              → Team context activities (completed)
activity_artifacts      → Uploaded files per activity (audio, notes)
context_extractions     → Structured data extracted from any source

vent_entries            → Raw vent board submissions

tooling_connections     → OAuth credentials (encrypted, temporary)
tooling_extractions     → Monthly data pulls (versioned)
signals                 → Change flags from delta analysis

cdt_beliefs             → Per-business belief system
cdt_versions            → Model version history with rollback
cdt_training_runs       → Training job metadata and results

execution_maps          → Generated marketing initiative packages
map_artifacts           → Individual artifacts within a map
creator_briefs          → Generated briefs for creators

creators                → Creator profiles and capabilities
creator_performance     → Per-brief performance records
creator_payments        → Payment ledger

recommendation_outcomes → Full lineage tracking

analytics_snapshots     → Nightly computed implicit patterns
```

### Vector Tables (pgvector)

```
context_embeddings      → All text context embedded for semantic search
    ├── source_type (onboarding, activity, vent, calendar, extraction)
    ├── source_id (FK to source table)
    ├── business_id
    ├── embedding (vector(1536) or vector(768))
    ├── text_chunk (the original text)
    └── created_at
```

---

## 10. Infrastructure Map

### Early Stage (0-100 customers)

```
┌──────────────────────────────────────────┐
│            Application Server             │
│         (FastAPI or Next.js API)          │
│                                          │
│  ├── REST API endpoints                  │
│  ├── WebSocket for real-time UI updates  │
│  ├── Background job submission           │
│  └── Authentication (JWT + OAuth)        │
└────────────────┬─────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
┌────────┐ ┌─────────┐ ┌──────────┐
│PostgreSQL│ │  Redis  │ │   S3     │
│+ pgvector│ │ (queue  │ │ (files,  │
│          │ │  + cache)│ │  models) │
└────────┘ └─────────┘ └──────────┘
                 │
                 ▼
         ┌──────────────┐
         │ Job Workers   │
         │ (Celery/Bull) │
         │               │
         │ 2-4 workers   │
         │ processing    │
         │ async jobs    │
         └──────────────┘
                 │
                 ▼
         ┌──────────────┐
         │ External APIs │
         ├── OpenAI/     │
         │   Anthropic   │
         ├── Whisper/    │
         │   Deepgram    │
         ├── Embedding   │
         │   API         │
         └──────────────┘
```

**Total monthly cost estimate at 50 customers:**
- App server: ~$50-100/mo (single instance)
- PostgreSQL: ~$50-100/mo (managed, 100GB)
- Redis: ~$15-30/mo
- S3: ~$5-20/mo (depends on audio volume)
- Job workers: included in app server or ~$50/mo separate
- External APIs: ~$200-500/mo (LLM + transcription + embedding)
- **Total: ~$400-800/mo**

### Scale Stage (100-1000 customers)

Add:
- Separate job worker instances (auto-scaling)
- Read replicas for PostgreSQL
- Dedicated vector DB (Pinecone or Qdrant) if pgvector hits limits
- CDN for static assets
- Dedicated fine-tuning compute (GPU instances, on-demand)

### No streaming infrastructure needed at any stage. No Kafka. No Flink. No real-time pipelines.

---

*Refleqt Architecture v1.0 — Every component documented. Sparse batch. No over-engineering.*

*— End of Document —*

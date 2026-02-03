# REFLEQT — Architecture Flowchart
### Plain English, Every Component

---

## The Big Picture

```
PEOPLE PUT STUFF IN ──→ SYSTEM LEARNS ──→ SYSTEM PRODUCES ──→ RESULTS COME BACK
       │                     │                   │                     │
       │                     │                   │                     │
       ▼                     ▼                   ▼                     ▼
  6 Input Channels     Context Engine       CDT (Your AI)      Performance Data
                       builds a profile     generates plans     proves what works
                       of your business     and briefs          and what doesn't
                                                                       │
                                                                       │
              ┌────────────────────────────────────────────────────────┘
              │
              ▼
        LOOP: Results teach the system → System gets smarter → Better outputs next time
```

---

## Step-by-Step Flow

### Step 1: Business Signs Up

```
New business joins Refleqt
        │
        ▼
┌─────────────────────────────────┐
│         ONBOARDING              │
│                                 │
│  "Tell us about your business"  │
│                                 │
│  You fill in:                   │
│  • What you sell                │
│  • Who you sell to              │
│  • Your brand voice             │
│  • Your competitors             │
│  • Your current marketing       │
│                                 │
│  System also picks up:          │
│  • What you emphasize           │
│  • What you skip                │
│  • How certain you sound        │
│  • Where your blind spots are   │
└─────────────┬───────────────────┘
              │
              ▼
     Initial business profile created
     (the system now "knows" you at a basic level)
```

---

### Step 2: Team Uses the Free Tools

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    CALENDAR      │    │   ACTIVITIES    │    │   VENT BOARD    │
│                  │    │                 │    │                 │
│ Your team logs   │    │ Team building   │    │ Founder dumps   │
│ marketing        │    │ games that      │    │ thoughts,       │
│ artifacts:       │    │ also generate   │    │ frustrations,   │
│ blog posts,      │    │ business        │    │ ideas — any     │
│ campaigns,       │    │ context:        │    │ time, any       │
│ emails, ads      │    │                 │    │ format          │
│                  │    │ • Brand Brawl   │    │                 │
│ Includes SEO,    │    │ • Competitor    │    │ System reads    │
│ keywords,        │    │   Roast         │    │ between the     │
│ distribution,    │    │ • Customer      │    │ lines:          │
│ KPIs — the       │    │   Story Swap    │    │ recurring       │
│ full picture     │    │                 │    │ themes,         │
│                  │    │ Team records    │    │ sentiment,      │
│ System learns    │    │ audio / notes   │    │ priorities      │
│ your patterns    │    │ and uploads     │    │                 │
└────────┬────────┘    └────────┬────────┘    └────────┬────────┘
         │                      │                      │
         └──────────────────────┼──────────────────────┘
                                │
                                ▼
                     All inputs flow into the
                       CONTEXT ENGINE
```

---

### Step 3: Monthly Tool Sync

```
┌──────────────────────────────────────┐
│       TOOLING EXTRACTION             │
│                                      │
│  Once a month, Refleqt connects      │
│  to your existing tools:             │
│                                      │
│  CRM ──→ pull deal data              │
│  Analytics ──→ pull traffic data     │
│  Social ──→ pull post performance    │
│  Email ──→ pull open/click rates     │
│  CMS ──→ pull content inventory      │
│  Ads ──→ pull spend & conversions    │
│                                      │
│  Then DISCONNECTS.                   │
│  No persistent access.              │
│  No always-on sync.                 │
│  Connect → Pull → Disconnect.       │
└──────────────────┬───────────────────┘
                   │
                   ▼
            Context Engine
```

---

### Step 4: Context Engine Processes Everything

```
┌──────────────────────────────────────────────────────────┐
│                    CONTEXT ENGINE                          │
│                                                          │
│  Takes ALL input from all channels and builds your       │
│  Business Context Profile — a living picture of          │
│  your business.                                          │
│                                                          │
│  Three layers:                                           │
│                                                          │
│  ┌──────────────────────────────────────────┐            │
│  │ STATIC: What you told us at onboarding   │            │
│  │ (business model, ICP, brand, products)   │            │
│  └──────────────────────────────────────────┘            │
│                    +                                     │
│  ┌──────────────────────────────────────────┐            │
│  │ DYNAMIC: What we learn over time         │            │
│  │ (calendar patterns, vent themes,         │            │
│  │  tool data, performance results,         │            │
│  │  activity outputs, market signals)       │            │
│  └──────────────────────────────────────────┘            │
│                    +                                     │
│  ┌──────────────────────────────────────────┐            │
│  │ DERIVED: What AI figures out             │            │
│  │ (inferred audience segments, best        │            │
│  │  channels, messaging that works,         │            │
│  │  competitive gaps, timing patterns)      │            │
│  └──────────────────────────────────────────┘            │
│                                                          │
│  Everything is also embedded as vectors so the system    │
│  can semantically search across ALL your context.        │
│  ("Find everything we know about enterprise buyers")     │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
                    Your CDT (AI)
```

---

### Step 5: CDT — Your Personal AI

```
┌──────────────────────────────────────────────────────────┐
│              CDT (Contextual Data Transformer)            │
│                                                          │
│  A fine-tuned AI model that is YOURS.                    │
│  Not a shared AI with your name on it.                   │
│  An actual model trained on YOUR data.                   │
│                                                          │
│  How it works:                                           │
│  • Base AI model (shared, like the engine)               │
│  • Your adapter layer (unique, like your fingerprint)    │
│  • Combined at inference = AI that "thinks" like         │
│    your business                                         │
│                                                          │
│  Retrained MONTHLY:                                      │
│                                                          │
│  Week 1-3: Collects new data, watches what works         │
│  Week 4:   Retrains with everything it learned           │
│  After:    Tests itself — if worse, rolls back           │
│                                                          │
│  Maintains BELIEFS about your business:                  │
│  • "LinkedIn posts with ROI data perform 3x better"      │
│  • "Enterprise segment responds to case studies"          │
│  • "Tuesday morning emails get highest open rates"        │
│                                                          │
│  Beliefs strengthen when proven right.                   │
│  Beliefs weaken when proven wrong.                       │
│  Weak beliefs trigger exploration of alternatives.       │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
                  Generates Outputs
```

---

### Step 6: CDT Produces Three Things

```
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│   EXECUTION MAPS    │  │  CALENDAR SUGGESTIONS│  │   CREATOR BRIEFS    │
│                     │  │                      │  │                     │
│ Complete marketing  │  │ Daily suggestions    │  │ When you buy a map, │
│ initiative packages │  │ for what to post,    │  │ each artifact gets  │
│ you can buy:        │  │ when, and why —      │  │ a detailed brief    │
│                     │  │ appear as ghost      │  │ for the creator:    │
│ • Title + why now   │  │ entries on your      │  │                     │
│ • All assets listed │  │ calendar             │  │ • What to make      │
│ • Timeline + cost   │  │                      │  │ • Who it's for      │
│ • Success metrics   │  │ Based on:            │  │ • Tone + voice      │
│ • Distribution plan │  │ • Calendar gaps      │  │ • SEO requirements  │
│                     │  │ • What's working     │  │ • Success metrics   │
│ Tailored to YOUR    │  │ • Market signals     │  │ • What to avoid     │
│ business, right now │  │ • Competitor moves   │  │                     │
│                     │  │                      │  │ Creator never knows │
│                     │  │                      │  │ the business name   │
└─────────┬───────────┘  └──────────────────────┘  └─────────┬───────────┘
          │                                                   │
          │              Customer buys a map                   │
          └──────────────────────┬────────────────────────────┘
                                 │
                                 ▼
                        Creator Marketplace
```

---

### Step 7: Creator Marketplace

```
┌──────────────────────────────────────────────────────────┐
│                  CREATOR MARKETPLACE                      │
│                                                          │
│  Brief goes out ──→ Matching algorithm finds the         │
│                     best creator:                         │
│                                                          │
│  Filter by:   specialization (B2B SaaS, ecommerce...)   │
│               artifact type (copy, design, strategy)     │
│               availability (not overloaded)              │
│  Rank by:     past performance on similar briefs         │
│               quality scores, delivery speed             │
│                                                          │
│  Creator is ANONYMOUS. Customer doesn't know who.        │
│  Customer only sees: performance stats, tier, portfolio. │
│                                                          │
│  Tiers:                                                  │
│  • Rising   — new, limited track record                  │
│  • Proven   — consistent quality, reliable               │
│  • Elite    — top performers, premium bidding access     │
│                                                          │
│  Payment:                                                │
│  Buy map ──→ Money in escrow                             │
│  Creator delivers ──→ QA check                           │
│  QA passes ──→ Creator paid                              │
│  30 days later ──→ Performance bonus if metrics met      │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
              Deliverable goes live
```

---

### Step 8: Performance Attribution

```
┌──────────────────────────────────────────────────────────┐
│              PERFORMANCE ATTRIBUTION                      │
│                                                          │
│  Every artifact is tracked from publish to outcome:      │
│                                                          │
│  Published ──→ Views, impressions, reach                 │
│            ──→ Clicks, engagement, shares                │
│            ──→ Conversions (signups, demos, purchases)   │
│            ──→ Revenue attributed via UTM tracking        │
│            ──→ SEO ranking changes                        │
│                                                          │
│  Each artifact gets an ROI number:                       │
│  Revenue attributed ÷ Cost of production = ROI           │
│                                                          │
│  Attribution models available:                           │
│  • First-touch (credit to first interaction)             │
│  • Last-touch (credit to final interaction)              │
│  • Linear (equal credit across all)                      │
│  • Time-decay (more credit to recent)                    │
│  • Position-based (40/20/40 split)                       │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
              FEEDS BACK INTO CONTEXT ENGINE
              (the loop closes)
```

---

### Step 9: The Loop Closes

```
Performance data enters the Context Engine
        │
        ▼
Context Profile updates with what worked / what didn't
        │
        ▼
CDT retrains next month with this new evidence
        │
        ▼
Beliefs update: strong beliefs get stronger, weak ones pivot
        │
        ▼
NEXT execution maps are smarter than the last ones
        │
        ▼
Better briefs → Better creator output → Better performance
        │
        ▼
    ┌───────────────────────────────────────┐
    │  THE SYSTEM GETS SMARTER EVERY MONTH  │
    │                                       │
    │  Month 1:  Knows your basics          │
    │  Month 6:  Knows your patterns        │
    │  Month 18: Knows your business        │
    │            better than most humans    │
    └───────────────────────────────────────┘
```

---

## Full System in One Diagram

```
╔══════════════════════════════════════════════════════════════════════╗
║                        REFLEQT SYSTEM                              ║
║                                                                    ║
║  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐          ║
║  │Onboarding│  │ Calendar │  │Activities│  │Vent Board│          ║
║  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘          ║
║       │              │              │              │               ║
║       │    ┌─────────┘    ┌─────────┘              │               ║
║       │    │    ┌─────────┘    ┌────────────────────┘               ║
║       │    │    │    ┌─────────┘   ┌──────────────┐               ║
║       │    │    │    │             │Monthly Tool   │               ║
║       │    │    │    │             │  Extraction   │               ║
║       ▼    ▼    ▼    ▼             └──────┬───────┘               ║
║  ┌───────────────────────────────────────────────────┐            ║
║  │              CONTEXT ENGINE                        │            ║
║  │                                                   │            ║
║  │    Builds your Business Context Profile:          │            ║
║  │    Static + Dynamic + Derived Intelligence        │            ║
║  └───────────────────────┬───────────────────────────┘            ║
║                          │                                        ║
║                          ▼                                        ║
║  ┌───────────────────────────────────────────────────┐            ║
║  │              CDT (Your Personal AI)                │            ║
║  │                                                   │            ║
║  │    Fine-tuned monthly on YOUR data.               │            ║
║  │    Maintains beliefs. Evolves.                    │            ║
║  └──────────┬────────────────────┬───────────────────┘            ║
║             │                    │                                ║
║             ▼                    ▼                                ║
║  ┌──────────────────┐  ┌──────────────────┐                      ║
║  │  Execution Maps  │  │Calendar Suggests │                      ║
║  │  (buyable packs) │  │(free daily tips) │                      ║
║  └────────┬─────────┘  └──────────────────┘                      ║
║           │                                                      ║
║           ▼  customer purchases                                  ║
║  ┌──────────────────────────────────────────┐                    ║
║  │         CREATOR MARKETPLACE               │                    ║
║  │                                          │                    ║
║  │  Anonymous creators execute briefs.      │                    ║
║  │  Matched by skill + track record.        │                    ║
║  │  Paid on delivery + performance bonus.   │                    ║
║  └────────┬─────────────────────────────────┘                    ║
║           │                                                      ║
║           ▼  deliverable goes live                               ║
║  ┌──────────────────────────────────────────┐                    ║
║  │       PERFORMANCE ATTRIBUTION             │                    ║
║  │                                          │                    ║
║  │  Track every artifact: views, clicks,    │                    ║
║  │  conversions, revenue. Calculate ROI.    │                    ║
║  └────────┬─────────────────────────────────┘                    ║
║           │                                                      ║
║           │  results feed back                                   ║
║           └──────────────────────────────────────→ CONTEXT       ║
║                                                    ENGINE        ║
║                                                    (loop)        ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## Data Architecture (Simple Version)

```
WHERE STUFF LIVES:

┌─────────────┐     Structured data (profiles, calendar,
│ PostgreSQL  │     beliefs, performance, payments)
│ + pgvector  │     + Vector embeddings for semantic search
└─────────────┘

┌─────────────┐     Job queue + caching
│   Redis     │     (processes async tasks in order)
└─────────────┘

┌─────────────┐     Files (audio recordings, brand assets,
│   S3        │     CDT model adapters)
└─────────────┘


HOW STUFF MOVES:

  NOT real-time. NOT streaming. BATCH.

  • Calendar saves → processed on save (<1 sec)
  • Audio uploads → async job (30-120 sec)
  • Vent entries → async job (5-15 sec)
  • Pattern analysis → nightly batch
  • Tool extraction → monthly batch
  • CDT retraining → monthly batch (1-4 hours)
  • Performance data → daily/weekly pull


WHAT IT COSTS (at 50 customers):

  Server:     ~$50-100/mo
  Database:   ~$50-100/mo
  Redis:      ~$15-30/mo
  Storage:    ~$5-20/mo
  AI APIs:    ~$200-500/mo
  ─────────────────────────
  Total:      ~$400-800/mo
```

---

## Component Glossary

| Component | What It Does (One Sentence) |
|---|---|
| **Onboarding** | Captures your business fundamentals the first time you sign up |
| **Calendar** | Ledger where your team logs every marketing artifact with full SEO and distribution details |
| **Activities** | Team building exercises that are fun AND generate business context |
| **Vent Board** | Unstructured input — founder dumps raw thoughts, system extracts the signal |
| **Tooling Extraction** | Monthly plug-in to your existing tools — connect, pull data, disconnect |
| **Context Engine** | Processes all inputs into a 3-layer business profile (static + dynamic + derived) |
| **Business Context Profile** | The living picture of your business — gets richer over time |
| **CDT** | Your personal AI model, fine-tuned on your data, retrained monthly |
| **Beliefs** | Probabilistic assertions the CDT holds about your business — strengthen or weaken with evidence |
| **Execution Maps** | Complete marketing initiative packages generated by your CDT — buyable in the marketplace |
| **Calendar Suggestions** | Free daily AI tips that appear as ghost entries on your calendar |
| **Creator Briefs** | Detailed instructions generated for anonymous creators to execute your artifacts |
| **Creator Marketplace** | Anonymized creators matched by skill and track record, paid on delivery + performance |
| **Performance Attribution** | Tracks every artifact from publish to revenue — calculates ROI per piece |
| **Recommendation Engine** | The meta-system that tracks its own recommendations and improves itself monthly |
| **Feedback Loop** | Results flow back to context engine → CDT retrains → outputs get smarter |

---

*Refleqt Architecture — Simple Flowchart v1.0*

*— End of Document —*

# Subsystem 02 -- Context Engine

> Raptor Analogy: **The Combustion Chamber**
>
> In Raptor, the combustion chamber is where raw propellant (methane + LOX)
> becomes thrust-producing gas. Combustion efficiency (eta_c*) measures how
> completely the propellant converts to useful exhaust.
>
> In Refleqt, the Context Engine is where raw user input becomes structured
> business intelligence. Context Extraction Efficiency (CEE) measures how
> completely that input converts to retrievable, actionable context.
>
> Combustion efficiency = context extraction efficiency.

---

## 1. What This Subsystem Does

The Context Engine is Refleqt's central processing layer. It sits between the
six input channels (onboarding, calendar, activity log, vent mode, integrations,
performance tracker) and the downstream intelligence systems (CDT, execution
maps, creator briefs).

Its job: take raw input from all 6 channels and build the **Business Context
Profile** -- designated **beta** -- a composite, living picture of each business.

```
  +------------------+     +------------------+     +------------------+
  |   Onboarding     |     |   Calendar       |     |   Activity Log   |
  +--------+---------+     +--------+---------+     +--------+---------+
           |                        |                        |
           v                        v                        v
  +--------------------------------------------------------------+
  |                                                              |
  |                     CONTEXT ENGINE                           |
  |                                                              |
  |   +-----------+    +---------------+    +----------------+   |
  |   | Ingest    |--->| Processing    |--->| Profile        |   |
  |   | Queue     |    | Jobs          |    | Builder        |   |
  |   +-----------+    +---------------+    +-------+--------+   |
  |                                                 |            |
  |                    +---------------+             |            |
  |                    | RAG Retrieval |<------------+            |
  |                    +---------------+                         |
  |                                                              |
  +--------------------------------------------------------------+
           ^                        ^                        ^
           |                        |                        |
  +--------+---------+     +--------+---------+     +--------+---------+
  |   Vent Mode      |     |   Integrations   |     |   Perf Tracker   |
  +------------------+     +------------------+     +------------------+
```

### The Business Context Profile (beta)

Beta is structured across three layers plus a vector index:

```
  +================================================================+
  |                   Business Context Profile (beta)               |
  |================================================================|
  |                                                                |
  |  beta_s  -- STATIC FOUNDATION                                  |
  |  ----------------------------------------------------------------
  |  Business fundamentals captured during onboarding:             |
  |    - Business model and revenue structure                      |
  |    - Ideal Customer Profile (ICP)                              |
  |    - Brand voice, tone, positioning                            |
  |    - Products and service offerings                            |
  |    - Current marketing stack and tooling                       |
  |                                                                |
  |  beta_d  -- DYNAMIC LAYER                                     |
  |  ----------------------------------------------------------------
  |  Evolving data accumulated from ongoing usage:                 |
  |    - Activity extractions (themes, entities, signals)          |
  |    - Calendar patterns (frequency, timing, clustering)         |
  |    - Vent themes (recurring frustrations, emotional signals)   |
  |    - Tooling data (integration sync outputs)                   |
  |    - Performance results (per-artifact, per-channel)           |
  |    - Market signals (competitive mentions, trend references)   |
  |                                                                |
  |  beta_i  -- DERIVED INTELLIGENCE                               |
  |  ----------------------------------------------------------------
  |  AI-synthesized from the combination of beta_s and beta_d:     |
  |    - Inferred audience segments                                |
  |    - Content affinity scores                                   |
  |    - Channel recommendations and weighting                    |
  |    - Messaging effectiveness scores                            |
  |    - Competitive gap analysis                                  |
  |                                                                |
  |  VECTOR INDEX                                                  |
  |  ----------------------------------------------------------------
  |  All text context embedded for semantic search across the      |
  |  entire business context. Enables retrieval by meaning rather  |
  |  than keyword. Spans all three layers.                         |
  |                                                                |
  +================================================================+
```

---

## 2. Core Components

### 2.1 Ingest Queue

Priority-based asynchronous job queue. Three priority tiers:

```
  INGEST QUEUE
  +---------------------------------------------+
  |  P1  [user-facing saves]       --> immediate |
  |  P2  [background processing]   --> deferred  |
  |  P3  [scheduled jobs]          --> batched    |
  +---------------------------------------------+
       |
       v
  Retry policy: exponential backoff
    Attempt 1: immediate
    Attempt 2: +2s
    Attempt 3: +8s
    Attempt 4: +32s
    Attempt 5: +128s --> Dead Letter Queue
       |
       v
  Dead Letter Queue (DLQ)
    - Failed jobs stored for manual inspection
    - Alerting on DLQ depth thresholds
```

### 2.2 Processing Jobs

Ten job types handle the full spectrum of context extraction:

| Job                  | Input                          | Output                          | Duration    |
|----------------------|--------------------------------|---------------------------------|-------------|
| transcribe_audio     | Audio file                     | Raw transcript                  | 30-120s     |
| extract_context      | Text                           | Themes, entities, signals       | 5-15s       |
| generate_embeddings  | Text chunks                    | Vector embeddings               | 1-3s        |
| categorize_entry     | Calendar fields                | Tags, clusters                  | <1s         |
| analyze_patterns     | All entries                    | Implicit signal report          | 10-30s      |
| compute_delta        | Current vs prev extraction     | Change signals                  | 5-10s       |
| map_performance      | Perf data + calendar entries   | Per-artifact records            | 2-5s        |
| train_cdt            | All context                    | Updated CDT model               | 30-120 min  |
| generate_maps        | CDT inference + context        | Execution maps                  | 10-30s      |
| generate_brief       | Map + full context             | Creator brief                   | 15-45s      |

```
  Processing Pipeline (typical flow for a new activity log entry):

  [Raw Input]
       |
       v
  extract_context  -----> themes, entities, signals
       |
       v
  generate_embeddings ---> vector representation
       |
       v
  compute_delta ---------> what changed since last extraction
       |
       v
  analyze_patterns ------> updated implicit signal report
       |
       v
  [Profile Update] ------> beta_d refreshed, vector index updated
```

### 2.3 Profile Builder

Assembles the composite beta from multiple storage layers. Responsible for:

- Querying beta_s from the business profile tables
- Querying beta_d from the various input-specific tables (calendar, activity,
  vent, integrations, performance)
- Querying beta_i from the CDT inference output tables
- Merging all layers into a single composite view for downstream consumers

### 2.4 RAG Retrieval

When the CDT needs context for inference, it queries the composite view through
a structured retrieval pipeline:

```
  RAG RETRIEVAL SEQUENCE
  ======================

  Step 1:  Pull structured business profile (beta_s)
           --> Business model, ICP, brand voice, products, stack

  Step 2:  Pull recent calendar entries for relevant campaign
           --> What is scheduled, what was recently published

  Step 3:  Semantic search for top-10 relevant context chunks (vectors)
           --> Meaning-matched fragments from across all context

  Step 4:  Pull current CDT beliefs relevant to topic
           --> What the system currently "thinks" about this domain

  Step 5:  Pull performance data for similar past artifacts
           --> How did comparable content perform historically

  Step 6:  Assemble into context window for LLM
           --> Structured prompt with all retrieved context

  +---------+  +---------+  +---------+  +---------+  +---------+
  | beta_s  |  | Calendar|  | Vectors |  |  CDT    |  |  Perf   |
  | Profile |  | Entries |  | top-10  |  | Beliefs |  |  Data   |
  +----+----+  +----+----+  +----+----+  +----+----+  +----+----+
       |            |            |            |            |
       +--------+---+-----+-----+------+-----+------+----+
                |         |            |             |
                v         v            v             v
           +--------------------------------------------+
           |      Assembled Context Window (LLM)        |
           +--------------------------------------------+
```

---

## 3. The Combustion Efficiency Metric

### Context Extraction Efficiency (CEE)

```
                Actionable context produced
  CEE  =  ------------------------------------
              Total input data processed
```

In Raptor, combustion efficiency (eta_c*) measures how completely propellant
converts to useful exhaust gas. Incomplete combustion wastes propellant and
reduces specific impulse.

CEE measures how completely user input converts to retrievable, actionable
business intelligence. Incomplete extraction wastes user effort -- the founder
provided valuable signal that the system failed to capture or make usable.

**Target: CEE > 0.95**

Less than 5% of input should go unextracted. Every piece of information a user
provides should become a retrievable, actionable element in the business context
profile.

What counts as "actionable context":
- Stored in a structured field (beta_s or beta_d)
- Embedded and retrievable via semantic search (vector index)
- Synthesized into a derived insight (beta_i)
- Referenced by at least one downstream inference in the CDT

What does NOT count:
- Raw text stored but never embedded
- Duplicate content that inflates storage without adding signal
- Context stored but never retrieved by any downstream system

---

## 4. V1 -- Proof of Concept

> Raptor 1: Bolted combustion chamber, extensive instrumentation, learning
> about flame dynamics. The goal is to understand the process, not to optimize
> it. Every joint is accessible. Every measurement is logged.

### Architecture

```
  V1 CONTEXT ENGINE
  =================

  [Input Channels]
       |
       v
  +------------------+
  |  Redis Queue     |   <-- Basic FIFO, no priority levels
  |  (single queue)  |
  +--------+---------+
           |
    +------+------+------+------+------+------+------+------+------+------+
    |      |      |      |      |      |      |      |      |      |      |
    v      v      v      v      v      v      v      v      v      v      v
  [W1]   [W2]   [W3]   [W4]   [W5]   [W6]   [W7]   [W8]   [W9]   [W10]
  trans  extr   embed  categ  pattn  delta  perf   train  maps   brief
  cribe  act    dings  orize  erns          map

  Each worker: separate process, separate code path, independent scaling
       |
       v
  +----------------------------------+
  |  Profile Assembly                |
  |  (synchronous, blocking)         |
  |  8+ sequential table queries     |
  |  ~2-5 seconds per full read      |
  +----------------------------------+
       |
       v
  +----------------------------------+
  |  pgvector                        |
  |  Basic cosine similarity         |
  |  No reranking, no hybrid search  |
  +----------------------------------+
```

### What V1 Gets Right

- All 10 job types are implemented and functional
- End-to-end pipeline works: input goes in, context comes out
- pgvector provides basic semantic search capability
- System is heavily instrumented -- every job logs timing and output size

### What V1 Gets Wrong

- **No priority scheduling.** A 2-hour CDT training job and a user-facing save
  go into the same FIFO queue. User waits behind background work.
- **10 separate workers.** Each job type has its own worker process. Cannot
  redistribute capacity. If transcription has a spike, transcription backs up
  while other workers sit idle.
- **Synchronous profile assembly.** Building the composite beta requires 8+
  sequential database queries. Each query waits for the previous one to finish.
  Full profile read takes 2-5 seconds.
- **Naive RAG retrieval.** "Pull everything" approach -- no smart ranking, just
  recency-sorted. Context window fills with recent but potentially irrelevant
  content.
- **No embedding batching.** Each text chunk triggers a separate API call for
  embedding generation. High per-unit cost. High API rate limit pressure.
- **Nightly pattern analysis.** Implicit signal extraction (analyze_patterns)
  runs as a cron job once every 24 hours. A founder can vent about a critical
  concern at 9am and the system will not extract the implicit signal until the
  next morning.
- **No CEE measurement.** Cannot measure how much of the stored context is
  actually being used downstream. No way to know if extraction quality is
  improving or degrading.
- **No deduplication.** If a founder vents about the same problem three times,
  all three entries are embedded separately, stored separately, and potentially
  all retrieved together -- wasting context window space with redundancy.

### V1 Specifications

```
  Workers:                   10 separate processes
  Profile assembly latency:  ~2-5 seconds (synchronous)
  Priority scheduling:       None (FIFO)
  CEE:                       Unmeasured (~0.60-0.70 estimated)
  Embedding cost:            ~$0.10 per 1,000 inputs (no batching)
  Implicit signal latency:   12-24 hours (nightly cron)
  Vector search:             pgvector, cosine similarity, no reranking
```

---

## 5. V2 -- Production Optimization

> Raptor 2: Wider throat, higher throughput, production-optimized chamber
> geometry. The bolts are replaced with welds. The instrumentation ports are
> sealed. The chamber is shaped for flow, not for access.

### Optimizations

**Priority Queue**

Three-tier priority replaces the single FIFO queue:

```
  +---------------------------------------------+
  |  P1  [user-facing saves]                     |
  |       - Calendar entry creation              |
  |       - Activity log save                    |
  |       - Vent mode submission                 |
  |       Always processed first.                |
  +---------------------------------------------+
  |  P2  [background processing]                 |
  |       - Pattern analysis                     |
  |       - Delta computation                    |
  |       - Performance mapping                  |
  |       Processed when no P1 jobs pending.     |
  +---------------------------------------------+
  |  P3  [scheduled jobs]                        |
  |       - CDT training                         |
  |       - Full re-embedding                    |
  |       - Batch analytics                      |
  |       Processed during low-traffic windows.  |
  +---------------------------------------------+
```

User-facing operations are never blocked by background jobs.

**Unified Worker Pool**

Instead of 10 separate workers, a pool of generic workers that pull any job
type. Each worker can execute any of the 10 job types.

```
  V1:  [W1:transcribe] [W2:extract] [W3:embed] ... [W10:brief]
       Fixed allocation. Cannot redistribute.

  V2:  [W] [W] [W] [W] ... [W]
       Any worker pulls any job. Pool scales 2-8 based on queue depth.
       Spike in transcription? More workers pull transcription jobs.
       No manual scaling decisions required.
```

**Batched Embeddings**

Text chunks are accumulated over 30-second windows and embedded in batch API
calls rather than one-at-a-time.

```
  V1:  chunk -> API call -> embedding
       chunk -> API call -> embedding
       chunk -> API call -> embedding
       (3 API calls)

  V2:  chunk -+
       chunk -+--> batch API call --> 3 embeddings
       chunk -+
       (1 API call, 30s accumulation window)

  Cost reduction: ~60%
```

**Materialized Profile View**

The composite beta is pre-computed as a materialized view. When any source table
changes, the materialized view is incrementally updated rather than fully
recomputed.

```
  V1:  READ beta --> query table 1
                 --> query table 2
                 --> query table 3
                 --> ...
                 --> query table 8
                 --> assemble
                 (2-5 seconds)

  V2:  WRITE to any table --> trigger incremental update to materialized view
       READ beta         --> single read from materialized view
                             (<500ms)
```

**Hybrid Search**

RAG retrieval combines three signals instead of relying on vector similarity
alone:

```
  Retrieval Score = w1 * vector_similarity(query, chunk)
                  + w2 * BM25_score(query, chunk)
                  + w3 * recency_weight(chunk.timestamp)

  Where:
    w1 = 0.50  (semantic similarity)
    w2 = 0.30  (keyword match)
    w3 = 0.20  (recency)
```

Retrieval relevance improves approximately 30% over V1's vector-only approach.

**Streaming Implicit Extraction**

Pattern analysis is no longer a nightly batch job. Two-tier approach:

```
  TIER 1 (inline, every input):
    - Running averages updated
    - Frequency counts incremented
    - Keyword co-occurrence matrix updated
    - Lightweight statistical model refreshed
    Latency: <100ms additional per input

  TIER 2 (batched, every 1 hour):
    - Full LLM-based pattern extraction
    - Cross-references all recent Tier 1 signals
    - Generates narrative implicit signal report
    Latency: 1 hour max (down from 24 hours)
```

**CEE Instrumentation**

Every processed input is tagged with a unique trace ID. When downstream systems
(CDT, execution maps, briefs) retrieve context, the trace IDs of retrieved
chunks are logged. CEE is computed as:

```
  CEE = count(chunks retrieved at least once in 30 days)
        ------------------------------------------------
        count(total chunks stored)
```

**Deduplication Layer**

Near-duplicate detection before embedding:

```
  New input --> compute fingerprint (MinHash)
            --> compare against recent fingerprints
            --> if similarity > 0.85:
                  merge with existing entry (append delta only)
            --> else:
                  store as new entry, embed normally
```

Reduces storage bloat and prevents redundant context from consuming retrieval
slots.

### V2 Specifications

```
  Workers:                   1 unified pool (auto-scaling 2-8 based on queue depth)
  Profile assembly latency:  <500ms (materialized view)
  Priority scheduling:       3-tier (P1/P2/P3)
  CEE:                       0.80-0.85
  Embedding cost:            ~$0.04 per 1,000 inputs (batched)
  Implicit signal latency:   <1 hour (streaming Tier 1 + hourly Tier 2)
  Vector search:             Hybrid (vector + BM25 + recency)
  Deduplication:             MinHash fingerprinting, 0.85 threshold
```

---

## 6. V3 -- Deep Integration

> Raptor 3: Internalized flows, integrated turbopump housing, smooth bell with
> no external plumbing. The combustion chamber is no longer a separate component
> -- it is fused into the engine as a continuous flow path from pump to nozzle.

### Vision

**Inline Processing**

No separate ingest queue for most operations. Context extraction, embedding, and
profile update happen within the same database transaction as the write.

```
  V2:  WRITE input --> enqueue job --> worker picks up --> process --> update profile
       (async, 500ms-15s latency between write and profile update)

  V3:  WRITE input + extract context + generate embedding + update profile
       (single transaction, <100ms for most operations)

  The queue only exists for heavy operations:
    - Audio transcription (30-120s)
    - CDT training (30-120 min)
    - Full execution map generation (10-30s)
```

Approximately 80% of operations are processed inline. The remaining 20% use the
queue for compute-intensive work.

**Live Profile**

The Business Context Profile is not assembled on read -- it exists as a
continuously maintained real-time view. Every write operation incrementally
updates the composite. There is no materialization delay.

```
  V1:  Profile is assembled on every read   (2-5s)
  V2:  Profile is materialized, updated on write triggers  (<500ms read)
  V3:  Profile is always current, never "assembled"  (<50ms read)

  The distinction between V2 and V3: in V2, there is still a moment after a
  write where the materialized view is stale. In V3, the profile update IS
  the write -- they are the same operation.
```

**Self-Indexing Context**

New context automatically determines its own retrieval metadata at write time:

```
  New context arrives:
    |
    +--> Which topics is this relevant to?
    |      (auto-tagged from content + business profile)
    |
    +--> Which other context should it be co-retrieved with?
    |      (similarity links created at write time)
    |
    +--> What confidence weight does it carry?
    |      (source reliability * recency * corroboration score)
    |
    +--> Store with full retrieval metadata attached

  No post-hoc categorization step. Context is retrieval-ready the moment
  it is stored.
```

**Adaptive Retrieval**

RAG does not use fixed top-K retrieval. The system dynamically determines how
much context to retrieve based on the inference task complexity:

```
  Task: Simple calendar suggestion
    --> Lean retrieval: beta_s summary + 3 recent calendar entries
    --> Context window: ~500 tokens

  Task: Content topic recommendation
    --> Medium retrieval: beta_s + relevant beta_d + top-5 vectors
    --> Context window: ~2,000 tokens

  Task: Full execution map generation
    --> Deep retrieval: full beta_s + all relevant beta_d + top-20 vectors
        + CDT beliefs + performance history
    --> Context window: ~8,000 tokens

  Task: Creator brief generation
    --> Targeted retrieval: execution map + brand voice + top-10 vectors
        for specific topic + performance benchmarks
    --> Context window: ~4,000 tokens
```

**Cross-Business Intelligence (anonymized)**

Patterns that hold across multiple businesses are extracted from aggregate
anonymized data:

```
  +------------+     +------------+     +------------+
  | Business A |     | Business B |     | Business C |
  |  (B2B SaaS)|     |  (B2B SaaS)|     |  (B2B SaaS)|
  +------+-----+     +------+-----+     +------+-----+
         |                  |                  |
         v                  v                  v
  +----------------------------------------------+
  |  Anonymized Aggregate Pattern Extraction     |
  |                                              |
  |  Signal: "B2B SaaS companies see 2x          |
  |  engagement on Tuesday morning LinkedIn      |
  |  posts"                                      |
  |                                              |
  |  Confidence: 0.78 (based on N=47 businesses) |
  +----------------------------------------------+
         |
         v
  Individual businesses benefit from collective intelligence
  without exposing private data.
```

Privacy model:
- Only statistical patterns are extracted, never raw data
- Minimum cohort size (N>=20) before a pattern is surfaced
- Businesses can opt out of aggregate analysis
- No business can be identified from aggregate patterns

**Predictive Context Pre-Loading**

The system anticipates what context will be needed based on calendar state and
user behavior patterns:

```
  Monday 8:00 AM:
    Calendar shows "LinkedIn post draft" scheduled for Tuesday
    User typically reviews drafts Monday evening

    --> Pre-load into hot cache:
        - Brand voice guidelines
        - LinkedIn performance history
        - Recent LinkedIn-relevant context chunks
        - CDT beliefs about LinkedIn strategy
        - Cross-business LinkedIn timing data

    When user opens the draft at 7:30 PM, context is already warm.
    Inference latency drops from ~2s (cold) to <200ms (pre-loaded).
```

### V3 Specifications

```
  Processing model:          Inline for 80% of operations (queue for heavy compute only)
  Profile read latency:      <50ms (always hot, never assembled)
  Queue priority:            Adaptive (priority inferred from context, not hardcoded)
  CEE:                       >0.95
  Embedding cost:            ~$0.01 per 1,000 inputs (local model + selective embedding)
  Implicit signal latency:   Real-time (inline extraction)
  Vector search:             Adaptive retrieval depth, self-indexing context
  Cross-business intel:      Anonymized aggregate patterns (N>=20 cohort minimum)
  Predictive pre-loading:    Calendar-aware + behavior-pattern-aware hot cache
```

---

## 7. Combustion Chamber Pressure Analogy

In Raptor, higher chamber pressure (Pc) means higher specific impulse, which
means more efficient thrust from the same propellant mass. SpaceX pushed Raptor
from ~250 bar to ~300 bar to ~330 bar across versions -- each increase
representing a harder engineering problem solved for a meaningful performance
gain.

In Refleqt, the analogous metric is **Context Density (Cd)** -- actionable
intelligence per unit of storage.

```
                Actionable intelligence bytes
  Cd  =  -----------------------------------------
              Total stored context bytes
```

Higher context density means more efficient inference: better CDT output quality
per token of context window consumed. A high-Cd system retrieves exactly what
the LLM needs. A low-Cd system retrieves bloated, redundant, low-signal context
that wastes tokens and degrades output quality.

### Evolution of Cd

**V1: Low Cd (~0.3)**

Lots of raw text stored. Much of it redundant or low-signal. No deduplication.
Embeddings generated for everything regardless of value. Vector search retrieves
by similarity alone, often pulling redundant or tangentially relevant chunks.
The LLM context window fills with noise.

**V2: Medium Cd (~0.6)**

Deduplication removes redundant inputs before storage. Batched extraction
improves signal quality. Hybrid search (vector + BM25 + recency) improves
retrieval precision. CEE instrumentation reveals which stored context is
actually used, enabling targeted cleanup.

**V3: High Cd (~0.85)**

Self-indexing context ensures every stored byte carries retrieval metadata.
Cross-referencing links related context at write time. Predictive pruning
removes context that has not been retrieved in 90 days (archived, not deleted).
Adaptive retrieval means the system never over-fetches. Every byte in the
context window earns its place.

### Comparative Metrics

```
  +------------------------------+----------+----------+----------+
  | Metric                       |    V1    |    V2    |    V3    |
  +------------------------------+----------+----------+----------+
  | Context Density (Cd)         |   ~0.3   |   ~0.6   |   ~0.85  |
  | Profile Assembly Latency     |   2-5s   |  <500ms  |   <50ms  |
  | Retrieval Relevance (nDCG@10)|   0.55   |   0.72   |   0.88   |
  | CEE                          |  ~0.65   |  ~0.82   |   >0.95  |
  | Embedding cost per 1K inputs |  $0.10   |  $0.04   |   $0.01  |
  +------------------------------+----------+----------+----------+
```

The progression mirrors Raptor's chamber pressure evolution:

```
  Raptor Pc:    250 bar  -->  300 bar  -->  330 bar
  Refleqt Cd:     0.3    -->    0.6    -->    0.85

  Both curves show diminishing increments but compounding impact.
  Going from 0.3 to 0.6 Cd is "obvious" optimization (dedup, batching).
  Going from 0.6 to 0.85 Cd requires architectural fusion (inline processing,
  self-indexing, adaptive retrieval). The hard engineering is in the last 25%.
```

---

## 8. Closing

The Context Engine is where Refleqt's "combustion" happens. Raw heterogeneous
input -- free-form text from vent sessions, structured fields from calendar
entries, audio recordings from activity logs, performance metrics from
integrations -- becomes structured, retrievable, actionable intelligence.

Just as Raptor's combustion efficiency determines how much chemical energy
converts to kinetic energy (and therefore how much payload reaches orbit), the
Context Engine's extraction efficiency determines how much business signal
converts to AI-usable context (and therefore how good the CDT's strategic
output can be).

A Raptor engine with 70% combustion efficiency wastes 30% of its propellant.
A Context Engine with CEE of 0.65 wastes 35% of the founder's input -- they
told the system something valuable, and the system failed to make it usable.

The V1-to-V3 evolution is the same story SpaceX told with Raptor: start with
a working chamber that you can measure and inspect (V1), optimize the geometry
and flow paths for production throughput (V2), then fuse the chamber into the
engine so completely that the boundaries between components disappear (V3).

```
  V1:  Input --> Queue --> Worker --> Store --> Assemble --> Retrieve
       (6 discrete steps, visible seams between each)

  V2:  Input --> Priority Queue --> Worker Pool --> Materialized View --> Hybrid Retrieve
       (5 steps, seams smoothed, flow optimized)

  V3:  Input --> [extract + embed + store + index] --> Live Profile --> Adaptive Retrieve
       (3 logical steps, inline processing fuses the middle)
```

The combustion chamber is not a separate component in Raptor 3. The Context
Engine is not a separate subsystem in Refleqt V3. It is the continuous flow
path from raw input to actionable intelligence.

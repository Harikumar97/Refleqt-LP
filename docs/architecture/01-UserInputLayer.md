# Subsystem 1: User Input Layer

**Raptor Analogy: Propellant Injection System**

How propellant enters the engine determines combustion quality.
How user data enters Refleqt determines context quality.

In a full-flow staged combustion engine, every drop of propellant must be gasified
before it reaches the main combustion chamber. Raw liquid propellant injected directly
leads to incomplete combustion, instability, and wasted energy. The injection system's
job is to ensure that by the time propellant reaches the chamber, it is in its most
reactive state possible.

The User Input Layer serves the same function. Business context enters Refleqt through
multiple channels, in multiple formats, at unpredictable intervals. This subsystem's
job is to ensure that by the time that context reaches the Context Engine (Subsystem 2),
it is enriched, structured, and immediately combustible -- not raw, partial, or inert.

```
                        USER INPUT LAYER
  ======================================================================

  [Onboarding]  [Calendar]  [Activities]  [Vent Board]  [Tooling]  [Perf Data]
       |             |            |             |            |           |
       v             v            v             v            v           v
  +------------------------------------------------------------------+
  |                    INPUT NORMALIZATION                            |
  |     explicit data capture + implicit signal extraction           |
  +------------------------------------------------------------------+
       |
       v
  +------------------------------------------------------------------+
  |                    CONTEXT QUALITY SCORING                       |
  |     completeness / specificity / novelty / actionability         |
  +------------------------------------------------------------------+
       |
       v
  ============================== OUT ================================
       --> Subsystem 2: Context Engine (CDT / Belief Graph)
```

---

## 1. What This Subsystem Does

The User Input Layer is how business context enters the system. It provides six input
channels, each capturing a different type of intelligence.

### Channel 1: Onboarding

First-time business profile setup. This is the initial data pour -- the moment Refleqt
learns who the business is, what it sells, who it sells to, and how it talks. Onboarding
builds the foundational context that every downstream inference depends on.

### Channel 2: Marketing Calendar

The artifact ledger. Every marketing artifact (blog post, email, social post, landing
page, ad, video, podcast) is logged here with full strategic context. Approximately 50
fields per entry spanning core identity, strategic positioning, SEO configuration,
technical SEO, social/distribution planning, and performance/attribution tracking.

This is the densest single input channel. A well-maintained calendar provides more
structured context per interaction than any other channel.

### Channel 3: Team Context Activities

Structured team exercises that produce two outputs simultaneously: team alignment AND
machine-readable context. These are not surveys. They are designed to generate natural
language output through deliberate friction between team members.

Activities include:

- **Brand Voice Brawl** -- team members independently describe the brand voice, then
  debate divergences. Produces consensus vocabulary and identifies internal inconsistency.
- **Competitor Roast** -- team members critique competitors freely. Produces competitive
  positioning intelligence and reveals perceived differentiation.
- **Customer Story Swap** -- team members share real customer interactions. Produces ICP
  behavioral data and identifies recurring pain/success patterns.
- **Rant Round** -- timed, unfiltered rants about marketing frustrations. Produces
  priority signals and surfaces operational bottlenecks.
- **Roadmap vs Reality** -- team compares planned marketing roadmap against actual
  execution. Produces velocity data and reveals strategic drift.

### Channel 4: Vent Board

Unstructured founder input, available any time, in any format. Text, voice memo, photo
of a whiteboard, stream of consciousness. No fields, no structure, no requirements.

The Vent Board exists because founders think about their business constantly and
unpredictably. The best context often arrives outside of structured input sessions --
in a 2 AM realization, a frustrated post-meeting brain dump, or a half-formed idea
during a commute. This channel captures that.

### Channel 5: Tooling Extraction

Monthly batch pull from the business's existing marketing tools. Connects via OAuth,
pulls relevant data, then disconnects. Supported integrations include:

- **CRM** (HubSpot, Salesforce, Pipedrive) -- deals, leads, pipeline stages
- **Analytics** (Google Analytics, Mixpanel) -- traffic, sessions, user behavior
- **Social** (Meta Business, LinkedIn, Twitter/X) -- post performance, audience data
- **Email** (Mailchimp, Klaviyo, ConvertKit) -- open rates, click rates, list health
- **CMS** (WordPress, Webflow, Ghost) -- content inventory, publish cadence
- **Ads** (Google Ads, Meta Ads, LinkedIn Ads) -- spend, impressions, conversions

The connect-pull-disconnect model minimizes persistent credential exposure while still
capturing the data exhaust that most marketing platforms generate.

### Channel 6: Performance Data Import

Results from deployed marketing artifacts. Once a calendar entry's artifact goes live,
performance data flows back: impressions, engagement, clicks, CTR, conversions, revenue
attribution, and SEO ranking changes.

This channel closes the loop. Without it, Refleqt generates context-aware output but
never learns whether that output worked. Performance data is the combustion exhaust
that feeds the next cycle.

---

## 2. The Full-Flow Principle Applied

Every input channel captures BOTH explicit data (what the user intentionally provides)
AND implicit data (behavioral signals extracted from how they interact). The full-flow
principle demands that nothing is wasted. If a user touches the system, we extract
signal from the touch itself, not just from the content of the touch.

### Onboarding

**Explicit data captured:**
- Business model and revenue structure
- Ideal Customer Profile (ICP) -- demographics, psychographics, pain points
- Brand voice descriptors and sample language
- Competitor list with positioning notes
- Product/service catalog with pricing tiers
- Current marketing stack and tool usage

**Implicit signals extracted:**
- Vocabulary patterns -- what words does the founder naturally use? Technical jargon
  density, formality level, and industry-specific terminology reveal communication style
  more accurately than self-reported brand voice.
- Emphasis signals -- what do they mention first? What do they expand on unprompted?
  What do they repeat? Emphasis reveals true priorities vs. stated priorities.
- Certainty levels -- where do they speak with confidence vs. hedge with qualifiers?
  "We definitely target mid-market" vs. "I think our ICP is probably..." reveals which
  parts of their strategy are settled vs. still forming.
- Knowledge gaps -- which fields are skipped? Where do they pause? Where do they give
  generic answers? Gaps reveal where the system needs to probe deeper in future
  interactions.
- Emotional charge -- which topics trigger intensity? A founder who becomes animated
  discussing competitors has a different strategic posture than one who is indifferent.

### Marketing Calendar

**Explicit data captured (~50 fields organized in tiers):**

Core Identity Fields:
- Artifact title, type, format
- Author/owner, collaborators
- Target publish date, actual publish date
- Status (draft / in review / scheduled / published / archived)
- Funnel stage (TOFU / MOFU / BOFU)
- ICP segment target
- Primary CTA and conversion goal

Strategic Context Fields:
- Campaign/initiative association
- Competitive positioning angle
- Key messaging pillars used
- Content thesis or hypothesis being tested
- Internal priority score

SEO Fields:
- Primary keyword, secondary keywords
- Search intent classification (informational / navigational / transactional)
- Target SERP feature (featured snippet / PAA / local pack)
- Internal linking targets
- Content cluster membership

Technical SEO Fields:
- Target URL/slug
- Canonical URL strategy
- Schema markup type
- Index/noindex directive
- Page speed budget

Social/Distribution Fields:
- Distribution channels (organic social, paid, email, syndication, community)
- Platform-specific copy variants
- Hashtag strategy
- Boost/promotion budget
- Influencer/partner amplification plan

Performance/Attribution Fields:
- KPI targets (impressions, clicks, conversions, revenue)
- Attribution model assignment
- A/B test variant identifier
- Comparison baseline (previous artifact or competitor benchmark)
- Post-publish review date

**Implicit signals extracted:**
- Entry frequency -- how many artifacts per week/month? This is a direct measure of
  marketing velocity and operational capacity.
- Field completion patterns -- which tiers get filled consistently vs. ignored? A team
  that fills SEO fields but skips distribution fields reveals channel bias.
- Campaign clustering -- do artifacts cluster around themes or scatter? Clustering
  reveals strategic coherence; scattering reveals reactive marketing.
- Funnel balance -- what is the TOFU/MOFU/BOFU ratio? Most teams skew heavily toward
  TOFU. The ratio reveals funnel maturity.
- Channel concentration -- how many distribution channels per artifact? Single-channel
  distribution vs. multi-channel reveals operational sophistication.
- Review behavior -- how long between draft and published? Who reviews? How many
  revision cycles? This reveals quality control processes.
- Status flow speed -- time spent in each status. Bottlenecks in "in review" reveal
  approval friction. Bottlenecks in "draft" reveal creation capacity issues.
- Keyword overlap -- how much keyword cannibalization exists across artifacts? High
  overlap reveals poor content strategy coordination.
- Time-to-publish -- gap between target publish date and actual publish date reveals
  planning accuracy and team reliability.

### Team Context Activities

**Explicit data captured:**
- Activity type (Brand Voice Brawl, Competitor Roast, etc.)
- Participant list with roles
- Audio recordings (full session)
- Written notes and outputs (collaborative documents, sticky notes, rankings)
- Session duration

**Implicit signals extracted:**
- Participation depth -- who talks most? Who is silent? Depth asymmetry reveals whose
  perspective dominates the marketing voice vs. who is underrepresented.
- Consistency -- does the same team do activities regularly or sporadically? Consistent
  teams produce compounding context; sporadic teams produce fragmented snapshots.
- Output richness -- word count, specificity, example density. Rich output means the
  team has deep customer knowledge. Thin output means they are guessing.
- Inter-team alignment/divergence -- do team members describe the brand, competitor, or
  customer similarly or differently? Divergence is not bad -- it reveals multiple valid
  perspectives. But high divergence on core positioning indicates strategic misalignment.
- Activity preference -- which activities does the team gravitate toward? Teams that
  prefer Competitor Roast but avoid Customer Story Swap may have competitive awareness
  but weak customer empathy.
- Audio vs. text ratio -- teams that prefer voice produce richer implicit data (tone,
  emphasis, interruption patterns) but less structured explicit data. The ratio informs
  extraction strategy.

### Vent Board

**Explicit data captured:**
- Raw text (or transcribed audio)
- Optional user-applied tags
- Timestamp

**Implicit signals extracted:**
- Frequency and timing -- venting at 11 PM on a Sunday signals different urgency than
  a Monday morning brain dump. Clusters of vents around specific dates may correlate
  with product launches, board meetings, or competitive moves.
- Topic recurrence -- what topics keep coming back? Recurrence reveals unresolved
  strategic tensions. A founder who vents about pricing three times in two weeks has a
  pricing problem, regardless of whether they have labeled it as such.
- Sentiment trajectory -- is overall sentiment improving or degrading over time? Trend
  matters more than absolute level. A founder whose sentiment is declining may be
  approaching burnout or losing confidence in strategy.
- Vocabulary evolution -- does language shift over time? A founder who starts saying
  "enterprise" instead of "SMB" may be pivoting upmarket. Vocabulary drift is an early
  indicator of strategic shifts.
- Length patterns -- short vents (1-2 sentences) suggest quick observations. Long vents
  (paragraphs) suggest deep processing. Sudden length changes suggest something
  significant happened.

### Tooling Extraction

**Explicit data captured:**
- CRM: deal pipeline, lead sources, conversion rates, deal velocity, customer segments
- Analytics: traffic sources, session duration, bounce rates, user flows, page performance
- Social: post engagement, follower growth, audience demographics, content performance
- Email: open rates, click rates, unsubscribe rates, list growth, segment performance
- CMS: content inventory, publish frequency, content types, page structures
- Ads: spend by channel, CPM/CPC/CPA, conversion volumes, ROAS, audience targeting

**Implicit signals extracted:**
- Delta analysis -- the most important implicit signal from tooling extraction is not
  the data itself but what changed since the last extraction. A 30% drop in email open
  rates between months is more actionable than the absolute open rate.
- Trend signals -- three consecutive months of declining organic traffic reveals a
  structural issue. Two consecutive months of increasing CPA reveals channel fatigue.
  The extraction cadence (monthly) is specifically designed to enable trend detection.

### Performance Data Import

**Explicit data captured:**
- Impressions and reach
- Engagement metrics (likes, shares, comments, saves)
- Click-through rate (CTR)
- Conversion events and conversion rate
- Revenue attribution (direct and assisted)
- SEO ranking positions and ranking changes
- Time-on-page and scroll depth

**Implicit signals extracted:**
- Performance patterns across artifact types -- do blog posts consistently outperform
  social posts for conversions? Do videos drive more engagement but less attribution?
  Cross-type patterns reveal channel-content fit.
- Performance patterns across channels -- does LinkedIn outperform Twitter for this
  business? Does email outperform organic social? Cross-channel patterns inform
  distribution strategy.
- Performance patterns across topics -- do certain topics, keywords, or messaging angles
  consistently outperform? Cross-topic patterns reveal audience resonance signals.

---

## 3. V1 -- Proof of Concept

*Raptor 1: Heavy, bolted together, instrumented everywhere. Each subsystem is a discrete
unit. It works -- it fires -- but the architecture is brute-force. Sensor-heavy because
you do not yet trust the system to behave predictably. Every seam is a potential failure
point, so every seam is monitored separately.*

### Architecture

```
  V1 INPUT ARCHITECTURE
  =============================================================================

  [Onboarding Form]         --> POST /api/onboarding       --> onboarding_db
  [Calendar Form]           --> POST /api/calendar          --> calendar_db
  [Activity Upload]         --> POST /api/activities        --> activities_db
  [Vent Board]              --> POST /api/vent              --> vent_db
  [Tooling OAuth]           --> POST /api/tooling/{tool}    --> tooling_db
  [Performance CSV/API]     --> POST /api/performance       --> performance_db

                                              |
                              (nightly batch) v

                         +---------------------------+
                         | Implicit Extraction Jobs  |
                         | (6 separate extractors)   |
                         +---------------------------+
                                    |
                                    v
                         +---------------------------+
                         |   Extracted Signals DB    |
                         +---------------------------+
```

### Characteristics

**Separate endpoints, separate everything.** Each input channel has its own API endpoint,
its own request validation schema, its own database table structure, and its own
processing logic. There is no shared code between the onboarding processor and the
calendar processor. If a bug is fixed in one, the fix does not propagate.

**Inconsistent processing model.** Onboarding and calendar entries are processed
synchronously -- the user waits for a response. Activity audio uploads are processed
asynchronously with a webhook callback. Vent board entries are fire-and-forget with
eventual processing. Tooling extraction is a long-running background job. Performance
imports are synchronous for small datasets, async for large ones. This inconsistency
creates unpredictable user experiences and complicates error handling.

**Naive audio transcription.** Activity audio recordings are sent individually to an
external transcription API (Whisper or Deepgram) on upload. A 45-minute team session
produces a single large audio file that is transcribed as one request. No chunking, no
caching, no batching. If the API is slow or rate-limited, the user waits. If the
transcription fails, it retries the entire file.

**Delayed implicit extraction.** Implicit signals (vocabulary patterns, sentiment,
emphasis, certainty levels) are extracted by a nightly batch job. This means a vent
entry submitted at 9 AM is not available as enriched context until the following
morning. For a system that promises contextual intelligence, 12-24 hour latency on
signal extraction is a significant gap.

**Overwhelming calendar.** All 50 calendar fields are presented simultaneously in a
single form. New users see the full field set on their first calendar entry. Most users
fill core identity fields and skip everything else. The SEO, technical SEO, and
distribution fields sit empty -- not because users do not have that knowledge, but
because the interface does not guide them toward it progressively.

**Sequential onboarding.** Onboarding is a multi-page sequential form: page 1 is
business info, page 2 is ICP, page 3 is brand voice, page 4 is competitors, page 5 is
products, page 6 is marketing stack. Users who drop off at page 3 lose all data from
pages 1-2 (no partial save in V1). The form demands structured input for inherently
unstructured knowledge.

**Per-platform OAuth.** Each marketing tool integration (HubSpot, Google Analytics,
Mailchimp, etc.) has its own OAuth implementation. Adding a new platform requires
writing a new OAuth flow, new token management, new data mapping, and new error
handling. The marginal cost of each new integration is nearly equal to the first.

**No quality measurement.** There is no mechanism to assess whether input data is
complete, specific, novel, or actionable. A single-word vent entry is treated the same
as a detailed three-paragraph analysis. A calendar entry with only a title filled in is
stored identically to one with all 50 fields completed. The system has no way to
distinguish high-quality from low-quality context input.

### V1 Metrics

| Metric                          | V1 Value              |
|---------------------------------|-----------------------|
| Separate API endpoints          | 6                     |
| Separate processing pipelines   | 6                     |
| Avg processing steps per input  | 5-8                   |
| Unused data (captured, unused)  | ~20-30%               |
| Onboarding completion rate      | ~60-70%               |
| Calendar field completion       | ~25% of fields filled |
| Implicit extraction latency     | 12-24 hours (nightly) |
| Context quality score           | Not available         |

---

## 4. V2 -- Production Optimization

*Raptor 2: Part consolidation. The throat widens for higher mass flow. Spark ignition
replaces the toxic pyrophoric igniters -- simpler, cleaner, reusable. Fewer welds, fewer
bolts, fewer failure points. The engine does the same job with dramatically fewer
discrete components.*

### Architecture

```
  V2 INPUT ARCHITECTURE
  =============================================================================

  [Conversational     [Progressive    [Activity    [Vent     [Unified     [Perf
   Onboarding]         Calendar]       Upload]      Board]    OAuth]       Import]
       |                   |              |           |          |           |
       v                   v              v           v          v           v
  +------------------------------------------------------------------+
  |              UNIFIED INGEST API  (single endpoint)               |
  |         channel-specific validation at edge, then normalize      |
  +------------------------------------------------------------------+
       |                                        |
       v                                        v
  +-------------------------+      +-------------------------+
  |    TEXT PIPELINE         |      |    AUDIO PIPELINE       |
  |  - normalize             |      |  - queue & batch        |
  |  - implicit extraction   |      |  - transcribe (batched) |
  |  - quality scoring       |      |  - feed into text pipe  |
  |  - store + embed         |      +-------------------------+
  +-------------------------+
       |
       v
  +------------------------------------------------------------------+
  |                  UNIFIED CONTEXT STORE                            |
  |            (single schema, channel as metadata)                  |
  +------------------------------------------------------------------+
       |
       v
  ============================== OUT ================================
       --> Subsystem 2: Context Engine
```

### Optimizations

**Unified Ingest API.** All six channels feed into a single normalized ingest endpoint.
The endpoint accepts a standardized payload envelope:

```
{
  "channel": "vent | calendar | onboarding | activity | tooling | performance",
  "payload": { ... channel-specific data ... },
  "metadata": {
    "user_id": "...",
    "org_id": "...",
    "timestamp": "...",
    "client_context": { ... device, session, interaction signals ... }
  }
}
```

Channel-specific validation happens at the edge (a vent entry does not need SEO fields;
a calendar entry does). But after validation, all inputs enter the same processing
pipeline. Bug fixes, performance improvements, and extraction upgrades apply to all
channels simultaneously.

**Progressive Calendar Disclosure.** Calendar fields are organized into visibility tiers:

```
  TIER 1 -- Always visible (Core Identity)
  +---------------------------------------------------------+
  | Title | Type | Format | Author | Status | Publish Date  |
  | Funnel Stage | ICP Segment | Primary CTA               |
  +---------------------------------------------------------+

  TIER 2 -- Visible after 3+ entries (Strategic Context)
  +---------------------------------------------------------+
  | Campaign | Positioning Angle | Messaging Pillars        |
  | Content Thesis | Priority Score                         |
  +---------------------------------------------------------+

  TIER 3 -- Visible on demand or after 10+ entries (SEO / Technical)
  +---------------------------------------------------------+
  | Primary Keyword | Secondary Keywords | Search Intent    |
  | Target SERP | Internal Links | Cluster | Slug | Schema  |
  | Canonical | Index Directive | Page Speed Budget         |
  +---------------------------------------------------------+

  TIER 4 -- Visible on demand (Distribution / Performance)
  +---------------------------------------------------------+
  | Distribution Channels | Platform Copy | Hashtags        |
  | Boost Budget | KPI Targets | Attribution Model          |
  | A/B Variant | Comparison Baseline | Review Date         |
  +---------------------------------------------------------+
```

Users are never overwhelmed. They start with the essentials and unlock depth as they
demonstrate readiness. The system tracks which tier each user has reached and maintains
that as their default view.

**Conversational Onboarding.** The sequential form is replaced with a conversational
interface. Instead of presenting 6 pages of fields, the system asks questions:

```
  System: "What does your business do? Tell me in your own words."
  User:   "We make project management software for construction teams."
  System: "Got it -- B2B SaaS, construction vertical. Who typically
           buys your product? The site foreman, the project manager,
           or someone else?"
  User:   "Usually the PM, but the foreman has to actually use it."
  System: "So your buyer and your user are different people. That
           matters for messaging. Let's talk about the PM first..."
```

This conversational flow captures the same data as the form but with two advantages:
(1) the user provides natural language, which yields richer implicit signals, and
(2) the system can adapt the conversation based on previous answers, skipping
irrelevant sections and probing deeper where answers are vague.

Implicit extraction happens in real-time during the conversation, not as a post-hoc
batch job. By the time onboarding completes, both explicit data and implicit signals
are already stored.

**Batched Audio Processing.** Activity audio recordings are queued upon upload and
processed in batch windows every 15 minutes. Benefits:

- Multiple audio files are sent in a single API batch request
- Short silence segments and dead air are pre-trimmed before transcription
- Failed transcriptions are retried within the same batch window
- Cost reduction of approximately 40% versus per-file processing
- User receives a "processing" indicator and is notified when transcription completes

**Unified Implicit Extraction.** A single extraction pipeline handles all text-based
input: vent entries, activity notes, onboarding conversation transcripts, and calendar
text fields. The pipeline uses the same LLM call structure and outputs to the same
schema:

```
  INPUT (raw text from any channel)
       |
       v
  +-----------------------------------+
  | EXTRACTION PIPELINE               |
  |  1. Vocabulary analysis           |
  |  2. Sentiment classification      |
  |  3. Emphasis/certainty detection  |
  |  4. Topic extraction              |
  |  5. Entity recognition            |
  |  6. Novelty scoring (vs existing) |
  +-----------------------------------+
       |
       v
  OUTPUT (structured signal object, same schema regardless of source)
```

One pipeline to maintain. One set of prompts to optimize. One output format for
downstream consumers.

**OAuth Abstraction Layer.** A single OAuth management service abstracts platform-specific
OAuth implementations behind a unified interface:

```
  oauth_service.connect(platform="hubspot", org_id="...")
  oauth_service.pull(platform="hubspot", org_id="...", data_types=["deals", "leads"])
  oauth_service.disconnect(platform="hubspot", org_id="...")
```

Adding a new platform requires only a platform adapter (token exchange endpoints, data
schema mapping, rate limit configuration) -- not a full OAuth implementation. The
marginal cost of the 10th integration is a fraction of the 1st.

**Context Quality Scoring.** Every input receives a quality score on a 0-100 scale,
composed of four dimensions:

```
  QUALITY SCORE = weighted average of:

  Completeness (25%)  -- what percentage of applicable fields are filled?
  Specificity  (30%)  -- how specific vs. generic is the content?
                         "We target mid-market SaaS" = low specificity
                         "We target 50-200 employee B2B SaaS companies
                          spending >$5k/mo on dev tools" = high specificity
  Novelty      (25%)  -- does this input add new information vs.
                         repeating existing context?
  Actionability(20%)  -- can downstream systems use this input to
                         modify beliefs or generate output?
```

Inputs scoring below a threshold trigger gentle, contextual prompts:

- Low completeness: "You left the distribution plan empty -- would you like suggestions
  based on your past successful posts?"
- Low specificity: "Your ICP description is broad. Could you narrow it to a specific
  job title or company size?"
- Low novelty: "This seems similar to what you shared last week. Has anything changed,
  or is this a reinforcement?"

### V2 Metrics

| Metric                          | V1 Value       | V2 Value         |
|---------------------------------|----------------|------------------|
| Separate API endpoints          | 6              | 1 (unified)      |
| Separate processing pipelines   | 6              | 2 (text + audio) |
| Avg processing steps per input  | 5-8            | 3-4              |
| Unused data (captured, unused)  | ~20-30%        | <10%             |
| Onboarding completion rate      | ~60-70%        | ~85-90%          |
| Calendar field completion       | ~25%           | ~40-50%          |
| Implicit extraction latency     | 12-24 hours    | <15 minutes      |
| Context quality score           | Not available  | Available        |

---

## 5. V3 -- Deep Integration

*Raptor 3: Secondary flows are internalized. The heat shield is eliminated -- the engine
manages its own thermal environment. The bell is smooth, continuous, with no welds or
joints. There is no longer a clear boundary between "injection" and "combustion." The
propellant enters the chamber already gasified, already at temperature, already at
pressure. The distinction between preparation and ignition dissolves.*

### Architecture

```
  V3 INPUT ARCHITECTURE
  =============================================================================

  AMBIENT CAPTURE                     INTENTIONAL INPUT
  (always running)                    (user-initiated)
  +------------------+                +------------------+
  | Slack messages   |                | Vent Board       |
  | Email threads    |                | Calendar entry   |
  | Meeting records  |                | Activity session |
  | Website changes  |                | Manual import    |
  +------------------+                +------------------+
         |                                    |
         v                                    v
  +------------------------------------------------------------------+
  |                  UNIFIED CONTEXT STREAM                           |
  |   (no channel distinction -- source is metadata, not structure)  |
  +------------------------------------------------------------------+
         |
         | inline extraction (no separate step)
         | embedding generation
         | quality scoring
         | cross-reference against existing beliefs
         | gap detection
         v
  +------------------------------------------------------------------+
  |                  CONTEXT STORE (write = process)                  |
  +------------------------------------------------------------------+
         |                                    |
         v                                    v
  --> Subsystem 2: Context Engine        SELF-HEALING LOOP
                                         (proactive gap filling)
                                               |
                                               v
                                         "Try the Pricing Roast
                                          activity with your team."
```

### Capabilities

**Ambient Context Capture.** The system no longer waits for users to open Refleqt and
deliberately input data. With appropriate permissions, it passively monitors the
business's digital workspace:

- Slack channels tagged as marketing-relevant are monitored for strategy discussions,
  campaign updates, and competitive intelligence mentions
- Email threads involving marketing stakeholders are parsed for decisions, feedback,
  and directional shifts
- Meeting transcripts (from Zoom, Google Meet, Teams) are processed for marketing-
  relevant segments
- Website changes (detected via periodic crawling) signal positioning shifts, new
  product launches, or messaging evolution

The user does not "feed" the engine. The engine feeds itself. The six original channels
still exist as intentional input options, but the system no longer depends on them as
the sole source of context.

**Predictive Field Completion.** When a user begins a new calendar entry, the system
pre-populates fields from accumulated context:

```
  User types: "Q2 Case Study - Acme Corp Implementation"

  System auto-populates:
  - Type: Case Study
  - Format: Long-form written (user's default for case studies)
  - Funnel Stage: BOFU (case studies are historically BOFU for this org)
  - ICP Segment: Enterprise Manufacturing (Acme Corp is in this segment)
  - Primary Keyword: "manufacturing project management case study"
    (derived from existing keyword strategy + topic)
  - Distribution: LinkedIn, Email Newsletter, Sales Enablement
    (user's historical distribution pattern for case studies)
  - KPI Target: 50 downloads (based on average case study performance)

  User reviews, confirms 5 of 7 predictions, corrects 2.
  Corrections feed back as context updates.
```

The calendar evolves from an input form to a confirmation interface. The user's job
shifts from filling in fields to validating and correcting system predictions.

**Zero-Form Onboarding.** No structured intake process exists. New user onboarding:

```
  Step 1: User connects their website URL
  Step 2: User connects one social media account

  System:
  - Crawls the website: extracts product descriptions, pricing model,
    team page, about page, blog content, meta descriptions, schema markup
  - Analyzes social account: extracts posting patterns, voice/tone,
    audience engagement, content themes, visual style
  - Cross-references: builds initial ICP hypothesis, competitive
    positioning, brand voice profile, content strategy baseline

  Step 3: User's first vent entry or activity session fills remaining gaps
  Step 4: There is no step 4. Onboarding is complete.
```

The system constructs a business profile from public data and refines it from the first
interaction onward. There is no discrete "onboarding phase" -- the system is always
onboarding, always refining.

**Inline Implicit Extraction.** There is no separate extraction step, no pipeline, no
batch. Extraction is embedded in the write operation:

```
  TRADITIONAL (V1/V2):
  write(data) --> store(data) --> ... later ... --> extract(data) --> store(signals)

  V3:
  write(data) --> process_and_store(data + signals + embeddings)
                  [single atomic transaction]
```

When a vent entry is written to the context store, the write operation itself generates
embeddings, extracts structured signals (sentiment, topics, entities, vocabulary
patterns), scores quality, and cross-references against existing beliefs. There is no
delay between input and enrichment. By the time the write operation returns, the context
is fully combustible.

**Self-Healing Data Gaps.** The system maintains a map of context coverage -- which
areas of the business's marketing context are well-understood and which have gaps:

```
  CONTEXT COVERAGE MAP (example)
  ====================================================================
  Brand Voice         [##########] 95%   -- well covered
  ICP Definition      [########  ] 80%   -- good
  Competitor Intel    [######    ] 60%   -- moderate
  Content Strategy    [#######   ] 70%   -- good
  Pricing/Positioning [##        ] 20%   -- CRITICAL GAP
  Channel Strategy    [#####     ] 50%   -- moderate
  Customer Feedback   [###       ] 30%   -- needs attention
  ====================================================================
```

When gaps are detected, the system does not passively wait for the user to fill them.
It proactively suggests actions:

- Critical gaps trigger direct prompts: "We have very little context on your pricing
  model and positioning. Could you share how you price relative to competitors?"
- Moderate gaps trigger activity suggestions: "A Customer Story Swap session would
  significantly improve our understanding of your buyers. Want to schedule one?"
- Emerging gaps (detected from declining context freshness) trigger refresh prompts:
  "Your competitor intelligence is 3 months old. Has anything changed in your
  competitive landscape?"

**Cross-Channel Inference.** Inputs are no longer channel-isolated. When a new input
arrives from any source, it is immediately cross-referenced against all existing context:

```
  VENT ENTRY: "I'm starting to think we should go upmarket.
               Our best customers are all enterprise."

  CROSS-CHANNEL EFFECTS:
  - ICP belief updated: enterprise weighting increases
  - Calendar entries tagged TOFU: flagged for review
    ("current TOFU content targets SMB -- may need enterprise variants")
  - Competitor list: enterprise competitors surfaced for analysis
  - Next activity suggestion: "Roadmap vs Reality" to assess whether
    current marketing execution aligns with upmarket shift
  - Tooling extraction priority: CRM deal data re-analyzed with
    enterprise filter applied
```

No channel isolation. A single vent entry ripples through every context dimension.
The channels are not separate intake systems -- they are different lenses on the same
evolving business context.

### V3 Metrics

| Metric                          | V1 Value       | V2 Value         | V3 Value                     |
|---------------------------------|----------------|------------------|------------------------------|
| Separate API endpoints          | 6              | 1 (unified)      | 1 (stream-based)             |
| Separate processing pipelines   | 6              | 2 (text + audio) | 1 (inline with storage)      |
| Avg processing steps per input  | 5-8            | 3-4              | 1-2                          |
| Unused data (captured, unused)  | ~20-30%        | <10%             | <2%                          |
| Onboarding completion rate      | ~60-70%        | ~85-90%          | N/A (no discrete onboarding) |
| Calendar field completion       | ~25%           | ~40-50%          | ~70-80% (auto-populated)     |
| Implicit extraction latency     | 12-24 hours    | <15 minutes      | 0 (inline with write)        |
| Context quality score           | Not available  | Available        | Continuous + predictive      |

---

## 6. Evolution Summary

```
  V1 --> V2 --> V3  EVOLUTION TRAJECTORY
  =============================================================================

  INPUT CHANNELS
  V1: 6 separate systems       |||||||
  V2: 1 endpoint, 2 pipelines  |||
  V3: 1 unified stream         |

  PROCESSING STEPS PER INPUT
  V1: 5-8 steps                ||||||||
  V2: 3-4 steps                ||||
  V3: 1-2 steps                ||

  UNUSED DATA
  V1: 20-30%                   ======
  V2: <10%                     ==
  V3: <2%                      .

  EXTRACTION LATENCY
  V1: 12-24 hours              ========================
  V2: <15 minutes              =
  V3: 0 (inline)               (none)

  ONBOARDING FRICTION
  V1: 6-page form              ======
  V2: Conversational           ===
  V3: Zero-form                (none)
```

### Comparison Table

| Dimension                    | V1                     | V2                       | V3                            |
|------------------------------|------------------------|--------------------------|-------------------------------|
| Input channels               | 6 separate systems     | 1 endpoint, 2 pipelines  | 1 unified stream              |
| Processing steps per input   | 5-8                    | 3-4                      | 1-2                           |
| Unused data                  | 20-30%                 | <10%                     | <2%                           |
| Onboarding completion rate   | 60-70%                 | 85-90%                   | N/A (no discrete step)        |
| Calendar field utilization   | ~25%                   | ~40-50%                  | ~70-80% (auto-populated)      |
| Implicit extraction latency  | 12-24 hours (nightly)  | <15 min (near-realtime)  | 0 ms (inline with write)      |
| Context quality scoring      | Not available          | Per-input scoring        | Continuous + predictive       |
| User effort per unit context | High                   | Moderate                 | Low (ambient + predictive)    |
| New platform integration cost| Full implementation    | Adapter only             | Auto-discovered               |
| Cross-channel inference      | None                   | Limited (shared store)   | Full (immediate cross-ref)    |

---

## 7. The Propellant Injection Lesson

The Raptor engine's evolution tells a specific story about propellant injection.

In Raptor 1, propellant enters the preburners as liquid, is partially gasified, and is
injected into the main chamber through discrete, individually machined injector elements.
Each element is a separate part, separately welded, separately tested. The propellant
arrives at the chamber in a usable but imperfect state -- not fully gasified, not
perfectly mixed, not at optimal temperature. Combustion happens, but with margins left
on the table.

In Raptor 2, the injection pathway is consolidated. Fewer parts, wider throat, better
mixing. The propellant arrives hotter, more uniformly gasified, with fewer pressure
drops along the way. The chamber receives better fuel and produces more thrust per unit
propellant.

In Raptor 3, the distinction between "injection" and "combustion" begins to blur. The
propellant pathway is so deeply integrated into the engine's thermal management that by
the time propellant reaches the chamber, it is already at combustion temperature, already
at combustion pressure, already in its most reactive state. The chamber does not need to
"prepare" the fuel. It simply ignites.

Refleqt's User Input Layer follows the same trajectory. In V1, business context enters
as raw, unprocessed, channel-isolated data. The Context Engine (Subsystem 2) must do
significant work to make that data useful -- extracting implicit signals, resolving
cross-channel conflicts, filling gaps. The engine receives cold liquid and must gasify
it internally.

In V2, context arrives pre-processed. Implicit signals are extracted at ingest.
Quality is scored. Channels are unified. The Context Engine receives warm gas -- mostly
ready, with less preparation needed.

In V3, context arrives fully enriched, cross-referenced, and quality-validated in the
same transaction that stores it. There is no separate "extraction" or "processing"
phase. The write IS the processing. The Context Engine receives hot gas at chamber
pressure. Combustion is immediate. Nothing is wasted.

This is the full-flow principle applied to data ingestion: every drop of context that
enters the system must be fully gasified -- enriched, structured, cross-referenced, and
scored -- before it reaches the chamber where beliefs are formed and outputs are
generated. Raw liquid in, hot gas out. That is the job of the User Input Layer.

---

*Subsystem 1 of 6. Next: [02-ContextEngine.md] -- The Combustion Chamber.*

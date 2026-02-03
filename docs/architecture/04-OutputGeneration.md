# Subsystem 4 -- Output Generation

> Raptor Analogy: **The Nozzle** -- where combustion gas converts to directed thrust.
> The nozzle's expansion ratio determines how efficiently thermal energy becomes
> kinetic energy. Output Generation's "expansion ratio" determines how efficiently
> accumulated context becomes actionable marketing deliverables.

---

## Architectural Constraints

- **BYOK Model**: Users bring their own API keys for LLM calls (OpenAI, Anthropic,
  etc.). Refleqt does NOT pay for LLM inference.
- **Client-Side Compute**: Traditional ML algorithms and lightweight neural nets run
  on the user's machine (desktop app). Heavy LLM calls go through the user's API key.
- **Distribution**: Web playground (lightweight/demo) + Desktop app (full version with
  local compute).
- **V1 is free or almost free** because compute costs are borne by the user.

---

## What This Subsystem Produces

Three output types, all generated from the CDT + Business Context Profile:

### 1. Execution Maps

Complete marketing initiative packages (buyable in marketplace):

- Title + rationale ("why now" based on current context + signals)
- Contents list (every artifact included)
- Per-artifact brief outline
- Recommended timeline
- Estimated cost (based on creator marketplace pricing)
- Predicted success metrics (from belief system)
- ICP/persona targeting
- Distribution strategy per artifact

### 2. Creator Briefs

When a customer buys a map, each artifact gets a detailed brief for anonymous
creators:

- Artifact type and format specs
- Target audience (specific persona)
- Key messages (3-5 core points, priority-ordered)
- Tone and voice guidelines with examples
- SEO requirements (keyword, headers, meta)
- Technical specs (word count, dimensions, format)
- Success metrics (measurable outcome)
- What to avoid (common misalignments)
- Reference material (anonymized examples)
- Creator never sees business name

### 3. Calendar Suggestions

Daily AI-generated suggestions appearing as ghost entries:

- Check calendar gaps, recent performance, market signals, competitor moves
- CDT generates 3-5 suggestions ranked by expected impact
- Lower compute cost than full execution maps

---

## The BYOK Generation Pipeline

```
User requests generation (map/brief/suggestion)
    |
    v
Context Assembly (LOCAL -- runs on user's machine)
+-- Pull structured profile from local DB
+-- Semantic search across local vector store
+-- Retrieve relevant beliefs
+-- Assemble context window
    |
    v
Prompt Construction (LOCAL)
+-- Template selection based on output type
+-- Context injection into prompt
+-- Token budget management
    |
    v
LLM Call (USER'S API KEY)
+-- Request sent to OpenAI/Anthropic/etc.
+-- User's key, user's cost
+-- Response streamed back
    |
    v
Post-Processing (LOCAL)
+-- Parse structured output
+-- Validate against business constraints
+-- Score against belief system predictions
+-- Store with generation metadata
```

---

## Compute Optimization: Where Traditional ML Replaces LLMs

Not everything needs an LLM. Output Generation uses a hierarchy of compute:

| Task                       | Compute Method              | Runs On        | Why Not LLM?                                         |
|----------------------------|-----------------------------|----------------|------------------------------------------------------|
| Template selection         | Decision tree classifier    | Client CPU     | 15 templates, simple classification, <1ms            |
| Context relevance ranking  | TF-IDF + cosine similarity  | Client CPU     | Fast, deterministic, no API call needed               |
| Token budget allocation    | Rule-based optimizer        | Client CPU     | Mathematical optimization, not language task           |
| Belief-based filtering     | Logistic regression         | Client CPU     | Binary relevance decisions on belief vectors           |
| Output quality scoring     | Small neural net (MLP)      | Client CPU     | Trained on quality labels, inference is instant        |
| Calendar gap detection     | Time-series analysis        | Client CPU     | Classical statistics, not a language problem            |
| Competitive signal matching| KNN classifier              | Client CPU     | Pattern matching across known competitor profiles      |
| Full map generation        | LLM (GPT-4/Claude)         | User's API key | Creative reasoning, language generation                |
| Brief generation           | LLM (GPT-4/Claude)         | User's API key | Nuanced writing requiring business context             |
| Suggestion generation      | LLM (GPT-3.5/Haiku)        | User's API key | Shorter outputs, lighter model sufficient              |

**The principle**: Use the cheapest, fastest compute that produces acceptable quality.
LLMs are the last resort, not the first tool. This is like Raptor using turbopumps
(mechanical) instead of pressure-fed systems (wasteful) -- match the mechanism to
the task.

---

## V1 -- Proof of Concept (Free Tier)

*Raptor 1: Proves the nozzle design works. Heavy, not optimized for production.*

- All generation goes through user's API key (BYOK). Zero Refleqt LLM cost.
- Context assembly is basic -- pull recent entries, no smart retrieval ranking.
- Single prompt template per output type (no template selection logic).
- No local ML models yet -- quality scoring is manual/absent.
- Calendar suggestions refresh on manual trigger, not automatically.
- Output is raw LLM response with minimal post-processing.
- Token budget not optimized -- sometimes sends too much context (user pays for
  extra tokens).
- No streaming -- user waits for full response.
- Web playground only (no desktop app yet).
- Execution maps are generated but not linked to marketplace (marketplace does not
  exist in V1).

### V1 Specs

```
LLM calls per execution map:      3-5 (one per section)
Average tokens per map generation: ~8,000-12,000 input + ~3,000 output
User cost per map:                 ~$0.15-0.40 (at GPT-4 pricing)
User cost per suggestion:          ~$0.01-0.03
Generation latency:                15-30 seconds (sequential LLM calls)
Local compute:                     none (all cloud API)
```

---

## V2 -- Production Optimization

*Raptor 2: Optimized expansion ratio, production nozzle geometry.*

- **Local ML Pre-Processing**: Decision trees, TF-IDF, and small neural nets run on
  client machine for template selection, context ranking, quality scoring.
- **Smart Token Management**: Local ML ranks context by relevance, trims to optimal
  token budget before API call. Reduces average input tokens by 40%.
- **Batched Brief Generation**: When customer buys a 5-artifact map, briefs are
  generated in a single batched prompt (with structured output parsing) instead of
  5 separate calls.
- **Streaming Output**: LLM responses stream to UI as generated. User sees output
  building in real-time.
- **Desktop App Launch**: Full local compute for ML models. Web playground remains
  for light use.
- **Template Library**: 15+ prompt templates trained on output quality data. Decision
  tree selects optimal template based on artifact type, audience, channel.
- **Suggestion Automation**: Calendar suggestions refresh daily at a scheduled time
  using lightweight LLM call (GPT-3.5/Haiku).
- **Output Versioning**: All generated outputs versioned. User can regenerate with
  different parameters. Previous versions preserved.

### V2 Specs

```
LLM calls per execution map:      1-2 (batched)
Average tokens per map generation: ~5,000-7,000 input + ~3,000 output
User cost per map:                 ~$0.08-0.20 (40% reduction)
User cost per suggestion:          ~$0.005-0.01
Generation latency:                8-15 seconds (streaming, batched)
Local compute:                     ~30% of pipeline (ML pre/post-processing)
```

---

## V3 -- Deep Integration

*Raptor 3: Internalized flows, maximum efficiency.*

- **Hybrid Local-Cloud Generation**: Small local transformer (distilled, ~1B params)
  handles calendar suggestions and simple outputs entirely on-device. LLM API only
  called for complex generation (full maps, detailed briefs).
- **Speculative Generation**: System pre-generates likely-needed outputs in background
  during idle time. When user opens marketplace, maps are already waiting -- generated
  speculatively from calendar state + signals.
- **Adaptive Model Routing**: System automatically routes generation requests to the
  cheapest sufficient model. Simple suggestion goes to local model. Medium brief goes
  to GPT-3.5/Haiku. Complex map goes to GPT-4/Sonnet. User's API cost minimized.
- **Brief-to-Deliverable Prediction**: Local neural net predicts deliverable quality
  from brief parameters before creator assignment. Low-prediction briefs get
  automatically refined before going to marketplace.
- **Zero-Latency Suggestions**: Calendar suggestions generated locally, instantly,
  without API call. Only complex/novel suggestions trigger cloud LLM.

### V3 Specs

```
LLM API calls per map:            1 (single optimized call)
Average tokens:                    ~3,000-5,000 input + ~3,000 output
User API cost per map:             ~$0.04-0.10
User cost per suggestion:          $0 (local) to $0.005 (complex)
Generation latency:                <3 seconds (local), 5-10 seconds (cloud)
Local compute:                     ~70% of pipeline
```

---

## The Nozzle Expansion Ratio Lesson

In Raptor, the nozzle expansion ratio (exit area / throat area) determines how
efficiently hot gas converts to directed thrust. Too low and thermal energy is
wasted. Too high and flow separation occurs.

In Refleqt Output Generation, the "expansion ratio" is how much of the accumulated
business context actually gets expressed in generated outputs:

- **Too low expansion** = generic outputs that do not use available context.
- **Too high expansion** = outputs bloated with irrelevant context that confuses
  rather than helps.

```
V1: Low expansion
    Basic context retrieval, generic outputs.

V2: Optimized expansion
    ML-ranked context, right-sized for each output type.

V3: Adaptive expansion
    Dynamic context window sized to task complexity.
```

---

## Evolution Summary

| Metric                  | V1           | V2            | V3                          |
|-------------------------|--------------|---------------|-----------------------------|
| User API cost per map   | $0.15-0.40   | $0.08-0.20    | $0.04-0.10                  |
| Local compute share     | 0%           | 30%           | 70%                         |
| Generation latency      | 15-30s       | 8-15s         | <3s (local), 5-10s (cloud)  |
| Token efficiency        | ~60%         | ~80%          | ~95%                        |
| Pre-generated content   | None         | None          | Speculative generation      |

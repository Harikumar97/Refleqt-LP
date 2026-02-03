# Subsystem 7: Recommendation Engine

## Raptor Analogy: Regenerative Cooling

In the Raptor engine, regenerative cooling captures waste heat from combustion and uses it to preheat propellant before injection. Heat that would otherwise destroy the engine becomes fuel for greater efficiency. Nothing is wasted.

The Recommendation Engine applies the same principle to data intelligence. Every user action -- accepting a suggestion, ignoring it, modifying it, or rejecting it -- becomes fuel for improving future recommendations. Behavioral "exhaust" is captured and recycled back into the system.

---

## What This Subsystem Does

The Recommendation Engine is the meta-system that makes Refleqt get smarter over time. It tracks:

1. What the system recommends
2. What users do with those recommendations
3. Whether those actions led to good outcomes
4. Patterns that can improve future recommendations

This creates a self-improvement loop where every interaction, even negative ones, contributes to system intelligence.

---

## Architectural Context

**BYOK Model**: Users bring their own API keys for LLM calls. Refleqt does not pay for AI inference.

**Client-Side Compute**: All recommendation learning runs locally on the user's machine. Traditional ML algorithms and lightweight neural networks handle recommendation optimization without requiring LLM calls.

**V1 is Free**: The recommendation engine improves all other subsystems at no marginal cost. Data collection and local ML have near-zero operational expense.

**Platform Split**:
- Web playground: Light version with basic recommendation tracking
- Desktop app: Full version with complete recommendation learning

---

## The Self-Improvement Loop

```
System recommends something
         |
         v
User takes action (accept / modify / ignore / reject)
         |
         v
Outcome observed (did it work?)
         |
         v
Recommendation quality scored
         |
         v
Patterns extracted --> Policy updates
         |
         v
Future recommendations improve
```

Each cycle through this loop generates training signal. Over time, the system learns which recommendations work for which users in which contexts.

---

## What Gets Tracked

Every recommendation the system makes is logged with full lineage:

```
recommendation_outcomes:
  recommendation_id          -- unique identifier
  business_id                -- which business received this
  recommendation_type        -- activity | calendar_suggestion | execution_map
  recommendation_content     -- what was recommended
  recommended_at             -- timestamp
  user_action                -- accepted | ignored | modified | rejected
  action_timestamp           -- when user responded
  context_extracted          -- what the system learned from the outcome
  context_quality_score      -- richness of extracted context
  downstream_impact          -- did this improve future outputs?
  recommendation_model_version -- which CDT version generated this
```

---

## Types of Recommendations Tracked

| Type                  | What                                      | User Actions Tracked           |
|-----------------------|-------------------------------------------|--------------------------------|
| Activity suggestions  | "Try the Competitor Roast activity"       | Completed / skipped / partial  |
| Calendar suggestions  | Ghost entries for posts/campaigns         | Added / modified / dismissed   |
| Execution maps        | Full marketing initiative packages        | Purchased / viewed / ignored   |
| Brief refinements     | "Consider adding ROI data"                | Applied / skipped              |
| Timing suggestions    | "Best time to post: Tuesday 9am"          | Followed / ignored             |
| Channel suggestions   | "LinkedIn over Twitter for this"          | Followed / ignored             |

---

## The Waste Signal Principle

In regenerative cooling, exhaust heat that would otherwise be wasted preheats incoming propellant. In Refleqt, user behaviors that would otherwise be lost train the system:

| "Waste" Signal                    | What It Teaches                                                              |
|-----------------------------------|------------------------------------------------------------------------------|
| User ignores suggestion           | Relevance calibration -- this type is low-priority for this user             |
| User modifies suggestion          | Preference learning -- user's version is ground truth for similar futures    |
| User accepts then deletes         | Quality signal -- looked good initially, did not hold up                     |
| Time between suggestion and action| Urgency calibration -- how pressing different suggestion types are           |
| Partial activity completion       | Engagement depth -- which activity formats work for this team                |
| Suggestion clicked but not used   | Curiosity vs action gap -- needs clearer value prop or easier activation     |

Every signal, positive or negative, becomes training data.

---

## Local ML for Recommendation Learning (Client-Side)

All recommendation learning runs locally. No LLM calls required:

| Task                      | Algorithm               | Why Client-Side                    |
|---------------------------|-------------------------|------------------------------------|
| Action classification     | Simple rules            | User privacy, instant response     |
| Relevance scoring         | Logistic regression     | Updates on each action             |
| Timing pattern detection  | Time-series clustering  | Personal usage patterns            |
| Suggestion ranking        | Multi-armed bandit      | Exploration vs exploitation        |
| Context quality scoring   | Decision tree           | Fast, interpretable                |
| Preference embedding      | Small neural net (MLP)  | Learned from interaction history   |

These algorithms are lightweight enough to run on any modern desktop while providing meaningful personalization.

---

## V1 -- Proof of Concept

*Raptor 1: Basic heat recovery. Prove regenerative principle works.*

### V1 Reality

V1 focuses on data collection without automatic policy updates. The infrastructure exists to capture signals, but the recycling mechanism is manual.

**What V1 Does:**
- Basic action logging: Records accept/ignore/modify for calendar suggestions
- Activity tracking: Counts which activities are completed, basic completion rate
- Manual pattern review: Developer/founder can query logs to see what works
- Performance data flows to CDT as training signal

**What V1 Does Not Do:**
- No automatic policy updates -- data collected but not yet self-improving
- No lineage tracking -- cannot trace recommendation back to source context
- No cross-user learning
- No recommendation fatigue detection

### V1 Specifications

```
Actions tracked:        3 (accept, ignore, modify)
Policy updates:         Manual / none
Lineage tracking:       No
Self-improvement:       Passive (data collected, not acted on)
Storage:                Local SQLite
LLM calls required:     None
Cost:                   Near-zero
```

### V1 Data Schema (Simplified)

```
recommendations_v1:
  id
  type
  content
  timestamp
  user_action (accept | ignore | modify)
  action_timestamp
```

---

## V2 -- Production Optimization

*Raptor 2: Efficient heat exchangers. Production-ready cooling.*

### V2 Capabilities

V2 transforms passive data collection into active system improvement. The regenerative loop closes.

**Full Lineage Tracking**

Every recommendation linked to its complete chain:
```
Context --> CDT Version --> Recommendation --> User Action --> Outcome
```

This allows the system to identify which contexts and CDT configurations produce recommendations users actually follow.

**Automated Policy Updates**

Monthly batch job analyzes recommendation outcomes:
- Updates ranking algorithms based on acceptance rates
- Adjusts suggestion thresholds based on user responsiveness
- Reorders activity recommendations based on completion rates
- Deprioritizes low-yield activities

**Multi-Armed Bandit for Suggestions**

```
                    +-------------------+
                    |   New Suggestion  |
                    |   (Explore: 20%)  |
                    +-------------------+
                            |
User Request  -->  [Bandit Algorithm]
                            |
                    +-------------------+
                    |  Proven Suggestion |
                    |  (Exploit: 80%)   |
                    +-------------------+
```

The system balances exploring new suggestion types with exploiting known effective ones. Exploration rate decreases as confidence increases.

**Preference Learning**

When users modify suggestions, their version becomes training data:

```
System suggests:    "Post on LinkedIn at 9am Tuesday"
User modifies to:   "Post on LinkedIn at 2pm Tuesday"
System learns:      This user prefers afternoon posting
Next suggestion:    Pre-adjusted toward afternoon timing
```

**Context Quality Feedback**

Activities that produce high-quality context (measured by downstream recommendation acceptance) get recommended more often. Low-yield activities are deprioritized.

**A/B Testing Framework**

Controlled experiments on suggestion variants:
- Variant A: "Consider posting about X"
- Variant B: "Your competitors are posting about X"
- System measures acceptance rate, tracks which version performs better
- Winning variant becomes default

### V2 Specifications

```
Actions tracked:        6 (full action taxonomy)
Policy updates:         Monthly automated
Lineage tracking:       Full chain
Self-improvement:       Active (policies evolve)
Storage:                Local SQLite + cloud backup
A/B testing:            Yes
Multi-armed bandit:     Yes
LLM calls required:     None
```

### V2 Data Schema

```
recommendations_v2:
  id
  business_id
  type
  content
  context_hash              -- links to source context
  cdt_version               -- which CDT generated this
  timestamp
  user_action               -- expanded taxonomy
  action_timestamp
  modification_content      -- if modified, what user changed to
  outcome_observed          -- downstream success indicator
  lineage_chain             -- full trace from context to outcome
```

---

## V3 -- Deep Integration

*Raptor 3: Integrated cooling channels. Maximum efficiency.*

### V3 Capabilities

V3 achieves continuous learning with cross-user intelligence. The regenerative system operates at maximum efficiency.

**Continuous Learning**

Instead of monthly batch updates, policies update in near-real-time:

```
User Action --> Immediate Policy Adjustment --> Next Recommendation Improved
```

The system learns within the session, not just between sessions. Each interaction refines the model before the next recommendation.

**Cross-User Learning (Anonymized)**

Patterns that work across many users are extracted from aggregate anonymous data:

```
Pattern discovered:     "New users benefit from Brand Voice Brawl first"
How learned:            80% of new users who started with Brand Voice Brawl
                        completed 3+ activities vs 45% who started elsewhere
Applied as:             Prior for new user onboarding recommendations
Privacy preserved:      Only aggregate patterns shared, no individual data
```

These patterns become priors for new users, giving them the benefit of collective learning from day one.

**Predictive Recommendation Quality**

Before showing a suggestion, the system predicts user action probability:

```
Prediction: 85% chance user accepts  -->  Show immediately
Prediction: 40% chance user accepts  -->  Bundle with related suggestions
Prediction: 15% chance user accepts  -->  Hold back, wait for better context
```

Low-confidence suggestions are bundled or held to avoid recommendation fatigue.

**Explanation Generation**

Each recommendation includes a micro-explanation:

```
Recommendation:  "Post this on LinkedIn rather than Twitter"
Explanation:     "Suggested because your last 3 LinkedIn posts
                  outperformed Twitter by 2.4x engagement"
```

Explanations build user trust and provide feedback opportunity. If user disagrees with reasoning, that becomes training signal.

**Counter-Factual Analysis**

System estimates outcomes of paths not taken:

```
User ignored:           "Post competitor comparison on Tuesday"
Similar users who followed: 73% saw engagement spike
Estimated opportunity cost: ~450 impressions
Displayed to user:      "Suggestions like this have worked well for
                         similar businesses -- worth reconsidering?"
```

This quantifies the value of recommendations without being pushy.

**Recommendation Fatigue Detection**

```
Week 1:   User accepts 70% of suggestions
Week 2:   User accepts 55% of suggestions
Week 3:   User accepts 35% of suggestions
          |
          v
System detects fatigue pattern
          |
          v
Reduces suggestion frequency by 40%
          |
          v
Week 4:   Acceptance rate recovers to 60%
```

The system tracks suggestion volume and acceptance rate over time. If users start ignoring more suggestions, it backs off automatically.

### V3 Specifications

```
Actions tracked:              10+ (fine-grained action taxonomy)
Policy updates:               Continuous (within session)
Lineage tracking:             Full + counterfactual
Self-improvement:             Proactive (anticipates user needs)
Cross-user learning:          Yes (anonymized)
Explanation generation:       Yes
Fatigue detection:            Yes
Predictive quality scoring:   Yes
LLM calls required:           Minimal (explanation polish only)
```

### V3 Data Schema

```
recommendations_v3:
  id
  business_id
  type
  content
  context_hash
  cdt_version
  timestamp
  predicted_action_probability
  user_action                   -- fine-grained taxonomy
  action_timestamp
  action_latency_ms             -- time to respond
  modification_content
  modification_diff             -- structured diff from original
  outcome_observed
  outcome_timestamp
  lineage_chain
  counterfactual_estimate       -- what would have happened otherwise
  explanation_shown
  explanation_feedback          -- user agreed/disagreed with reasoning
  fatigue_score_at_time         -- user's fatigue level when shown
  cross_user_prior_applied      -- which aggregate pattern influenced this
```

---

## The Regenerative Cooling Lesson

In the Raptor engine, regenerative cooling captures approximately 100 MW/m^2 of heat flux at the throat and recycles it to preheat methane before combustion. Without this, the heat would destroy the engine. With it, the "waste" becomes fuel for greater efficiency.

In Refleqt, the Recommendation Engine captures behavioral signals that would otherwise be exhaust:
- Ignored suggestions
- Partial completions
- Timing delays
- Modification patterns
- Rejection reasons

These signals are recycled into training data that improves future recommendations. Every interaction, even negative ones, becomes fuel for the system's improvement.

**The Evolution:**
- V1: Basic heat capture (data logged, not recycled)
- V2: Efficient heat exchange (batch recycling, monthly cycles)
- V3: Integrated cooling channels (continuous recycling, nothing wasted)

---

## Evolution Summary

| Metric                          | V1              | V2                 | V3                     |
|---------------------------------|-----------------|--------------------|------------------------|
| Actions tracked                 | 3               | 6                  | 10+                    |
| Policy update frequency         | None            | Monthly            | Continuous             |
| Lineage tracking                | No              | Yes                | Yes + counterfactual   |
| Cross-user learning             | No              | No                 | Yes (anonymized)       |
| Explanation generation          | No              | No                 | Yes                    |
| Recommendation fatigue detection| No              | No                 | Yes                    |
| Predictive quality scoring      | No              | No                 | Yes                    |
| A/B testing                     | No              | Yes                | Yes (continuous)       |
| Self-improvement mode           | Passive         | Active (batch)     | Proactive (continuous) |
| LLM calls required              | None            | None               | Minimal                |

---

## Integration Points

The Recommendation Engine connects to every other subsystem:

```
+------------------+     +---------------------+     +------------------+
|  Activity Engine | --> | Recommendation      | <-- |  Calendar System |
|  (completion     |     |       Engine        |     |  (ghost entry    |
|   signals)       |     |                     |     |   outcomes)      |
+------------------+     +----------+----------+     +------------------+
                                    |
                                    v
+------------------+     +----------+----------+     +------------------+
|  CDT Engine      | <-- |   Policy Updates    | --> |  Execution Maps  |
|  (context        |     |   (what to          |     |  (purchase/view  |
|   quality)       |     |    recommend)       |     |   patterns)      |
+------------------+     +---------------------+     +------------------+
```

**Inputs from other systems:**
- Activity Engine: Completion rates, engagement depth
- Calendar System: Ghost entry acceptance, modification patterns
- CDT Engine: Context quality scores
- Execution Maps: Purchase vs view vs ignore patterns

**Outputs to other systems:**
- Activity Engine: Recommended activity ordering
- Calendar System: Suggestion timing and frequency
- CDT Engine: High-value context indicators
- Execution Maps: Personalized map recommendations

---

## Privacy Considerations

All recommendation learning respects user privacy:

1. **Local-First**: All individual learning happens on user's machine
2. **Anonymized Aggregates**: Cross-user learning uses only aggregate patterns
3. **No Raw Data Sharing**: User actions never leave the device in raw form
4. **Opt-Out Available**: Users can disable cross-user learning contribution
5. **Transparent Explanations**: Users see why recommendations are made

The BYOK model means users control their data. Refleqt learns from behavior patterns, not content.

---

## Cost Analysis

| Version | Compute Cost | Storage Cost | LLM Cost |
|---------|--------------|--------------|----------|
| V1      | Near-zero (local) | Minimal (SQLite) | None |
| V2      | Near-zero (local) | Low (SQLite + backup) | None |
| V3      | Low (local + aggregate) | Medium (full lineage) | Minimal (explanations) |

The Recommendation Engine is designed to be nearly free to operate. Traditional ML algorithms run locally, and the system improves without requiring expensive LLM inference.

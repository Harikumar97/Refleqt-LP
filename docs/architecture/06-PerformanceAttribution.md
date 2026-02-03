# Subsystem 6: Performance Attribution

## Raptor Analogy: Thrust Measurement and Telemetry

You cannot improve what you cannot measure. Raptor engines have over 100 sensors measuring chamber pressure, turbine speeds, propellant temperatures, and flow rates. Every test fire generates gigabytes of telemetry data that feeds back into the next design iteration.

Performance Attribution is Refleqt's telemetry system. It measures what actually happened after marketing artifacts deploy, closing the feedback loop so the CDT can learn from real-world outcomes.

---

## What This Subsystem Does

Performance Attribution tracks every marketing artifact from deployment to business outcome. It answers three fundamental questions:

1. **Did this work?** — Binary success/failure against goals
2. **How well?** — Quantified performance metrics
3. **Why?** — Attribution of outcomes to specific inputs

### Core Function: Closing the Feedback Loop

```
+-------------------+     +-----------------+     +----------------------+
|                   |     |                 |     |                      |
|  CDT generates    |---->|  Artifacts get  |---->|  Performance         |
|  recommendations  |     |  deployed       |     |  Attribution         |
|  based on beliefs |     |                 |     |  measures outcomes   |
|                   |     |                 |     |                      |
+-------------------+     +-----------------+     +----------------------+
        ^                                                   |
        |                                                   |
        |         +---------------------------+             |
        |         |                           |             |
        +---------+  Outcomes update beliefs  |<------------+
                  |  CDT improves next cycle  |
                  |                           |
                  +---------------------------+
```

Without this loop, the CDT operates on assumptions. With this loop, the CDT operates on evidence.

---

## The Tracking Chain

Every artifact follows a measurement pipeline from publication to insight:

```
Artifact published (with UTM parameters)
        |
        +------------------------------------------------------------+
        |                                                            |
        v                                                            v
+------------------+  +------------------+  +------------------+  +------------------+
| Web Analytics    |  | Social Metrics   |  | Email Metrics    |  | Ad Metrics       |
+------------------+  +------------------+  +------------------+  +------------------+
| - Pageviews      |  | - Impressions    |  | - Opens          |  | - Impressions    |
| - Time on page   |  | - Engagement     |  | - Clicks         |  | - Clicks         |
| - Bounce rate    |  | - Shares         |  | - Replies        |  | - CTR            |
| - Scroll depth   |  | - Saves          |  | - Unsubscribes   |  | - CPC            |
+------------------+  +------------------+  +------------------+  | - Conversions    |
        |                    |                    |               +------------------+
        |                    |                    |                      |
        v                    v                    v                      v
+-----------------------------------------------------------------------+
|                                                                       |
|          All metrics mapped to calendar_entry_id via UTM              |
|                                                                       |
+-----------------------------------------------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|                                                                       |
|                    Attribution model applied                          |
|     (First-touch, Last-touch, Linear, Time-decay, Position-based)     |
|                                                                       |
+-----------------------------------------------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|                                                                       |
|         Per-artifact ROI calculated: Revenue attributed / Cost        |
|                                                                       |
+-----------------------------------------------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|                                                                       |
|       Performance data --> Context Engine --> CDT retraining          |
|                                                                       |
+-----------------------------------------------------------------------+
```

Additional metric categories:

- **SEO Metrics**: Ranking position, organic impressions, organic clicks
- **Conversion Metrics**: Form fills, signups, demo requests, purchases

---

## Attribution Models

No single attribution model is universally correct. Different models answer different questions about marketing effectiveness.

| Model | How It Works | Best For |
|-------|--------------|----------|
| First-touch | 100% credit to first interaction | Understanding discovery channels |
| Last-touch | 100% credit to final interaction | Understanding closing channels |
| Linear | Equal credit across all touchpoints | General funnel analysis |
| Time-decay | More credit to recent touchpoints | Long sales cycles |
| Position-based | 40% first, 40% last, 20% middle | Balanced acquisition + conversion view |
| Data-driven | ML-weighted by actual conversion patterns | High-volume businesses with sufficient data |

### Model Selection Logic

```
IF conversion_volume < 100/month THEN
    Recommend: Last-touch (simplest, most actionable)
ELSE IF sales_cycle > 30 days THEN
    Recommend: Time-decay (recency matters)
ELSE IF business_type = "B2B" THEN
    Recommend: Position-based (discovery and closing both matter)
ELSE IF conversion_volume > 1000/month THEN
    Recommend: Data-driven (sufficient data for ML model)
ELSE
    Recommend: Linear (fair baseline)
```

---

## Local ML for Attribution (Client-Side)

Attribution computation is CPU-intensive but does not require LLM inference. All attribution processing runs entirely on the user's machine, preserving privacy and eliminating cloud compute costs.

| Task | Algorithm | Why Client-Side |
|------|-----------|-----------------|
| UTM parsing and matching | Regex + hash lookup | Deterministic, instant execution |
| Multi-touch journey assembly | Graph traversal | Privacy-sensitive user journey data |
| Attribution weight calculation | Statistical modeling | Numerical computation, no AI needed |
| Conversion probability scoring | Logistic regression | Model trained once, inference is cheap |
| Anomaly detection | Isolation forest | Real-time outlier flagging |
| Channel affinity clustering | K-means | Segment users by behavioral patterns |
| ROI calculation | Arithmetic operations | Trivial compute |

### Client-Side ML Architecture

```
+------------------------------------------------------------------+
|                        Desktop Application                        |
+------------------------------------------------------------------+
|                                                                   |
|  +-------------------+    +-------------------+    +------------+ |
|  | UTM Parser        |    | Journey Graph     |    | ML Models  | |
|  | (Regex Engine)    |    | (NetworkX-style)  |    | (Sklearn)  | |
|  +-------------------+    +-------------------+    +------------+ |
|           |                       |                      |        |
|           v                       v                      v        |
|  +-----------------------------------------------------------+   |
|  |                   Attribution Engine                       |   |
|  |  - Multi-touch weighting                                   |   |
|  |  - Conversion probability                                  |   |
|  |  - ROI computation                                         |   |
|  +-----------------------------------------------------------+   |
|                              |                                    |
|                              v                                    |
|  +-----------------------------------------------------------+   |
|  |                    Local SQLite Database                   |   |
|  |  - Performance data                                        |   |
|  |  - Attribution results                                     |   |
|  |  - Historical trends                                       |   |
|  +-----------------------------------------------------------+   |
|                                                                   |
+------------------------------------------------------------------+
```

No LLM calls. No cloud compute. No API key consumption for attribution.

---

## Data Sources (Pull-Based Architecture)

Performance data flows into the system through the same OAuth-based tooling extraction layer used for inputs. This is not real-time streaming; it follows the sparse batch architecture.

### Extraction Flow

```
Monthly Sync Cycle
        |
        v
+------------------+     +------------------+     +------------------+
| Google Analytics |     | Social Platforms |     | Email Platforms  |
| Mixpanel         |     | LinkedIn         |     | Mailchimp        |
| Amplitude        |     | Twitter/X        |     | Klaviyo          |
+------------------+     | Facebook/Meta    |     | HubSpot          |
        |                +------------------+     +------------------+
        |                        |                       |
        v                        v                       v
+-----------------------------------------------------------------------+
|                                                                       |
|                    OAuth-Authenticated Extraction                      |
|                    (Connect --> Pull --> Disconnect)                   |
|                                                                       |
+-----------------------------------------------------------------------+
        |
        v
+------------------+     +------------------+     +------------------+
| Ad Platforms     |     | CRM Systems      |     | Local Storage    |
| Google Ads       |     | Salesforce       |     | SQLite DB        |
| Meta Ads         |     | HubSpot CRM      |     | Calendar entries |
| LinkedIn Ads     |     | Pipedrive        |     | mapped via UTM   |
+------------------+     +------------------+     +------------------+
```

### Why Not Real-Time?

1. **Sparse batch architecture**: Connect, extract, disconnect. No persistent connections.
2. **Monthly granularity sufficient**: Marketing learning cycles operate on weeks/months, not minutes.
3. **Cost efficiency**: Real-time streaming requires persistent infrastructure. Batch pulls are essentially free.
4. **Data stability**: Platform metrics often adjust over 24-72 hours. Monthly pulls capture settled numbers.

---

## V1 -- Proof of Concept

*Raptor 1: Basic telemetry. Prove the measurement system works.*

V1 focuses on validating the feedback loop concept with minimal infrastructure.

### V1 Reality

- **Manual attribution**: User manually marks calendar entries with outcome data
  - Example: "This blog post got 500 views, 3 signups"
- **No automated tracking integration**: Tooling extraction captures historical data but does not auto-map to calendar entries
- **Single attribution model**: Last-touch only (simplest to implement, easiest to explain)
- **Basic ROI display**: If user enters cost and revenue, system calculates ROI. No prediction.
- **Local storage**: SQLite (desktop app) or browser localStorage (playground)
- **Feedback to CDT**: Manual performance entries feed into context for next training cycle

### V1 User Flow

```
User creates calendar entry
        |
        v
User deploys artifact (blog, email, ad)
        |
        v
User observes results in native platform (GA, LinkedIn, etc.)
        |
        v
User manually enters performance data in Refleqt
+---------------------------------------------------+
| Calendar Entry: "Q1 Product Launch Blog"          |
| +-----------------------------------------------+ |
| | Performance Data (Manual Entry)               | |
| +-----------------------------------------------+ |
| | Pageviews:        [ 2,847  ]                  | |
| | Time on page:     [ 3:42   ]                  | |
| | Signups:          [ 12     ]                  | |
| | Revenue:          [ $4,200 ]                  | |
| | Cost:             [ $150   ]                  | |
| +-----------------------------------------------+ |
| | Calculated ROI:   2,700%                      | |
| +-----------------------------------------------+ |
+---------------------------------------------------+
        |
        v
Performance data stored in local SQLite
        |
        v
Next CDT training cycle incorporates this outcome
```

### V1 Specifications

| Attribute | V1 Value |
|-----------|----------|
| Data entry | Manual |
| Attribution models | 1 (last-touch) |
| Tracking integrations | 0 (manual only) |
| Storage | Local SQLite |
| ROI calculation | Basic (user-entered values) |
| Prediction capability | None |
| Cost to user | Free |

### V1 Database Schema (Simplified)

```sql
CREATE TABLE performance_entries (
    id INTEGER PRIMARY KEY,
    calendar_entry_id INTEGER NOT NULL,
    metric_type TEXT NOT NULL,        -- 'pageviews', 'signups', 'revenue', etc.
    metric_value REAL NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (calendar_entry_id) REFERENCES calendar_entries(id)
);

CREATE TABLE attribution_results (
    id INTEGER PRIMARY KEY,
    calendar_entry_id INTEGER NOT NULL,
    attribution_model TEXT DEFAULT 'last_touch',
    attributed_revenue REAL,
    cost REAL,
    roi REAL,                         -- (revenue - cost) / cost * 100
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (calendar_entry_id) REFERENCES calendar_entries(id)
);
```

---

## V2 -- Production Optimization

*Raptor 2: Full telemetry suite. Production-ready measurement.*

V2 automates data collection and provides comprehensive attribution analysis.

### V2 Capabilities

**Automated Tracking**
- OAuth integration with Google Analytics, social platforms, email platforms
- Monthly pull extracts metrics and auto-maps to calendar entries via UTM matching
- No manual data entry required (though manual override available)

**Multi-Model Attribution**
- All 5 standard models available
- User can switch between model views
- System recommends model based on business type and data volume

**UTM Auto-Generation**
- When user creates calendar entry, system generates properly formatted UTM parameters
- Copy-paste parameters into deployment platform
- Ensures consistent tracking across all artifacts

**Performance Dashboards**
- Per-artifact view: Individual artifact performance over time
- Per-campaign view: Aggregated performance for related artifacts
- Per-channel view: Which channels drive results
- Trend lines showing performance over time
- Comparison to CDT predictions

**Predicted vs Actual Comparison**
- CDT's predicted metrics displayed alongside actual results
- Highlights where predictions were accurate vs. significantly off
- Feeds into belief reinforcement (accurate predictions = stronger beliefs)

**Local ML for Patterns**
- Clustering models identify high-performing artifact types
- Regression models find optimal posting times
- All processing on client machine

### V2 Architecture

```
+------------------------------------------------------------------+
|                        V2 Attribution System                      |
+------------------------------------------------------------------+
|                                                                   |
|  OAuth Layer                                                      |
|  +-----------+  +-----------+  +-----------+  +-----------+      |
|  | Google    |  | Social    |  | Email     |  | Ad        |      |
|  | Analytics |  | APIs      |  | APIs      |  | APIs      |      |
|  +-----------+  +-----------+  +-----------+  +-----------+      |
|       |              |              |              |              |
|       +-------+------+------+------+------+-------+              |
|               |                                                   |
|               v                                                   |
|  +-----------------------------------------------------------+   |
|  |                    UTM Matching Engine                     |   |
|  |  calendar_entry_id <--> utm_campaign <--> platform_data    |   |
|  +-----------------------------------------------------------+   |
|               |                                                   |
|               v                                                   |
|  +-----------------------------------------------------------+   |
|  |                 Multi-Model Attribution Engine              |   |
|  |  +----------+ +----------+ +----------+ +----------+       |   |
|  |  | First    | | Last     | | Linear   | | Time     |       |   |
|  |  | Touch    | | Touch    | |          | | Decay    |       |   |
|  |  +----------+ +----------+ +----------+ +----------+       |   |
|  |                    +----------+                             |   |
|  |                    | Position |                             |   |
|  |                    | Based    |                             |   |
|  |                    +----------+                             |   |
|  +-----------------------------------------------------------+   |
|               |                                                   |
|               v                                                   |
|  +-----------------------------------------------------------+   |
|  |                   Performance Dashboard                     |   |
|  |  - Per-artifact metrics                                    |   |
|  |  - Per-campaign rollups                                    |   |
|  |  - Per-channel analysis                                    |   |
|  |  - Predicted vs. actual comparison                         |   |
|  +-----------------------------------------------------------+   |
|               |                                                   |
|               v                                                   |
|  +-----------------------------------------------------------+   |
|  |                Local SQLite + Optional Cloud Backup         |   |
|  +-----------------------------------------------------------+   |
|                                                                   |
+------------------------------------------------------------------+
```

### V2 UTM Generation

```
User creates calendar entry:
  - Title: "Q2 LinkedIn Thought Leadership Series"
  - Channel: LinkedIn
  - Campaign: Q2-2025-Brand
  - Entry ID: 4782

System generates UTM parameters:
+---------------------------------------------------------------+
| UTM Parameters (auto-generated)                               |
+---------------------------------------------------------------+
| utm_source=linkedin                                           |
| utm_medium=social                                             |
| utm_campaign=q2-2025-brand                                    |
| utm_content=cal-4782                                          |
+---------------------------------------------------------------+
| Full URL:                                                     |
| https://yoursite.com/blog/post?utm_source=linkedin&utm_medium |
| =social&utm_campaign=q2-2025-brand&utm_content=cal-4782       |
+---------------------------------------------------------------+
| [Copy to Clipboard]                                           |
+---------------------------------------------------------------+

When GA data is pulled, utm_content=cal-4782 maps back to calendar_entry_id=4782
```

### V2 Specifications

| Attribute | V2 Value |
|-----------|----------|
| Data entry | Automated (monthly pull) + manual override |
| Attribution models | 5 standard + model recommendations |
| Tracking integrations | 5-10 platforms |
| Storage | Local SQLite with cloud backup option |
| ROI calculation | Automated with multi-model views |
| Prediction vs actual | Display and comparison |
| Cost to user | Subscription tier |

---

## V3 -- Deep Integration

*Raptor 3: Integrated telemetry. Closed-loop optimization.*

V3 transforms attribution from measurement into active learning and prediction.

### V3 Capabilities

**Data-Driven Attribution**
- ML model trained on the business's actual conversion data
- Learns which touchpoints matter most for THIS specific business
- Not generic assumptions; personalized attribution weights
- Requires 1000+ conversions for statistical significance

**Predictive Performance**
- Before artifact deployment, system predicts expected performance range
- Based on similar past artifacts + current context
- User knows what to expect before spending time/money

```
+---------------------------------------------------------------+
| Pre-Deployment Prediction                                     |
+---------------------------------------------------------------+
| Artifact: "Case Study: Enterprise Client Success"             |
| Channel: LinkedIn                                             |
+---------------------------------------------------------------+
| Predicted Performance (95% confidence interval):              |
|                                                               |
| Impressions:     2,500 - 4,200                               |
| Engagement rate: 3.2% - 5.8%                                 |
| Click-throughs:  45 - 95                                     |
| Conversions:     2 - 7                                       |
|                                                               |
| Based on: 23 similar past artifacts                          |
| Confidence: HIGH (consistent historical data)                 |
+---------------------------------------------------------------+
```

**Automated A/B Insight Extraction**
- When user runs A/B tests, system automatically extracts learnings
- Updates relevant CDT beliefs without manual analysis
- Example: A/B test shows "Question headlines outperform statement headlines by 23%" -> CDT updates headline beliefs

**Cross-Channel Journey Mapping**
- Unified view of customer journeys across all tracked channels
- Understand how channels interact and reinforce each other
- Not just individual channel performance; full journey context

```
Example Customer Journey:
+--------+    +----------+    +--------+    +---------+    +----------+
| Google |    | LinkedIn |    | Email  |    | Direct  |    | Purchase |
| Search |--->| Post     |--->| Nurture|--->| Visit   |--->|          |
+--------+    +----------+    +--------+    +---------+    +----------+
   Day 1         Day 3        Day 7-21       Day 28         Day 30

Attribution (data-driven model for this business):
  Google Search:   35%  (high-intent entry point)
  LinkedIn Post:   15%  (awareness reinforcement)
  Email Nurture:   40%  (education and trust building)
  Direct Visit:    10%  (final validation)
```

**Real-Time Anomaly Alerts**
- If deployed artifact significantly over/under performs predictions, user gets alert
- Enables rapid response: double down on winners, pause losers
- Threshold configurable by user

**Creator Performance Attribution**
- For marketplace-executed artifacts, performance data flows to creator reputation
- Closes the loop for creator matching algorithm
- Creators with consistently high-performing artifacts get higher match scores

**Belief-Level Attribution**
- Not just "this artifact performed well"
- But "this belief was reinforced/weakened by this outcome"
- Example: Blog post about technical topic performs well -> belief "Our audience responds to technical depth" strengthened

### V3 Architecture

```
+------------------------------------------------------------------+
|                        V3 Attribution System                      |
+------------------------------------------------------------------+
|                                                                   |
|  Real-Time Data Layer                                            |
|  +-----------------------------------------------------------+   |
|  |  Webhook receivers  |  Streaming adapters  |  Batch pulls  |   |
|  +-----------------------------------------------------------+   |
|               |                                                   |
|               v                                                   |
|  +-----------------------------------------------------------+   |
|  |                 Data-Driven Attribution Model               |   |
|  |  - Custom ML model trained on business's conversion data   |   |
|  |  - Shapley value-based touchpoint weighting                |   |
|  |  - Continuous retraining as new data arrives               |   |
|  +-----------------------------------------------------------+   |
|               |                                                   |
|               v                                                   |
|  +-----------------------------------------------------------+   |
|  |                    Prediction Engine                        |   |
|  |  - Pre-deployment performance forecasting                  |   |
|  |  - Confidence intervals based on historical variance       |   |
|  |  - Similar artifact matching                               |   |
|  +-----------------------------------------------------------+   |
|               |                                                   |
|               v                                                   |
|  +-----------------------------------------------------------+   |
|  |                   Anomaly Detection                         |   |
|  |  - Real-time performance monitoring                        |   |
|  |  - Statistical significance testing                        |   |
|  |  - Alert generation when thresholds exceeded               |   |
|  +-----------------------------------------------------------+   |
|               |                                                   |
|               v                                                   |
|  +-----------------------------------------------------------+   |
|  |                 Belief Attribution Engine                   |   |
|  |  - Maps outcomes to CDT beliefs                            |   |
|  |  - Calculates belief reinforcement/weakening scores        |   |
|  |  - Feeds directly into CDT retraining                      |   |
|  +-----------------------------------------------------------+   |
|               |                                                   |
|               v                                                   |
|  +-----------------------------------------------------------+   |
|  |           Local Storage + Sync + Creator Reputation         |   |
|  +-----------------------------------------------------------+   |
|                                                                   |
+------------------------------------------------------------------+
```

### V3 Belief Attribution Example

```
Artifact Deployed: "Technical Deep-Dive: Our ML Pipeline Architecture"
Channel: LinkedIn
Performance: 340% above predicted engagement

Belief Attribution Analysis:
+----------------------------------------------------------------+
| Belief                                    | Impact    | Action  |
+----------------------------------------------------------------+
| "Technical content resonates with ICP"    | +0.23     | Reinforce|
| "LinkedIn effective for thought leadership"| +0.18    | Reinforce|
| "Long-form content underperforms"         | -0.31     | Weaken   |
| "Audience prefers surface-level content"  | -0.27     | Weaken   |
+----------------------------------------------------------------+

CDT Training Impact:
- Next recommendations will favor technical depth
- LinkedIn thought leadership weight increased
- Long-form content penalty reduced
```

### V3 Specifications

| Attribute | V3 Value |
|-----------|----------|
| Data entry | Fully automated + real-time anomaly alerts |
| Attribution models | 5 standard + 1 data-driven custom |
| Tracking integrations | 10-20 platforms |
| Storage | Local with sync |
| Prediction accuracy tracking | Yes |
| Belief-level attribution | Yes |
| Processing location | Client + edge compute for anomaly detection |

---

## The Telemetry Lesson

Raptor engines are instrumented with sensors measuring everything:

- Chamber pressure: 330 bar nominal, monitored continuously
- Turbine inlet temperature: Critical for turbopump longevity
- Propellant flow rates: Precise mixture ratio control
- Thrust vector angles: Real-time gimbal position feedback

Without this telemetry, SpaceX could not iterate. Each test fire generates data. Each flight teaches something. The Raptor 1 to Raptor 3 evolution happened because engineers could measure what was happening and respond.

Performance Attribution serves the same function for Refleqt:

- Every artifact deployment is an experiment
- Every outcome is data
- Without measurement, the CDT cannot learn
- With measurement, every marketing action teaches the system something about the business

### Evolution Parallel

```
Raptor Sensors                    Refleqt Attribution
+--------------------------+      +--------------------------+
| V1: Basic telemetry      |      | V1: Manual data entry    |
| - Thermocouples          |      | - User enters metrics    |
| - Human inspection       |      | - Single model           |
| - Post-test analysis     |      | - No automation          |
+--------------------------+      +--------------------------+
            |                                  |
            v                                  v
+--------------------------+      +--------------------------+
| V2: Comprehensive        |      | V2: Automated tracking   |
| - Data acquisition       |      | - OAuth integrations     |
| - Automated logging      |      | - Multi-model views      |
| - Pattern detection      |      | - Dashboard analytics    |
+--------------------------+      +--------------------------+
            |                                  |
            v                                  v
+--------------------------+      +--------------------------+
| V3: Integrated feedback  |      | V3: Closed-loop learning |
| - Closed-loop control    |      | - Data-driven attribution|
| - Real-time response     |      | - Belief-level updates   |
| - Predictive maintenance |      | - Predictive performance |
+--------------------------+      +--------------------------+
```

---

## Evolution Summary

| Capability | V1 | V2 | V3 |
|------------|----|----|-----|
| Data entry | Manual | Automated monthly | Automated + real-time alerts |
| Attribution models | 1 (last-touch) | 5 standard | 5 + data-driven custom |
| Platform integrations | 0 | 5-10 | 10-20 |
| UTM generation | None | Auto-generated | Auto-generated + tracking |
| Prediction vs actual | None | Display only | Active feedback loop |
| Belief-level attribution | No | No | Yes |
| Anomaly detection | None | None | Real-time alerts |
| Processing location | Client | Client | Client + edge |
| Cost model | Free | Subscription | Subscription |

---

## Integration Points

### Upstream Dependencies
- **Calendar System**: calendar_entry_id is the primary key for attribution mapping
- **Tooling Extraction**: OAuth connections provide the data sources
- **CDT**: Predictions come from CDT; outcomes feed back to CDT

### Downstream Consumers
- **Context Engine**: Performance data becomes context for future CDT training
- **CDT Retraining**: Outcomes reinforce or weaken existing beliefs
- **Creator Marketplace (V3)**: Performance data feeds creator reputation scores
- **User Dashboards**: Visualizations of all attribution data

### Data Flow Summary

```
+----------------+     +------------------+     +-------------------+
| External       |     | Performance      |     | Internal          |
| Platforms      |---->| Attribution      |---->| Systems           |
+----------------+     +------------------+     +-------------------+
| Google Analytics|     | UTM Matching     |     | Context Engine    |
| Social APIs    |     | Model Application|     | CDT Retraining    |
| Email APIs     |     | ROI Calculation  |     | Creator Reputation|
| Ad Platforms   |     | Belief Mapping   |     | User Dashboards   |
| CRM Systems    |     |                  |     |                   |
+----------------+     +------------------+     +-------------------+
```

---

## Technical Constraints

### Privacy
- All user journey data stays on client machine
- No PII transmitted to cloud
- Attribution models trained locally

### Performance
- Attribution calculations must complete in under 2 seconds for dashboard responsiveness
- Batch processing for historical data can run in background
- V3 anomaly detection requires sub-minute latency

### Accuracy
- Attribution is inherently imprecise; present confidence intervals, not false precision
- Data-driven models require minimum data thresholds before activation
- Always allow manual override for user judgment

---

## Summary

Performance Attribution is the telemetry system that makes Refleqt's learning loop possible. Without measurement, the CDT operates on assumptions. With measurement, every marketing action becomes an experiment that teaches the system.

The V1 to V3 evolution mirrors Raptor's sensor evolution: from basic manual readings to comprehensive automated logging to integrated closed-loop feedback. Each stage adds capability while maintaining the core principle: you cannot improve what you cannot measure.

# Sparkles GTM Lead Qualification & First-Touch Router

A candidate-built portfolio demo for Sparkles' Founding GTM role. It combines **growth strategy, deterministic qualification, grounded AI personalization, GitHub-native workflow, and funnel instrumentation**.

## What it does

1. Receives a prospect via a manual demo trigger or POST webhook.
2. Scores ICP fit from 0-100 with transparent rules.
3. Assigns an A/B/C segment and route.
4. Drafts a first-touch message.
5. Emits a structured `gtm_lead_qualified` event.
6. Supports evidence-backed AI personalization without turning hypotheses into facts.
7. Validates itself in GitHub Actions on every PR to `main`.

The core is intentionally credential-free so a reviewer can inspect and run it quickly. The live AI step is optional.

## 30-second reviewer demo

```bash
npm run demo
```

This reads `sample-lead.json`, applies the same qualification and routing logic as the n8n workflow, and prints the resulting lead decision plus funnel event.

To validate the repo:

```bash
npm run validate
```

The validation script checks:
- workflow JSON,
- deterministic sample scoring,
- funnel-event creation,
- evidence IDs in the research packets,
- hypothesis labelling,
- prompt grounding guardrails.

## Files

- `workflow/sparkles-gtm-lead-router.json` — importable n8n workflow.
- `form/index.html` — local lead-intake form that posts to the webhook.
- `scripts/demo.js` — standalone credential-free reviewer demo.
- `scripts/validate.js` — deterministic repo validation.
- `scripts/build-personalization-prompt.js` — builds a grounded prompt without making an API call.
- `scripts/ai-personalize.mjs` — optional live AI personalization step.
- `research/sentry-prospect.json` — AI-native buyer research packet.
- `research/sentry-evidence.md` — Sentry evidence, hypotheses and unknowns.
- `research/ghost-prospect.json` — workflow/delegation buyer research packet.
- `research/ghost-evidence.md` — Ghost evidence, hypotheses and unknowns.
- `.github/workflows/validate.yml` — GitHub Actions validation.

## Two GTM motions

### 1. Sentry — AI-native engineering organisation

Public evidence shows mature GitHub workflows and explicit agent-oriented development instructions.

**Core GTM question:** if engineering already uses agents, can Sparkles expand safe software contribution to non-engineering teams while preserving existing GitHub review and CI controls?

**Likely objection:** "We already use coding agents."

**Proof angle:** non-engineer usability, governance, bounded permissions, review burden and time-to-merge.

### 2. Ghost — cross-functional product/publishing organisation

Public evidence shows official docs delivered through GitHub pull requests with PR previews, merge-to-main deployment and explicit pre-PR testing. Ghost also publicly lists engineering/development alongside product, design, brand, support and infrastructure roles.

**Core GTM question:** can those cross-functional teammates ship bounded website, docs or product-surface changes themselves while keeping the existing preview, testing, review and merge controls?

**Likely objection:** "Why should non-engineers touch the codebase?"

**Proof angle:** reduce engineering interruption while keeping the current controls intact.

These are deliberately different motions. The first tests differentiation against existing AI workflows. The second tests delegation and workflow acceleration.

## Scoring model

- Existing production codebase: +25
- Engineering team >= 5: +20
- High/medium non-engineering change volume: +15/+10
- Already uses AI coding tools: +15
- Relevant champion/validator role: +15
- 20-500 employees: +10

Routing:
- **A (70-100):** founder-style direct outreach / demo CTA
- **B (50-69):** nurture / use-case education
- **C (<50):** educate / deprioritize

Unknown fields stay unknown. Research packets do not receive points for data that was not actually verified.

## Why deterministic qualification?

The AI should accelerate research and copy, but the qualification rules remain inspectable and debuggable. That makes experiments measurable: conversion can be compared by segment without silently changing the routing logic.

**AI personalizes. Deterministic logic qualifies and routes.**

## Evidence-backed AI personalization

Inspect the exact prompt without any API call:

```bash
npm run prompt
```

Use another research packet:

```bash
node scripts/build-personalization-prompt.js research/ghost-prospect.json
```

For the optional live AI step, set both variables:

```bash
OPENAI_API_KEY=...
OPENAI_MODEL=...
npm run personalize
```

The prompt requires:
- evidence IDs for factual claims,
- explicit unknowns,
- separation of hypothesis from fact,
- a likely objection,
- a proof angle,
- concise outreach,
- an `unsupported_claims` field.

## Run in n8n

1. Open n8n.
2. Import `workflow/sparkles-gtm-lead-router.json`.
3. Click **Execute workflow** and run **Demo Trigger**.
4. Inspect **Build Funnel Event**.

For webhook testing:

1. Open **Lead Intake Webhook** and click **Listen for test event**.
2. Open `form/index.html`.
3. Keep `http://localhost:5678/webhook-test/sparkles-gtm-lead`.
4. Submit the form.

After activation, use:

`http://localhost:5678/webhook/sparkles-gtm-lead`

## Production extensions

- permitted enrichment source,
- human approval before send,
- PostHog event ingestion,
- HubSpot/Airtable sync,
- reply classification,
- follow-up state,
- downstream activation tracking:
  **org created → GitHub connected → first run → first PR → first merge**.

## Portfolio framing

This is not presented as Sparkles' internal GTM system. It is a candidate-built hypothesis showing how I would approach research, segmentation, outbound, automation, instrumentation and iteration.

The repository itself uses a branch → pull request → validation → merge workflow to mirror the GitHub-native operating style behind the product.

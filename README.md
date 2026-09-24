# Sparkles GTM Lead Qualification & First-Touch Router

A small portfolio demo built for a Founding GTM application. It demonstrates the operating pattern Sparkles asks for: **growth strategy + hands-on automation + funnel instrumentation**.

## What it does

1. Receives a prospect via a manual demo trigger or POST webhook.
2. Scores ICP fit from 0-100 with transparent rules.
3. Assigns A/B/C segment and route.
4. Drafts a first-touch message.
5. Emits a structured `gtm_lead_qualified` event that can later be sent to PostHog/HubSpot/Airtable/Sheets.

The core is intentionally credential-free so anyone reviewing the repository can import it and run it immediately.

## Files

- `workflow/sparkles-gtm-lead-router.json` - importable n8n workflow.
- `form/index.html` - local lead-intake form that posts to the webhook.
- `AI_PERSONALIZATION_PROMPT.md` - optional LLM upgrade.

## 30-second reviewer demo

If you have Node.js installed, no n8n or API credentials are required:

```bash
node scripts/demo.js
```

This reads `sample-lead.json`, applies the same transparent ICP scoring and routing logic as the n8n workflow, and prints a structured lead decision plus funnel event. A checked-in example is available at `examples/sample-output.json`.

**Flow:** lead intake → ICP score → A/B/C segment → route → first-touch draft → funnel event.

## Run in n8n

1. Open n8n.
2. Import `workflow/sparkles-gtm-lead-router.json`.
3. For the fastest demo, click **Execute workflow** and run **Demo Trigger**.
4. Inspect the output of **Build Funnel Event**.

## Test the webhook

1. Open **Lead Intake Webhook** and click **Listen for test event**.
2. Open `form/index.html` in a browser.
3. Keep the default test URL: `http://localhost:5678/webhook-test/sparkles-gtm-lead`.
4. Submit the form.
5. The page will display the score, route, outbound draft and funnel event.

After activation, switch the form URL to:

`http://localhost:5678/webhook/sparkles-gtm-lead`

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

## Why deterministic scoring?

The AI should accelerate research and copy, but qualification logic should remain inspectable and debuggable. This makes the workflow safer to iterate: you can compare funnel outcomes by segment without wondering whether a model silently changed the routing rule.

## AI upgrade

Use the prompt in `AI_PERSONALIZATION_PROMPT.md` to add an OpenAI/Claude model step for:
- use-case hypothesis,
- factual personalized opener,
- predicted objection,
- recommended proof/demo angle.

Keep the score and route logic deterministic.

## Next production steps

- Enrich companies from a permitted data source.
- Add human approval before send.
- Write funnel events to PostHog.
- Sync A/B leads to HubSpot/Airtable.
- Add reply classification and follow-up state.
- Track downstream activation: org created → GitHub connected → first run → first PR → first merge.

## Portfolio framing

This demo is not presented as Sparkles' real internal system. It is a candidate-built hypothesis showing how I would think about ICP scoring, founder-led outbound, automation and measurable activation.

# Sentry prospect research packet

**Research date:** 24 September 2026  
**Purpose:** Evidence-backed worked example for the Sparkles GTM demo. This is not a claim that Sentry is a Sparkles customer or that the hypotheses below are true.

## Why Sentry is a useful test account

Sentry is a deliberately difficult example rather than an easy fictional prospect. Public repository evidence shows a mature GitHub workflow, significant code/documentation surface area, explicit agent instructions and existing AI-oriented development practices.

That creates the GTM question Sparkles should be able to answer:

> If engineering already uses agents, can Sparkles expand safe software contribution to marketing, docs, product and operations without weakening existing GitHub review and CI controls?

## Public evidence

### e1 — large existing codebase
Source: https://github.com/getsentry/sentry-docs

The public docs repository is a real application/documentation codebase using Next.js, React, TypeScript, Tailwind and MDX. When researched, GitHub showed more than 18,000 commits.

### e2 — visible AI-agent workflow
Source: https://github.com/getsentry/sentry-docs

The repository contains `AGENTS.md`, `CLAUDE.md`, a `.claude` directory and Cursor rules. This supports the narrow statement that Sentry has public agent-oriented development instructions.

### e3 — agent skills and quality controls
Source: https://github.com/getsentry/sentry-docs/blob/master/AGENTS.md

The instructions describe brand-guideline, docs-review and technical-docs skills and give agents build, test, lint and PR conventions.

### e4 — mature PR / CI guardrails
Source: https://github.com/getsentry/sentry/blob/master/AGENTS.md

Sentry's main repository documents PR constraints and CI-enforced sequencing for changes spanning frontend and backend. This is relevant to Sparkles' reviewable-PR / guardrail positioning.

### e5 — active PR workflow
Source: https://github.com/getsentry/sentry-docs/pulls

The docs repository has a large historical volume of pull requests and active open PRs. Exact counts are intentionally not used as a durable qualification field because they change.

## What we can infer safely

- Existing GitHub-native code/documentation workflows: **yes**
- Public evidence of AI-agent usage/instructions: **yes**
- Existing review/CI guardrails: **yes**
- Non-engineering request backlog: **unknown**
- Engineering-team size: **unknown**
- Employee count: **unknown**
- Budget / buyer: **unknown**

## GTM hypothesis

A plausible wedge is a bounded workflow such as:

**marketing/docs request → agent makes change in isolated environment → preview/tests → reviewable PR → existing engineering approval**

The main objection to prepare for is likely:

**"We already use Claude/Cursor/agents."**

The proof should therefore focus on what changes when the *requester is not an engineer*: permissions, context, guardrails, review burden, repeatability and time-to-merge.

## Research standard used in this repo

Unknown fields stay unknown. The AI layer is instructed to cite evidence IDs and return unsupported assumptions separately rather than turning hypotheses into facts.

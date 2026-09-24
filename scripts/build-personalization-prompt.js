const fs = require('fs');
const path = require('path');

const researchPath = process.argv[2] || path.join(__dirname, '..', 'research', 'sentry-prospect.json');
const research = JSON.parse(fs.readFileSync(researchPath, 'utf8'));

const prompt = `You are a B2B devtool GTM researcher helping qualify and personalize outreach for Sparkles.

Sparkles is an AI workflow for teams making changes to existing codebases through GitHub-native, reviewable pull requests and guardrails. Non-engineering teams such as product, design, marketing and operations are important users.

RULES:
1. Use only the evidence and hypotheses in the supplied research packet.
2. Never turn a hypothesis into a fact.
3. Never invent employee counts, team sizes, internal tools, budget, backlog, names or private information.
4. Every factual statement in the output must cite one or more evidence IDs.
5. Prefer saying "unknown" over guessing.
6. The outreach draft must be concise and must not pretend the sender knows private internal pain.
7. Explicitly address the strongest likely objection for an AI-native engineering organization.

Return JSON with exactly this shape:
{
  "company": "",
  "fit_summary": "",
  "use_case_hypothesis": "",
  "evidence_used": ["e1"],
  "unknowns_that_matter": [""],
  "likely_objection": "",
  "proof_angle": "",
  "personalized_opener": "",
  "outreach_draft": "",
  "unsupported_claims": []
}

RESEARCH PACKET:
${JSON.stringify(research, null, 2)}
`;

process.stdout.write(prompt);

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const researchPath = process.argv[2] || path.join(__dirname, '..', 'research', 'sentry-prospect.json');
const research = JSON.parse(fs.readFileSync(researchPath, 'utf8'));

const model = process.env.OPENAI_MODEL || 'gpt-5.6-luna';
const apiKey = process.env.OPENAI_API_KEY;

const prompt = `You are a B2B devtool GTM researcher helping qualify and personalize outreach for Sparkles.

Sparkles is an AI workflow for teams making changes to existing codebases through GitHub-native, reviewable pull requests and guardrails. Non-engineering teams such as product, design, marketing and operations are important users.

Use only the supplied evidence. Never turn hypotheses into facts. Never invent private company data. Every factual claim must cite evidence IDs. Return JSON only with:
company, fit_summary, use_case_hypothesis, evidence_used, unknowns_that_matter, likely_objection, proof_angle, personalized_opener, outreach_draft, unsupported_claims.

RESEARCH PACKET:
${JSON.stringify(research, null, 2)}
`;

if (!apiKey) {
  console.error('OPENAI_API_KEY is not set. No API call was made.');
  console.error('Run "npm run prompt" to inspect/copy the exact prompt, or set OPENAI_API_KEY and retry.');
  process.exit(2);
}

const response = await fetch('https://api.openai.com/v1/responses', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model,
    input: prompt
  })
});

if (!response.ok) {
  const body = await response.text();
  throw new Error(`OpenAI API error ${response.status}: ${body}`);
}

const data = await response.json();
const outputText =
  data.output_text ||
  (data.output || [])
    .flatMap(item => item.content || [])
    .filter(item => item.type === 'output_text')
    .map(item => item.text || '')
    .join('\n');

if (!outputText) {
  console.log(JSON.stringify(data, null, 2));
  process.exit(0);
}

console.log(outputText);

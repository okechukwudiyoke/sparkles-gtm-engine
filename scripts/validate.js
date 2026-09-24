const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.join(__dirname, '..');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function validateResearch(relativePath) {
  const packet = readJson(relativePath);
  const ids = new Set(packet.evidence.map((e) => e.id));
  assert(ids.size === packet.evidence.length, relativePath + ': duplicate evidence IDs');
  assert(Array.isArray(packet.unknowns) && packet.unknowns.length > 0, relativePath + ': unknowns must be explicit');

  for (const field of Object.values(packet.qualification || {})) {
    for (const evidenceId of field.evidence_ids || []) {
      assert(ids.has(evidenceId), relativePath + ': missing evidence ID ' + evidenceId);
    }
  }

  for (const hypothesis of packet.hypotheses || []) {
    assert(hypothesis.status === 'hypothesis', relativePath + ': hypotheses must be labelled');
  }

  const prompt = execFileSync(
    process.execPath,
    [path.join(root, 'scripts', 'build-personalization-prompt.js'), path.join(root, relativePath)],
    { encoding: 'utf8' }
  );

  assert(prompt.includes(packet.company), relativePath + ': prompt is missing company');
  assert(prompt.includes('Never turn a hypothesis into a fact'), relativePath + ': prompt lost grounding guardrail');
}

readJson('workflow/sparkles-gtm-lead-router.json');
readJson('sample-lead.json');
readJson('examples/sample-output.json');

const demoRaw = execFileSync(process.execPath, [path.join(root, 'scripts', 'demo.js')], { encoding: 'utf8' });
const demo = JSON.parse(demoRaw);

assert(demo.icp_score === 100, 'sample lead should score 100');
assert(demo.segment === 'A', 'sample lead should route to segment A');
assert(demo.route === 'founder_outreach', 'sample lead should route to founder outreach');
assert(demo.funnel_event?.event_name === 'gtm_lead_qualified', 'funnel event missing');

validateResearch('research/sentry-prospect.json');
validateResearch('research/ghost-prospect.json');

console.log('Validation passed: workflow JSON, deterministic qualification, funnel event, and both grounded research packets.');

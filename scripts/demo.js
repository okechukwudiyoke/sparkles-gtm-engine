const fs = require('fs');
const path = require('path');

const inputPath = process.argv[2] || path.join(__dirname, '..', 'sample-lead.json');
const src = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const asBool = (v) => v === true || ['true', 'yes'].includes(String(v).toLowerCase());
const num = (v) => Number(v || 0);
const role = String(src.role || '').toLowerCase();
const volume = String(src.non_engineering_change_volume || '').toLowerCase();

let score = 0;
const reasons = [];

if (asBool(src.existing_codebase)) {
  score += 25;
  reasons.push('existing production codebase');
}
if (num(src.engineering_team_size) >= 5) {
  score += 20;
  reasons.push('engineering team >= 5');
}
if (['high', 'medium'].includes(volume)) {
  score += volume === 'high' ? 15 : 10;
  reasons.push(volume + ' non-engineering change volume');
}
if (asBool(src.uses_ai_coding_tools)) {
  score += 15;
  reasons.push('already uses AI coding tools');
}
if (/(growth|marketing|operations|ops|product|sales|engineering|cto|founder)/.test(role)) {
  score += 15;
  reasons.push('relevant champion/validator role');
}
const employees = num(src.employee_count);
if (employees >= 20 && employees <= 500) {
  score += 10;
  reasons.push('20-500 employee test segment');
}

score = Math.min(score, 100);

const segment = score >= 70 ? 'A' : score >= 50 ? 'B' : 'C';
let route;
let cta;
let subject;

if (segment === 'A') {
  route = 'founder_outreach';
  cta = 'Would it be useful to test one real backlog item and see the PR Sparkles produces?';
  subject = src.company + ': ship one backlog item without joining the engineering queue';
} else if (segment === 'B') {
  route = 'nurture';
  cta = 'Worth a 10-minute look at how Sparkles keeps engineering review in the loop?';
  subject = src.company + ': a safer way for non-engineers to ship small changes';
} else {
  route = 'educate';
  cta = 'If this becomes a recurring bottleneck, I can send a 2-minute workflow example.';
  subject = 'When ' + src.company + ' starts feeling the engineering queue';
}

const pain = src.pain_point || 'non-engineering teams depend on engineering for routine changes';

const result = {
  ...src,
  icp_score: score,
  segment,
  score_reasons: reasons,
  route,
  subject,
  message:
    'Hi there,\n\n' +
    'The use case that stood out for ' + src.company + ' is: ' + pain + '\n\n' +
    'Sparkles lets non-engineering teammates request changes against an existing GitHub codebase while the work still comes back as a reviewable PR, so engineering keeps its normal controls.\n\n' +
    cta + '\n\n- Okechukwu',
  funnel_event: {
    event_name: 'gtm_lead_qualified',
    distinct_id: src.email || ((src.company || 'unknown') + '-demo'),
    properties: {
      company: src.company,
      role: src.role,
      icp_score: score,
      segment,
      route,
      existing_codebase: src.existing_codebase,
      uses_ai_coding_tools: src.uses_ai_coding_tools,
      non_engineering_change_volume: src.non_engineering_change_volume
    }
  }
};

console.log(JSON.stringify(result, null, 2));

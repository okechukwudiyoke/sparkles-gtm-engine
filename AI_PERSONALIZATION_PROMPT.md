# Optional AI Personalization Prompt

Insert an LLM step **after `Normalize + Score ICP` and before `Route + Draft First Touch`**. Keep scoring/routing deterministic; use the model only for research synthesis and message personalization.

## System instruction
You are a B2B devtool GTM researcher. Return concise JSON only. Do not invent company facts. If evidence is missing, say `unknown`.

## Input
- Company: {{$json.company}}
- Website: {{$json.website}}
- Persona: {{$json.role}}
- Pain point supplied: {{$json.pain_point}}
- ICP score: {{$json.icp_score}}
- Score reasons: {{$json.score_reasons}}

## Output schema
```json
{
  "hypothesis": "One sentence on the likely Sparkles use case",
  "personalized_opener": "One factual, non-creepy sentence",
  "objection_to_expect": "Most likely objection",
  "proof_angle": "What to demonstrate in a 10-minute call"
}
```

Then merge these fields into the existing routing node and preserve the same A/B/C logic.

# Component Audit Task

Audit every component in the `components/` directory against the 
Angular Material mapping table in CLAUDE.md.

For each component, report:
1. Component name and selector
2. Which Angular Material module it SHOULD use (per CLAUDE.md mapping table)
3. Whether it currently imports and uses that Material module — YES / NO / PARTIAL
4. If NO or PARTIAL: what specifically is missing or wrong
5. Any hardcoded values (hex, px, rgba) found in its .scss file

Output the results as a markdown table, then list all action items grouped by severity:
- CRITICAL: Not using Material at all (custom reimplementation)
- WARN: Using Material but missing key inputs/outputs/aria
- INFO: Minor issues (hardcoded values, missing OnPush, etc.)

Do not fix anything yet. Report only.
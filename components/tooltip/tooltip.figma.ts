// url=https://www.figma.com/design/d08uUvbnN0CRL7UMBncwVE/Onflo-Design-System?node-id=54061-33881
// source=components/tooltip/tooltip.directive.ts
// component=DsTooltipDirective
import figma from 'figma'
const instance = figma.selectedInstance

// Tooltip message text.
const text = instance.getString('Supporting text#2609:2')

// Variant (Single line / Multi line) is visual-only — no code prop.

export default {
  example: figma.code`<button dsTooltip="${text}">Element</button>`,
  imports: [
    'import { DsTooltipDirective } from \'@onflo/design-system\'',
  ],
  id: 'tooltip',
  metadata: { nestable: false },
}

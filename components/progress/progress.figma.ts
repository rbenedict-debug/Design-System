// url=https://www.figma.com/design/d08uUvbnN0CRL7UMBncwVE/Onflo-Design-System?node-id=54591-25612
// source=components/progress/progress.component.ts
// component=DsProgressComponent
import figma from 'figma'
const instance = figma.selectedInstance

// Progress variant drives the fill width. Omit [value] for indeterminate (animated).
const progress = instance.getEnum('Progress', {
  '0': 0,
  '10': 10,
  '30': 30,
  '50': 50,
  '80': 80,
  '100': 100,
})

export default {
  example: figma.code`<ds-progress [value]="${progress}" />`,
  imports: [
    'import { DsProgressComponent } from \'@onflo/design-system\'',
  ],
  id: 'progress',
  metadata: { nestable: false },
}

// url=https://www.figma.com/design/d08uUvbnN0CRL7UMBncwVE/Onflo-Design-System?node-id=54591-25704
// source=components/spinner/spinner.component.ts
// component=DsSpinnerComponent
import figma from 'figma'
const instance = figma.selectedInstance

// Progress variant drives the arc fill for determinate mode.
// Indeterminate (no Progress value) uses the default spinning animation.
const progress = instance.getEnum('Progress', {
  '0': 0,
  '10': 10,
  '30': 30,
  '50': 50,
  '80': 80,
  '100': 100,
})

// Size defaults to md — only emit when non-default.
const size = instance.getEnum('Size', {
  'SM': 'sm',
  'MD': 'md',
  'LG': 'lg',
})

export default {
  example: figma.code`<ds-spinner mode="determinate" [value]="${progress}"${size !== 'md' ? figma.code` size="${size}"` : ''} />`,
  imports: [
    'import { DsSpinnerComponent } from \'@onflo/design-system\'',
  ],
  id: 'spinner',
  metadata: { nestable: false },
}

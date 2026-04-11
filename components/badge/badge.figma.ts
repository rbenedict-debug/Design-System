// url=https://www.figma.com/design/d08uUvbnN0CRL7UMBncwVE/Onflo-Design-System?node-id=51592-4768
// source=components/badge/badge.component.ts
// component=DsBadgeComponent
import figma from 'figma'
const instance = figma.selectedInstance

// Size=Small → dot mode (no text). Size=Large → count circle with label.
const size = instance.getEnum('Size', {
  'Small': 'small',
  'Large': 'large',
})

// Badge label text is only shown on Large (count) badges.
const label = instance.getString('Badge label#52867:8')

// Red is the default — omit [variant] when red to keep snippet clean.
const variant = instance.getEnum('Variant', {
  'Red': 'red',
  'Blue': 'blue',
  'Grey': 'grey',
})

export default {
  example: figma.code`<ds-badge${size === 'small' ? figma.code` [dot]="true"` : figma.code` [count]="${label}"`}${variant !== 'red' ? figma.code` [variant]="${variant}"` : ''} />`,
  imports: [
    'import { DsBadgeComponent } from \'@onflo/design-system\'',
  ],
  id: 'badge',
  metadata: { nestable: true },
}

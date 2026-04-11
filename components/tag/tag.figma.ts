// url=https://www.figma.com/design/d08uUvbnN0CRL7UMBncwVE/Onflo-Design-System?node-id=66955-168867
// source=components/tag/tag.component.ts
// component=DsTagComponent
import figma from 'figma'
const instance = figma.selectedInstance

// default = removable tag; more = overflow count chip; add = dashed create button.
const variant = instance.getEnum('Variant', {
  'Default': 'default',
  'More': 'more',
  'Add': 'add',
})

// Size defaults to md — only emit [size] when sm.
const size = instance.getEnum('Size', {
  'MD': 'md',
  'SM': 'sm',
})

// Show Close drives removable — false = read-only display tag.
const removable = instance.getBoolean('Show Close#66957:118')

// More Number is the overflow count shown on the +N chip.
const moreCount = instance.getString('More Number#66955:0')

const disabled = instance.getEnum('State', {
  'Disabled': true,
  'Default': false,
  'Hover': false,
  'Error': false,
})

const error = instance.getEnum('State', {
  'Error': true,
  'Default': false,
  'Disabled': false,
  'Hover': false,
})

export default {
  example: figma.code`<ds-tag${variant !== 'default' ? figma.code` variant="${variant}"` : ''}${size === 'sm' ? figma.code` size="sm"` : ''}${variant === 'default' ? figma.code` label="Design"` : ''}${variant === 'more' ? figma.code` [moreCount]="${moreCount}"` : ''}${variant === 'default' && !removable ? figma.code` [removable]="false"` : ''}${disabled ? figma.code` [disabled]="true"` : ''}${error ? figma.code` [error]="true"` : ''} />`,
  imports: [
    'import { DsTagComponent } from \'@onflo/design-system\'',
  ],
  id: 'tag',
  metadata: { nestable: false },
}

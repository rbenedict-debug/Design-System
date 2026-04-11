// url=https://www.figma.com/design/d08uUvbnN0CRL7UMBncwVE/Onflo-Design-System?node-id=54446-25289
// source=components/toggle/toggle.component.ts
// component=DsToggleComponent
import figma from 'figma'
const instance = figma.selectedInstance

// Selected reflects on/off state — shown via [(checked)] two-way binding.
const checked = instance.getEnum('Selected', {
  'True': true,
  'False': false,
})

// Icon=True shows check/close icons inside the thumb.
const showIcon = instance.getEnum('Icon', {
  'True': true,
  'False': false,
})

// State=Disabled maps to [disabled]. Other states are CSS-only.
const disabled = instance.getEnum('State', {
  'Disabled': true,
  'Default': false,
  'Hover': false,
  'Pressed': false,
  'Focus': false,
})

export default {
  example: figma.code`<ds-toggle label="Label" [(checked)]="${checked}"${showIcon ? figma.code` [showIcon]="true"` : ''}${disabled ? figma.code` [disabled]="true"` : ''} />`,
  imports: [
    'import { DsToggleComponent } from \'@onflo/design-system\'',
  ],
  id: 'toggle',
  metadata: { nestable: false },
}

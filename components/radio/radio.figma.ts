// url=https://www.figma.com/design/d08uUvbnN0CRL7UMBncwVE/Onflo-Design-System?node-id=51739-4608
// source=components/radio/radio.component.ts
// component=DsRadioComponent
import figma from 'figma'
const instance = figma.selectedInstance

// State=Disabled maps to [disabled]. Other states (Hover, Focus, Pressed) are CSS-only.
// Selected state is managed by the parent ds-radio-group via [(value)] — not a direct prop.
const disabled = instance.getEnum('State', {
  'Disabled': true,
  'Default': false,
  'Hover': false,
  'Pressed': false,
  'Focus': false,
})

export default {
  example: figma.code`
<ds-radio-group [(value)]="selected" name="group">
  <ds-radio label="Option A" value="a"${disabled ? figma.code` [disabled]="true"` : ''} />
  <ds-radio label="Option B" value="b" />
</ds-radio-group>`,
  imports: [
    'import { DsRadioComponent, DsRadioGroupComponent } from \'@onflo/design-system\'',
  ],
  id: 'radio-button',
  metadata: { nestable: false },
}

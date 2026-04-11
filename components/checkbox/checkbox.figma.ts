// url=https://www.figma.com/design/d08uUvbnN0CRL7UMBncwVE/Onflo-Design-System?node-id=51859-5628
// source=components/checkbox/checkbox.component.ts
// component=DsCheckboxComponent
import figma from 'figma'
const instance = figma.selectedInstance

// Type encodes three dimensions — derive each prop individually.
const checked = instance.getEnum('Type', {
  'Selected': true,
  'Error selected': true,
  'Unselected': false,
  'Indeterminate': false,
  'Error unselected': false,
  'Error indeterminate': false,
})

const indeterminate = instance.getEnum('Type', {
  'Indeterminate': true,
  'Error indeterminate': true,
  'Selected': false,
  'Unselected': false,
  'Error unselected': false,
  'Error selected': false,
})

const isError = instance.getEnum('Type', {
  'Error unselected': true,
  'Error indeterminate': true,
  'Error selected': true,
  'Selected': false,
  'Unselected': false,
  'Indeterminate': false,
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
  example: figma.code`<ds-checkbox label="Label"${checked ? figma.code` [(checked)]="true"` : ''}${indeterminate ? figma.code` [indeterminate]="true"` : ''}${isError ? figma.code` [isError]="true"` : ''}${disabled ? figma.code` [disabled]="true"` : ''} />`,
  imports: [
    'import { DsCheckboxComponent } from \'@onflo/design-system\'',
  ],
  id: 'checkbox',
  metadata: { nestable: false },
}

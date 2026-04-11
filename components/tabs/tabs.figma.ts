// url=https://www.figma.com/design/d08uUvbnN0CRL7UMBncwVE/Onflo-Design-System?node-id=54563-40319
// source=components/tabs/tabs.component.ts
// component=DsTabComponent
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label#53409:36')

// Show badge renders a 6px red notification dot next to the label.
const showBadge = instance.getBoolean('Show badge#155033:36')

// State=Disabled maps to [disabled]. Other states (Hover, Focus, Active) are CSS-only.
// Active tab selection is managed by the parent ds-tabs via activeIndex — not a direct prop.
const disabled = instance.getEnum('State', {
  'Disabled': true,
  'Default': false,
  'Hover': false,
  'Focus': false,
  'Active': false,
})

export default {
  example: figma.code`<ds-tabs>
  <ds-tab label="${label}"${showBadge ? figma.code` [showBadge]="true"` : ''}${disabled ? figma.code` [disabled]="true"` : ''}>Tab content</ds-tab>
</ds-tabs>`,
  imports: [
    'import { DsTabsComponent, DsTabComponent } from \'@onflo/design-system\'',
  ],
  id: 'tabs',
  metadata: { nestable: false },
}

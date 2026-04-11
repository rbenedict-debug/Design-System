// url=https://www.figma.com/design/d08uUvbnN0CRL7UMBncwVE/Onflo-Design-System?node-id=63202-88778
// source=components/nav-tab/nav-tab.component.ts
// component=NavTabComponent
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Text#63202:104')

// Active=True reflects the currently open tab — shown via [active].
const active = instance.getEnum('Active', {
  'True': true,
  'False': false,
})

// More=True collapses the tab to a 26px overflow indicator showing "...".
const more = instance.getEnum('More', {
  'True': true,
  'False': false,
})

export default {
  example: figma.code`<ds-nav-tab label="${label}"${active ? figma.code` [active]="true"` : ''}${more ? figma.code` [more]="true"` : ''} />`,
  imports: [
    'import { NavTabComponent } from \'@onflo/design-system\'',
  ],
  id: 'nav-tab',
  metadata: { nestable: false },
}

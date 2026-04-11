// url=https://www.figma.com/design/d08uUvbnN0CRL7UMBncwVE/Onflo-Design-System?node-id=54061-36963
// source=components/menu/menu.component.ts
// component=DsMenuComponent
import figma from 'figma'
const instance = figma.selectedInstance

// Show search toggles the sticky search field at the top of the panel.
const search = instance.getEnum('Show search', {
  'True': true,
  'False': false,
})

export default {
  example: figma.code`<button [matMenuTriggerFor]="myMenu.matMenu">Options</button>
<ds-menu #myMenu${search ? figma.code` [search]="true"` : ''}>
  <button mat-menu-item class="ds-menu__item">Item</button>
</ds-menu>`,
  imports: [
    'import { DsMenuComponent } from \'@onflo/design-system\'',
    'import { MatMenuModule } from \'@angular/material/menu\'',
  ],
  id: 'menu',
  metadata: { nestable: false },
}

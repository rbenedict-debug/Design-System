// url=https://www.figma.com/design/d08uUvbnN0CRL7UMBncwVE/Onflo-Design-System?node-id=63229-8679
// source=components/search/search.component.ts
// component=DsSearchComponent
import figma from 'figma'
const instance = figma.selectedInstance

const placeholder = instance.getString('Placeholder#63229:28')

// Leading icon defaults to true — only emit [leadingIcon]="false" when hidden.
const leadingIcon = instance.getEnum('Leading icon', {
  'True': true,
  'False': false,
})

// State (Hover, Focus, etc.) is CSS-only — no code props.

export default {
  example: figma.code`<ds-search placeholder="${placeholder}"${!leadingIcon ? figma.code` [leadingIcon]="false"` : ''} />`,
  imports: [
    'import { DsSearchComponent } from \'@onflo/design-system\'',
  ],
  id: 'search',
  metadata: { nestable: false },
}

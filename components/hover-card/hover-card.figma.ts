// url=https://www.figma.com/design/d08uUvbnN0CRL7UMBncwVE/Onflo-Design-System?node-id=54061-33872
// source=components/hover-card/hover-card.component.ts
// component=DsHoverCardComponent
import figma from 'figma'
const instance = figma.selectedInstance

// Show actions toggles the action button row inside the card.
// Content (trigger + card body) is Angular content projection — no direct code props.
const showActions = instance.getBoolean('Show actions#2609:12')

export default {
  example: figma.code`<ds-hover-card>
  <button>Hover me</button>
  <div card-content>
    <p class="ds-hover-card__title">Title</p>
    <p class="ds-hover-card__subtitle">Subtitle</p>
    <p class="ds-hover-card__text">Body text</p>${showActions ? figma.code`
    <button class="ds-button ds-button--text ds-button--sm">Cancel</button>
    <button class="ds-button ds-button--filled ds-button--sm">Confirm</button>` : ''}
  </div>
</ds-hover-card>`,
  imports: [
    'import { DsHoverCardComponent } from \'@onflo/design-system\'',
  ],
  id: 'hover-card',
  metadata: { nestable: false },
}

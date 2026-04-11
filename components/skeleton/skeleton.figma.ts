// url=https://www.figma.com/design/d08uUvbnN0CRL7UMBncwVE/Onflo-Design-System?node-id=60814-106663
// source=components/skeleton/skeleton.component.ts
// component=DsSkeletonComponent
import figma from 'figma'
const instance = figma.selectedInstance

// Skeleton shapes are projected content — ds-skeleton__line and ds-skeleton__rect
// classes create the placeholder elements; the parent wrapper handles aria-busy.

export default {
  example: figma.code`<ds-skeleton>
  <div class="ds-skeleton__line"></div>
  <div class="ds-skeleton__line ds-skeleton__line--sm"></div>
</ds-skeleton>`,
  imports: [
    'import { DsSkeletonComponent } from \'@onflo/design-system\'',
  ],
  id: 'skeleton',
  metadata: { nestable: false },
}

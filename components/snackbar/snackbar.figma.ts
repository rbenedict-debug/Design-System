// url=https://www.figma.com/design/d08uUvbnN0CRL7UMBncwVE/Onflo-Design-System?node-id=66962-393220
// source=components/snackbar/snackbar.component.ts
// component=DsSnackbarComponent
import figma from 'figma'
const instance = figma.selectedInstance

const message = instance.getString('Supporting text#53937:0')

// Variant controls whether an action button and/or close button appear.
const variant = instance.getEnum('Variant', {
  'Text only': 'text-only',
  'Text & action': 'text-action',
  'Text & longer action': 'text-longer-action',
})

// Show close toggles the dismiss × button.
const showClose = instance.getEnum('Show close', {
  'True': true,
  'False': false,
})

export default {
  example: figma.code`// Inject MatSnackBar into your component constructor, then:
this.snackBar.openFromComponent(DsSnackbarComponent, {
  data: {
    message: '${message}',
    variant: '${variant}',${variant !== 'text-only' ? figma.code`
    actionLabel: 'Action',` : ''}
    showClose: ${showClose},
  },
  panelClass: 'ds-snackbar-panel',
  duration: 5000,
  verticalPosition: 'top',
  horizontalPosition: 'center',
})`,
  imports: [
    'import { DsSnackbarComponent } from \'@onflo/design-system\'',
    'import { MatSnackBar } from \'@angular/material/snack-bar\'',
  ],
  id: 'snackbar',
  metadata: { nestable: false },
}

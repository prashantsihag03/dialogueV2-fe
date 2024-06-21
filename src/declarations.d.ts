/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallPopUpProps } from './Components/CallPopUp/CallPopUp'

declare module '*.png'
declare module '*.jpg'
declare module '*.svg'

declare module 'notistack' {
  import { SnackbarKey, SnackbarMessage } from 'notistack'
  interface VariantOverrides {
    // removes the `warning` variant
    warning: false
    // adds `myCustomVariant` variant
    myCustomVariant: true
    // adds `reportComplete` variant and specifies the
    // "extra" props it takes in options of `enqueueSnackbar`
    callPopUp: { callId: string; snackbarId: SnackbarKey }
  }
}

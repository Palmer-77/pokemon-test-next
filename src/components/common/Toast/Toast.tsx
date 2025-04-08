import { toast as sonner } from 'sonner'

import { testToast, toastFailed, toastSuccess } from './MessageToast'

const toast = () => {}

toast.testToast = () => sonner.custom(testToast())

toast.toastSuccess = (message: React.ReactNode | string) => sonner.custom(toastSuccess(message))
toast.toastFailed = (message: React.ReactNode | string) => sonner.custom(toastFailed(message))

export { toast }

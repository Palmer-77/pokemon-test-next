'use client'

// import CheckmarkCircleFill from '~icons/dl/checkmark-circle-fill.jsx'
// import EpAlertIcon from '~icons/dl/ep-alert-icon.jsx'
import CarbonDotMark from '~icons/carbon/dot-mark';

import ToastBase from './ToastBase'

export const testToast = () => (id: string | number) => {
  return (
    <ToastBase
      id={id}
      icon={<CarbonDotMark />}
    >
      test render
    </ToastBase>
  )
}

export const toastSuccess = (message: React.ReactNode | string) => (id: string | number) => {
  return (
    <ToastBase
      id={id}
      icon={<CarbonDotMark className="h-6 w-6 text-s-brand-primary" />}
      stripClassName="bg-s-brand-primary"
      bgClassName="bg-s-brand-primary/90"
    >
      {message}
    </ToastBase>
  )
}

export const toastFailed = (message: React.ReactNode | string) => (id: string | number) => {
  return (
    <ToastBase
      id={id}
      icon={<CarbonDotMark className="h-6 w-6 text-t-alert" />}
      stripClassName="bg-t-alert"
      bgClassName="bg-t-alert/90"
    >
      {message}
    </ToastBase>
  )
}

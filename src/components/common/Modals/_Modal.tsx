import { ReactNode } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '../../ui/alert-dialog'

type ModalLayoutProps = {
  open: boolean
  setIsOpen: (open: boolean) => void
  hero?: ReactNode
  title: ReactNode | string
  description?: ReactNode | string
  cancel?: {
    label: string
    action?: () => void
  }
  action?: {
    label: string
    action: () => void
  }
}

export const ModalLayout = ({ hero, open, setIsOpen, title, description, cancel, action }: ModalLayoutProps) => {
  return (
    <AlertDialog
      open={open}
      onOpenChange={setIsOpen}
    >
      <AlertDialogContent className="rounded-2xl">
        {hero && <div className="flex justify-center">{hero}</div>}
        <AlertDialogTitle className="text-center sm:text-center text-md">{title}</AlertDialogTitle>
        <AlertDialogDescription className="text-center text-sm">{description}</AlertDialogDescription>
        <AlertDialogFooter className="justify-center sm:justify-center">
          {!!cancel && <AlertDialogCancel onClick={cancel.action}>{cancel.label}</AlertDialogCancel>}
          {!!action && <AlertDialogAction onClick={action.action}>{action.label}</AlertDialogAction>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

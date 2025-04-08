import { ReactNode } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import CloseIcon from '~icons/dl/close-icon.jsx'

type ToastBaseProps = {
  id: string | number
  icon?: ReactNode
  stripClassName?: string
  children?: ReactNode
  bgClassName?: string
}

const ToastBase = ({ id, icon, stripClassName, children, bgClassName }: ToastBaseProps) => {
  const IconElement = icon ?? null

  return (
    <div className={cn('flex flex-row overflow-hidden relative rounded-md shadow-lg', bgClassName)}>
      <div className={cn('w-2 ', stripClassName)} />
      <div className="p-4 flex-1 flex items-center gap-3">
        {IconElement}
        <span className="flex-1 font-semibold">{children}</span>
        <Button
          variant="ghost"
          className="flex-shrink-0 h-6 w-6 text-secondary hover:text-gray-500 p-0"
          onClick={() => toast.dismiss(id)}
        >
          <CloseIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

export default ToastBase

import { useTranslations } from 'next-intl'

import { Avatar, AvatarFallback, AvatarImage, Badge, LinkButton } from '@/components/ui'

import LineiconsGo from '~icons/lineicons/go'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type CardProps = {
  id: number | string
  name: string
  description?: string
  image?: string
  type?: string
  onClick?: () => void
  path?: string
  icon?: ReactNode
  className?: string
  disabled?: boolean
}

export const Card = ({
  className,
  id,
  name,
  description,
  image,
  type,
  path,
  icon,
  onClick,
  disabled = false,
}: CardProps) => {
  const router = useRouter()
  return (
    <div
      className={cn(
        'relative p-6 shadow-lg border rounded-full flex gap-4 desktop:min-w-[400px]',
        className,
        disabled && 'opacity-50',
      )}
      onClick={() => (disabled ? null : router.push(`${path}`))}
    >
      {type && <Badge className="absolute right-4 top-4 z-10 h-7">{type}</Badge>}
      {image && (
        <Avatar className="size-24 mx-auto border border-b-primary">
          <AvatarImage
            src={image}
            className="object-cover"
          />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      )}
      <div className="flex-1 flex flex-col items-start justify-center text-start min-h-14">
        <span className="text-h4-bold line-clamp-1 ">{name}</span>
        {description && <span className="text-subtitle line-clamp-2">{description}</span>}
      </div>
      <div className="flex items-center">
        {icon ? (
          icon
        ) : (
          <LineiconsGo
            className="text-primary w-20 h-20"
            onClick={onClick}
          />
        )}
      </div>
    </div>
  )
}

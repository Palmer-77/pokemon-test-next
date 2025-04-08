import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import HeroiconsArrowRightStartOnRectangle16Solid from '~icons/heroicons/arrow-right-start-on-rectangle-16-solid'

export const ProfileDropdown = ({
  profile,
}: {
  profile: {
    name: string
    profile_url: string
  }
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="border border-b-primary size-9">
          <AvatarImage
            src={
              profile?.profile_url ||
              'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109'
            }
            alt="avatar"
          />
          <AvatarFallback>{profile?.name ?? 'M'}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-52"
      >
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            <Avatar className="border border-b-primary size-9">
              <AvatarImage
                src={
                  profile?.profile_url ||
                  'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109'
                }
                alt="avatar"
              />
              <AvatarFallback>{profile?.name ?? 'M'}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">{profile?.name ?? ''}</p>
              <p className="text-xs text-s-secondary font-normal">{profile?.name ?? ''}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => {}}
        >
          <HeroiconsArrowRightStartOnRectangle16Solid className="size-5 shrink-0" />
          Close
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

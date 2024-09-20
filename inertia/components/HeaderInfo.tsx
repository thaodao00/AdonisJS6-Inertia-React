import { usePage } from '@inertiajs/react'

type User = {
  username: string
}
export function AvatarComponent() {
  const { user } = usePage<{ user: User }>().props

  return (
    <div className="fixed top-0 h-[70px]  w-full right-0 bg-slate-50 border border-b-2 pr-10 flex items-center justify-end">
      <div className="space-y-1 font-medium">
        <div>{user?.username}</div>
      </div>
    </div>
  )
}

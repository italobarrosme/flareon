import { Icon } from '@iconify/react'

export const ButtonLogout = () => {
  return (
    <a
      href="/auth/logout"
      className="group text-neutral-white flex gap-4 items-center min-w-fit p-2 bg-primary-regular border-none hover:bg-primary-regular/80 delay-75 rounded-lg"
    >
      Sair do sistema{' '}
      <Icon
        icon="mdi:logout"
        className="text-neutral-white group-hover:animate-bounce-right"
      />
    </a>
  )
}

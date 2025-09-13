import Image from 'next/image'
import { ButtonLogout } from '../ButtonLogout'

type User = {
  picture?: string
  name?: string
  email?: string
}

type NavbarProps = {
  user: User | undefined
}
export const Navbar = ({ user }: NavbarProps) => {
  if (!user) return null

  return (
    <nav className="flex w-screen h-16 flex-row justify-between gap-4 items-center fixed top-0 p-4">
      <div className="flex flex-row gap-2 items-center">
        <Image src="/logo_dark.png" alt="Nezuko 3" width={48} height={48} />
        <h1 className="text-2xl font-bold">Nezuko 3</h1>
      </div>
      <div className="flex flex-row gap-4 items-center">
        {user.picture ? (
          <Image
            src={user.picture}
            alt={user.name || 'User'}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : null}
        <div className="flex flex-col">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <ButtonLogout />
      </div>
    </nav>
  )
}

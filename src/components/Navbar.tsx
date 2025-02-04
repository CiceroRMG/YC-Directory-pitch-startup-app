import Image from "next/image"
import Link from "next/link"
import { auth, signIn, signOut } from "../../auth"

const Navbar = async () => {
    const session = await auth()

    const userLoggedIn = session && session?.user

    const login = async () => {
        'use server'

        await signIn('github')
    }

    const logout = async () => {
        'use server'

        await signOut({ redirectTo: '/' })
    }

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.svg" alt="Logo" width={144} height={30} />
                </Link>

                <div className="flex items-center gap-5">
                    {userLoggedIn ? (
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>

                            <form action={logout}>

                                <button type="submit">
                                    Logout
                                </button>
                            </form>

                            <Link href={`/user/${session.user?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form action={login}>
                            <button type="submit">
                                Login
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar
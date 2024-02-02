import { toast } from "sonner"
import { useRouter } from "next/navigation"

const useAuth = () => {
    const router = useRouter()

    const signOut = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
                method: 'POST',
                credentials: 'include', // Required for cookies
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error();
            }

            toast.success('You have been signed out.')

            router.push('/sign-in')
            router.refresh()
        }
        catch (error) {
            console.error(error);
            toast.error('Failed to sign out, please try again later.')
        }
    }

    return { signOut }
}

export default useAuth

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@mui/material"
import { useRouter } from "next/navigation"

const SignInBtn = () => {
  const { data: session } = useSession()
  if (session) {
    return
  }
  return (
    <Button
      variant="contained"
      onClick={() => signIn('auth0', { callbackUrl: "/portal", prompt: "login" })}
      // onClick={() => signIn({ callbackUrl: "/portal/courses" })}
    >
      SIGN-IN TO APP
    </Button>
  )
}

const SignOutBtn = () => {
  return (
    <Button
      variant="outlined"
      onClick={() => {
        signOut({
          callbackUrl: `${process.env.NEXT_PUBLIC_SIGNOUTCALLBACKURL}`,
        })
      }}
    >
      Sign Out
    </Button>
  )
}

const SignOutButton = () => {
  const router = useRouter();

  function signOutHandler() {
    router.push('auth/federated-sign-out');
  }

  return (
    <Button
      variant="outlined"
      onClick={signOutHandler}
    >
      Sign Out
    </Button>
  )
}

export { SignInBtn, SignOutBtn, SignOutButton }

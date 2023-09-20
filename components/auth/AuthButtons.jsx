import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@mui/material"
import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"

const SignInBtn = () => {
  const { data: session } = useSession()
  if (session) {
    return
  }
  return (
    <Button
      variant="contained"
      startIcon={<LoginIcon />}
      onClick={() => signIn(undefined, { callbackUrl: "/portal" })}
      aria-label="Sign in button"
    >
      Sign In to App
    </Button>
  )
}

const SignOutBtn = () => {
  return (
    <Button
      variant="outlined"
      startIcon={<LogoutIcon />}
      onClick={() => {
        signOut({
          callbackUrl: `${process.env.NEXT_PUBLIC_SIGNOUTCALLBACKURL}`,
        })
      }}
      aria-label="Sign out button"
    >
      Sign Out
    </Button>
  )
}

export { SignInBtn, SignOutBtn }

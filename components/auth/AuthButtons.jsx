import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@mui/material"

const SignInBtn = () => {
    const { data: session } = useSession();
    if (session) {
        return;
    }
    return (
        <Button variant="contained" onClick={() => signIn(undefined, { callbackUrl: "/portal" })}>SIGN-IN TO APP</Button>
    )
}

const SignOutBtn = () => {
    return (
        <Button variant="contained" onClick={() => {
            signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_SIGNOUTCALLBACKURL}` })}
        }>Sign Out</Button>
    )
}

export {SignInBtn, SignOutBtn};
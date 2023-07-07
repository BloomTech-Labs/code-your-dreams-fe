import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@mui/material"

const SignInBtn = () => {
    const { data: session } = useSession();
    if (session) {
        return;
    }
    return (
        <Button variant="contained" onClick={() => signIn()}>SIGN-IN TO APP</Button>
    )
}

const SignOutBtn = () => {
    const { data: session } = useSession();
    return (
        <Button variant="contained" onClick={() => signOut()}>Sign Out</Button>
    )
}

export {SignInBtn, SignOutBtn};
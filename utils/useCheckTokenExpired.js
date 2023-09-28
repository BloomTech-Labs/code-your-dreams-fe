import { useSession } from "next-auth/react"
import { redirect, usePathname } from "next/navigation"
import tokenExpired from "@/utils/tokenExpired"
import { signOut } from "next-auth/react"
import { useEffect } from "react";

export default function useCheckTokenExpired() {
    const { data: session, status } = useSession();

    const pathname = usePathname()

    useEffect(() => {
        if (status === 'authenticated') {
            if (tokenExpired(session.idToken) === false && pathname === '/') {
                redirect('/portal/courses')
            }
            if (tokenExpired(session.idToken) === true) {
                signOut()
            }
        }
    }, [status, session, pathname])
}
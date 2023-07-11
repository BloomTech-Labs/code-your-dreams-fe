"use client"

import styles from "./page.module.scss"
import { SignOutBtn } from "@/components/auth/AuthButtons"
import { useSession } from "next-auth/react"

export default function Page() {
  const { data: session } = useSession()
  /* Can pull user name, email, and "image" (avatar) using "session.user.*" Everything else will need to be stored and retrieved from our own database. */

  return (
    <main className={styles.account}>
      <section className="container">
        <h1>Account</h1>
        <p>Organization: Code Your Dreams</p>
        <p>Email address: {session ? session.user.email : ""}</p>
        {/* Check to see what is managed in Auth0 vs locally in-app */}
        <button>Edit account</button>
      </section>
      <section className="container">
        <p>Sign out from the app.</p>
        <SignOutBtn className="secondary">Sign Out</SignOutBtn>
      </section>
    </main>
  )
}

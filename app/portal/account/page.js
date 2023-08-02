"use client"

import styles from "./page.module.scss"
import { SignOutBtn, SignOutButton } from "@/components/auth/AuthButtons"
import { Button } from "@mui/material"
import { useSession } from "next-auth/react"

export default function Page() {
  const { data: session } = useSession()
  /* Can pull user name, email, and "image" (avatar) using "session.user.*" Everything else will need to be stored and retrieved from our own database. */

  return (
    <main className={styles.account}>
      <aside className="TODO">
        TODO:
        <ul>
          <li>
            Add functionality to Auth0 here and connect the "Edit Account"
            button with the service.
          </li>
          <li>Connect member chapter with "Organization" from database.</li>
        </ul>
      </aside>
      <section className="container">
        <h1>Account</h1>
        <p>Organization: Code Your Dreams</p>
        <p>Email address: {session ? session.user.email : ""}</p>
        {/* Check to see what is managed in Auth0 vs locally in-app */}
        <Button variant="outlined">Edit account</Button>
      </section>
      <section className="container">
        <p>Sign out from the app.</p>
        {/* <SignOutBtn className="secondary">Sign Out</SignOutBtn> */}
        <SignOutButton className="secondary" />
      </section>
    </main>
  )
}

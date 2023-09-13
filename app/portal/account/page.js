"use client"

import styles from "./page.module.scss"
import { SignOutBtn } from "@/components/auth/AuthButtons"
import { Card } from "@mui/material"
import { useSession } from "next-auth/react"
import EditButton from "@/components/admin/EditButton/EditButton"
import EditMember from "./_components/EditMember"

export default function Page() {
  const { data: session } = useSession()
  /* TODO: (delete comment when no longer needed) Can pull user name, email, and "image" (avatar) using "session.user.*"
  Everything else will need to be stored and retrieved from our own database. */

  return (
    <main className={styles.account}>
      <section className={`container ${styles["content-body"]}`}>
        <h1>Account</h1>
        {/* TODO: Connect chapter name or "Code Your Dreams" to display in the field below. */}
        <p>
          This account is associated with [{"{chapter_name}/Code Your Dreams"}].
        </p>
        <Card variant="outlined" className={styles["action-group"]}>
          <p>Sign out from the app.</p>
          <SignOutBtn className="secondary">Sign Out</SignOutBtn>
        </Card>
        <Card variant="outlined" className={styles["action-group"]}>
          <p>
            Name: {session ? session.user.name : "unknown"}
            <br />
            Email: {session ? session.user.email : "unknown"}
          </p>
          <EditButton title="Edit Account Details" isFullButton={true}>
            <EditMember />
          </EditButton>
        </Card>
      </section>
    </main>
  )
}

"use client"

import { useState } from "react"
import styles from "./page.module.scss"
import { SignOutBtn } from "@/components/auth/AuthButtons"
import { Card } from "@mui/material"
import EditButton from "@/components/admin/EditButton/EditButton"
import EditMember from "./_components/EditMember"
import useCheckTokenExpired from "@/utils/useCheckTokenExpired"
import { useData } from "@/context/appContext"

export default function Page() {
  /* TODO: (delete comment when no longer needed) Can pull user name, email, and "image" (avatar) using "session.user.*"
  Everything else will need to be stored and retrieved from our own database. */
  const [open, setOpen] = useState(false)

  const handleSubmitEditUser = () => {
    // TODO: Complete the edit processing here
    console.log("handleSubmitEditUser")
  }

  const { current_user } = useData()
  useCheckTokenExpired()

  return (
    <main className={styles.account}>
      <section className={`container ${styles["content-body"]}`}>
        <h1>Account</h1>
        <p>
          {current_user &&
            `This account is associated with ${current_user.chapter_name}.`}
        </p>
        <Card variant="outlined" className={styles["action-group"]}>
          <p>Sign out from the app.</p>
          <SignOutBtn className="secondary">Sign Out</SignOutBtn>
        </Card>
        <Card variant="outlined" className={styles["action-group"]}>
          <p>
            Name: {current_user ? current_user.name : "unknown"}
            <br />
            Email: {current_user ? current_user.email : "unknown"}
          </p>
          <EditButton
            title="Edit Account Details"
            isFullButton={true}
            handleSubmit={handleSubmitEditUser}
            open={open}
            setOpen={setOpen}
          >
            <EditMember />
          </EditButton>
        </Card>
      </section>
    </main>
  )
}

"use client"

import styles from "./page.module.scss"
import { Link } from "@mui/material"

export default async function Page() {

  return (
    // This is the landing page for users that are logged in
    <main className={styles.main}>
      <section>
        <h1>Portal Home</h1>
        {/* Only logged in users will see this page */}
        <p>
          Welcome [member_name]!
          <br />
          You are a member of [organization_name]
        </p>
      </section>
      <section>
        <h2>Your Courses</h2>
        <div>*A list of current user courses will be included here*</div>
      </section>
      <section>
        {/* Only global admins should see this section */}
        <h2>Admin Features</h2>
        <div>Member administration</div>
        {/* Global admins only */}
        <div>Program administration</div>
      </section>
      <section>
        <h2>Your Account</h2>
        <Link underline="hover" href="/portal/account">
          Update your account
        </Link>
      </section>
    </main>
  )
}

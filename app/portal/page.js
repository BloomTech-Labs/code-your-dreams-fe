import styles from "./page.module.scss"
import Link from "next/link"

export default function Page() {
  return (
    // This is the landing page for users that are logged in
    <main>
      <section>
        <p>You are logged in.</p>
        <h1>Organization Name</h1>
        <div>Your Courses</div>
        <div>Member List for Org Admins</div>
        <Link href="/portal/account">Your Account</Link>
      </section>
    </main>
  )
}

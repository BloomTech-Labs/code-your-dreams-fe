"use client"

import styles from "./Sections.module.scss"
import { useSession } from "next-auth/react"

export default function Welcome() {
  const { data: session } = useSession()

  return (
    <section className={`container ${styles.welcome}`}>
      <h1>Portal Home</h1>
      <p>
        Welcome {session ? session.user.name : ""}!
        <br />
        You are a member of [chapter_name]
      </p>
    </section>
  )
}

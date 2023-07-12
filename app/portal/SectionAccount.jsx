"use client"

import { Link } from "@mui/material"
import styles from "./Sections.module.scss"

export default function Account() {
  return (
    <section className={`container ${styles.account}`}>
      <h2>Your Account</h2>
      <Link underline="hover" href="/portal/account">
        Update your account
      </Link>
    </section>
  )
}

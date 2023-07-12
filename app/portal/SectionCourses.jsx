"use client"

import * as React from "react"
import { Link } from "@mui/material"
import styles from "./Sections.module.scss"

export default function Courses() {
  return (
    <section className={`container ${styles.courses}`}>
      <h2>Your Courses</h2>

      <div className={styles["course-list"]}>
        <Link href="#" underline="none" className={styles["course-row"]}>
          Python
        </Link>
        <Link href="#" underline="none" className={styles["course-row"]}>
          App Inventor
        </Link>
      </div>
      <Link href="/portal/courses" underline="hover">
        View expanded list of courses
      </Link>
    </section>
  )
}

"use client"

import styles from "./Navigation.module.scss"
import { Button } from "@mui/material"

export default function Navigation() {
  return (
    <nav className={styles["site-nav"]}>
      <div className="container">
        <Button variant="text" href="/portal/courses">
          Courses
        </Button>
        {/* "Members" are restricted to Org Admins and higher */}
        <Button variant="text" href="/portal/members">
          Members
        </Button>
        {/* "Organizations" is restricted to super admins */}
        <Button variant="text" href="/portal/chapters">
          Chapters
        </Button>
        {/* "Global Settings" is restricted to super admins */}
        <Button variant="text" href="/portal/admin">
          Admin
        </Button>
      </div>
    </nav>
  )
}

"use client"

import styles from "./Navigation.module.scss"
import { Button, IconButton } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"

export default function Navigation() {
  return (
    <nav className={styles["site-nav"]}>
      <IconButton href="/portal" color="primary">
        <HomeIcon />
      </IconButton>
      {/* Courses are available to all users */}
      <Button variant="text" href="/portal/courses">
        Courses
      </Button>
      {/* Members are restricted to Org Admins */}
      <Button variant="text" href="/portal/members">
        Members
      </Button>
      {/* Organizations is restricted to super admins */}
      <Button variant="text" href="/portal/chapters">
        Chapters
      </Button>
      {/* Temporarily adding new sign in button here for testing*/}
    </nav>
  )
}

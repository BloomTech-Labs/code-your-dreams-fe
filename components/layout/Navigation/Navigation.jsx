"use client"

import styles from "./Navigation.module.scss"
import { Button, IconButton } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"

export default function Navigation() {
  return (
    <nav className={styles["site-nav"]}>
      <div className="container">
        <span className="uppercase">Organization Name</span>
        {/* "Members" are restricted to Org Admins and higher */}
        <Button variant="text" href="/portal/members">
          Members
        </Button>
        {/* "Organizations" is restricted to super admins */}
        <Button variant="text" href="/portal/chapters">
          Chapters
        </Button>
        {/* "Global Settings" is restricted to super admins */}
        <Button variant="text" href="#">
          Global Settings
        </Button>
      </div>
    </nav>
  )
}

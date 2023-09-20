"use client"

import styles from "./Navigation.module.scss"
import { Button } from "@mui/material"

export default function Navigation() {
  return (
    <nav className={styles["site-nav"]}>
      <div className="container">
        <Button
          variant="text"
          href="/portal/courses"
          aria-label="view courses"
          aria-current="page"
          tabIndex={1}
        >
          Courses
        </Button>
        {/* "Members" are restricted to Org Admins and higher */}
        <Button
          variant="text"
          href="/portal/members"
          aria-label="View members"
          aria-current="page"
          tabIndex={2}
        >
          Members
        </Button>
        {/* "Organizations" is restricted to super admins */}
        <Button
          variant="text"
          href="/portal/chapters"
          aria-label="View chapters"
          aria-current="page"
          tabIndex={3}
        >
          Chapters
        </Button>
        {/* "Global Settings" is restricted to super admins */}
        <Button
          variant="text"
          href="/portal/admin"
          aria-label="View admin tools"
          aria-current="page"
          tabIndex={4}
        >
          Admin
        </Button>
      </div>
    </nav>
  )
}

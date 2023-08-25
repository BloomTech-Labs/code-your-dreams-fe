"use client"

import SiteLogo from "../SiteLogo/SiteLogo"
import styles from "./Header.module.scss"
import { Button, IconButton } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"

export default function Header() {
  return (
    <header className={styles["site-header"]}>
      <div className={`container ${styles["header-container"]}`}>
        <div className={styles["left-side"]}>
          <SiteLogo />
          {/* TODO: If they are a CYD user, display "Code Your Dreams" */}
          {/* TODO: When a user is logged in, display their chapter name */}
          <div className="h4">
            {"{Code Your Dreams Admin}"} or {"{chapter_name}"}
          </div>
        </div>
        <nav>
          <IconButton
            href="/portal/account"
            color="primary"
            size="large"
            aria-label="account"
            className="compact-button"
          >
            <PersonIcon />
          </IconButton>
          <Button
            href="/portal/account"
            variant="text"
            endIcon={<PersonIcon />}
            aria-label="account"
            className="full-button"
          >
            Account
          </Button>
        </nav>
      </div>
    </header>
  )
}

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
          {/* TODO: If they are a CYD user, display "Code Your Dreams Admin/Staff" */}
          {/* TODO: When a user is logged in, display their chapter name */}
          <div className="h4">
            {"{Code Your Dreams Admin/Staff}"} or {"{chapter_name}"}
          </div>
        </div>
        <nav>
          <IconButton
            href="/portal/account"
            color="primary"
            size="large"
            aria-label="view account"
            className="compact-button"
            tabIndex={5}
          >
            <PersonIcon />
          </IconButton>
          <Button
            href="/portal/account"
            variant="text"
            endIcon={<PersonIcon />}
            aria-label="view account"
            className="full-button"
            tabIndex={5}
          >
            Account
          </Button>
        </nav>
      </div>
    </header>
  )
}

"use client"

import styles from "./Header.module.scss"
import { Button, IconButton } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <IconButton
        href="/portal/account"
        color="primary"
        size="large"
        aria-label="View account"
        className="compact-button"
        tabIndex={5}
      >
        <PersonIcon />
      </IconButton>
      <Button
        href="/portal/account"
        variant="text"
        endIcon={<PersonIcon />}
        aria-label="View account"
        className="full-button"
        tabIndex={5}
      >
        Account
      </Button>
    </nav>
  )
}

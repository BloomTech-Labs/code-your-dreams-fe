"use client"

import SiteLogo from "../SiteLogo/SiteLogo"
import styles from "./Header.module.scss"
import { Button } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"

export default function Header() {
  return (
    <header className={styles["site-header"]}>
      <SiteLogo />
      <nav>
        <Button variant="text" endIcon={<PersonIcon />} href="/portal/account">
          Account
        </Button>
      </nav>
    </header>
  )
}

"use client"

import SiteLogo from "../SiteLogo/SiteLogo"
import styles from "./Header.module.scss"
import { Button } from "@mui/material"

export default function Header() {
  return (
    <header className={styles["site-header"]}>
      <SiteLogo />
      <nav>
        <Button variant="outlined" href="/">
          Logout
        </Button>
      </nav>
    </header>
  )
}

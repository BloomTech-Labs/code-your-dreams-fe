"use client"

import SiteLogo from "../SiteLogo/SiteLogo"
import styles from "./Header.module.scss"
import { Button, IconButton } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import { useData } from "@/context/appContext"

export default function Header() {
  const { current_user } = useData()

  const roleMap = {
    super_admin: "Super Admin",
    admin: "Admin",
    user: "Staff",
  }

  return (
    <header className={styles["site-header"]}>
      <div className={`container ${styles["header-container"]}`}>
        <div className={styles["left-side"]}>
          <SiteLogo />
          <div className={styles["org-header"]}>
            <span className={`${styles.title} h4`}>
              {current_user ? current_user.chapter_name : ""}
            </span>
            <span className={styles.role}>
              {current_user ? roleMap[current_user.role] : ""}
            </span>
          </div>
        </div>
        <nav>
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
      </div>
    </header>
  )
}

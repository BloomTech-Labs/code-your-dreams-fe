"use client"

import SiteLogo from "../SiteLogo/SiteLogo"
import styles from "./Header.module.scss"
import { useData } from "@/context/appContext"
import NavBar from "./NavBar"

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
        {current_user ? <NavBar /> : ""}
      </div>
    </header>
  )
}

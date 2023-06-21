import Link from "next/link"
import SiteLogo from "../SiteLogo/SiteLogo"
import styles from "./Header.module.scss"

export default function Header() {
  return (
    <header className={styles["site-header"]}>
      <SiteLogo />
      <nav>
        <Link href="/" className="button secondary">
          Logout
        </Link>
      </nav>
    </header>
  )
}

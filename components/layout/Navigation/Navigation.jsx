import styles from "./Navigation.module.scss"
import Link from "next/link"

export default function Navigation() {
  return (
    <nav className={styles["site-nav"]}>
      <Link href="/">Home</Link>
      <Link href="/">Courses</Link>
      <Link href="/">Members</Link>
    </nav>
  )
}

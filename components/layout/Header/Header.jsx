import Link from "next/link"
import Image from "next/image"
import styles from "./Header.module.scss"

export default function Header() {
  return (
    <header className={styles["site-header"]}>
      <Link href="/" className="no-text">
        <Image
          src="/images/CYD_Logo_2020.jpg"
          alt="Code Your Dreams logo"
          width={102}
          height={60}
        />
      </Link>
      <nav>
        <Link href="/styles">Styles</Link>
        <a href="#" className="button">
          Login
        </a>
      </nav>
    </header>
  )
}

import Link from "next/link"
import SiteLogo from "@/components/layout/SiteLogo/SiteLogo"
import styles from "./page.module.scss"

export default function Home() {
  return (
    <>
      <header>
        <SiteLogo />
        <nav>
          <Link href="/style">Style</Link>
          <Link href="/portal" className="button secondary">
            Login
          </Link>
        </nav>
      </header>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles["hero-message"]}>
            <h1>Code Your Dreams</h1>
            <p>Welcome to the Code Your Dreams curriculum portal.</p>
            <p>
              This app is where our affiliated instructors can come to access
              our curriculum. If your organization would like to join us, please
              use the button below to fill out an interest form.
            </p>
            <p>
              <a href="https://www.codeyourdreams.org/" target="_blank">
                Visit our website
              </a>{" "}
              to learn more about who we are.
            </p>
            <div className={styles["button-row"]}>
              <a href="#" className="button">
                Sign-in to App
              </a>
              <a href="#" className="button secondary">
                Submit Interest
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

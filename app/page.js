"use client"

import { useEffect } from "react"
import { Button, Link } from "@mui/material"
import styles from "./page.module.scss"
import Image from "next/image"
import { SignInBtn } from "../components/auth/AuthButtons"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import tokenExpired from "@/utils/tokenExpired"
import { signOut } from "next-auth/react"

export default function Page() {
  const { data: session } = useSession()

  useEffect(() => {
    if(session) {
      if (tokenExpired(session.idToken) === false) {
        redirect("/portal/courses")
      } else if (tokenExpired(session.idToken) === true) {
        signOut()
      }
    }
  }, [session])

  return (
    <>
      <header className={styles.header}>
        <Image
          priority
          src="/images/CYD-Logo.png"
          width={112}
          height={64}
          alt="A laptop with Code Your Dreams on the screen"
        />
      </header>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles["image-wrapper"]}>
            <Image
              priority
              src="/images/Code-Your-Dreams-Hero.jpg"
              fill
              style={{ objectFit: "cover" }}
              alt="Code Your Dreams students jumping up and cheering"
            />
          </div>
          <div className={styles["hero-message"]}>
            <h1>
              Code Your Dreams
              <br />
              <span className={`h2 ${styles["app-name"]}`}>
                Curriculum Portal
              </span>
            </h1>
            <div className={styles["message-content"]}>
              <p>
                This app is for affiliated instructors to access our curriculum.
                If your organization would like to join us, please use the
                button below to fill out an interest form.
              </p>
              <p>
                <Link
                  href="https://www.codeyourdreams.org/"
                  underline="hover"
                  target="_blank"
                  rel="noopener"
                >
                  Visit our website
                </Link>{" "}
                to learn more about who we are.
              </p>
              <div className={styles["button-row"]}>
                <SignInBtn />
                <Button
                  variant="outlined"
                  href="https://forms.gle/XS9hL3nXintpFLpn9"
                  target="_blank"
                >
                  Submit interest
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

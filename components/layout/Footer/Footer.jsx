"use client"

import styles from "./Footer.module.scss"
import Link from "@mui/material/Link"

export default function Footer() {
  return (
    <footer className={styles["site-footer"]}>
      <div className={styles.notice}>
        <span>&copy; {new Date().getFullYear()} All Rights Reserved. </span>
        <span>
          <Link
            href="https://www.codeyourdreams.org/"
            aria-label="Visit the Code Your Dreams website"
            underline="hover"
            target="_blank"
            rel="noopener"
          >
            Code Your Dreams
          </Link>{" "}
          is a 501(c)(3) organization.
        </span>
        <span>EIN: 82-5426088.</span>
      </div>
    </footer>
  )
}

import styles from "./Footer.module.scss"

export default function Footer() {
  return (
    <footer className={styles["site-footer"]}>
      <div className={styles.notice}>
        <span>&copy; {new Date().getFullYear()} All Rights Reserved. </span>
        <span>
          <a href="https://www.codeyourdreams.org/" target="_blank">
            Code Your Dreams
          </a>{" "}
          is a 501(c)(3) organization.
        </span>
        <span>EIN: 82-5426088.</span>
      </div>
    </footer>
  )
}

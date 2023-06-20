import styles from "./Footer.module.scss"

export default function Footer() {
  return (
    <footer className={styles["site-footer"]}>
      <div>
        &copy; {new Date().getFullYear()} All Rights Reserved.{" "}
        <a href="https://www.codeyourdreams.org/" target="_blank">
          Code Your Dreams
        </a>{" "}
        is a 501(c)(3) organization. EIN: 82-5426088.
      </div>
    </footer>
  )
}

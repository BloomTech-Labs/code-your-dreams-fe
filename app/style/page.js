import SiteLogo from "@/components/layout/SiteLogo/SiteLogo"
import styles from "./page.module.scss"

export default function Page() {
  return (
    <>
      <header>
        <SiteLogo />
      </header>
      <main className={styles.main}>
        <section className="container">
          <h1>Style Guide</h1>
          <p>
            This is the style guild for the Code Your Dreams courses web app
          </p>
        </section>
        <section className="container">
          <h2>Typography</h2>
          <h3>Fonts</h3>
          <p>
            The site uses Google font{" "}
            <a
              href="https://fonts.google.com/specimen/Roboto+Flex"
              target="_blank"
            >
              Roboto Flex
            </a>{" "}
            with a base size of 1rem.
          </p>
          <h3>Headings</h3>
          <p>
            The app uses fluid typography for sizing for headers, based on the
            default font size and the container width. There are four header
            types used in the app (
            <code className={styles.highlighted}>h1</code> -{" "}
            <code className={styles.highlighted}>h4</code>), as well as four
            pseudo classes that can be used to apply header sizing to any text (
            <code className={styles.highlighted}>".h1"</code>,{" "}
            <code className={styles.highlighted}>".h2"</code>,{" "}
            <code className={styles.highlighted}>".h3"</code>, and{" "}
            <code className={styles.highlighted}>".h4"</code>).
          </p>
          <div className={styles.examples}>
            <h1>Header 1</h1>
            <h2>Header 2</h2>
            <h3>Header 3</h3>
            <h4>Header 4</h4>
          </div>
        </section>
        <section className="container">
          <h2>Colors</h2>
          <p>
            These are colors pulled from the Code Your Dreams website, used in
            the app.
          </p>
          <div className={`${styles.examples} ${styles.colors}`}>
            <span className={styles.color1}>
              Color 1: <code>$cyd-pink</code>
            </span>
            <span className={styles.color2}>
              Color 2: <code>$cyd-light-pink</code>
            </span>
            <span className={styles.color3}>
              Color 3: <code>$cyd-blue</code>
            </span>
            <span className={styles.color4}>
              Color 4: <code>$cyd-light-blue</code>
            </span>
            <span className={styles.color5}>
              Color 5: <code>$cyd-purple</code>
            </span>
            <span className={styles.color6}>
              Color 6: <code>$cyd-gray</code>
            </span>
            <span className={styles.color7}>
              Color 7: <code>$cyd-light-gray</code>
            </span>
            <span className={styles.color8}>
              Color 8: <code>$cyd-black</code>
            </span>
            <span className={styles.white}>
              White: <code>white</code>
            </span>
            <span className={styles.black}>
              Black: <code>black</code>
            </span>
          </div>
        </section>
        <section className="container">
          <h2>UI Components</h2>
          <p>
            The application takes advantage of{" "}
            <a href="https://mui.com/material-ui/" target="_new">
              Material UI
            </a>{" "}
            components which use{" "}
            <a href="https://material.io/" target="_new">
              Material Design
            </a>{" "}
            styles by default. There is minimal diversion from the style library
            applied in this app.
          </p>
        </section>
      </main>
    </>
  )
}

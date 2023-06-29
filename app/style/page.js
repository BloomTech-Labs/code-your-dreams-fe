import SiteLogo from "@/components/layout/SiteLogo/SiteLogo"
import styles from "./page.module.scss"

export default function Page() {
  return (
    <>
      <header>
        <SiteLogo />
      </header>
      <main className={styles.main}>
        <section>
          <h1>Style Guide</h1>
          <p>
            This is the style guild for the Code Your Dreams courses web app
          </p>
        </section>
        <section>
          <h2>Typography</h2>
          <p>
            The app uses fluid typography for sizing for headers, based on 1rem
            and the container width.
          </p>
          <h3>Fonts</h3>
          <p>
            The site uses Google font{" "}
            <a href="https://fonts.google.com/specimen/Nunito" target="_blank">
              Nunito Sans
            </a>
            , a variable font that supports weights from 200 to 1000, and has a
            single variable axis <span className="italic">(italic)</span>.
          </p>
          <h3>Headings</h3>
          <div className={styles.examples}>
            <h1>Header 1</h1>
            <h2>Header 2</h2>
            <h3>Header 3</h3>
            <h4>Header 4</h4>
          </div>
        </section>
        <section>
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
              Color 2: <code>$cyd-dark-pink</code>
            </span>
            <span className={styles.color3}>
              Color 3: <code>$cyd-purple</code>
            </span>
            <span className={styles.color4}>
              Color 4: <code>$cyd-light-gray</code>
            </span>
            <span className={styles.color5}>
              Color 5: <code>$cyd-gray</code>
            </span>
            <span className={styles.color6}>
              Color 5: <code>$cyd-black</code>
            </span>
            <span className={styles.white}>
              White: <code>white</code>
            </span>
            <span className={styles.black}>
              Black: <code>black</code>
            </span>
          </div>
        </section>
      </main>
    </>
  )
}

// This is the dynamic page for chapters, where "slug" is the URL friendly chapter name that is generated when a new chapter is created.
// When an admin clicks on a chapter entry in the chapter admin page, it will open up the link with the chapter slug in the window, to show the chapter detail page.

"use client"

import styles from "./page.module.scss"

export default function ChapterDetail() {
  return (
    <main className={styles.detail}>
      <p>This is a chapter detail page.</p>
    </main>
  )
}

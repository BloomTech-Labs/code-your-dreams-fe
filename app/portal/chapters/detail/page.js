"use client"

import styles from "./page.module.scss"

export default function Page() {
  {
    /* This page is restricted to only Chapter Admins */
  }

  return (
    <main className={styles.detail}>
      <section className="container">
        <div className="header-row">
          <h1>Chapter Name</h1>
        </div>
      </section>
      {/* See details
            Courses available
            Members list
        Manage people */}
      <section className="container">
        <h2>Courses</h2>
        <div>Contact Code Your Dreams to get access to more courses.</div>
      </section>
      <section className="container">
        <h2>Members</h2>
        <div>List of members</div>
      </section>
    </main>
  )
}

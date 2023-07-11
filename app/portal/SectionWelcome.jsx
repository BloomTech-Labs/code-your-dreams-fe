import styles from "./Sections.module.scss"

export default function Welcome() {
  return (
    <section className={`container ${styles.welcome}`}>
      <h1>Portal Home</h1>
      <p>
        Welcome [member_name]!
        <br />
        You are a member of [chapter_name]
      </p>
    </section>
  )
}

"use client"

import styles from "./Navigation.module.scss"
import { useData } from "@/context/appContext"
import CoursesButton from "./CoursesButton"
import MembersButton from "./MembersButton"
import ChaptersButton from "./ChaptersButton"
import AdminButton from "./AdminButton"

function AdminLinks() {
  const { current_user } = useData()

  if (current_user?.role === "super_admin") {
    return (
      <>
        <CoursesButton />
        <MembersButton />
        <ChaptersButton />
        <AdminButton />
      </>
    )
  } else if (current_user?.role === "admin") {
    return (
      <>
        <CoursesButton />
        <MembersButton />
      </>
    )
  } else {
    return <CoursesButton />
  }
}

export default function Navigation() {
  const { current_user } = useData()
  return (
    <nav className={styles["site-nav"]}>
      <div className="container">
        <AdminLinks />
      </div>
    </nav>
  )
}

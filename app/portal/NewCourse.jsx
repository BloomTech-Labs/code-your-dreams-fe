"use client"

import { TextField } from "@mui/material"
import styles from "./NewCourse.module.scss"

export default function NewCourse() {
  return (
    <div className={styles["new-course"]}>
      <div className="italic">Fill out the form to create a new course.</div>
      <TextField
        required
        id="course-name"
        label="Course Name"
        variant="outlined"
        helperText="The course name to be displayed in the app"
      />
      <TextField
        required
        id="course-description"
        label="Description"
        helperText="A short description about the course"
      />
    </div>
  )
}

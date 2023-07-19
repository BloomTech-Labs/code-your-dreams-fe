"use client"

import { TextField } from "@mui/material"
import styles from "./NewChapter.module.scss"

export default function NewChapter() {
  return (
    <div className={styles["new-chapter"]}>
      <div className="italic">
        Fill out the form to create a new chapter and designate a primary
        contact.
      </div>
      <TextField
        required
        id="chapter-name"
        label="Chapter Name"
        variant="outlined"
        helperText="Enter the chapter name"
      />
    </div>
  )
}

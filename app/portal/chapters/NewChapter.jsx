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
        id="filled-basic"
        label="Organization Name"
        variant="outlined"
        helperText="Primary contact's name"
      />
      <TextField
        required
        id="outlined-helperText"
        label="Primary Contact"
        helperText="Primary contact's name"
      />
      <TextField
        required
        id="outlined-helperText"
        label="Email Address"
        helperText="Primary contact's email address"
      />
    </div>
  )
}

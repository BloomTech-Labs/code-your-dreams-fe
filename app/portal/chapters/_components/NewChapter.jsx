"use client"

import { TextField } from "@mui/material"
import styles from "./NewChapter.module.scss"

export default function NewChapter() {
  return (
    <>
      <div className="italic">Fill out the form to create a new chapter.</div>
      <TextField
        required
        id="chapter-name"
        label="Chapter Name"
        variant="outlined"
        helperText="Enter the chapter name"
      />
    </>
  )
}
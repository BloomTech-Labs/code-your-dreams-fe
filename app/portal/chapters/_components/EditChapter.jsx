"use client"

import { TextField } from "@mui/material"

export default function EditChapter() {
  return (
    <>
      <div className="italic">Update the chapter name here.</div>
      <TextField
        required
        id="chapter-name"
        label="Chapter Name"
        variant="outlined"
        helperText="Enter an updated chapter name"
      />
    </>
  )
}

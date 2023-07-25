"use client"

import { TextField } from "@mui/material"
// import styles from "./NewMaterialType.module.scss"

export default function NewMaterialType() {
  return (
    <>
      <div className="italic">
        Fill out the form to create a new materials file type.
      </div>
      <TextField
        required
        id="file-type"
        label="File Type"
        variant="outlined"
        helperText="Enter the materials file type"
      />
    </>
  )
}

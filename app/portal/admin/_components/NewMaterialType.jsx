"use client"

import { TextField } from "@mui/material"

export default function NewMaterialType() {
  return (
    <>
      {/* TODO: The linked form should create a new DB entry based on the form details,
        close the modal, and return to the admin page. */}
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

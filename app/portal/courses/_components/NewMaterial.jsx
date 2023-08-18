"use client"

import { TextField, Autocomplete } from "@mui/material"

const typeList = [
  { label: "Document" },
  { label: "Presentation" },
  { label: "Quiz" },
  { label: "Video" },
]

export default function NewMaterial() {
  return (
    <>
      <div className="italic">
        Add the link to a source material file saved at a cloud service such as
        Google Drive, Dropbox, etc.
      </div>
      <TextField
        required
        id="material-name"
        label="Material Name"
        variant="outlined"
        helperText="The name of the course material item to be displayed in the app"
      />
      <Autocomplete
        disablePortal
        id="material-type"
        options={typeList}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="Material Type"
            variant="outlined"
            helperText="Select the type for the new material"
          />
        )}
      />
      <TextField
        required
        id="material-details"
        label="Details"
        helperText="A short description about the material"
      />
      <TextField
        required
        id="material-source"
        type="url"
        label="Source URL"
        helperText="Web URL for the source location of the file"
      />
    </>
  )
}

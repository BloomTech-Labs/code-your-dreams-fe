"use client"

import { TextField, Autocomplete } from "@mui/material"

// TODO: Replace materials type list from materials type table in DB.
const typeList = [
  { label: "Document" },
  { label: "Presentation" },
  { label: "Quiz" },
  { label: "Video" },
]

export default function NewMaterial({ formState, setFormState }) {
  const handleChange = (e) => {
    console.log(`${e.target.name}: ${e.target.value}`)
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }
  const handleAutoCompleteChange = (_, newValue) => {
    setFormState(prev => ({
      ...prev,
      material_type: newValue.label,
    }));
  };
  return (
    <>
      {/* TODO: Take in prop for which table to add a new instance. */}
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
        name="name"
        value={formState.name}
        onChange={handleChange}
      />
      <Autocomplete
        disablePortal
        id="material-type"
        options={typeList}
        onChange={handleAutoCompleteChange}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="Material Type"
            variant="outlined"
            helperText="Select the type for the new material"
            name="material_type"
            value={formState.material_type}
          />
        )}
      />
      <TextField
        required
        id="material-details"
        label="Details"
        helperText="A short description about the material"
        name="description"
        value={formState.description}
        onChange={handleChange}
      />
      <TextField
        required
        id="material-source"
        type="url"
        label="Source URL"
        helperText="Web URL for the source location of the file"
        name="material_link"
        value={formState.material_link}
        onChange={handleChange}
      />
    </>
  )
}

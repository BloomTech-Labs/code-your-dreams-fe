"use client"

import { TextField } from "@mui/material"

export default function NewChapter({ formState, setFormState }) {
  const handleChange = (e) => {
    const value = e.target.value
    setFormState({
      ...formState,
      [e.target.name]: value,
    })
  }

  return (
    <>
      <div className="italic">Fill out the form to add a new chapter.</div>
      <TextField
        required
        id="chapter-name"
        label="Chapter Name"
        variant="outlined"
        helperText="The organization name and other identifying details, as appropriate."
        name="name"
        value={formState.name}
        onChange={handleChange}
      />
    </>
  )
}

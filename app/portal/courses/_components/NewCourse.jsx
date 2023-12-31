"use client"

import {
  TextField,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Card,
} from "@mui/material"

export default function NewCourse({ formState, setFormState }) {
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    setFormState({
      ...formState,
      [e.target.name]: value,
    })
  }
  return (
    <>
      {/* TODO: Take in prop for which table to add a new instance. */}
      <div className="italic">
        Fill out the form to create a new course. New courses are set as draft
        by default, not visible to users.
      </div>
      <TextField
        required
        id="course-name"
        label="Course Name"
        variant="outlined"
        helperText="The course name to be displayed in the app"
        name="name"
        value={formState.name}
        onChange={handleChange}
      />
      <TextField
        required
        id="course-description"
        label="Description"
        helperText="A short description about the course"
        name="description"
        value={formState.description}
        onChange={handleChange}
      />
      <Card variant="outlined" className="modal-card">
        <FormControlLabel
          label="Publish?"
          control={
            <Checkbox
              name="visibility"
              color="primary"
              checked={formState.visibility || false}
              onChange={handleChange}
            />
          }
        />
        <FormHelperText>
          Selecting this will make the course visible to users.
        </FormHelperText>
      </Card>
    </>
  )
}

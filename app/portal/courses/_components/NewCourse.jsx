"use client"

import { TextField } from "@mui/material"

export default function NewCourse() {
  return (
    <>
      <div className="italic">
        Fill out the form to create a new course. Visibility for a new course by
        default will be "hidden".
      </div>
      <TextField
        required
        id="course-name"
        label="Course Name"
        variant="outlined"
        helperText="The course name to be displayed in the app"
      />
      <TextField
        required
        id="course-description"
        label="Description"
        helperText="A short description about the course"
      />
    </>
  )
}

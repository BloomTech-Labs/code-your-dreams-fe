"use client"

import { TextField, Autocomplete } from "@mui/material"

// TODO: Replace course list from courses table in DB.
const courseList = [{ label: "Python" }, { label: "App Inventor" }]

export default function LinkCourse() {
  return (
    <>
      {/* TODO: Take in prop for which table to add a new instance. */}
      <div className="italic">
        Select from the list of courses to add that course to the chapter.
      </div>
      <Autocomplete
        disablePortal
        id="course-name"
        options={courseList}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="Course"
            variant="outlined"
            helperText="Select a course to link to the chapter"
          />
        )}
      />
    </>
  )
}

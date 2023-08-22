"use client"

import { TextField, Autocomplete } from "@mui/material"

const courseList = [{ label: "Python" }, { label: "App Inventor" }]

export default function LinkCourse() {
  return (
    <>
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

"use client"

import { useEffect, useState } from 'react';
import {
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForeverOutlined"
import DestroyButton from "@/components/admin/DestroyButton/DestroyButton"

export default function EditCourse({ selectedCourse, editCourseDetails, setEditCourseDetails }) {
  /*
    When we edit a course's name, it may mess with the ability to actually render the course's info on the details page.
    Options: 
    When a course's new info is submitted, also adjust the course's object in Context & then change the URL. Ideally, the page will refresh, seek the new URL stub in Context, and display the course's new information.
  */
  useEffect(() => {
    if (editCourseDetails === null) {
      setEditCourseDetails(selectedCourse)
    }
  }, [])

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
      setEditCourseDetails({
      ...editCourseDetails,
      [e.target.name]: value,
    })
  }
  return (
    <>
      {/* TODO: Take in prop for database entry to be edited.
      Link form to update that project when saved. */}
      {editCourseDetails &&
        <TextField
          required
          id="course-name"
          label="Course Name"
          variant="outlined"
          inputlabelprops={{ shrink: true }}
          value={editCourseDetails.name}
          name="name"
          onChange={handleChange}
        />
      }
      {editCourseDetails &&
        <TextField
          required
          id="course-description"
          label="Description"
          inputlabelprops={{ shrink: true }}
          value={editCourseDetails.description}
          name="description"
          onChange={handleChange}
        />
      }
      <Card variant="outlined" className="modal-card">
        {editCourseDetails && 
          <FormControlLabel
            label="Published"
            control={
              <Checkbox
                name="visibility"
                color="primary"
                checked={editCourseDetails.visibility}
                onChange={handleChange}
              />
            }
          />
        }
        <FormHelperText>
          If unselected, the course is in draft and not visible to users.
        </FormHelperText>
      </Card>
      <Divider>
        <Typography color="error">Danger Zone</Typography>
      </Divider>
      <div className="italic">
        A course can only be deleted if it is not linked to any materials.
        Please remove all linked materials if you would like to delete this
        course.
      </div>
      <Card variant="outlined" className="danger-group">
        <p className="italic">
          Be careful&mdash;deleting a course is a permanent action.
        </p>
        {/* TODO: This button should be disabled if there are >0 materials
          linked to the chapter. */}
        <DestroyButton action="delete" isFullButton={true} selectedCourse={selectedCourse} target="course">
          <DeleteForeverIcon />
        </DestroyButton>
      </Card>
    </>
  )
}

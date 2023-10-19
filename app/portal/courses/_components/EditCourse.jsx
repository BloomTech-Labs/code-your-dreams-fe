"use client"

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

export default function EditCourse({ selectedCourse }) {
  console.log(selectedCourse)
  return (
    <>
      {/* TODO: Take in prop for database entry to be edited.
      Link form to update that project when saved. */}
      {/* TODO: Fill in all details in form from DB. */}
      <TextField
        required
        id="course-name"
        label="Course Name"
        variant="outlined"
        inputlabelprops={{ shrink: true }}
        value={selectedCourse.name}
      />
      <TextField
        required
        id="course-description"
        label="Description"
        inputlabelprops={{ shrink: true }}
        value={selectedCourse.description}
      />
      <Card variant="outlined" className="modal-card">
        {/* TODO: Connect the checkbox to the form and select checked/not-checked based on course data */}
        <FormControlLabel
          label="Published"
          control={
            <Checkbox
              name="visibility"
              color="primary"
              checked={selectedCourse.visibility}
              onChange=""
            />
          }
        />
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
        <DestroyButton action="delete" isFullButton={true}>
          <DeleteForeverIcon />
        </DestroyButton>
      </Card>
    </>
  )
}

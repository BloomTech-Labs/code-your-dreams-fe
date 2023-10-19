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

export default function EditCourse({ selectedCourse, setSelectedCourse }) {
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value
      console.log(value)
      setSelectedCourse({
      ...selectedCourse,
      [e.target.name]: value,
    })
  }
  return (
    <>
      {/* TODO: Take in prop for database entry to be edited.
      Link form to update that project when saved. */}
      <TextField
        required
        id="course-name"
        label="Course Name"
        variant="outlined"
        inputlabelprops={{ shrink: true }}
        value={selectedCourse.name}
        name="name"
        onChange={handleChange}
      />
      <TextField
        required
        id="course-description"
        label="Description"
        inputlabelprops={{ shrink: true }}
        value={selectedCourse.description}
        name="description"
        onChange={handleChange}
      />
      <Card variant="outlined" className="modal-card">
        <FormControlLabel
          label="Published"
          control={
            <Checkbox
              name="visibility"
              color="primary"
              checked={selectedCourse.visibility}
              onChange={handleChange}
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

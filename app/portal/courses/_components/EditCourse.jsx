"use client"

import {
  Card,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForeverOutlined"
import DestroyButton from "@/components/admin/DestroyButton/DestroyButton"

export default function EditCourse() {
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
      />
      <TextField required id="course-description" label="Description" />
      <Card variant="outlined" className="modal-card">
        <FormGroup>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Hidden</Typography>
            <FormControlLabel control={<Switch defaultChecked />} />
            <Typography>Visible</Typography>
          </Stack>
        </FormGroup>
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

"use client"

import {
  Button,
  Card,
  Divider,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

export default function EditCourse() {
  return (
    <>
      <TextField
        required
        id="course-name"
        label="Course Name"
        variant="outlined"
        helperText="Edit the course name"
      />
      <TextField
        required
        id="course-description"
        label="Description"
        helperText="Edit the course description"
      />
      <Card variant="outlined" className="modal-card">
        <FormGroup>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Hidden</Typography>
            <FormControlLabel control={<Switch defaultChecked />} />
            <Typography>Visible</Typography>
          </Stack>
        </FormGroup>
        <FormHelperText>
          Mark the course as "Visible" when it is ready to be shared with users.
        </FormHelperText>
      </Card>
      <Divider>
        <Typography color="error">Danger Zone</Typography>
      </Divider>
      <Card variant="outlined" className="danger-group">
        <p className="italic">
          Please be careful and sure you want to proceed before doing anything
          in this section.
        </p>
        <div>
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
            Delete Course
          </Button>
        </div>
      </Card>
    </>
  )
}

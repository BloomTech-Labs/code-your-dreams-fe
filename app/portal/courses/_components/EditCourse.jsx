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
      <Card variant="outlined" className="danger-group">
        <p className="italic">
          Please be careful and sure you want to proceed before doing anything
          in this section.
        </p>
        <div>
          <DestroyButton action="delete" isFullButton={true}>
            <DeleteForeverIcon />
          </DestroyButton>
        </div>
      </Card>
    </>
  )
}

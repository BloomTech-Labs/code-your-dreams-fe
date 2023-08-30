"use client"

import {
  TextField,
  FormGroup,
  FormControlLabel,
  Divider,
  Typography,
  Checkbox,
  Card,
} from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForeverOutlined"
import DestroyButton from "@/components/admin/DestroyButton/DestroyButton"

export default function EditSuperUser() {
  return (
    <>
      {/* TODO: Take in prop for database entry to be edited.
        Link form to update that project when saved.
        Update Auth0 entry based on changes made in this form. */}
      <div className="italic">
        Edit super user details by updating any of the fields and clicking the
        save button.
      </div>
      <TextField
        required
        id="super-user-name"
        label="Super User Name"
        variant="outlined"
      />
      <TextField
        required
        id="super-user-email"
        type="email"
        label="Email Address"
      />
      <Card variant="outlined" className="modal-card">
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Make a Super Admin" />
        </FormGroup>
      </Card>
      <Divider>
        <Typography color="error">Danger Zone</Typography>
      </Divider>
      <Card variant="outlined" className="danger-group">
        <p className="italic">
          Deleting the super user will permanently remove them from the
          database.
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

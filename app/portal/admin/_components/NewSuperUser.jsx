"use client"

import {
  TextField,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Card,
} from "@mui/material"

export default function NewMember() {
  return (
    <>
      <div className="italic">Fill out the form to add a new super user.</div>
      <TextField
        required
        id="super-user-name"
        label="Super User Name"
        variant="outlined"
        helperText="Enter the full name of the super user to add"
      />
      <TextField
        required
        id="super-user-email"
        type="email"
        label="Email Address"
        helperText="Enter the email address of the super user to be added"
      />
      <Card variant="outlined" className="modal-card">
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Make a Super Admin" />
        </FormGroup>
        <FormHelperText>
          If selected, this super admin will be able to administer everything in
          the app
        </FormHelperText>
      </Card>
    </>
  )
}

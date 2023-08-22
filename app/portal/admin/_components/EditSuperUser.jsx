"use client"

import {
  TextField,
  // Autocomplete,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Card,
} from "@mui/material"

const chapterList = [
  { label: "Code Your Dreams" },
  { label: "CoderHeroes" },
  { label: "BloomTech" },
]

export default function EditSuperUser() {
  return (
    <>
      {/* TODO: Determine what fields to add to sync up with Auth0 and what will remain local to the app */}
      <span>TODO: TBD</span>
      {/* <div className="italic">Fill out the form to add a new super user.</div>
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
        label="Email address"
        helperText="Enter the email address of the super user to be added"
      />
      <Card variant="outlined" className={styles["form-group"]}>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Make a Super Admin" />
        </FormGroup>
        <FormHelperText>
          If selected, this super admin will be able to administer everything in
          the app
        </FormHelperText>
      </Card> */}
    </>
  )
}

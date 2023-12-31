"use client"

import {
  TextField,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Card,
} from "@mui/material"

// TODO: Replace chapter list from chapters table in DB.
const chapterList = [
  { label: "Code Your Dreams" },
  { label: "CoderHeroes" },
  { label: "BloomTech" },
]

export default function NewMember() {
  return (
    <>
      {/* TODO: Take in prop for which table to add a new instance. */}
      <div className="italic">Fill out the form to add a new member.</div>
      <TextField
        required
        id="member-name"
        label="Member Name"
        variant="outlined"
        helperText="Enter the full name of the member to add"
      />
      <TextField
        required
        id="member-email"
        type="email"
        label="Email Address"
        helperText="Enter the email address of the member to be added"
      />
      {/* TODO: For a chapter admin, this should be a fixed field. For a super admin they should see a dropdown. */}
      <Autocomplete
        disablePortal
        id="chapter-name"
        options={chapterList}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="Chapter"
            variant="outlined"
            helperText="Select the chapter the member is a part of"
          />
        )}
      />
      <Card variant="outlined" className="modal-card">
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Make a Chapter Admin"
          />
        </FormGroup>
        <FormHelperText>
          If selected, this member will be able to add new chapter members
        </FormHelperText>
      </Card>
    </>
  )
}

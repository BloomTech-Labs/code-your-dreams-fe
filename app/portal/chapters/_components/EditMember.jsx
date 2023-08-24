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

// const chapterList = [
//   { label: "Code Your Dreams" },
//   { label: "CoderHeroes" },
//   { label: "BloomTech" },
// ]

export default function EditMember() {
  return (
    <>
      {/* TODO: Determine what fields to add to sync up with Auth0 and what will remain local to the app */}
      <span>TODO: TBD</span>
      {/* 
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
        label="Email address"
        helperText="Enter the email address of the member to be added"
      />
      <TextField
        disabled
        id="chapter-name"
        label="Chapter"
        defaultValue="{current_chapter_name}"
        variant="outlined"
      />
      <Card variant="outlined" className={styles["form-group"]}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Make a Chapter Admin"
          />
        </FormGroup>
        <FormHelperText>
          If selected, this member will be able to add new chapter members
        </FormHelperText>
      </Card> */}
    </>
  )
}

"use client"

import {
  TextField,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material"
import styles from "./NewMember.module.scss"

const chapterList = [
  { label: "Code Your Dreams" },
  { label: "CoderHeroes" },
  { label: "BloomTech" },
]

export default function NewMember() {
  return (
    <>
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
      <Autocomplete
        disablePortal
        id="chapter-name"
        options={chapterList}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Chapter"
            variant="outlined"
            helperText="Select the chapter the member is a part of"
          />
        )}
      />
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Make a Chapter Admin" />
      </FormGroup>
    </>
  )
}

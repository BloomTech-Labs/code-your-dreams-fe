"use client"

import {
  TextField,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Card,
} from "@mui/material"
import styles from "./NewMember.module.scss"

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
      {/* TODO: Insert the chapter name into the "defaultValue" field below */}
      {/* TODO: Ensure that the new member is added to the current chapter */}
      <TextField
        disabled
        id="chapter-name"
        label="Chapter"
        defaultValue="{current_chapter_name}"
        variant="outlined"
        helperText="The member will be added to the current chapter"
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
      </Card>
    </>
  )
}

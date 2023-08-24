"use client"

import {
  TextField,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Card,
} from "@mui/material"
import styles from "./MemberModals.module.scss"

const chapterList = [
  { label: "Code Your Dreams" },
  { label: "CoderHeroes" },
  { label: "BloomTech" },
]

export default function EditMember() {
  return (
    <>
      {/* TODO: Determine what fields to add to sync up with Auth0 and what will remain local to the app */}
      <div className="italic">
        Edit member details by updating any of the fields and clicking the save
        button.
      </div>
      <TextField
        required
        id="member-name"
        label="Member Name"
        variant="outlined"
      />
      <TextField
        required
        id="member-email"
        type="email"
        label="Email address"
      />
      <Autocomplete
        disablePortal
        id="chapter-name"
        options={chapterList}
        renderInput={(params) => (
          <TextField {...params} required label="Chapter" variant="outlined" />
        )}
      />
      <Card variant="outlined" className={styles["form-group"]}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Make a Chapter Admin"
          />
        </FormGroup>
      </Card>
    </>
  )
}

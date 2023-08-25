"use client"

import {
  TextField,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Divider,
  Typography,
  Checkbox,
  Card,
} from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForeverOutlined"
import DestroyButton from "@/components/admin/DestroyButton/DestroyButton"

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
        label="Email Address"
      />
      <Autocomplete
        disablePortal
        id="chapter-name"
        options={chapterList}
        renderInput={(params) => (
          <TextField {...params} required label="Chapter" variant="outlined" />
        )}
      />
      <Card variant="outlined" className="modal-card">
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Make a Chapter Admin"
          />
        </FormGroup>
      </Card>
      <Divider>
        <Typography color="error">Danger Zone</Typography>
      </Divider>
      <Card variant="outlined" className="danger-group">
        <p className="italic">
          Deleting the member will permanently remove them from the database.
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

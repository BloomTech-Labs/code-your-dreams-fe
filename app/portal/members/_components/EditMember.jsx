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

// TODO: Replace chapter list from chapter table in DB.
const chapterList = [
  { label: "Code Your Dreams" },
  { label: "CoderHeroes" },
  { label: "BloomTech" },
]

export default function EditMember() {
  // TODO: Delete when done, temp for testing
  const temp = "Pretend selected user!"

  return (
    <>
      {/* TODO: Take in prop for database entry to be edited.
        Link form to update that project when saved. */}
      {/* TODO: Fill in all details in form from DB. */}
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
      {/* TODO: For a chapter admin, this should be a fixed field. For a super admin they should see a dropdown. */}
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
        <DestroyButton
          action="delete"
          isFullButton={true}
          selectedUser={temp}
          target="user"
        >
          <DeleteForeverIcon />
        </DestroyButton>
      </Card>
    </>
  )
}

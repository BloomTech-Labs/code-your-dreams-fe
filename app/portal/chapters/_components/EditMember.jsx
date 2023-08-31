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

export default function EditMember() {
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
      {/* TODO: Fill in chapter name from DB for current user */}
      <TextField
        disabled
        id="chapter-name"
        label="Chapter"
        defaultValue="{TODO:current_chapter_name}"
        variant="outlined"
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

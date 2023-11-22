"use client"

import { useEffect } from "react"
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

export default function EditMember({
  member,
  editMemberDetails,
  setEditMemberDetails,
}) {
  useEffect(() => {
    if (editMemberDetails === null) {
      setEditMemberDetails(member)
    }
  }, [])

  console.log(editMemberDetails)
  return (
    <>
      {/* TODO: Link form to update that project when saved. */}
      {/* TODO: Fill in all details in form from DB. */}
      <div className="italic">
        Edit member details by updating any of the fields and clicking the save
        button.
      </div>
      {editMemberDetails && (
        <TextField
          required
          id="member-name"
          label="Member Name"
          variant="outlined"
          name="name"
          value={editMemberDetails.name}
          // onChange={handleChange}
        />
      )}
      {editMemberDetails && (
        <TextField
          required
          id="member-email"
          type="email"
          label="Email Address"
          variant="outlined"
          name="email"
          value={editMemberDetails.email}
          // onChange={handleChange}
        />
      )}
      {/* TODO: Fill in chapter name from DB for current user */}
      {editMemberDetails && (
        <TextField
          disabled
          id="chapter-name"
          label="Chapter"
          variant="outlined"
          name="chapter_name"
          defaultValue="{TODO:current_chapter_name}"
          // TODO: Add in chapter_name field for user
          // value={editMemberDetails.chapter_name}
        />
      )}
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
        <DestroyButton action="delete" isFullButton={true}>
          <DeleteForeverIcon />
        </DestroyButton>
      </Card>
    </>
  )
}

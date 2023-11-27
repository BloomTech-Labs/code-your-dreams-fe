"use client"

import { useEffect } from "react"
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

export default function EditMember({
  member,
  editMemberDetails,
  setEditMemberDetails,
}) {
  // TODO: Delete when done, temp for testing
  const temp = "Pretend selected user!"

  useEffect(() => {
    if (editMemberDetails === null) {
      setEditMemberDetails(member)
    }
  }, [])

  return (
    <>
      {/* TODO: Take in prop for database entry to be edited.
        Link form to update that project when saved. */}
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
          name="email"
          value={editMemberDetails.email}
          // onChange={handleChange}
        />
      )}
      {/* TODO: For a chapter admin, this should be a fixed field. For a super admin they should see a dropdown. */}
      {/* Code: if super_admin (show dropdown list) else (show disabled button with current-chapter text) */}
      <Autocomplete
        disablePortal
        id="chapter-name"
        options={chapterList}
        renderInput={(params) => (
          <TextField {...params} required label="Chapter" variant="outlined" />
        )}
      />
      <Card variant="outlined" className="modal-card">
        {/* TODO: Make pre-checked if user has admin role */}
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

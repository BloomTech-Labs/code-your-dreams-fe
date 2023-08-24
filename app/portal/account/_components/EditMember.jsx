"use client"

import { TextField, Divider, Typography, Card } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForeverOutlined"
import DestroyButton from "@/components/admin/DestroyButton/DestroyButton"

export default function EditMember() {
  return (
    <>
      {/* TODO: Determine what fields to add to sync up with Auth0 and what will remain local to the app */}
      <div className="italic">
        Edit your details by updating any of the fields and clicking the save
        button.
      </div>
      <TextField
        required
        id="member-name"
        label="Your full name"
        variant="outlined"
      />
      <TextField
        required
        id="member-email"
        type="email"
        label="Your email address"
      />
      <Divider>
        <Typography color="error">Danger Zone</Typography>
      </Divider>
      <Card variant="outlined" className="danger-group">
        <p className="italic">
          Deleting your account is a permanent action. If you continue, you will
          also be logged out of the app.
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

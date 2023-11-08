"use client"

import { useData } from "@/context/appContext"
import { TextField, Divider, Typography, Card } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForeverOutlined"
import DestroyButton from "@/components/admin/DestroyButton/DestroyButton"

export default function EditMember() {
  const { current_user } = useData()

  return (
    <>
      {/* TODO: Connect this form to a process that will update Auth0 and the local DB */}
      <div className="italic">
        Edit your details by updating any of the fields and clicking the save
        button.
      </div>
      <TextField
        required
        id="member-name"
        label="Your full name"
        variant="outlined"
        name="name"
        value={current_user.name}
      />
      <TextField
        required
        id="member-email"
        type="email"
        label="Your email address"
        name="email"
        value={current_user.email}
      />
      <Divider>
        <Typography color="error">Danger Zone</Typography>
      </Divider>
      <Card variant="outlined" className="danger-group">
        <p className="italic">
          Deleting your account is a permanent action. If you continue, you will
          also be logged out of the app.
        </p>
        <DestroyButton action="delete" isFullButton={true}>
          <DeleteForeverIcon />
        </DestroyButton>
      </Card>
    </>
  )
}

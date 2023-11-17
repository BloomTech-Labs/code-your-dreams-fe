"use client"

import { TextField, Divider, Typography, Card } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForeverOutlined"
import DestroyButton from "@/components/admin/DestroyButton/DestroyButton"

export default function EditSuperAdmin() {
  // TODO: Delete when done, temp for testing
  const temp = "Pretend selected user!"

  return (
    <>
      {/* TODO: Take in prop for database entry to be edited.
        Link form to update that project when saved.
        Update Auth0 entry based on changes made in this form. */}
      <div className="italic">
        Edit super admin details by updating any of the fields and clicking the
        save button.
      </div>
      <TextField
        required
        id="super-admin-name"
        label="Name"
        variant="outlined"
      />
      <TextField
        required
        id="super-admin-email"
        type="email"
        label="Email Address"
      />
      <Divider>
        <Typography color="error">Danger Zone</Typography>
      </Divider>
      <Card variant="outlined" className="danger-group">
        {/* TODO: we need to introduct a control to prevent the user from deleting their own account with this form */}
        <p className="italic">
          Deleting the super admin will permanently remove them from the
          database.
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

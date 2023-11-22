"use client"

import { useEffect } from "react"
import { TextField, Divider, Typography, Card } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForeverOutlined"
import DestroyButton from "@/components/admin/DestroyButton/DestroyButton"

export default function EditSuperAdmin({
  super_admin,
  editSuperAdminDetails,
  setEditSuperAdminDetails,
}) {
  // TODO: Delete when done, temp for testing
  const temp = "Pretend selected user!"

  useEffect(() => {
    if (editSuperAdminDetails === null) {
      setEditSuperAdminDetails(super_admin)
    }
  }, [])

  return (
    <>
      {/* TODO: Take in prop for database entry to be edited.
        Link form to update that project when saved.
        Update Auth0 entry based on changes made in this form. */}
      <div className="italic">
        Edit super admin details by updating any of the fields and clicking the
        save button.
      </div>
      {editSuperAdminDetails && (
        <TextField
          required
          id="super-admin-name"
          label="Name"
          variant="outlined"
          name="name"
          value={editSuperAdminDetails.name}
          // onChange={handleChange}
        />
      )}
      {editSuperAdminDetails && (
        <TextField
          required
          id="super-admin-email"
          type="email"
          label="Email Address"
          name="email"
          value={editSuperAdminDetails.email}
          // onChange={handleChange}
        />
      )}
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

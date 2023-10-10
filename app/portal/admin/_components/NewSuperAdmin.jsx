"use client"

import { TextField } from "@mui/material"

export default function NewSuperAdmin() {
  return (
    <>
      {/* TODO: The linked form should create a new DB entry based on the form details,
        add a user to Auth0, close the modal, and return to the admin page. */}
      <div className="italic">Fill out the form to add a new super admin.</div>
      <TextField
        required
        id="super-admin-name"
        label="Name"
        variant="outlined"
        helperText="Enter the full name of the super admin to add"
      />
      <TextField
        required
        id="super-admin-email"
        type="email"
        label="Email Address"
        helperText="Enter the email address of the super admin to be added"
      />
    </>
  )
}

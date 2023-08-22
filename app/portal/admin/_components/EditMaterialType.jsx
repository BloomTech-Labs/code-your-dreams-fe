"use client"

import { TextField, Divider, Typography, Card, Button } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

export default function EditMaterialType() {
  return (
    <>
      <div className="italic">Edit material type.</div>
      <TextField
        required
        id="file-type"
        label="File Type"
        variant="outlined"
        helperText="Enter an updated materials file type name"
      />
      <Divider>
        <Typography color="error">Danger Zone</Typography>
      </Divider>
      <Card variant="outlined" className="danger-group">
        <p className="italic">
          A material type can only be deleted if it is not linked to any
          materials. Please remove any links to the type if you would like to
          delete this material type.
        </p>
        <p className="italic">
          Be careful&mdash;deleting the material type is a permanent action.
        </p>
        <div>
          {/* TODO: This button should be grayed out if there are >0 instances
            linked to a material of this respective type. */}
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
            Delete Material Type
          </Button>
        </div>
      </Card>
    </>
  )
}

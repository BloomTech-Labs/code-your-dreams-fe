"use client"

import {
  TextField,
  Autocomplete,
  Divider,
  Typography,
  Button,
  Card,
} from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForeverOutlined"

// TODO: Pull in materials type from DB and populate the linked select field
const typeList = [
  { label: "Document" },
  { label: "Presentation" },
  { label: "Quiz" },
  { label: "Video" },
]

export default function EditMaterial() {
  return (
    <>
      <div className="italic">Edit the linked source material.</div>
      <TextField
        required
        id="material-name"
        label="Material Name"
        variant="outlined"
        helperText="The name of the course material item displayed in the app"
      />
      <Autocomplete
        disablePortal
        id="material-type"
        options={typeList}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="Material Type"
            variant="outlined"
            helperText="The material type"
          />
        )}
      />
      <TextField
        required
        id="material-details"
        label="Details"
        helperText="A short description about the material"
      />
      <TextField
        required
        id="material-source"
        type="url"
        label="Source URL"
        helperText="Web URL for the source location of the file"
      />
      <Divider>
        <Typography color="error">Danger Zone</Typography>
      </Divider>
      <Card variant="outlined" className="danger-group">
        <p className="italic">
          Deleting the material will only remove the record entry in this app.
          The source file will NOT be deleted from its cloud storage location.
        </p>
        <div>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteForeverIcon />}
          >
            Delete Material
          </Button>
        </div>
      </Card>
    </>
  )
}

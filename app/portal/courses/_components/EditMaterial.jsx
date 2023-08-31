"use client"

import {
  TextField,
  Autocomplete,
  Divider,
  Typography,
  Card,
} from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForeverOutlined"
import DestroyButton from "@/components/admin/DestroyButton/DestroyButton"

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
      {/* TODO: Take in prop for database entry to be edited.
        Link form to update that project when saved. */}
      {/* TODO: Fill in all details in form from DB. */}
      <div className="italic">
        Edit the linked source material and click save to continue.
      </div>
      <TextField
        required
        id="material-name"
        label="Material Name"
        variant="outlined"
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
          />
        )}
      />
      <TextField required id="material-details" label="Details" />
      <TextField required id="material-source" type="url" label="Source URL" />
      <Divider>
        <Typography color="error">Danger Zone</Typography>
      </Divider>
      <Card variant="outlined" className="danger-group">
        <p className="italic">
          Deleting the material will only remove the record entry in this app.
          The source file will NOT be deleted from its cloud storage location.
        </p>
        <DestroyButton action="delete" isFullButton={true}>
          <DeleteForeverIcon />
        </DestroyButton>
      </Card>
    </>
  )
}

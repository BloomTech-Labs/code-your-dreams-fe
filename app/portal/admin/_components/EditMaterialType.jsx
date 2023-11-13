"use client"

import { TextField, Divider, Typography, Card } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForeverOutlined"
import DestroyButton from "@/components/admin/DestroyButton/DestroyButton"

export default function EditMaterialType(selectedMaterial) {
  return (
    <>
      {/* TODO: Take in prop for database entry to be edited.
        Link form to update that project when saved. */}
      <div className="italic">
        Any change here will be reflected across the entire app and all course
        material labels linked to this type.
      </div>
      <TextField required id="file-type" label="File Type" variant="outlined" />
      <Divider>
        <Typography color="error">Danger Zone</Typography>
      </Divider>
      <div className="italic">
        A material type can only be deleted if it is not linked to any
        materials. Please remove any links to the type if you would like to
        delete this material type.
      </div>
      <Card variant="outlined" className="danger-group">
        <p className="italic">
          Be careful&mdash;deleting the material type is a permanent action.
        </p>
        {/* TODO: This button should be disabled if there are >0 instances
            linked to a material of this respective type. */}
        <DestroyButton action="delete" isFullButton={true}>
          <DeleteForeverIcon />
        </DestroyButton>
      </Card>
    </>
  )
}

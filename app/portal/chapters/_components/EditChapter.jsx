"use client"

import { TextField, Divider, Typography, Card } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForeverOutlined"
import DestroyButton from "@/components/admin/DestroyButton/DestroyButton"

export default function EditChapter() {
  return (
    <>
      {/* TODO: Take in prop for database entry to be edited.
        Link form to update that project when saved. */}
      {/* TODO: Fill in all details in form from DB. */}
      <div className="italic">
        Update the chapter name here and click the save button to continue.
      </div>
      <TextField
        required
        id="chapter-name"
        label="Chapter Name"
        variant="outlined"
      />
      <Divider>
        <Typography color="error">Danger Zone</Typography>
      </Divider>
      <div className="italic">
        A chapter can only be deleted if it is not linked to any members. Please
        remove all linked member accounts if you would like to delete this
        chapter.
      </div>
      <Card variant="outlined" className="danger-group">
        <p className="italic">
          Be careful&mdash;deleting a chapter is a permanent action.
        </p>
        <div>
          {/* TODO: This button should be disabled if there are >0 members
            linked to the chapter. */}
          <DestroyButton action="delete" isFullButton={true}>
            <DeleteForeverIcon />
          </DestroyButton>
        </div>
      </Card>
    </>
  )
}

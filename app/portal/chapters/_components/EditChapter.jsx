"use client"

import { useEffect } from "react"
import { TextField, Divider, Typography, Card } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForeverOutlined"
import DestroyButton from "@/components/admin/DestroyButton/DestroyButton"
import ChaptersButton from "@/components/layout/Navigation/ChaptersButton"

export default function EditChapter({
  selectedChapter,
  editChapterData,
  setEditChapterData,
}) {
  useEffect(() => {
    console.log(selectedChapter)
    setEditChapterData(selectedChapter)
  }, [selectedChapter])

  const handleChange = (e) => {
    setEditChapterData({
      ...editChapterData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      {/* TODO: Take in prop for database entry to be edited.
        Link form to update that project when saved. */}
      {/* TODO: Fill in all details in form from DB. */}
      <div className="italic">
        Update the chapter name here and click the save button to continue.
      </div>
      {editChapterData && (
        <TextField
          required
          id="chapter-name"
          label="Chapter Name"
          variant="outlined"
          name="name"
          value={editChapterData.name}
          onChange={handleChange}
        />
      )}
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
        {/* TODO: This button should be disabled if there are >0 members
            linked to the chapter. */}
        <DestroyButton
          action="delete"
          isFullButton={true}
          selectedChapter={selectedChapter}
          target="chapter"
        >
          <DeleteForeverIcon />
        </DestroyButton>
      </Card>
    </>
  )
}

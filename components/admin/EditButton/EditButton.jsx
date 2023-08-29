"use client"

import * as React from "react"
import { Button, IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import Modal from "@/components/Modal/Modal"

// TODO: Pass along a function into this component to edit the object
const EditButton = ({ title, isFullButton, children }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      {isFullButton ? (
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={handleOpen}
        >
          {title}
        </Button>
      ) : (
        <IconButton color="primary" onClick={handleOpen}>
          {<EditIcon />}
        </IconButton>
      )}
      <Modal title={title} open={open} handleClose={handleClose}>
        {children}
      </Modal>
    </>
  )
}

export default EditButton

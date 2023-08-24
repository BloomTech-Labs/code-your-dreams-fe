"use client"

import * as React from "react"
import { IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import Modal from "@/components/Modal/Modal"

// TODO: Pass along a function into this component to destroy the object
const EditButton = ({ title, children }) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton color="primary" onClick={handleOpen}>
        {<EditIcon />}
      </IconButton>
      <Modal title={title} open={open} handleClose={handleClose}>
        {children}
      </Modal>
    </>
  )
}

export default EditButton

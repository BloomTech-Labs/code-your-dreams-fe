"use client"

import * as React from "react"
import { IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import Modal from "@/components/Modal/Modal"
import EditMaterial from "@/app/portal/courses/_components/EditMaterial"

// TODO: Pass along a function into this component to destroy the object
const EditButton = () => {
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
      <Modal title="Edit Material" open={open} handleClose={handleClose}>
        <EditMaterial />
      </Modal>
    </>
  )
}

export default EditButton

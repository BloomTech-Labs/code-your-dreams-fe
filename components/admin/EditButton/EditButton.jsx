"use client"

import * as React from "react"
import { Button } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"

// TODO: Pass along a function into this component to destroy the object
const EditButton = () => {
  return (
    <>
      <Button variant="text" startIcon={<EditIcon />}>
        edit
      </Button>
    </>
  )
}

export default EditButton

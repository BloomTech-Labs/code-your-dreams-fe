"use client"

import * as React from "react"
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"

// TODO: Pass along a function into this component to destroy the object
const DestroyButton = ({ action, isFullButton, children }) => {
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
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
          color="error"
          onClick={handleClickOpen}
          startIcon={children}
          aria-label="remove/delete button"
        >
          {action}
        </Button>
      ) : (
        <IconButton
          color="error"
          onClick={handleClickOpen}
          aria-label="remove/delete button"
        >
          {children}
        </IconButton>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="admin remove/delete action confirmation"
      >
        <DialogTitle id="alert-dialog-title" className="h4 capitalize">
          {action + " confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to {action} the entry?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* TODO: Trigger the destroy function if the user clicks the continue button */}
          <Button onClick={handleClose} autoFocus color="error">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DestroyButton

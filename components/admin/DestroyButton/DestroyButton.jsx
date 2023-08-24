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
import styles from "./DestroyButton.module.scss"

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
        >
          {action}
        </Button>
      ) : (
        <IconButton color="error" onClick={handleClickOpen}>
          {children}
        </IconButton>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="admin destroy action confirmation"
      >
        <DialogTitle
          id="alert-dialog-title"
          className={`h4 ${styles["dialog-title"]}`}
        >
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

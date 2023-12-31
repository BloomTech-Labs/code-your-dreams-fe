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
  Typography,
} from "@mui/material"
import AxiosWithAuth from "@/utils/axiosWithAuth"
import { useRouter } from "next/navigation"

// TODO: Pass along a function into this component to destroy the object
const DestroyButton = ({
  action,
  isFullButton,
  children,
  selectedCourse,
  selectedMaterial,
  selectedChapter,
  selectedCoursePermission,
  selectedUser,
  target,
}) => {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const axiosInstance = AxiosWithAuth()
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    if (target === "course") {
      axiosInstance
        .delete(
          `${process.env.NEXT_PUBLIC_BE_API_URL}/courses/delete/${selectedCourse.id}`
        )
        .then((res) => {
          router.push("/portal/courses")
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (target === "material") {
      axiosInstance
        .delete(
          `${process.env.NEXT_PUBLIC_BE_API_URL}/courseMaterials/delete/${selectedMaterial.id}`
        )
        .then((res) => {
          // TODO: Keep user on course details page, just remove deleted material from local state list?
          router.push("/portal/courses")
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (target === "chapter") {
      // TODO: connect to course_premissions API
      console.log(selectedChapter)
    } else if (target === "course_permission") {
      // TODO: connect to course_premissions API
      console.log(selectedCoursePermission)
    } else if (target === "user") {
      // TODO: connect to course_premissions API
      console.log(selectedUser)
    }
  }

  // Array storing non-warning target types (from handleDelete options)
  const noAlertTarget = ["material", "course_permission", "user"]

  return (
    <>
      {isFullButton ? (
        <Button
          variant="outlined"
          color="error"
          onClick={handleClickOpen}
          startIcon={children}
          aria-label="Remove/delete button"
        >
          {action}
        </Button>
      ) : (
        <IconButton
          color="error"
          onClick={handleClickOpen}
          aria-label="Remove/delete button"
        >
          {children}
        </IconButton>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title" className="h4 capitalize">
          {action + " confirmation"}
        </DialogTitle>
        <DialogContent>
          {/* TODO: Add logic to alert for chapter deletion if members are linked */}
          {/* TODO [cont]: (selectedChapter && selectedChapter.membersCount === 0) */}
          {(selectedCourse && selectedCourse.materialsCount === 0) ||
          noAlertTarget.includes(target) ? (
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to {action} the entry?
            </DialogContentText>
          ) : (
            <Typography color="error">
              Warning: Delete all course materials before deleting a course.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* TODO: Trigger the destroy function if the user clicks the continue button */}
          {(selectedCourse && selectedCourse.materialsCount === 0) ||
          noAlertTarget.includes(target) ? (
            <Button onClick={handleDelete} autoFocus color="error">
              Continue
            </Button>
          ) : (
            <Button
              onClick={handleClose}
              autoFocus
              color="error"
              disabled={true}
            >
              Continue
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DestroyButton

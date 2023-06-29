"use client"

import React from "react"
import styles from "./page.module.scss"
import { Button, IconButton, Box, Modal } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import { DataGrid } from "@mui/x-data-grid"

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "chapterName", headerName: "Chapter name", width: 250 },
  { field: "primaryContact", headerName: "Primary contact", width: 200 },
  {
    field: "members",
    headerName: "Members",
    type: "number",
    width: 150,
  },
]

const rows = [
  {
    id: 1,
    chapterName: "Code Your Dreams",
    primaryContact: "Brianne Caplan",
    members: 25,
  },
  {
    id: 2,
    chapterName: "Coding Bootcamp",
    primaryContact: "John Schmoe",
    members: 42,
  },
  {
    id: 3,
    chapterName: "Community Center",
    primaryContact: "Jane Doe",
    members: 36,
  },
  {
    id: 4,
    chapterName: "Neighborhood Public School",
    primaryContact: "Tom Thumb",
    members: 45,
  },
]

export default function Page() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <main className={styles.organizations}>
        <section>
          {/* This page is restricted to only Super Admins */}
          <div className="header-row">
            <h1>Chapters</h1>
            <div className="add-button">
              <IconButton
                color="primary"
                size="large"
                onClick={handleOpen}
                aria-label="add"
                className="compact-button"
              >
                <AddIcon />
              </IconButton>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
                aria-label="add"
                className="full-button"
              >
                Create a new chapter
              </Button>
            </div>
          </div>
          <p className="italic">
            This is a list of all the chapters that are managed within the app.
            Use the button above to create a new chapter, or use any of the
            links below to view or edit a chapter.
          </p>

          <div className={styles.table}>
            <div className={styles["table-container"]}>
              <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <div className="modal-header">
            <h2>Modal title</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          {/* Insert modal component here */}
          <p>Modal content</p>
          <div className="modal-footer">
            <Button variant="contained" onClick={handleClose}>
              Save
            </Button>
            <Button variant="text" onClick={handleClose}>
              Cancel without saving
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

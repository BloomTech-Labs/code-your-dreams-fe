"use client"

import React, { useState } from "react"
import styles from "./page.module.scss"
import { Button, IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { DataGrid } from "@mui/x-data-grid"
import Modal from "@/components/Modal/Modal"
import NewCourse from "./NewMember"
import NewMember from "./NewMember"

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "memberName", headerName: "Name", width: 250 },
  { field: "emailAddress", headerName: "Email", width: 300 },
  { field: "chapterName", headerName: "Chapter", width: 300 },
  { field: "adminFlag", headerName: "Admin?", width: 150 },
]

const rows = [
  {
    id: 1,
    memberName: "Brianne Caplan",
    emailAddress: "brianne@codeyourdreams.org",
    chapterName: "CoderHeroes",
    adminFlag: "Yes",
  },
  {
    id: 2,
    memberName: "John Dodson",
    emailAddress: "john.dodson@bloomtech.com",
    chapterName: "BT Labs - Remote",
    adminFlag: "",
  },
]

export default function Page() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <main className={styles.main}>
      <section className="container">
        <div className="header-row">
          <h1>Members</h1>
          <div className="add-button">
            {/* TODO: This button should only be visible to super admin users */}
            <IconButton
              color="primary"
              size="large"
              onClick={() => handleOpen()}
              aria-label="add"
              className="compact-button"
            >
              <AddIcon />
            </IconButton>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => handleOpen()}
              aria-label="add"
              className="full-button"
            >
              Add a new member
            </Button>
          </div>
        </div>
        <div style={{ height: 500, width: "100%" }}>
          {/* TODO: We'll have to figure out how to update a user in Auth0 and if there are any local changes we manage within the app */}
          {/* TODO: When we have an edit here, we'll have to figure out how we handle the change--maybe via pop up (if changes are local)? */}
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
      </section>

      <Modal title="Add a New Member" open={open} handleClose={handleClose}>
        <NewMember />
      </Modal>
    </main>
  )
}

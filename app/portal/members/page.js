"use client"

import React, { useState } from "react"
import styles from "./page.module.scss"
import { IconButton } from "@mui/material"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import { DataGrid } from "@mui/x-data-grid"
import Modal from "@/components/Modal/Modal"
import NewMember from "./_components/NewMember"
import EditButton from "@/components/admin/EditButton/EditButton"
import EditMember from "./_components/EditMember"

const showEditButton = () => {
  return (
    <EditButton title="Edit Member">
      <EditMember />
    </EditButton>
  )
}

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "memberName", headerName: "Name", width: 250 },
  { field: "emailAddress", headerName: "Email", width: 300 },
  { field: "chapterName", headerName: "Chapter", width: 300 },
  { field: "adminFlag", headerName: "Admin?", width: 150 },
  {
    field: "edit",
    headerName: "Edit",
    align: "center",
    width: 80,
    renderCell: () => showEditButton(),
  },
]

const rows = [
  {
    id: 1,
    memberName: "Brianne Caplan",
    emailAddress: "brianne@codeyourdreams.org",
    chapterName: "CoderHeroes",
    adminFlag: "Yes",
    edit: "",
  },
  {
    id: 2,
    memberName: "John Dodson",
    emailAddress: "john.dodson@bloomtech.com",
    chapterName: "BT Labs - Remote",
    adminFlag: "",
    edit: "",
  },
]

export default function Page() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <main className={styles.main}>
      <aside className="TODO">
        TODO:
        <ul>
          <li>
            Determine user management design: what happens locally vs. what will
            be done in the Auth0 UI.
          </li>
        </ul>
      </aside>
      <section className="container">
        <div className="header-row">
          <h1>Members</h1>
          <div>
            {/* TODO: This button should only be visible to super admin users */}
            <IconButton
              color="primary"
              size="large"
              onClick={() => handleOpen()}
              aria-label="add"
            >
              <PersonAddIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
        <div style={{ height: 500, width: "100%" }}>
          {/* TODO: We'll have to figure out how to update a user in Auth0 and if there are any local changes we manage within the app */}
          {/* TODO: For chapter admins, the respective chapter filter should be on, so they see only their chapter members */}
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

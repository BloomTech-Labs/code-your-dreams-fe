"use client"

import * as React from "react"
import styles from "./page.module.scss"
import { Button, IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { DataGrid } from "@mui/x-data-grid"

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
    chapterName: "Code Your Dreams",
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
  return (
    <main className={styles.main}>
      <section className="container">
        <div className="header-row">
          <h1>Members</h1>
          <div className="add-button">
            <IconButton
              color="primary"
              size="large"
              aria-label="add"
              className="compact-button"
            >
              <AddIcon />
            </IconButton>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              aria-label="add"
              className="full-button"
            >
              Add a new member
            </Button>
          </div>
        </div>
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
      </section>
    </main>
  )
}

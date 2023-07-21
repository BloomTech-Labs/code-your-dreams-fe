"use client"

import React, { useState } from "react"
import styles from "./page.module.scss"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import { DataGrid } from "@mui/x-data-grid"
import Modal from "@/components/Modal/Modal"
import NewChapter from "./NewChapter"

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "chapterName", headerName: "Chapter name", width: 250 },
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
    members: 25,
  },
  {
    id: 2,
    chapterName: "Coding Bootcamp",
    members: 42,
  },
  {
    id: 3,
    chapterName: "Community Center",
    members: 36,
  },
  {
    id: 4,
    chapterName: "Neighborhood Public School",
    members: 45,
  },
]

export default function Page() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <main className={styles.chapters}>
      <aside className="TODO">
        TODO:
        <ul>
          <li>Link to detail page</li>
        </ul>
      </aside>

      <section className="container">
        <div className="header-row">
          <h1>Chapters</h1>
          <div className="add-button">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpen()}
              aria-label="add"
              className="full-button"
            >
              Create a new chapter
            </Button>
          </div>
        </div>
        <p className="italic">
          This is a list of all the chapters that are managed within the app.
          Use the button above to create a new chapter, or use any of the links
          below to view or edit a chapter.
        </p>

        <div className={styles.table}>
          <div className={styles["table-container"]}>
            {/* TODO: Clicking on a chapter name should open up a detail page */}
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

      <Modal title="Create a New Chapter" open={open} handleClose={handleClose}>
        <NewChapter />
      </Modal>
    </main>
  )
}

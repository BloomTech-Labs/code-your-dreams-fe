"use client"

import React, { useState } from "react"
import { IconButton, Link } from "@mui/material"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import { DataGrid } from "@mui/x-data-grid"
import Modal from "@/components/Modal/Modal"
import NewChapter from "./_components/EditChapter"

// TODO: Replace demo data with actual data from the chapters table.
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
    chapterName: "CoderHeroes",
    members: 3,
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
  {
    id: 5,
    chapterName: "Coding Bootcamp",
    members: 17,
  },
]

export default function Page() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleRowClick = (params) => {
    // TODO: we'll want to add a descriptive ID like a URL slug instead of an id string
    const { id } = params.row

    return (
      <Link underline="hover" href={`/portal/chapters/${id}`}>
        {params.value}
      </Link>
    )
  }

  return (
    // TODO: Limit this page only to CYD super users/admins.
    <main>
      <section className="container">
        <div className="header-row">
          <h1>Chapters</h1>
          {/* TODO: This button should only be visible to super admins */}
          <IconButton
            color="primary"
            size="large"
            onClick={() => handleOpen()}
            aria-label="add"
          >
            <GroupAddIcon fontSize="inherit" />
          </IconButton>
        </div>
        <p className="italic">
          This is a list of all the chapters that are managed within the app.
          Use the button above to create a new chapter, or use any of the links
          below to view or edit a chapter.
        </p>

        <div className="data-grid">
          <DataGrid
            rows={rows}
            columns={columns.map((column) =>
              column.field === "chapterName"
                ? { ...column, renderCell: handleRowClick }
                : column
            )}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </section>

      <Modal title="Create a New Chapter" open={open} handleClose={handleClose}>
        <NewChapter />
      </Modal>
    </main>
  )
}

"use client"

import React, { useState, useEffect } from "react"
import { IconButton, Link } from "@mui/material"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import { DataGrid } from "@mui/x-data-grid"
import NoRowsOverlay from "@/components/NoRowsOverlay/NoRowsOverlay"
import Modal from "@/components/Modal/Modal"
import NewChapter from "./_components/EditChapter"
import useCheckTokenExpired from "@/utils/useCheckTokenExpired"
import { useData } from "@/context/appContext"

const columns = [
  { field: "name", headerName: "Chapter name", width: 250 },
  {
    field: "members",
    headerName: "Members",
    type: "number",
    width: 150,
  },
]

export default function Page() {
  const [localChapters, setLocalChapters] = useState(null)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useCheckTokenExpired()
  const { chapters, current_user } = useData()

  const handleRowClick = (params) => {
    // TODO: we'll want to add a descriptive ID like a URL slug instead of an id string
    const { id } = params.row

    return (
      <Link
        underline="hover"
        href={`/portal/chapters/${id}`}
        aria-label={`Open chapter detail page for ${params.value}`}
      >
        {params.value}
      </Link>
    )
  }

  useEffect(() => {
    console.log(chapters)
    if (chapters) {
      setLocalChapters(chapters)
    }
  }, [chapters])

  return (
    // TODO: Limit this page only to CYD super users/admins.
    <main>
      <section className="container">
        <div className="header-row">
          <h1>Chapters</h1>
          {/* TODO: This button should only be visible to super admins */}
          {
            current_user && current_user.role === 'admin' && current_user.chapter_id === 1 ? 
            <IconButton
            color="primary"
            size="large"
            onClick={() => handleOpen()}
            aria-label="Add a new chapter"
          >
            <GroupAddIcon fontSize="inherit" />
          </IconButton> : null
          }
        </div>
        <p className="italic">
          This is a list of all the chapters that are managed within the app.
          Use the button above to create a new chapter, or use any of the links
          below to view or edit a chapter.
        </p>
        <div className="data-grid">
          {localChapters && (
            <DataGrid
              rows={localChapters}
              getRowId={(row) => row.id}
              columns={columns.map((column) =>
                column.field === "name"
                  ? { ...column, renderCell: handleRowClick }
                  : column
              )}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 20 },
                },
              }}
              slots={{
                noRowsOverlay: NoRowsOverlay,
              }}
              autoHeight={true}
              sx={{ "--DataGrid-overlayHeight": "300px" }}
              aria-label="Data grid of chapters"
            />
          )}
        </div>
      </section>

      <Modal title="Create a New Chapter" open={open} handleClose={handleClose}>
        <NewChapter />
      </Modal>
    </main>
  )
}

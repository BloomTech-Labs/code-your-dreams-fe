"use client"

import React, { useState, useEffect } from "react"
import { IconButton, Link } from "@mui/material"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import { DataGrid } from "@mui/x-data-grid"
import NoRowsOverlay from "@/components/NoRowsOverlay/NoRowsOverlay"
import Modal from "@/components/Modal/Modal"
import NewChapter from "./_components/NewChapter"
import useCheckTokenExpired from "@/utils/useCheckTokenExpired"
import { useData } from "@/context/appContext"
import AxiosWithAuth from "@/utils/axiosWithAuth"

const columns = [
  { field: "name", headerName: "Chapter name", width: 250 },
  {
    field: "members",
    headerName: "Members",
    type: "number",
    width: 150,
  },
]

const initialState = {
  name: "",
}

export default function Page() {
  const [localChapters, setLocalChapters] = useState(null)
  const [open, setOpen] = useState(false)
  const [formState, setFormState] = useState(initialState)
  const axiosInstance = AxiosWithAuth()
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setFormState(initialState)
  }
  // TODO: Prevent the form from being submitted with any required fields empty.
  const handleSubmitForm = () => {
    axiosInstance
      .post(`${process.env.NEXT_PUBLIC_BE_API_URL}/chapters/create`, formState)
      .then((res) => {
        console.log("Form data submitted to database:", res.data)
        setLocalChapters([...localChapters, res.data[0]])
        setFormState(initialState)
        setOpen(false)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useCheckTokenExpired()
  const { chapters, current_user } = useData()

  const handleRowClick = (params) => {
    // TODO: we'll want to add a descriptive ID like a URL slug instead of an id string
    const { id } = params.row

    return (
      <Link
        underline="always"
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
    // TODO: Limit this page only to CYD super admins.
    <main>
      <section className="container">
        <div className="header-row">
          <h1>Chapters</h1>
          {current_user &&
          current_user.role_id === 1 &&
          current_user.chapter_id === 1 ? (
            <IconButton
              color="primary"
              size="large"
              onClick={() => handleOpen()}
              aria-label="Add a new chapter"
            >
              <GroupAddIcon fontSize="inherit" />
            </IconButton>
          ) : null}
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
                  paginationModel: { pageSize: 20 },
                },
              }}
              pageSizeOptions={[20]}
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

      <Modal
        title="Create a New Chapter"
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmitForm}
      >
        <NewChapter formState={formState} setFormState={setFormState} />
      </Modal>
    </main>
  )
}

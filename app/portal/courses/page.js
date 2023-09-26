"use client"

import React, { useState, useEffect } from "react"
import styles from "./page.module.scss"
import { IconButton, Link } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { DataGrid } from "@mui/x-data-grid"
import Modal from "@/components/Modal/Modal"
import NewCourse from "./_components/NewCourse"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import QuestionMarkIcon from "@mui/icons-material/QuestionMark"
import { useData } from "@/context/appContext"

const convertStatusToIcon = (status) => {
  let statusIcon

  switch (status) {
    case "visible":
      return (statusIcon = (
        <VisibilityIcon
          className={styles.purple}
          aria-label="Selected course is visible"
        />
      ))
    case "hidden":
      return (statusIcon = (
        <VisibilityOffIcon
          className={styles.gray}
          aria-label="Selected course is hidden"
        />
      ))
    default:
      return (statusIcon = (
        <QuestionMarkIcon
          className={styles.gray}
          aria-label="Selected course status is unknown"
        />
      ))
  }
}

const columns = [
  { field: "name", headerName: "Course Name", minWidth: 150, flex: 1 },
  {
    field: "description",
    headerName: "Description",
    minWidth: 350,
    flex: 2,
  },
  {
    field: "files",
    headerName: "Materials",
    headerAlign: "right",
    type: "number",
    width: 150,
  },
  {
    field: "chapters",
    headerName: "Chapters",
    headerAlign: "right",
    type: "number",
    width: 150,
  },
  {
    field: "visibility",
    headerName: "Visibility",
    headerAlign: "center",
    align: "center",
    width: 150,
    renderCell: (params) => convertStatusToIcon(params.value),
  },
]

export default function Page() {
  const [courses, setCourses] = useState(null)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { state } = useData()

  const handleRowClick = (params) => {
    // TODO: we'll want to add a descriptive ID like a URL slug instead of an "id" string
    const { id } = params.row

    return (
      <Link
        underline="hover"
        href={`/portal/courses/${id}`}
        aria-label={`Open detail page for the ${params.value} course`}
      >
        {params.value}
      </Link>
    )
  }

  useEffect(() => {
    console.log(state)
    if (state.users) {
      setCourses(state.courses)
    }
  }, [state])

  return (
    <main>
      <aside className="TODO">
        TODO:
        <ul>
          <li>
            Add a page loading component as the forwarding process causes the
            page hang for a moment with only the footer visible and/or figure
            out why it happens.
          </li>
        </ul>
      </aside>

      <section className={`container ${styles.courses}`}>
        <div className="header-row">
          <h1>Courses</h1>
          {/* TODO: make button visible only to CYD super admins */}
          <IconButton
            color="primary"
            size="large"
            onClick={() => handleOpen()}
            aria-label="Add a new course"
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </div>

        <div className={styles.table}>
          <div className={styles["table-container"]}>
            {/* TODO: Handle use case of an empty data grid.
            https://mui.com/x/react-data-grid/components/#no-rows-overlay */}
            {/* TODO: Clicking on a course name should open up a detail page */}
            {/* TODO: Hide the "chapters" and "visibility" columns from non-CYD users. */}
            <div className="data-grid">
              {courses && (
                <DataGrid
                  rows={courses}
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
                  aria-label="Data grid of courses"
                />
              )}
            </div>
          </div>
        </div>

        {/* TODO: Show only to non-CYD users */}
        <p className="italic">
          Contact Code Your Dreams for access to more courses.
        </p>
      </section>

      <Modal title="Create a New Course" open={open} handleClose={handleClose}>
        <NewCourse />
      </Modal>
    </main>
  )
}

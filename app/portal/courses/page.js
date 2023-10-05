"use client"

import React, { useState, useEffect } from "react"
import styles from "./page.module.scss"
import { IconButton, Link } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { DataGrid } from "@mui/x-data-grid"
import NoRowsOverlay from "@/components/NoRowsOverlay/NoRowsOverlay"
import Modal from "@/components/Modal/Modal"
import NewCourse from "./_components/NewCourse"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import QuestionMarkIcon from "@mui/icons-material/QuestionMark"
import useCheckTokenExpired from "@/utils/useCheckTokenExpired"
import { useData } from "@/context/appContext"

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

const convertStatusToIcon = (params) => {
  if (params.value) {
    return (
      <VisibilityIcon
        className={styles.purple}
        aria-label="Selected course is visible"
      />
    )
  } else {
    return (
      <VisibilityOffIcon
        className={styles.gray}
        aria-label="Selected course is hidden"
      />
    )
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
  },
]

export default function Page() {
  const [localCourses, setLocalCourses] = useState(null)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useCheckTokenExpired()
  const { courses, current_user } = useData()

  const renderCellFunctions = {
    name: (params) => handleRowClick(params),
    visibility: (params) => convertStatusToIcon(params),
  }

  columns.forEach((column) => {
    if (renderCellFunctions[column.field]) {
      column.renderCell = renderCellFunctions[column.field]
    }
  })

  const columnVisibility = (column) => {
    if (current_user.chapter_id !== 1 && column.field === "chapters") {
      return
    }
    if (current_user.chapter_id !== 1 && column.field === "visibility") {
      return
    }
    return column
  }

  useEffect(() => {
    console.log(courses)
    if (courses) {
      setLocalCourses(courses)
    }
  }, [courses])

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
          {current_user &&
          current_user.role_id === 1 &&
          current_user.chapter_id === 1 ? (
            <IconButton
              color="primary"
              size="large"
              onClick={() => handleOpen()}
              aria-label="Add a new course"
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          ) : null}
        </div>

        <div className={styles.table}>
          <div className={styles["table-container"]}>
            {/* TODO: Clicking on a course name should open up a detail page */}
            {/* TODO: Hide the "chapters" and "visibility" columns from non-CYD users. */}
            <div className="data-grid">
              {localCourses && (
                <DataGrid
                  rows={localCourses}
                  getRowId={(row) => row.id}
                  columns={columns.filter(columnVisibility)}
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
                  aria-label="Data grid of courses"
                />
              )}
            </div>
          </div>
        </div>

        {
          current_user && current_user.role_id === 3 && 
          <p className="italic">
            Contact Code Your Dreams for access to more courses.
          </p>
        }
      </section>

      <Modal title="Create a New Course" open={open} handleClose={handleClose}>
        <NewCourse />
      </Modal>
    </main>
  )
}

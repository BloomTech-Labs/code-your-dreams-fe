"use client"

import React, { useState, useEffect } from "react"
import styles from "./page.module.scss"
import { IconButton, Link } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { DataGrid } from "@mui/x-data-grid"
import Modal from "@/components/Modal/Modal"
import AxiosWithAuth from "@/utils/axiosWithAuth"
import { useSession } from "next-auth/react"
import NewCourse from "./_components/NewCourse"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import QuestionMarkIcon from "@mui/icons-material/QuestionMark"

const convertStatusToIcon = (status) => {
  let statusIcon

  switch (status) {
    case "visible":
      return (statusIcon = <VisibilityIcon className={styles.purple} />)
    case "hidden":
      return (statusIcon = <VisibilityOffIcon className={styles.gray} />)
    default:
      return (statusIcon = <QuestionMarkIcon className={styles.gray} />)
  }
}

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "courseName", headerName: "Course Name", minWidth: 150, flex: 1 },
  {
    field: "courseDescription",
    headerName: "Description",
    minWidth: 350,
    flex: 2,
  },
  {
    field: "files",
    headerName: "Materials",
    headerAlign: "right",
    type: "number",
    width: 130,
  },
  {
    field: "chapters",
    headerName: "Chapters",
    headerAlign: "right",
    type: "number",
    width: 130,
  },
  {
    field: "visibility",
    headerName: "Visibility",
    headerAlign: "center",
    align: "center",
    width: 130,
    renderCell: (params) => convertStatusToIcon(params.value),
  },
]

const rows = [
  {
    id: 1,
    courseName: "Python",
    courseDescription:
      "This is a long course description that should get cutoff from the demo page because it is so long-winded and excessive, and no it is not about phyton snakes.",
    files: 25,
    chapters: 12,
    visibility: "visible",
  },
  {
    id: 2,
    courseName: "App Inventor",
    courseDescription:
      "Helping new coders explore the creation of apps in an Android environment.",
    files: 42,
    chapters: 14,
    visibility: "visible",
  },
  {
    id: 3,
    courseName: "Test Course",
    courseDescription: "Testing setup for a new course",
    files: 3,
    chapters: 0,
    visibility: "hidden",
  },
]

export default function Page() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  // Example implementation for AxiosWithAuth, TODO: remove later.
  const { data: session } = useSession()
  session && console.log(session)
  const axiosInstance = AxiosWithAuth()

  const handleRowClick = (params) => {
    // TODO: we'll want to add a descriptive ID like a URL slug instead of an id string
    const { id } = params.row

    return (
      <Link underline="hover" href={`/portal/courses/${id}`}>
        {params.value}
      </Link>
    )
  }

  useEffect(() => {
    axiosInstance
      .get("http://localhost:8080/protected-route")
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.error(err.message)
      })
  }, [session])

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
          <li>
            When the database is connected, the course page should be linked to
            the text in the "Course name" table cell.
          </li>
          <li>The modal needs to be connected to create a new instance.</li>
          <li>
            Hide the "chapters" and "visibility" columns from non-CYD users.
          </li>
        </ul>
      </aside>

      <section className={`container ${styles.courses}`}>
        <div className="header-row">
          <h1>Courses</h1>
          <div>
            {/* TODO: make button visible only to CYD super admins */}
            <IconButton
              color="primary"
              size="large"
              onClick={() => handleOpen()}
              aria-label="add"
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>

        <div className={styles.table}>
          <div className={styles["table-container"]}>
            {/* TODO: Clicking on a course name should open up a detail page */}
            <div style={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns.map((column) =>
                  column.field === "courseName"
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
          </div>
        </div>

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

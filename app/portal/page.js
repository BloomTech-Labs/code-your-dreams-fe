"use client"

import React, { useState, useEffect } from "react"
import styles from "./page.module.scss"
import { Button, IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { DataGrid } from "@mui/x-data-grid"
import Link from "next/link"
import Modal from "@/components/Modal/Modal"
import NewCourse from "./NewCourse"
import AxiosWithAuth from '@/utils/axiosWithAuth';
import { useSession } from "next-auth/react"

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "courseName", headerName: "Course name", width: 250 },
  { field: "courseDescription", headerName: "Description", width: 350 },
  {
    field: "files",
    headerName: "Files",
    type: "number",
    width: 150,
  },
]

const rows = [
  {
    id: 1,
    courseName: "Python",
    courseDescription:
      "This is a long course description that should get cutoff from the demo page because it is so long-winded and excessive, and no it is not about phyton snakes.",
    files: 25,
  },
  {
    id: 2,
    courseName: "App Inventor",
    courseDescription:
      "Helping new coders explore the creation of apps in an Android environment.",
    files: 42,
  },
]

export default function Page() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  // Example implementation for AxiosWithAuth, TODO: remove later.
  const { data: session } = useSession();
  session && console.log(session);
  const axiosInstance = AxiosWithAuth();

  useEffect(() => {
    axiosInstance.get('http://localhost:8080/protected-route')
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err.message);
    })
  }, [session])

  return (
    <main>
      <aside className="TODO">
        TODO:
        <ul>
          <li>
            Add in a page loading component as the forwarding process makes the
            page hang for a moment with only the footer visible.
          </li>
          <li>
            For the lack of a more appropriate place--forward traffic from
            "/portal/courses" back to this page ("/portal")--dynamic course
            detail pages will not be forwarded, "/portal/courses/[course-name]"
          </li>
          <li>
            When the database is connected, the course page should be linked to
            the text in the "Course name" table cell.
          </li>
          <li>The modal needs to be connected to create a new instance.</li>
        </ul>
      </aside>

      <section className={`container ${styles.courses}`}>
        <div className="header-row">
          <h1>Courses</h1>
          <div className="add-button">
            {/* TODO: make button visible only to CYD super admins */}
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
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpen()}
              aria-label="add"
              className="full-button"
            >
              Create a new course
            </Button>
          </div>
        </div>

        <div className={styles.table}>
          <div className={styles["table-container"]}>
            {/* TODO: Clicking on a course name should open up a detail page */}
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

        <aside className="TODO">
          <Link href="/portal/courses">
            Temporary link to course detail page template&mdash;links to actual
            course detail pages will be in the course name in the table above.
          </Link>
        </aside>
      </section>

      <Modal title="Create a New Course" open={open} handleClose={handleClose}>
        <NewCourse />
      </Modal>
    </main>
  )
}

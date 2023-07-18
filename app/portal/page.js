"use client"

import * as React from "react"
import styles from "./page.module.scss"
import { Button, IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { DataGrid } from "@mui/x-data-grid"
import Link from "next/link"

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "courseName", headerName: "Course name", width: 250 },
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
    files: 25,
  },
  {
    id: 2,
    courseName: "App Inventor",
    files: 42,
  },
]

export default function Page() {
  return (
    // This is the landing (courses) page for users that are logged in
    <main>
      <section className={`container ${styles.courses}`}>
        <div className="header-row">
          <h1>Courses</h1>
          <div className="add-button">
            {/* Only for CYD super admins */}
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
              Create a new course
            </Button>
          </div>
        </div>

        <div className={styles.table}>
          <div className={styles["table-container"]}>
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

        <aside>
          <br />
          <Link href="/portal/courses">
            Temporary link to course detail page template&mdash;links to actual
            course detail pages will be in the course name in the table above.
          </Link>
        </aside>
      </section>
    </main>
  )
}

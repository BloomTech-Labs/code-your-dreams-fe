"use client"

import * as React from "react"
import styles from "./page.module.scss"
import { Button } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import { DataGrid } from "@mui/x-data-grid"

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "materialName", headerName: "Name", width: 250 },
  { field: "materialType", headerName: "Type", width: 150 },
  { field: "materialDetails", headerName: "Details", width: 450 },
]

const rows = [
  {
    id: 1,
    materialName: "Course syllabus",
    materialType: "Document",
    materialDetails: "Course description and expectations",
  },
  {
    id: 2,
    materialName: "Lesson 1",
    materialType: "Presentation",
    materialDetails: "Getting started with Python",
  },
  {
    id: 3,
    materialName: "Getting Started",
    materialType: "Video",
    materialDetails: "Setting up your environment",
  },
  {
    id: 4,
    materialName: "Quiz 1",
    materialType: "Quiz",
    materialDetails: "Assessment for section 1",
  },
]

export default function Page() {
  return (
    <main className={styles.courses}>
      <aside className="TODO">
        This is a temporary page that should serve as a default dynamic-page
        template for a course detail page.
      </aside>
      <section className="container">
        <div className="header-row">
          <h1>Course Name</h1>
          <div className="add-button">
            {/* TODO: This button should only be visible to super admin users */}
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              aria-label="add"
              className="full-button"
            >
              Edit course
            </Button>
          </div>
        </div>
        <div>
          <p>
            This is a course description that is provided in the courses table.
          </p>

          <div className={styles.table}>
            <div className={styles["table-container"]}>
              <div style={{ height: 500, width: "100%" }}>
                {/* TODO: We will want to add a link to the provided URL to the name field */}
                {/* TODO: We need to build a way for users to modify the contents in the table (edit course material).
                    I am leaning toward inline or a pop-up design, so we'll have to figure out what that will look like and how to implement it. */}
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
        </div>
      </section>
    </main>
  )
}

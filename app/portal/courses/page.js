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
import useCheckTokenExpired from "@/utils/useCheckTokenExpired"
import { useData } from "@/context/appContext"
import AxiosWithAuth from "@/utils/axiosWithAuth"

const handleRowClick = (params) => {
  const { name } = params.row
  const regex = /( |%20)/g

  return (
    <Link
      underline="always"
      href={`/portal/courses/${name.toLowerCase().replace(regex, "-")}`}
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
    field: "materialsCount",
    headerName: "Materials",
    headerAlign: "right",
    type: "number",
    width: 150,
  },
  {
    field: "permissionsCount",
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

const initialState = {
  name: "",
  description: "",
  visibility: false,
}

export default function Page() {
  const [localCourses, setLocalCourses] = useState(null)
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
      .post(`${process.env.NEXT_PUBLIC_BE_API_URL}/courses/create`, formState)
      .then((res) => {
        console.log("Form data submitted to database:", res.data)
        setLocalCourses([...localCourses, res.data[0]])
        setFormState(initialState)
        setOpen(false)
      })
      .catch((err) => {
        console.error(err)
      })
  }

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
    localCourses && (
      <main>
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
              <div className="data-grid">
                {localCourses && (
                  <DataGrid
                    rows={localCourses}
                    getRowId={(row) => row.id}
                    columns={columns.filter(columnVisibility)}
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
                    aria-label="Data grid of courses"
                  />
                )}
              </div>
            </div>
          </div>

          {current_user && current_user.role_id === 3 && (
            <p className="italic">
              Contact Code Your Dreams for access to more courses.
            </p>
          )}
        </section>

        <Modal
          title="Create a New Course"
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmitForm}
        >
          <NewCourse
            formState={formState}
            setFormState={setFormState}
            onSubmit={handleSubmitForm}
          />
        </Modal>
      </main>
    )
  )
}

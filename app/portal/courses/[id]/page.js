"use client"

import React, { useState } from "react"
import { Alert, IconButton, Link, Typography } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteForeverIcon from "@mui/icons-material/DeleteForeverOutlined"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { DataGrid } from "@mui/x-data-grid"
import BreadcrumbRow from "@/components/layout/BreadcrumbRow/BreadcrumbRow"
import DestroyButton from "@/components/admin/DestroyButton/DestroyButton"
import Modal from "@/components/Modal/Modal"
import EditCourse from "../_components/EditCourse"
import NewMaterial from "../_components/NewMaterial"
import EditMaterial from "../_components/EditMaterial"
import EditButton from "@/components/admin/EditButton/EditButton"

const showLinkButton = (url) => {
  return (
    <IconButton color="primary" href={url} target="_new">
      {<OpenInNewIcon />}
    </IconButton>
  )
}

const showEditButton = () => {
  return (
    <EditButton title="Edit Material">
      <EditMaterial />
    </EditButton>
  )
}

const showDestroyButton = (status) => {
  if (status) {
    return (
      <DestroyButton action="delete">
        <DeleteForeverIcon />
      </DestroyButton>
    )
  }
  return null
}

// TODO: Replace demo data with actual data from the courses instance in the table.
const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "url",
    headerName: "Link",
    headerAlign: "center",
    align: "center",
    width: 100,
    renderCell: (params) => showLinkButton(params.value),
  },
  { field: "materialName", headerName: "Name", width: 250 },
  { field: "materialType", headerName: "Type", width: 150 },
  { field: "materialDetails", headerName: "Details", width: 450 },
  {
    field: "edit",
    headerName: "Edit",
    headerAlign: "center",
    align: "center",
    width: 100,
    renderCell: (params) => showEditButton(params.value),
  },
]
const rows = [
  {
    id: 1,
    materialName: "Course syllabus",
    materialType: "Document",
    materialDetails: "Course description and expectations",
    url: "https://drive.google.com",
  },
  {
    id: 2,
    materialName: "Lesson 1",
    materialType: "Presentation",
    materialDetails: "Getting started with Python",
    url: "https://dropbox.com",
  },
  {
    id: 3,
    materialName: "Getting Started",
    materialType: "Video",
    materialDetails: "Setting up your environment",
    url: "https://microsoft365.com",
  },
  {
    id: 4,
    materialName: "Quiz 1",
    materialType: "Quiz",
    materialDetails: "Assessment for section 1",
    url: "https://icloud.com",
  },
]

export default function Page() {
  // Course EDIT modal
  const [openCourse, setOpenCourse] = useState(false)
  const handleOpenCourse = () => setOpenCourse(true)
  const handleCloseCourse = () => setOpenCourse(false)
  // Material NEW modal
  const [openMaterialNew, setOpenMaterialNew] = useState(false)
  const handleOpenMaterialNew = () => setOpenMaterialNew(true)
  const handleCloseMaterialNew = () => setOpenMaterialNew(false)

  return (
    <main>
      <BreadcrumbRow>
        <Link underline="hover" color="inherit" href="/portal/courses">
          Courses
        </Link>
        {/* TODO: Insert course name from database for current page */}
        <Typography color="text.primary">{"{course_name}"}</Typography>
      </BreadcrumbRow>

      {/* TODO: Display only when course is hidden */}
      <Alert
        iconMapping={{
          warning: <VisibilityOffIcon fontSize="inherit" />,
        }}
        severity="warning"
        className="container"
      >
        This course is hidden. Edit the course settings to make it visible.
      </Alert>

      <section className="container">
        <div className="header-row">
          <h1>Course Name</h1>
          {/* TODO: This button should only be visible to super admin users */}
          <IconButton
            color="primary"
            size="large"
            onClick={() => handleOpenCourse()}
            aria-label="add"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        </div>
        {/* TODO: Fill in this field from the database. */}
        <p>
          {
            "{This is a course description that is provided in the courses table.}"
          }
        </p>
      </section>
      <section className="container">
        <div className="header-row">
          <h2>Materials</h2>
          <IconButton
            color="primary"
            size="large"
            onClick={() => handleOpenMaterialNew()}
            aria-label="add a course material"
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </div>
        <div className="data-grid">
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
      </section>

      <Modal
        title="Edit Course"
        open={openCourse}
        handleClose={handleCloseCourse}
      >
        <EditCourse />
      </Modal>
      <Modal
        title="Add Material"
        open={openMaterialNew}
        handleClose={handleCloseMaterialNew}
      >
        <NewMaterial />
      </Modal>
    </main>
  )
}

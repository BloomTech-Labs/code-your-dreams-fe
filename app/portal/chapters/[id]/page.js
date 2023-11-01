"use client"

import React, { useState, useEffect } from "react"
import {
  IconButton,
  Link,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import NoRowsOverlay from "@/components/NoRowsOverlay/NoRowsOverlay"
import EditIcon from "@mui/icons-material/Edit"
import AddIcon from "@mui/icons-material/Add"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import BreadcrumbRow from "@/components/layout/BreadcrumbRow/BreadcrumbRow"
import EditButton from "@/components/admin/EditButton/EditButton"
import DestroyButton from "@/components/admin/DestroyButton/DestroyButton"
import Modal from "@/components/Modal/Modal"
import EditChapter from "../_components/EditChapter"
import NewMember from "../_components/NewMember"
import EditMember from "../_components/EditMember"
import LinkCourse from "../_components/LinkCourse"
import { usePathname } from "next/navigation"
import { useData } from "@/context/appContext"

const showEditButton = () => {
  return (
    <EditButton title="Edit Member">
      <EditMember />
    </EditButton>
  )
}

const columns = [
  { field: "memberName", headerName: "Name", width: 250 },
  { field: "emailAddress", headerName: "Email", width: 300 },
  { field: "adminFlag", headerName: "Admin?", width: 120 },
  {
    field: "edit",
    headerName: "Edit",
    align: "center",
    width: 100,
    renderCell: () => showEditButton(),
  },
]

// TODO: Replace demo data with actual data from the chapters table.
const rows = [
  {
    id: 1,
    memberName: "Brianne Caplan",
    emailAddress: "brianne@codeyourdreams.org",
    adminFlag: "Yes",
    edit: "",
  },
  {
    id: 2,
    memberName: "John Dodson",
    emailAddress: "john.dodson@bloomtech.com",
    adminFlag: "",
    edit: "",
  },
]

// TODO: Replace demo data with actual data from the courses table.
const demoData = [
  { id: 1, name: "Python", showButton: true },
  { id: 2, name: "App Inventor", showButton: true },
]

const showDataTable = (data) => {
  const tableLength = Object.keys(data).length

  if (tableLength === 0) {
    return <NoRowsOverlay />
  } else {
    return (
      <TableContainer>
        <Table size="small" aria-label="simple table" className="min-width">
          <caption>Admin table for linked courses</caption>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Unlink Course?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="center">
                  {row.showButton && (
                    <DestroyButton action="unlink">
                      <RemoveCircleOutlineIcon />
                    </DestroyButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default function Page() {
  // Chapter EDIT modal
  const [openChapterEdit, setOpenChapterEdit] = useState(false)
  const handleOpenChapterEdit = () => setOpenChapterEdit(true)
  const handleCloseChapterEdit = () => setOpenChapterEdit(false)
  // Course LINK modal
  const [openCourseLink, setOpenCourseLink] = useState(false)
  const handleOpenCourseLink = () => setOpenCourseLink(true)
  const handleCloseCourseLink = () => setOpenCourseLink(false)
  // Selected Chapter Data
  const { chapters, course_permissions } = useData()
  const [selectedChapter, setSelectedChapter] = useState(null)
  const [selectedCourses, setSelectedCourses] = useState(null)
  // Member NEW modal
  const [openMemberNew, setOpenMemberNew] = useState(false)
  const handleOpenMemberNew = () => setOpenMemberNew(true)
  const handleCloseMemberNew = () => setOpenMemberNew(false)

  const pathname = usePathname()
  const regex = /-/g
  const newStr = pathname.slice(17).replace(regex, " ")

  useEffect(() => {
    if (chapters) {
      chapters.some((obj) => {
        if (obj.name.toLowerCase() === newStr) {
          setSelectedChapter(obj)
        }
      })
    }
    if (course_permissions) {
      course_permissions.some((obj) => {
        if (selectedChapter && obj.course_id === selectedChapter.id) {
          if (selectedCourses && selectedCourses.includes(obj)) {
            return
          } else if (selectedCourses === null) {
            setSelectedCourses([obj])
          } else if (selectedCourses) {
            setSelectedCourses([obj, ...selectedCourses])
          }
        }
      })
    }
  })

  return (
    // TODO: Restrict page to chapter admins and CYD users
    <main>
      <BreadcrumbRow>
        <Link underline="hover" color="inherit" href="/portal/chapters">
          Chapters
        </Link>
        {/* TODO: Insert course name from database for current page */}
        {selectedChapter && (
          <Typography color="text.primary">{selectedChapter.name}</Typography>
        )}
      </BreadcrumbRow>

      <section className="container">
        <div className="header-row">
          <h1>{selectedChapter && selectedChapter.name}</h1>
          {/* TODO: This button should only be visible to super admin users */}
          <IconButton
            color="primary"
            size="large"
            onClick={() => handleOpenChapterEdit()}
            aria-label="edit"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        </div>
        <div className="header-row">
          <h2>Members</h2>
          {/* TODO: This button should only be visible to super admin users */}
          <IconButton
            color="primary"
            size="large"
            onClick={() => handleOpenMemberNew()}
            aria-label="Add a new chapter member"
          >
            <PersonAddIcon fontSize="inherit" />
          </IconButton>
        </div>
        <div className="data-grid">
          <DataGrid
            rows={rows}
            columns={columns}
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
            aria-label="Data grid of chapter members"
          />
        </div>
      </section>
      {/* TODO: Restrict the following section to only super admin users */}
      <section className="container">
        <div className="header-row">
          <h2>Available Courses</h2>
          <IconButton
            color="primary"
            size="large"
            onClick={() => handleOpenCourseLink()}
            aria-label="Link a course to the chapter"
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </div>
        {/* TODO: Change the name of the variable for data source here */}
        {showDataTable(demoData)}
        <div className="italic">
          <Link underline="hover" href="/portal/courses">
            Visit the Courses page to access course materials.
          </Link>
        </div>
      </section>

      <Modal
        title="Edit Chapter"
        open={openChapterEdit}
        handleClose={handleCloseChapterEdit}
      >
        <EditChapter />
      </Modal>
      <Modal
        title="Link a Course"
        open={openCourseLink}
        handleClose={handleCloseCourseLink}
      >
        <LinkCourse />
      </Modal>
      <Modal
        title="Add a New Member"
        open={openMemberNew}
        handleClose={handleCloseMemberNew}
      >
        <NewMember />
      </Modal>
    </main>
  )
}

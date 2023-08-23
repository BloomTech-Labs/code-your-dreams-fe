"use client"

import React, { useState } from "react"
import styles from "./page.module.scss"
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

const showEditButton = () => {
  return (
    <EditButton title="Edit Member">
      <EditMember />
    </EditButton>
  )
}

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "memberName", headerName: "Name", width: 250 },
  { field: "emailAddress", headerName: "Email", width: 300 },
  { field: "adminFlag", headerName: "Admin?", width: 120 },
  {
    field: "edit",
    headerName: "Edit",
    align: "center",
    width: 80,
    renderCell: () => showEditButton(),
  },
]

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

const demoData = [
  { id: 1, name: "Python", showButton: true },
  { id: 2, name: "App Inventor", showButton: true },
]

export default function Page() {
  // Chapter EDIT modal
  const [openChapterEdit, setOpenChapterEdit] = useState(false)
  const handleOpenChapterEdit = () => setOpenChapterEdit(true)
  const handleCloseChapterEdit = () => setOpenChapterEdit(false)
  // Course LINK modal
  const [openCourseLink, setOpenCourseLink] = useState(false)
  const handleOpenCourseLink = () => setOpenCourseLink(true)
  const handleCloseCourseLink = () => setOpenCourseLink(false)
  // Member NEW modal
  const [openMemberNew, setOpenMemberNew] = useState(false)
  const handleOpenMemberNew = () => setOpenMemberNew(true)
  const handleCloseMemberNew = () => setOpenMemberNew(false)

  return (
    <main className={styles.detail}>
      <aside className="TODO">
        <p>This is a chapter detail page</p>
        TODO:
        <ul>
          <li>Restrict page to chapter admins and CYD users</li>
        </ul>
      </aside>

      <BreadcrumbRow>
        {/* TODO: Make this menu visible only to CYD users */}
        <Link underline="hover" color="inherit" href="/portal/chapters">
          Chapters
        </Link>
        <Typography color="text.primary">[Chapter_Name]</Typography>
      </BreadcrumbRow>

      <section className={`container ${styles.courses}`}>
        <div className="header-row">
          <h1>[Chapter_Name]</h1>
          <div>
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
        </div>
        <div className="header-row">
          <h2>Available Courses</h2>
          <div>
            <IconButton
              color="primary"
              size="large"
              onClick={() => handleOpenCourseLink()}
              aria-label="edit"
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
        {/* TODO: If admin, show a list of the courses */}
        <TableContainer>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Unlink Course?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {demoData.map((row) => (
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
        {/* TODO: Else, display a link to the courses page */}
        <div className={`italic ${styles["chapter-notice"]}`}>
          <Link underline="hover" href="/portal/courses">
            Visit the Courses page to access course materials.
          </Link>
        </div>
      </section>
      <section className="container">
        <div className="header-row">
          <h2>Members</h2>
          <div className="add-button">
            {/* TODO: This button should only be visible to super admin users */}
            <IconButton
              color="primary"
              size="large"
              onClick={() => handleOpenMemberNew()}
              aria-label="add"
            >
              <PersonAddIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
        <div style={{ height: 500, width: "100%" }}>
          {/* TODO: This is the same table as the member view. Should we componentize this? */}
          {/* TODO: We'll have to figure out how to update a user in Auth0 and if there are any local changes we manage within the app */}
          {/* TODO: When we have an edit here, we'll have to figure out how we handle the change--maybe via pop up (if changes are local)? */}
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

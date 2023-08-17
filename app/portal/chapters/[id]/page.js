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
import BreadcrumbRow from "@/components/layout/BreadcrumbRow/BreadcrumbRow"
import DestroyButton from "@/components/admin/DestroyButton/DestroyButton"
import Modal from "@/components/Modal/Modal"
import NewChapter from "../_components/NewChapter"

const showDestroyButton = (status) => {
  if (status) {
    return <DestroyButton label="delete" />
  }
  return null
}

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "memberName", headerName: "Name", width: 250 },
  { field: "emailAddress", headerName: "Email", width: 300 },
  { field: "adminFlag", headerName: "Admin?", width: 120 },
  {
    field: "delete",
    headerName: "Actions",
    align: "center",
    width: 120,
    renderCell: (params) => showDestroyButton(params.value),
  },
]

const rows = [
  {
    id: 1,
    memberName: "Brianne Caplan",
    emailAddress: "brianne@codeyourdreams.org",
    adminFlag: "Yes",
    delete: "delete",
  },
  {
    id: 2,
    memberName: "John Dodson",
    emailAddress: "john.dodson@bloomtech.com",
    adminFlag: "",
    delete: "delete",
  },
]

function createData(name, remove) {
  return { name, remove }
}

const tableRows = [
  createData("Python", "remove"),
  createData("App Inventor", "remove"),
]

export default function Page() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <main className={styles.detail}>
      <aside className="TODO">
        <p>This is a chapter detail page</p>
        TODO:
        <ul>
          <li>Implement separate modals for each section</li>
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
              onClick={() => handleOpen()}
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
              onClick={() => handleOpen()}
              aria-label="edit"
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
        {/* TODO: the DestroyButton component should be inserted into the "remove?" column for each course row */}
        <DestroyButton label="remove" />
        {/* TODO: If admin, show a list of the courses */}
        <TableContainer>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Remove?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows.map((tableRows) => (
                <TableRow
                  key={tableRows.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {tableRows.name}
                  </TableCell>
                  <TableCell>{tableRows.remove}</TableCell>
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
              onClick={() => handleOpen()}
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

      <Modal title="Create a New Chapter" open={open} handleClose={handleClose}>
        {/* TODO: Can we repurpose the "NewChapter" component for both creating a new and editing a chapter? */}
        <NewChapter />
      </Modal>
    </main>
  )
}

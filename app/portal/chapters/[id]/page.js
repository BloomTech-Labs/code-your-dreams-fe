"use client"

import React, { useState } from "react"
import styles from "./page.module.scss"
import {
  Button,
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
import EditIcon from "@mui/icons-material/Edit"
import BreadcrumbRow from "@/components/layout/BreadcrumbRow/BreadcrumbRow"
import Modal from "@/components/Modal/Modal"
import NewChapter from "../_components/NewChapter"

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
          <li>Finish the layout of this page</li>
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
          {/* TODO: Switch title based on user (CYD vs chapter user) */}
          <h1>[Chapter Details] or [My Chapter]</h1>
          <div>
            {/* TODO: This button should only be visible to super admin users */}
            <IconButton
              color="primary"
              size="large"
              onClick={() => handleOpen()}
              aria-label="edit"
              className="compact-button"
            >
              <EditIcon />
            </IconButton>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => handleOpen()}
              aria-label="edit"
              className="full-button"
            >
              Edit chapter name
            </Button>
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
              className="compact-button"
            >
              <EditIcon />
            </IconButton>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => handleOpen()}
              aria-label="edit"
              className="full-button"
            >
              Edit course access
            </Button>
          </div>
        </div>
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
        <div className={styles["chapter-notice"]}>
          <Link underline="hover" href="/portal/courses">
            View the Courses page to access course materials.
          </Link>{" "}
          <div className="italic">
            Contact Code Your Dreams for access to more courses.
          </div>
        </div>
      </section>
      <section className="container">
        <h2>Members</h2>
        <div>List of members</div>
      </section>

      <Modal title="Create a New Chapter" open={open} handleClose={handleClose}>
        {/* TODO: Can we repurpose the "NewChapter" component for both creating a new and editing a chapter? */}
        <NewChapter />
      </Modal>
    </main>
  )
}

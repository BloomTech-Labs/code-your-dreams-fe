"use client"

import React, { useState } from "react"
import styles from "./page.module.scss"
import { DataGrid } from "@mui/x-data-grid"
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import Modal from "@/components/Modal/Modal"
import NewSuperUser from "./_components/NewSuperUser"
import NewMaterialType from "./_components/NewMaterialType"
import EditSuperUser from "./_components/EditSuperUser"
import EditMaterialType from "./_components/EditMaterialType"
import EditButton from "@/components/admin/EditButton/EditButton"
import DestroyButton from "@/components/admin/DestroyButton/DestroyButton"

const showEditButton = () => {
  return (
    <EditButton title="Edit Super User">
      <EditSuperUser />
    </EditButton>
  )
}

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "memberName", headerName: "Name", width: 250 },
  { field: "emailAddress", headerName: "Email", width: 300 },
  { field: "adminFlag", headerName: "Super Admin?", width: 200 },
  {
    field: "edit",
    headerName: "Edit",
    align: "center",
    width: 80,
    renderCell: (params) => showEditButton(params.value),
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
    emailAddress: "john@codeyourdreams.org",
    adminFlag: "",
    edit: "",
  },
]

function createData(type, count, edit, destroy) {
  return { type, count, edit, destroy }
}

const tableRows = [
  createData("Document", 52, "edit", ""),
  createData("Presentation", 64, "edit", ""),
  createData("Video", 16, "edit", ""),
  createData("Quiz", 8, "edit", ""),
  createData("Test", 0, "edit", "delete"),
]

export default function Page() {
  // Super user NEW modal
  const [openSuperUserNew, setOpenSuperUserNew] = useState(false)
  const handleOpenSuperUserNew = () => setOpenSuperUserNew(true)
  const handleCloseSuperUserNew = () => setOpenSuperUserNew(false)
  // Material type NEW modal
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <main className={styles.admin}>
      <aside className="TODO">
        TODO:
        <ul>
          <li>Implement Auth0 integration for admin users.</li>
          <li>Implement local changes for admin users, e.g., admin flag.</li>
          <li>Add support for multiple modals on same page.</li>
        </ul>
      </aside>
      <section className="container">
        <h1>Admin Settings</h1>
        <div className="header-row">
          <h2>Super users</h2>
          <div className="add-button">
            <IconButton
              color="primary"
              size="large"
              onClick={() => handleOpenSuperUserNew()}
              aria-label="add a super user"
            >
              <PersonAddIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
        <p className="italic">
          Super users will have the ability to access all course materials.
          Super admins will have the ability to manage settings for the entire
          application.
        </p>
        {/* TODO: We'll need to enable user editing via Auth0 as well as local editing.
            Locally we'd need to managed the admin flag, if anything else. */}
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
      </section>
      <section className={`container ${styles.materials}`}>
        {/* TODO: This is where we will put our materials types definitions.
            We'll need to think through logic on when we allow removal of a definition.
            E.g., if there are any instances linked to that definition, you cannot delete, etc.
            The UI must help ensure users only can delete an unlinked material type. */}
        <div className="header-row">
          <h2>Materials types</h2>
          <div className="add-button">
            <IconButton
              color="primary"
              size="large"
              onClick={() => handleOpen()}
              aria-label="add a materials type"
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
        <p className="italic">
          A materials type can only be removed if there are zero instances of it
          being used&mdash;you must change the type for each file for all files
          before you can delete a type.
        </p>

        {/* TODO: the EditButton component should be inserted into the edit column */}
        <EditButton title="Edit Material Type">
          <EditMaterialType />
        </EditButton>

        <TableContainer>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Types</TableCell>
                <TableCell align="right">Count</TableCell>
                <TableCell colSpan={2}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows.map((tableRows) => (
                <TableRow
                  key={tableRows.type}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {tableRows.type}
                  </TableCell>
                  <TableCell align="right">{tableRows.count}</TableCell>
                  <TableCell>{tableRows.edit}</TableCell>
                  <TableCell>{tableRows.destroy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      <Modal
        title="Add a New Super User"
        open={openSuperUserNew}
        handleClose={handleCloseSuperUserNew}
      >
        <NewSuperUser />
      </Modal>
      <Modal
        title="Create a New Materials Type"
        open={open}
        handleClose={handleClose}
      >
        <NewMaterialType />
      </Modal>
    </main>
  )
}

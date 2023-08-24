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

const demoData = [
  { id: 1, name: "Document", quantity: 52, showButton: true },
  { id: 2, name: "Presentation", quantity: 64, showButton: true },
  { id: 3, name: "Video", quantity: 16, showButton: true },
  { id: 4, name: "Quiz", quantity: 8, showButton: true },
  { id: 5, name: "Test", quantity: 0, showButton: true },
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

        <TableContainer>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Types</TableCell>
                <TableCell align="right">Count</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {demoData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">
                    {row.showButton && (
                      <EditButton title="Edit Material Type">
                        <EditMaterialType />
                      </EditButton>
                    )}
                  </TableCell>
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

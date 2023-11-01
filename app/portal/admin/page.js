"use client"

import React, { useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import NoRowsOverlay from "@/components/NoRowsOverlay/NoRowsOverlay"
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
import NewSuperAdmin from "./_components/NewSuperAdmin"
import NewMaterialType from "./_components/NewMaterialType"
import EditSuperAdmin from "./_components/EditSuperAdmin"
import EditMaterialType from "./_components/EditMaterialType"
import EditButton from "@/components/admin/EditButton/EditButton"
import useCheckTokenExpired from "@/utils/useCheckTokenExpired"
import isSuperAdmin from "@/components/admin/isRole/isSuperAdmin"

const showEditButton = () => {
  return (
    <EditButton title="Edit Super Admin">
      <EditSuperAdmin />
    </EditButton>
  )
}

const columns = [
  { field: "memberName", headerName: "Name", width: 250 },
  { field: "emailAddress", headerName: "Email", width: 300 },
  {
    field: "edit",
    headerName: "Edit",
    align: "center",
    width: 100,
    renderCell: (params) => showEditButton(params.value),
  },
]

// TODO: Replace demo data with actual data from the users table.
const rows = [
  {
    id: 1,
    memberName: "Brianne Caplan",
    emailAddress: "brianne@codeyourdreams.org",
  },
  {
    id: 2,
    memberName: "John Dodson",
    emailAddress: "john@codeyourdreams.org",
  },
]

// TODO: Replace demo data with actual data from the materials type table.
const demoData = [
  { id: 1, name: "Document", quantity: 52, showButton: true },
  { id: 2, name: "Presentation", quantity: 64, showButton: true },
  { id: 3, name: "Video", quantity: 16, showButton: true },
  { id: 4, name: "Quiz", quantity: 8, showButton: true },
  { id: 5, name: "Test", quantity: 0, showButton: true },
]

const showDataTable = (data) => {
  const tableLength = Object.keys(data).length

  if (tableLength === 0) {
    return <NoRowsOverlay />
  } else {
    return (
      <TableContainer>
        <Table size="small" aria-label="simple table" className="min-width">
          <caption>Admin table for materials types</caption>
          <TableHead>
            <TableRow>
              <TableCell>Types</TableCell>
              <TableCell align="right">Count</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
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
    )
  }
}

const AdminPage = () => {
  // Super admin NEW modal
  const [openSuperAdminNew, setOpenSuperAdminNew] = useState(false)
  const handleOpenSuperAdminNew = () => setOpenSuperAdminNew(true)
  const handleCloseSuperAdminNew = () => setOpenSuperAdminNew(false)
  // Material type NEW modal
  const [openMaterialNew, setOpenMaterialNew] = useState(false)
  const handleOpenMaterialNew = () => setOpenMaterialNew(true)
  const handleCloseMaterialNew = () => setOpenMaterialNew(false)

  useCheckTokenExpired()

  return (
    <main>
      <section className="container">
        <h1>Admin Settings</h1>
        <div className="header-row">
          <h2>Super admins</h2>
          <IconButton
            color="primary"
            size="large"
            onClick={() => handleOpenSuperAdminNew()}
            aria-label="Add a super admin"
          >
            <PersonAddIcon fontSize="inherit" />
          </IconButton>
        </div>
        <p className="italic">
          Super admins will have the ability to manage settings and users for
          the entire application.
        </p>
        {/* TODO: We need to send the selected user over to the edit modal */}
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
            aria-label="Data grid of super admins"
          />
        </div>
      </section>
      <section className="container">
        <div className="header-row">
          <h2>Materials types</h2>
          <IconButton
            color="primary"
            size="large"
            onClick={() => handleOpenMaterialNew()}
            aria-label="Add a materials type"
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </div>
        <p className="italic">
          A materials type can only be removed if there are zero instances of it
          being used&mdash;you must change the type for each file for all files
          before you can delete a type.
        </p>
        {/* TODO: We need to send the selected material type over to the edit modal */}
        {/* TODO: Change the name of the variable for data source here */}
        {showDataTable(demoData)}
      </section>

      <Modal
        title="Add a New Super Admin"
        open={openSuperAdminNew}
        handleClose={handleCloseSuperAdminNew}
      >
        <NewSuperAdmin />
      </Modal>
      <Modal
        title="Create a New Materials Type"
        open={openMaterialNew}
        handleClose={handleCloseMaterialNew}
      >
        <NewMaterialType />
      </Modal>
    </main>
  )
}

export default isSuperAdmin(AdminPage)

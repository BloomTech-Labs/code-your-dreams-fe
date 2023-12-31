"use client"

import React, { useState, useEffect } from "react"
import { useData } from "@/context/appContext"
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
import EditIcon from "@mui/icons-material/Edit"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import Modal from "@/components/Modal/Modal"
import NewSuperAdmin from "./_components/NewSuperAdmin"
import NewMaterialType from "./_components/NewMaterialType"
import EditSuperAdmin from "./_components/EditSuperAdmin"
import EditMaterialType from "./_components/EditMaterialType"
import useCheckTokenExpired from "@/utils/useCheckTokenExpired"
import isSuperAdmin from "@/components/admin/isRole/isSuperAdmin"

// TODO: Replace demo data with actual data from the users table.
const rows = [
  {
    id: 1,
    name: "Brianne Caplan",
    email: "brianne@codeyourdreams.org",
  },
  {
    id: 2,
    name: "John Dodson",
    email: "john@codeyourdreams.org",
  },
]

const AdminPage = () => {
  const { current_user, material_types } = useData()
  const [localMaterials, setLocalMaterials] = useState(null)

  // Super admin NEW modal
  const [openSuperAdminNew, setOpenSuperAdminNew] = useState(false)
  const handleOpenSuperAdminNew = () => setOpenSuperAdminNew(true)
  const handleCloseSuperAdminNew = () => setOpenSuperAdminNew(false)
  // Super admin EDIT modal
  const [editSuperAdminDetails, setEditSuperAdminDetails] = useState(null)
  const [openSuperAdminEdit, setOpenSuperAdminEdit] = useState(false)
  // Material type NEW modal
  const [openMaterialNew, setOpenMaterialNew] = useState(false)
  const handleOpenMaterialNew = () => setOpenMaterialNew(true)
  const handleCloseMaterialNew = () => setOpenMaterialNew(false)
  // Material type EDIT modal
  const [openMaterialEdit, setOpenMaterialEdit] = useState(false)

  const handleSubmitEditSuperAdmin = () => {
    // TODO: Complete the edit processing here
    console.log("handleSubmitEditSuperAdmin")
  }

  const showSuperAdminEditButton = (super_admin) => {
    return (
      <IconButton
        color="primary"
        onClick={() => {
          setEditSuperAdminDetails(super_admin)
          setOpenSuperAdminEdit(true)
        }}
        aria-label="Edit button"
      >
        {<EditIcon />}
      </IconButton>
    )
  }

  const handleSubmitEditMaterials = () => {
    // TODO: Complete the edit processing here
    console.log("handleSubmitEditMaterials")
  }

  useCheckTokenExpired()

  useEffect(() => {
    console.log(material_types)
    if (material_types) {
      setLocalMaterials(material_types)
    }
  }, [material_types])

  const columns = [
    { field: "name", headerName: "Name", width: 250 },
    { field: "email", headerName: "Email", width: 300 },
    {
      field: "edit",
      headerName: "Edit",
      align: "center",
      width: 100,
      renderCell: (params) => showSuperAdminEditButton(params.row),
    },
  ]

  const showDataTable = () => {
    // if localMaterials is not available from context yet render nothing
    if (localMaterials === null) {
      return null
    } else {
      const tableLength = Object.keys(localMaterials).length

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
                {localMaterials.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.material_type}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setOpenMaterialEdit(true)
                        }}
                        aria-label="Edit button"
                      >
                        {<EditIcon />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      }
    }
  }

  return (
    current_user && (
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
            A materials type can only be removed if there are zero instances of
            it being used&mdash;you must change the type for each file for all
            files before you can delete a type.
          </p>
          {/* TODO: We need to send the selected material type over to the edit modal */}
          {/* TODO: Change the name of the variable for data source here */}
          {showDataTable()}
        </section>

        <Modal
          title="Add a New Super Admin"
          open={openSuperAdminNew}
          handleClose={handleCloseSuperAdminNew}
        >
          <NewSuperAdmin />
        </Modal>
        <Modal
          title="Edit Super Admin"
          handleSubmit={handleSubmitEditSuperAdmin}
          open={openSuperAdminEdit}
          handleClose={() => {
            setOpenSuperAdminEdit(false)
          }}
        >
          <EditSuperAdmin
            editSuperAdminDetails={editSuperAdminDetails}
            setEditSuperAdminDetails={setEditSuperAdminDetails}
          />
        </Modal>
        <Modal
          title="Create a New Materials Type"
          open={openMaterialNew}
          handleClose={handleCloseMaterialNew}
        >
          <NewMaterialType />
        </Modal>
        <Modal
          title="Edit Material Type"
          handleSubmit={handleSubmitEditMaterials}
          open={openMaterialEdit}
          handleClose={() => {
            setOpenMaterialEdit(false)
          }}
        >
          <EditMaterialType />
        </Modal>
      </main>
    )
  )
}

export default isSuperAdmin(AdminPage)

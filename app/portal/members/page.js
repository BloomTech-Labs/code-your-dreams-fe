"use client"

import React, { useState, useEffect } from "react"
import { IconButton } from "@mui/material"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import { DataGrid } from "@mui/x-data-grid"
import Modal from "@/components/Modal/Modal"
import NewMember from "./_components/NewMember"
import EditButton from "@/components/admin/EditButton/EditButton"
import EditMember from "./_components/EditMember"
import AxiosWithAuth from "@/utils/axiosWithAuth"
import { useData } from "@/context/appContext"
import useCheckTokenExpired from "@/utils/useCheckTokenExpired"

const showEditButton = () => {
  return (
    <EditButton title="Edit Member">
      <EditMember />
    </EditButton>
  )
}

export default function Page() {
  const [open, setOpen] = useState(false)
  const [members, setMembers] = useState(null)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useCheckTokenExpired()

  const { user_session, users, chapters, courses, course_materials, material_types, course_permissions } = useData()

  const columns = [
    { field: "name", headerName: "Name", width: 250 },
    { field: "email", headerName: "Email", width: 300 },
    {
      field: "chapter_name",
      headerName: "Chapter",
      width: 300,
    },
    {
      field: "adminFlag",
      headerName: "Admin?",
      width: 150,
      valueGetter: (params) => (params.row.role === "admin" ? "Yes" : "No"),
    },
    {
      field: "edit",
      headerName: "Edit",
      align: "center",
      width: 80,
      renderCell: () => showEditButton(),
    },
  ]

  useEffect(() => {
    console.log([
      user_session,
      users,
      chapters,
      courses,
      course_materials,
      material_types,
      course_permissions
    ])

    if (users) {
      setMembers(users)
    }
  }, [chapters, course_materials, course_permissions, courses, material_types, user_session, users])

  return (
    <main>
      <section className="container">
        <div className="header-row">
          <h1>Members</h1>
          {/* TODO: This button should only be visible to super admin users */}
          <IconButton
            color="primary"
            size="large"
            onClick={() => handleOpen()}
            aria-label="Add a new member"
          >
            <PersonAddIcon fontSize="inherit" />
          </IconButton>
        </div>
        <div className="data-grid">
          {/* TODO: Handle use case of an empty data grid.
            https://mui.com/x/react-data-grid/components/#no-rows-overlay */}
          {/* TODO: We need to send the selected user over to the edit modal */}
          {/* TODO: For chapter admins, the respective chapter filter should be on, so they see only their chapter members */}
          {members && (
            <DataGrid
              rows={members}
              getRowId={(row) => row.auth0_id}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 20 },
                },
              }}
              aria-label="Data grid of members"
            />
          )}
        </div>
      </section>

      <Modal title="Add a New Member" open={open} handleClose={handleClose}>
        <NewMember />
      </Modal>
    </main>
  )
}

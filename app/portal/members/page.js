"use client"

import React, { useState, useEffect } from "react"
import { IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import { DataGrid } from "@mui/x-data-grid"
import NoRowsOverlay from "@/components/NoRowsOverlay/NoRowsOverlay"
import Modal from "@/components/Modal/Modal"
import NewMember from "./_components/NewMember"
import EditMember from "./_components/EditMember"
import { useData } from "@/context/appContext"
import useCheckTokenExpired from "@/utils/useCheckTokenExpired"
import isAdmin from "@/components/admin/isRole/isAdmin"

const MembersPage = () => {
  const [members, setMembers] = useState(null)
  const [openNewMember, setOpenNewMember] = useState(false)
  const handleOpenNewMember = () => setOpenNewMember(true)
  const handleCloseNewMember = () => setOpenNewMember(false)
  const [editMemberDetails, setEditMemberDetails] = useState(null)
  const [openEditMember, setOpenEditMember] = useState(false)
  const handleCloseEditMember = () => setOpenEditMember(false)

  const handleSubmitNewMember = () => {
    // TODO: Complete the new processing here
    console.log("handleSubmitNewMember")
  }

  const handleSubmitEditMember = () => {
    // TODO: Complete the edit processing here
    console.log("handleSubmitEditMember")
  }

  const showEditButton = (member) => {
    return (
      <IconButton
        color="primary"
        onClick={() => {
          setEditMemberDetails(member)
          setOpenEditMember(true)
        }}
        aria-label="Edit button"
      >
        {<EditIcon />}
      </IconButton>
    )
  }

  useCheckTokenExpired()

  const {
    user_session,
    users,
    current_user,
    chapters,
    courses,
    course_materials,
    material_types,
    course_permissions,
  } = useData()

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
      valueGetter: (params) =>
        params.row.role === "admin" || params.row.role === "super_admin"
          ? "Yes"
          : "No",
    },
    {
      field: "edit",
      headerName: "Edit",
      align: "center",
      width: 80,
      renderCell: (params) => showEditButton(params.row),
    },
  ]

  useEffect(() => {
    console.log([
      user_session,
      users,
      current_user,
      chapters,
      courses,
      course_materials,
      material_types,
      course_permissions,
    ])

    if (users) {
      setMembers(users)
    }
  }, [
    chapters,
    course_materials,
    course_permissions,
    courses,
    material_types,
    user_session,
    users,
    current_user,
  ])

  return (
    members && (
      <main>
        <section className="container">
          <div className="header-row">
            <h1>Members</h1>
            {current_user &&
            current_user.role_id === 1 &&
            current_user.chapter_id === 1 ? (
              <IconButton
                color="primary"
                size="large"
                onClick={() => handleOpenNewMember()}
                aria-label="Add a new member"
              >
                <PersonAddIcon fontSize="inherit" />
              </IconButton>
            ) : null}
          </div>
          <div className="data-grid">
            {/* TODO: We need to send the selected user over to the edit modal */}
            {/* TODO: For chapter admins, the respective chapter filter should be on, so they see only their chapter members */}
            {members && (
              <DataGrid
                rows={members}
                getRowId={(row) => row.auth0_id}
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
                aria-label="Data grid of members"
              />
            )}
          </div>
        </section>

        <Modal
          title="Add a New Member"
          open={openNewMember}
          handleClose={handleCloseNewMember}
          handleSubmit={handleSubmitNewMember}
        >
          <NewMember />
        </Modal>
        <Modal
          title="Edit Member"
          open={openEditMember}
          handleClose={handleCloseEditMember}
          handleSubmit={handleSubmitEditMember}
        >
          <EditMember
            editMemberDetails={editMemberDetails}
            setEditMemberDetails={setEditMemberDetails}
          />
        </Modal>
      </main>
    )
  )
}

export default isAdmin(MembersPage)

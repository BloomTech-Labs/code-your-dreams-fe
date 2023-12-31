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
import DestroyButton from "@/components/admin/DestroyButton/DestroyButton"
import Modal from "@/components/Modal/Modal"
import EditChapter from "../_components/EditChapter"
import NewMember from "../_components/NewMember"
import EditMember from "../_components/EditMember"
import LinkCourse from "../_components/LinkCourse"
import { usePathname } from "next/navigation"
import { useData } from "@/context/appContext"
import isSuperAdmin from "@/components/admin/isRole/isSuperAdmin"
import AxiosWithAuth from "@/utils/axiosWithAuth"

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
                    <DestroyButton
                      action="unlink"
                      selectedCoursePermission={row}
                      target="course_permission"
                    >
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

const ChapterDetailPage = () => {
  // Chapter EDIT modal
  const [openChapterEdit, setOpenChapterEdit] = useState(false)
  const handleOpenChapterEdit = () => setOpenChapterEdit(true)
  const handleCloseChapterEdit = () => setOpenChapterEdit(false)
  // Course LINK modal
  const [openCourseLink, setOpenCourseLink] = useState(false)
  const handleOpenCourseLink = () => setOpenCourseLink(true)
  const handleCloseCourseLink = () => setOpenCourseLink(false)
  // Selected Chapter Data
  const { chapters, course_permissions, setChapters, users } = useData()
  const [selectedChapter, setSelectedChapter] = useState(null)
  const [selectedCourses, setSelectedCourses] = useState(null)
  // Edit Chapter Data
  const [editChapterData, setEditChapterData] = useState(null)
  // Chapter Members
  const [members, setMembers] = useState(null)
  const [openMemberNew, setOpenMemberNew] = useState(false)
  const handleOpenMemberNew = () => setOpenMemberNew(true)
  const handleCloseMemberNew = () => setOpenMemberNew(false)
  const [editMemberDetails, setEditMemberDetails] = useState(null)
  const [openMemberEdit, setOpenMemberEdit] = useState(false)
  // Axios
  const axiosInstance = AxiosWithAuth()

  const pathname = usePathname()
  const regex = /( |%20)/g

  const checkIfNull = (i) => {
    if (i !== null) {
      return i
    }
  }

  const showEditButton = (member) => {
    return (
      <IconButton
        color="primary"
        onClick={() => {
          setEditMemberDetails(member)
          setOpenMemberEdit(true)
        }}
        aria-label="Edit button"
      >
        <EditIcon />
      </IconButton>
    )
  }

  const columns = [
    { field: "name", headerName: "Name", width: 250 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "adminFlag", headerName: "Admin?", width: 120 },
    {
      field: "edit",
      headerName: "Edit",
      align: "center",
      width: 100,
      renderCell: (params) => showEditButton(params.row),
    },
  ]

  let count = 0
  useEffect(() => {
    if (chapters) {
      chapters.some((obj) => {
        if (obj.name.toLowerCase().replace(regex, "-") === pathname.slice(17)) {
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
    if (users) {
      const membersList = users.map((i) => {
        if (selectedChapter && i.chapter_id === selectedChapter.id) {
          count++
          let newI = {
            id: count,
            name: i.name,
            email: i.email,
            adminFlag: i.role_id === 1 || i.role_id === 2 ? true : false,
            edit: "",
          }
          return newI
        } else {
          return null
        }
      })
      setMembers(membersList.filter(checkIfNull))
    }
  }, [users, selectedChapter])

  const handleSubmitEditChapter = () => {
    axiosInstance
      .post(
        `${process.env.NEXT_PUBLIC_BE_API_URL}/chapters/update/${editChapterData.id}`,
        editChapterData
      )
      .then((res) => {
        let newChapters = chapters.map((i) => {
          if (i.id === res.data.id) {
            return res.data
          } else {
            return i
          }
        })
        setChapters(newChapters)
        handleCloseChapterEdit()
        setEditChapterData(null)
        window.location = "/portal/chapters"
      })
  }

  return (
    selectedChapter && (
      <main>
        <BreadcrumbRow>
          <Link underline="hover" color="inherit" href="/portal/chapters">
            Chapters
          </Link>
          <Typography color="text.primary">
            {selectedChapter ? selectedChapter.name : ""}
          </Typography>
        </BreadcrumbRow>

        <section className="container">
          <div className="header-row">
            <h1>{selectedChapter && selectedChapter.name}</h1>
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
            {members && (
              <DataGrid
                rows={members}
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
            )}
          </div>
        </section>
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
          handleSubmit={handleSubmitEditChapter}
        >
          <EditChapter
            selectedChapter={selectedChapter}
            editChapterData={editChapterData}
            setEditChapterData={setEditChapterData}
          />
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
        <Modal
          title="Edit Member"
          // TODO: Replicate material function below for chapter members
          // handleSubmit={handleSubmitEditMaterial}
          open={openMemberEdit}
          handleClose={() => {
            setOpenMemberEdit(false)
          }}
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

export default isSuperAdmin(ChapterDetailPage)

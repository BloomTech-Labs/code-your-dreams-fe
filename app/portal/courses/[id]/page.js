"use client"

import React, { useState, useEffect } from "react"
import { Alert, IconButton, Link, Typography } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { DataGrid } from "@mui/x-data-grid"
import NoRowsOverlay from "@/components/NoRowsOverlay/NoRowsOverlay"
import BreadcrumbRow from "@/components/layout/BreadcrumbRow/BreadcrumbRow"
import Modal from "@/components/Modal/Modal"
import EditCourse from "../_components/EditCourse"
import NewMaterial from "../_components/NewMaterial"
import EditMaterial from "../_components/EditMaterial"
import styles from "./page.module.scss"
import { usePathname, useRouter } from "next/navigation"
import { useData } from "@/context/appContext"
import AxiosWithAuth from "@/utils/axiosWithAuth"

const showLinkButton = (url) => {
  return (
    <IconButton color="primary" href={`//${url}`} target="_new">
      {<OpenInNewIcon />}
    </IconButton>
  )
}

const initialState = {
  material_link: "",
  name: "",
  material_type: "",
  description: "",
}

export default function Page() {
  // Course EDIT modal
  const [openCourse, setOpenCourse] = useState(false)
  const handleOpenCourse = () => setOpenCourse(true)
  const handleCloseCourse = () => setOpenCourse(false)
  // Course Material NEW modal
  const [openMaterialNew, setOpenMaterialNew] = useState(false)
  // Selected Course Data
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [formState, setFormState] = useState(initialState)
  const handleOpenMaterialNew = () => setOpenMaterialNew(true)
  const handleCloseMaterialNew = () => setOpenMaterialNew(false)
  const { courses, course_materials, setCourses } = useData()
  const [editCourseDetails, setEditCourseDetails] = useState(null)
  const [editMaterialDetails, setEditMaterialDetails] = useState(null)
  const [openEditMaterial, setOpenEditMaterial] = useState(false)
  const axiosInstance = AxiosWithAuth()
  const router = useRouter()

  const pathname = usePathname()
  const regex = /-/g
  const newStr = pathname.slice(16).replace(regex, " ")

  const handleSubmitEditMaterial = () => {
    let editMaterialData = {
      id: editMaterialDetails.id,
      name: editMaterialDetails.name,
      description: editMaterialDetails.description,
      course_id: editMaterialDetails.course_id,
      material_link: editMaterialDetails.material_link,
      material_type_id: editMaterialDetails.material_type_id,
    }
    axiosInstance
      .post(
        `${process.env.NEXT_PUBLIC_BE_API_URL}/courseMaterials/update/${editMaterialDetails.id}`,
        editMaterialData
      )
      .then((res) => {
        setEditMaterialDetails(null)
        setOpenEditMaterial(false)
        const newSelectedMaterials = []
        selectedMaterials.map((i) => {
          if (
            i.id === res.data[0].id &&
            !selectedMaterials.includes(res.data[0])
          ) {
            newSelectedMaterials.push({ ...res.data[0] })
          } else if (i.id !== res.data[0].id) {
            newSelectedMaterials.push(i)
          }
        })
        setSelectedMaterials(newSelectedMaterials)
        router.push("/portal/courses")
      })
  }

  const showEditButton = (material) => {
    return (
      <IconButton
        color="primary"
        onClick={() => {
          setEditMaterialDetails(material)
          setOpenEditMaterial(true)
        }}
        aria-label="Edit button"
      >
        {<EditIcon />}
      </IconButton>
    )
  }

  const columns = [
    {
      field: "material_link",
      headerName: "Link",
      headerAlign: "center",
      align: "center",
      width: 100,
      renderCell: (params) => showLinkButton(params.value),
    },
    { field: "name", headerName: "Name", width: 250 },
    { field: "material_type", headerName: "Type", width: 150 },
    { field: "description", headerName: "Details", width: 450 },
    {
      field: "edit",
      headerName: "Edit",
      headerAlign: "center",
      align: "center",
      width: 100,
      renderCell: (params) => showEditButton(params.row),
    },
  ]

  const getMaterialType = (material) => {
    switch (material.material_type_id) {
      case 1:
        material.material_type = "Document"
        break
      case 2:
        material.material_type = "Presentation"
        break
      case 3:
        material.material_type = "Quiz"
        break
      case 4:
        material.material_type = "Video"
        break
      default:
        console.log("No Material Type detected")
    }
    return material
  }

  const sendNewMaterialData = (materialData) => {
    axiosInstance
      .post(
        `${process.env.NEXT_PUBLIC_BE_API_URL}/courseMaterials/create`,
        materialData
      )
      .then((res) => {
        setSelectedMaterials([
          ...selectedMaterials,
          getMaterialType(res.data[0]),
        ])
        setOpenMaterialNew(false)
        setFormState(initialState)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSubmitEditCourse = () => {
    /*
      1. When form submitted, send user back to /courses
    */
    const editCourseData = {
      id: editCourseDetails.id,
      name: editCourseDetails.name,
      description: editCourseDetails.description,
      visibility: editCourseDetails.visibility,
    }
    axiosInstance
      .post(
        `${process.env.NEXT_PUBLIC_BE_API_URL}/courses/update/${selectedCourse.id}`,
        editCourseData
      )
      .then((res) => {
        setOpenCourse(false)
        setEditCourseDetails(null)
        setCourses(
          courses.map((i) => {
            if (i.id === editCourseData.id) {
              return editCourseDetails
            } else {
              return i
            }
          })
        )
        window.location = "/portal/courses"
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSubmitForm = () => {
    const type = formState.material_type
    switch (type) {
      case "Document":
        sendNewMaterialData({
          material_link: formState.material_link,
          name: formState.name,
          description: formState.description,
          course_id: selectedCourse.id,
          material_type_id: 1,
        })
        break
      case "Presentation":
        sendNewMaterialData({
          material_link: formState.material_link,
          name: formState.name,
          description: formState.description,
          course_id: selectedCourse.id,
          material_type_id: 2,
        })
        break
      case "Quiz":
        sendNewMaterialData({
          material_link: formState.material_link,
          name: formState.name,
          description: formState.description,
          course_id: selectedCourse.id,
          material_type_id: 3,
        })
        break
      case "Video":
        sendNewMaterialData({
          material_link: formState.material_link,
          name: formState.name,
          description: formState.description,
          course_id: selectedCourse.id,
          material_type_id: 4,
        })
        break
      default:
        console.log("No Material Type detected")
    }
  }

  useEffect(() => {
    if (courses) {
      courses.some((obj) => {
        if (obj.name.toLowerCase().replace(/-/g, " ") === newStr) {
          setSelectedCourse(obj)
        }
      })
    }
    if (course_materials) {
      course_materials.some((obj) => {
        if (selectedCourse && obj.course_id === selectedCourse.id) {
          if (selectedMaterials && selectedMaterials.includes(obj)) {
            return
          } else if (selectedMaterials === null) {
            setSelectedMaterials([obj])
          } else if (selectedMaterials) {
            setSelectedMaterials([obj, ...selectedMaterials])
          }
        }
      })
    }
  }, [courses, course_materials, selectedMaterials, selectedCourse])

  const handleRowClick = (params) => {
    const { material_link, name } = params.row

    return (
      <Link underline="always" href={`//${material_link}`} target="_new">
        {name}
      </Link>
    )
  }

  return (
    selectedCourse && (
      <main className={styles.course}>
        <BreadcrumbRow>
          <Link underline="hover" color="inherit" href="/portal/courses">
            Courses
          </Link>
          <Typography color="text.primary">
            {selectedCourse ? selectedCourse.name : ""}
          </Typography>
        </BreadcrumbRow>

        {selectedCourse && selectedCourse.visibility === false ? (
          <Alert
            iconMapping={{
              warning: <VisibilityOffIcon fontSize="inherit" />,
            }}
            severity="warning"
            className="container"
          >
            This course is hidden.{" "}
            <a onClick={() => handleOpenCourse()} className={styles.alert}>
              Edit the course settings
            </a>{" "}
            to make it visible.
          </Alert>
        ) : null}

        <section className="container">
          <div className="header-row">
            <h1>{selectedCourse && selectedCourse.name}</h1>
            <IconButton
              color="primary"
              size="large"
              onClick={() => handleOpenCourse()}
              aria-label="Edit course details"
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </div>
          <p>{selectedCourse && selectedCourse.description}</p>
        </section>
        <section className="container">
          <div className="header-row">
            <h2>Materials</h2>
            <IconButton
              color="primary"
              size="large"
              onClick={() => handleOpenMaterialNew()}
              aria-label="Add a course material"
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </div>
          <div className="data-grid">
            {selectedMaterials && (
              <DataGrid
                rows={selectedMaterials}
                columns={columns.map((column) =>
                  column.field === "name"
                    ? { ...column, renderCell: handleRowClick }
                    : column
                )}
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
                aria-label="Data grid of course materials"
              />
            )}
          </div>
        </section>

        <Modal
          title="Edit Course"
          open={openCourse}
          handleClose={handleCloseCourse}
          handleSubmit={handleSubmitEditCourse}
        >
          <EditCourse
            selectedCourse={selectedCourse}
            editCourseDetails={editCourseDetails}
            setEditCourseDetails={setEditCourseDetails}
          />
        </Modal>
        <Modal
          title="Add Material"
          open={openMaterialNew}
          handleClose={handleCloseMaterialNew}
          handleSubmit={handleSubmitForm}
        >
          <NewMaterial formState={formState} setFormState={setFormState} />
        </Modal>
        <Modal
          title="Edit Material"
          handleSubmit={handleSubmitEditMaterial}
          open={openEditMaterial}
          handleClose={() => {
            setOpenEditMaterial(false)
          }}
        >
          <EditMaterial
            editMaterialDetails={editMaterialDetails}
            setEditMaterialDetails={setEditMaterialDetails}
          />
        </Modal>
      </main>
    )
  )
}

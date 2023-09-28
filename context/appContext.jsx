"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { useSession } from 'next-auth/react';
import AxiosWithAuth from "@/utils/axiosWithAuth";
import axios from "axios";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const axiosInstance = AxiosWithAuth();
    const [user_session, setUserSession] = useState(null)
    const [users, setUsers] = useState(null)
    const [chapters, setChapters] = useState(null)
    const [courses, setCourses] = useState(null)
    const [course_materials, setCourseMaterials] = useState(null)
    const [material_types, setMaterialTypes] = useState(null)
    const [course_permissions, setCoursePermissions] = useState(null)
    const { data: session, status } = useSession();

    function getChapterName(i) {
        axiosInstance
            .get(`${process.env.NEXT_PUBLIC_BE_API_URL}/chapters/${i.chapter_id}`)
            .then(res => {
                i.chapter_name = res.data.name
            })
            return i
    }

    function getMaterialDetails(i) {
        const endpoints = [
            `${process.env.NEXT_PUBLIC_BE_API_URL}/courses/${i.course_id}`,
            `${process.env.NEXT_PUBLIC_BE_API_URL}/materialTypes/${i.material_type_id}`
        ]

        axios.all(endpoints.map((endpoint) => axiosInstance.get(endpoint)))
        .then(
            axios.spread((course_name, material_type) => {
                let result = { course_name, material_type }

                i.course_name = result.course_name.data.name,
                i.material_type = result.material_type.data.material_type
            })
        )
        return i
    }

    useEffect(() => {
        let endpoints = [
            `${process.env.NEXT_PUBLIC_BE_API_URL}/users/`,
            `${process.env.NEXT_PUBLIC_BE_API_URL}/chapters/`,
            `${process.env.NEXT_PUBLIC_BE_API_URL}/courses/`,
            `${process.env.NEXT_PUBLIC_BE_API_URL}/courseMaterials/`,
            `${process.env.NEXT_PUBLIC_BE_API_URL}/materialTypes/`,
            `${process.env.NEXT_PUBLIC_BE_API_URL}/coursePermissions/`,
        ]

        if (status === 'authenticated') {
            if (user_session === null) {
                session && (setUserSession(session))
            }

            axios.all(endpoints.map((endpoint) => axiosInstance.get(endpoint)))
                .then(
                    axios.spread((users_res, chapters_res, courses_res, course_materials_res, material_types_res, course_permissions_res) => {
                        let result = {
                            users_res,
                            chapters_res,
                            courses_res,
                            course_materials_res,
                            material_types_res,
                            course_permissions_res
                        }
                        
                        if (!users) {
                            setUsers(result.users_res.data.map(i => getChapterName(i)))
                        }
                        if (!chapters) {
                            setChapters(result.chapters_res.data)
                        }
                        if (!courses) {
                            setCourses(result.courses_res.data)
                        }
                        if (!course_materials) {
                            setCourseMaterials(result.course_materials_res.data.map((i) => getMaterialDetails(i)))
                        }
                        if (!material_types) {
                            setMaterialTypes(result.material_types_res.data)
                        }
                        if (!course_permissions) {
                            setCoursePermissions(result.course_permissions_res.data)
                        }
                    })
                )

        }
    }, [session, status])

  return (
    <AppContext.Provider value={{
        user_session,
        users,
        chapters,
        courses,
        course_materials,
        material_types,
        course_permissions
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useData() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useData must be used within a Provider")
  }

  return context
}

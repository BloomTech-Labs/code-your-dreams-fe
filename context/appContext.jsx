"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { useSession } from 'next-auth/react';
import AxiosWithAuth from "@/utils/axiosWithAuth";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const axiosInstance = AxiosWithAuth();
    const initialState = {
        session: null
    }
    const [state, setState] = useState(initialState); // Our data store & data setting function, set to the value in initialState
    const { data: session } = useSession(); // Session data from 'next-auth'

    function getChapterName(i) {
        // Maps over our users, references their chapter_id, and
        // Contacts the back end for that chapter's name, applying
        // it to the user before returning it in the map function
        axiosInstance
            .get(`${process.env.NEXT_PUBLIC_BE_API_URL}/chapters/${i.chapter_id}`)
            .then(res => {
                i.chapter_name = res.data.name
            })
            return i
    }

    function getMaterialDetails(i) {
        // Same as the above function - this grabs course and
        // material_type names, adding them to each course material
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
        // An array of every basic "Get all" endpoint in the back end
        let endpoints = [
            `${process.env.NEXT_PUBLIC_BE_API_URL}/users/`,
            `${process.env.NEXT_PUBLIC_BE_API_URL}/chapters/`,
            `${process.env.NEXT_PUBLIC_BE_API_URL}/courses/`,
            `${process.env.NEXT_PUBLIC_BE_API_URL}/courseMaterials/`,
            `${process.env.NEXT_PUBLIC_BE_API_URL}/materialTypes/`,
            `${process.env.NEXT_PUBLIC_BE_API_URL}/coursePermissions/`,
        ]

        // First, grab session data, store in state
        let sessionTemp;
        // If session not already in state, or session exists and we
        // are authenticated, run our data getters
        if (state.session === null || session?.status === 'authenticated') {
            // If session not in state, store it in 'sessionTemp'
            // This prevents us from setting it if we have it, and
            // sets us up for setting it into our data store
            if (state.session === null) {
                session && (sessionTemp = session)
            }

            // 'axios.all' allows us to send requests for data to
            // each endpoint in the above array, giving us access
            // to all data returned from those queries at the same time
            // (and preventing this file from being clogged up with
            // lengthy "axios.get(endpoint).then(result => {do stuff}" lines)
            axios.all(endpoints.map((endpoint) => axiosInstance.get(endpoint)))
                .then(
                    // Spreading the results from each query, making
                    // them accessible
                    axios.spread((users, chapters, courses, course_materials, material_types, course_permissions) => {
                        let result = {
                            users,
                            chapters,
                            courses,
                            course_materials,
                            material_types,
                            course_permissions
                        }
                        
                        // Sets all data into state! We start by
                        // spreading whatever state is already there,
                        // then assign each data set to an appropriate
                        // value. Some values need further processing
                        // before they get set into state and made
                        // accessible across the app - we establish
                        // functions that can be used in JS map
                        // functions (Map functions simple go over
                        // an array, running some set of code for 
                        // each one), returning each value in the raw
                        // array with any adjustments that need to be
                        // made
                        setState({
                            ...state,
                            session: sessionTemp,
                            users: result.users.data.map(i => getChapterName(i)),
                            chapters: result.chapters.data,
                            courses: result.courses.data,
                            course_materials: result.course_materials.data.map((i) => getMaterialDetails(i)),
                            material_types: result.material_types.data,
                            course_permissions: result.course_permissions.data
                        })
                    })
                )

        }
    }, [session])

    // updateState can be imported into any file where changes
    // need to be made to the data in our data store locally.
    // Typically, if I were making a request to update or add
    // data to the database, I would also run this function
    // to add it locally - this gives users the illusion of
    // instant feedback, as data updates locally even while
    // the app still works on updating the back end
    const updateState = (newState) => {
        setState(newState)
    }

    return (
        <AppContext.Provider value={{ state, updateState }}>
            {children}
        </AppContext.Provider>
    )
}

// useData is imported wherever you need to access our data store
// - see members/page.js for an example and notes!
export function useData() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useData must be used within a Provider")
    }

    return context
}


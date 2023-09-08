"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { useSession } from 'next-auth/react';
import AxiosWithAuth from "@/utils/axiosWithAuth";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const axiosInstance = AxiosWithAuth();
    const initialState = {
        session: null
    }
    const [state, setState] = useState(initialState);
    const { data: session } = useSession();

    useEffect(() => {
        // First, grab session data, store in state
        let sessionTemp;
        if (state.session === null || session?.status === "authenticated") {
            session && (sessionTemp = session)
        }

        axiosInstance
            .get(`http://localhost:8080/users/`)
            .then(res => {
            let count = 1;
            let data = res.data.map((i) => {
                i.id = count
                count++

                axiosInstance
                .get(`http://localhost:8080/chapters/${i.chapter_id}`)
                .then(res => {
                    i.chapter_name = res.data.name
                })

                return i
            })
                setState({
                    ...state,
                    session: sessionTemp,
                    users: data
                })
            })
    }, [session])

    const updateState = (newState) => {
        setState(newState)
    }

    return (
        <AppContext.Provider value={{ state, updateState }}>
            {children}
        </AppContext.Provider>
    )
}

export function useData() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useData must be used within a Provider")
    }

    return context
}


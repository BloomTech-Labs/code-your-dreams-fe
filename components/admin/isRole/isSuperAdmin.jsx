"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { useData } from "@/context/appContext"

export default function isSuperAdmin(Component) {
  return function IsSuperAdmin(props) {
    const { current_user } = useData()
    const [isUser, setIsUser] = useState(false)

    useEffect(() => {
      if (current_user !== null) {
        setIsUser(true)
      }
    }, [current_user])

    if (current_user === null) {
      return null
    }

    if (isUser === true) {
      if (current_user.role === "super_admin") {
        return <Component {...props} />
      } else {
        return redirect("/portal/courses")
      }
    }
  }
}

"use client"

import { useEffect } from "react"
import { redirect } from "next/navigation"
import { useData } from "@/context/appContext"

async function hasSARole() {
  const { current_user } = useData()
  const data = await current_user?.role
  console.log("role: ", data)

  if (data !== "super_admin") {
    console.log("not SA")
    return null
  }
  console.log("is a SA")
  return true
}

export default function isSuperAdmin(Component) {
  return function IsAuth(props) {
    useEffect(() => {
      if (!hasSARole) {
        return redirect("/portal/courses")
      }
    }, [])

    if (!hasSARole) {
      return null
    }

    return <Component {...props} />
  }
}

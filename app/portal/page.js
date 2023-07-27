"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Page() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      redirect("/portal/courses")
    } else {
      redirect("/")
    }
  }, [session])

  return <main>Loading...</main>
}

"use client"

import { Button } from "@mui/material"

export default function CoursesButton() {
  return (
    <Button
      variant="text"
      href="/portal/courses"
      aria-label="View courses"
      aria-current="page"
      tabIndex={1}
    >
      Courses
    </Button>
  )
}

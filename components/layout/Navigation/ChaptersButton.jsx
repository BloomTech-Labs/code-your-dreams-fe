"use client"

import { Button } from "@mui/material"

export default function ChaptersButton() {
  return (
    <Button
      variant="text"
      href="/portal/chapters"
      aria-label="View chapters"
      aria-current="page"
      tabIndex={3}
    >
      Chapters
    </Button>
  )
}

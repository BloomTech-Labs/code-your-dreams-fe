"use client"

import { Button } from "@mui/material"

export default function AdminButton() {
  return (
    <Button
      variant="text"
      href="/portal/admin"
      aria-label="View admin tools"
      aria-current="page"
      tabIndex={4}
    >
      Admin
    </Button>
  )
}

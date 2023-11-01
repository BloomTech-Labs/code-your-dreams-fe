"use client"

import { Button } from "@mui/material"

export default function MembersButton() {
  return (
    <Button
      variant="text"
      href="/portal/members"
      aria-label="View members"
      aria-current="page"
      tabIndex={2}
    >
      Members
    </Button>
  )
}

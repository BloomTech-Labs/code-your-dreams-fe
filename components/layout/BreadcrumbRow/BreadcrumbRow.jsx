"use client"

import styles from "./BreadcrumbRow.module.scss"
import { Breadcrumbs } from "@mui/material"

export default function BreadcrumbRow({ children }) {
  return (
    <Breadcrumbs aria-label="breadcrumb menu" className={styles.breadcrumbs}>
      {children}
    </Breadcrumbs>
  )
}

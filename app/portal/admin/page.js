"use client"

import * as React from "react"
import styles from "./page.module.scss"
import { DataGrid } from "@mui/x-data-grid"

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "memberName", headerName: "Name", width: 250 },
  { field: "emailAddress", headerName: "Email", width: 300 },
  { field: "adminFlag", headerName: "Admin?", width: 150 },
]

const rows = [
  {
    id: 1,
    memberName: "Brianne Caplan",
    emailAddress: "brianne@codeyourdreams.org",
    adminFlag: "Yes",
  },
  {
    id: 2,
    memberName: "John Dodson",
    emailAddress: "john@codeyourdreams.org",
    adminFlag: "",
  },
]

export default function Page() {
  return (
    <main className={styles.account}>
      <section className="container">
        <h1>App Settings</h1>
        <h2>Super admin users</h2>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </section>
      <section className="container">
        <h2>Materials types</h2>
        <ul>
          <li>Document</li>
          <li>Presentation</li>
          <li>etc.</li>
        </ul>
      </section>
    </main>
  )
}

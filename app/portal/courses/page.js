"use client"

import styles from "./page.module.scss"
import { Button, IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

export default function Page() {
  return (
    <main className={styles.courses}>
      <section className="container">
        <div className="header-row">
          <h1>Courses</h1>
          <div className="add-button">
            <IconButton
              color="primary"
              size="large"
              aria-label="add"
              className="compact-button"
            >
              <AddIcon />
            </IconButton>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              aria-label="add"
              className="full-button"
            >
              Create a new course
            </Button>
          </div>
        </div>
        -Insert a paginated table here-
        <p>This is a page.</p>
      </section>
    </main>
  )
}

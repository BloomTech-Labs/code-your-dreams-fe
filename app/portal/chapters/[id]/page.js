"use client"

import styles from "./page.module.scss"
import { Button, IconButton, Link, Typography } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import BreadcrumbRow from "@/components/layout/BreadcrumbRow/BreadcrumbRow"

export default function Page() {
  {
    /* This page is restricted to only Chapter Admins */
  }

  return (
    <main className={styles.detail}>
      <aside className="TODO">
        <p>This is a chapter detail page</p>
        TODO:
        <ul>
          <li>Finish the layout of this page</li>
        </ul>
      </aside>

      <BreadcrumbRow>
        {/* TODO: Make this menu visible only to CYD users */}
        <Link underline="hover" color="inherit" href="/portal/chapters">
          Chapters
        </Link>
        <Typography color="text.primary">[Chapter_Name]</Typography>
      </BreadcrumbRow>

      <section className="container">
        <div className="header-row">
          {/* TODO: Switch title based on user (CYD vs chapter user) */}
          <h1>[Chapter Details] or [My Chapter]</h1>
          <div>
            {/* TODO: This button should only be visible to super admin users */}
            <IconButton
              color="primary"
              size="large"
              onClick={() => handleOpen()}
              aria-label="add"
              className="compact-button"
            >
              <EditIcon />
            </IconButton>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              aria-label="add"
              className="full-button"
            >
              Edit course
            </Button>
          </div>
        </div>
        <h2>Courses</h2>
        <div>Contact Code Your Dreams to get access to more courses.</div>
      </section>
      <section className="container">
        <h2>Members</h2>
        <div>List of members</div>
      </section>
    </main>
  )
}

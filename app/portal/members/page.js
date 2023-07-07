"use client"

import styles from "./page.module.scss"
import { Button, IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Page() {
  const { data: session } = useSession();
  if (!session) {
    redirect("/api/auth/signin");
  };

  return (
    <main className={styles.main}>
      <section>
        <div className="header-row">
          <h1>Members</h1>
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
              Add a new member
            </Button>
          </div>
        </div>
        <p>This is a page.</p>
      </section>
    </main>
  )
}

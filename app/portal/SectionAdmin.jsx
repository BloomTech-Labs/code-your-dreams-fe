"use client"

import { Link } from "@mui/material"
import styles from "./Sections.module.scss"

export default function Admin() {
  return (
    <section className={`container ${styles.admin}`}>
      <h2>Admin Features</h2>
      <ul>
        <li>
          <Link underline="hover" href="#">
            Member administration
          </Link>
        </li>
        {/* Global admins only */}
        <li>
          <Link underline="hover" href="#">
            Chapter administration
          </Link>
        </li>
        <li>
          <Link underline="hover" href="#">
            App Settings administration
          </Link>
        </li>
      </ul>
    </section>
  )
}

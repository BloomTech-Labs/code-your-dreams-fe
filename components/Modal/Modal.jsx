"use client"

import { Button, IconButton, Box, Modal as MuiModal } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import styles from "./Modal.module.scss"

const Modal = ({ children, title, open, handleClose }) => {
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <form className={styles.modal}>
          <div className={styles["modal-header"]}>
            <h2>{title}</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>

          {children}

          <div className={styles["modal-footer"]}>
            <Button variant="contained" onClick={handleClose}>
              Save
            </Button>
            <Button variant="text" onClick={handleClose}>
              Close without saving
            </Button>
          </div>
        </form>
      </Box>
    </MuiModal>
  )
}

export default Modal
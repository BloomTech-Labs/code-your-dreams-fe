"use client"

import { Button, IconButton, Box, Modal as MuiModal } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import styles from "./Modal.module.scss"

const Modal = ({ children, title, open, handleSubmit, handleClose }) => {
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
    >
      <Box>
        <form className={styles.modal}>
          <div className={styles["modal-header"]}>
            <div className="h3" id="modal-modal-title">
              {title}
            </div>
            <IconButton onClick={handleClose} aria-label="Close modal">
              <CloseIcon />
            </IconButton>
          </div>

          <div className={styles["modal-body"]}>{children}</div>

          <div className={styles["modal-footer"]}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              aria-label="Save changes"
            >
              Save
            </Button>
            <Button
              variant="text"
              onClick={handleClose}
              aria-label="Close without saving"
            >
              Close without saving
            </Button>
          </div>
        </form>
      </Box>
    </MuiModal>
  )
}

export default Modal

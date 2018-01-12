import React                         from 'react'
import { Modal,
         DropdownButton,
         Button,
         MenuItem,
         FormControl,
         ControlLabel,
         Glyphicon
       }                              from 'react-bootstrap'

import '../../../stylesheets/flex.css'
import '../../../stylesheets/modal.css'

const ModalForm = ({toggle, title, dispatch, children}) => {
  return(
      <Modal show={toggle}>
        <Modal.Header closeButton onClick={dispatch}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
  )
}

export default ModalForm

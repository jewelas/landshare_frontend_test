import React from 'react';
import { Modal } from 'react-bootstrap';

const CustomModalComponentHeader = ({ className = '', children }) => {
  return (
    <div className={`custom-modal-header ${className}`}>{children}</div>
  )
}

const CustomModalComponentBody = ({ className = '', children }) => {
  return (
    <div className={`custom-modal-body ${className}`}>{children}</div>
  )
}

const CustomModalComponentFooter = ({ className = '', children }) => {
  return (
    <div className={`custom-modal-footer ${className}`}>{children}</div>
  )
}

/**
* modalOptions (same as a react bootstrap modal)
* Mainly useed options
* key, valueType, defaultValue, description
* `animation` |	boolean | true | Open and close the Modal with a slide and fade animation.
* `centered` | boolean | vertically | center the Dialog in the window
* `size` | `'sm' | 'lg' | 'xl'` | | Render a large, extra large or small modal. When not provided, the modal is rendered with medium (default) size.
**/

const CustomModalComponent = ({ modalOptions, modalShow, setModalShow, children }) => {
  return (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      {...modalOptions}
    >
      {children}
    </Modal>
  );
};

CustomModalComponent.Header = CustomModalComponentHeader
CustomModalComponent.Body = CustomModalComponentBody
CustomModalComponent.Footer = CustomModalComponentFooter

export const CustomModal = CustomModalComponent;

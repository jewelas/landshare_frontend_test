import { React } from 'react';
import { Modal } from './';
import Vector from '../../../assets/img/icons/Vector.svg';
import Ok from '../../../assets/img/icons/Ok.svg';
import './Modal.css'

const AlertModalComponent = ({ show, setShow, type, message }) => {
  return (
    <Modal
      modalOptions={{
        centered: true,
        size: 'sm'
      }}
      modalShow={show}
      setModalShow={setShow}
    >
      <Modal.Header className={`modal-header-content position-relative py-2 d-flex justify-content-center align-items-center w-100 status-${type}`}>
        <img 
          className="position-absolute alert-image"
          src={type == 'error' ? Vector : (type == 'success' ? Ok : null)} 
          alt="Status" 
        />
        <span>{type == 'error' ? 'ERROR' : (type == 'success' ? 'SUCCESS' : '')}</span>
      </Modal.Header>
      <Modal.Body>
        <div className='modal-body-content d-flex justify-content-center py-4 px-2 text-center'>
          {message}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className={`modal-footer-content pb-4 d-flex justify-content-center status-${type}`}>
          <button className='btn btn-status' onClick={() => setShow(!show)}>OK</button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export const AlertModal = AlertModalComponent

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Modal } from '../common/modal';

export default function Login ({ loginShow, setLoginShow, address, onSubmit }) {
  const [walletAddress, setWalletAddress] = useState(address);
  const [password, setPassword] = useState("");
  const [walletError, setWalletError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!walletAddress || walletAddress == "Not Connected") {
      setWalletError(true);
    } else {
      setWalletError(false);
    }
    if (!password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    
    if ((walletAddress && walletAddress != "Not Connected") && password) {
      onSubmit(walletAddress, password);
    }
  }

  return (
    <Modal
      modalOptions={{
        centered: true,
        size: 'md'
      }}
      modalShow={loginShow}
      setModalShow={setLoginShow}
    >
      <Modal.Header className='modal-header-content p-3 heading'>
        Login
      </Modal.Header>
      <Modal.Body className='px-3 mb-3'>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Token address</Form.Label>
            <Form.Control 
              type="text"
              value={walletAddress}
              disabled
            />
            {walletError && (
              <Form.Text className="text-danger">
                You should connect your wallet before login.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <Form.Text className="text-danger">
                This field is a required.
              </Form.Text>
            )}
          </Form.Group>

          <div 
            className="navbar-btns align-items-center d-flex my-auto ms-0 justify-content-end"
          >
            <button
              className="btn nav-btn d-flex flex-column justify-content-center align-items-center"
              onClick={handleLogin}
            >
              <span className="fs-16">Login</span>
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

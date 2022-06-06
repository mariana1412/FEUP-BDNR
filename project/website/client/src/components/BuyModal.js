import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

export default function BuyModal({ show, setShow, product }) {
  const [quantity, setQuantity] = React.useState(1);
  const [error, setError] = React.useState('');
  const [username, setUsername] = React.useState('');

  const handleClose = () => setShow(false);

  const buyProduct = () => {
    const id = product.id.replace('products/', '');
    axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/product/${id}/buy`, {
      productId: product.id,
      quantity,
      username,
    })
      .then(() => {
        console.log('success');
        setShow(false);
        setError('');
      })
      .catch((err) => {
        setError(err.request.response);
      });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Buy Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
      </Modal.Body>
      {error !== '' && <div className="text-danger">{error}</div>}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={buyProduct}>Buy</Button>
      </Modal.Footer>
    </Modal>
  );
}

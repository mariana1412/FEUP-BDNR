import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Row } from 'react-bootstrap';
import PurchaseList from '../components/PurchaseList';

export default function PurchasesPage() {
  const [name, setName] = useState('');
  const [type, setType] = useState('client');
  const [purchases, setPurchases] = useState([]);

  const getPurchases = () => {
    console.log(name, type);
    axios.get('http://localhost:3001/purchases/history', { type, name }).then(({ data }) => {
      setPurchases(data);
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="PurchasesPage mx-4">
      <Row className="mb-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>I am a</Form.Label>
            <Form.Select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="client">Client</option>
              <option value="shop">Shop</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Button onClick={getPurchases}>
            Go
          </Button>
        </Form>
      </Row>
      <Row>
        <PurchaseList purchases={purchases} />
      </Row>
    </div>
  );
}

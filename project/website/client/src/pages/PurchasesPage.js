/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Row } from 'react-bootstrap';
import { Pagination } from '@mui/material';
import PurchaseList from '../components/PurchaseList';

const perPage = 10;

export default function PurchasesPage() {
  const [name, setName] = useState('');
  const [type, setType] = useState('client');
  const [purchases, setPurchases] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const getPurchases = (newPage) => {
    setPage(newPage);
    axios.get('http://localhost:3001/purchases/history', {
      params: {
        type, name, page: newPage, perPage,
      },
    }).then(({ data }) => {
      setPurchases(data.data);
      setTotalResults(data.totalResults);
    }).catch((err) => {
      console.log(err);
    });
  };

  const getTotalPages = () => Math.ceil(totalResults / perPage);

  return (
    <div className="PurchasesPage mx-4">
      <Row className="mb-3">
        <div>
          <Form.Group className="mb-3">
            <Form.Label>I am a</Form.Label>
            <Form.Select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="client">Client</option>
              <option value="store">Store</option>
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
          <Button className="mb-3" onClick={() => getPurchases(1)}>
            Go
          </Button>
          { totalResults > 0
            ? (
              <Pagination
                count={getTotalPages()}
                page={page}
                onChange={(event, value) => getPurchases(value)}
                showFirstButton
                showLastButton
                shape="rounded"
              />
            )
            : null}
        </div>
      </Row>
      <Row>
        <PurchaseList purchases={purchases} />
      </Row>
    </div>
  );
}

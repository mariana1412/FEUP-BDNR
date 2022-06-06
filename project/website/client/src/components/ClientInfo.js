import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import {
  Row, Col, Button, Form,
} from 'react-bootstrap';

import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default function ClientInfo({ client, getClient }) {
  const birthdate = new Date(client.birthdate);
  const joined = new Date(client.joined);
  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState(client.name);
  const [editBirthdate, setEditBirthdate] = useState(new Date(client.birthdate));

  const saveEdits = () => {
    axios.post('http://localhost:3001/clients', {
      id: client.id,
      newName: editName,
      newDate: editBirthdate.toISOString(),
    }).then(() => {
      getClient();
      setEdit(false);
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Row>
      <Col className="w-25">
        <Row>
          <Col>
            <strong>Name</strong>
          </Col>
          <Col>
            {client.name}
          </Col>
        </Row>
        <Row>
          <Col>
            <strong>Username</strong>
          </Col>
          <Col>
            {client.username}
          </Col>
        </Row>
        <Row>
          <Col>
            <strong>Birthdate</strong>
          </Col>
          <Col>
            {birthdate.getDate()}/{birthdate.getMonth() + 1}/{birthdate.getFullYear()}
          </Col>
        </Row>
        <Row>
          <Col>
            <strong>Joined on</strong>
          </Col>
          <Col>
            {joined.getDate()}/{joined.getMonth() + 1}/{joined.getFullYear()}
          </Col>
        </Row>
      </Col>
      { edit
        ? (
          <Col>
            <Row>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="birthdate">
                <Form.Label>Birthdate</Form.Label>
                <DatePicker
                  selected={editBirthdate}
                  onChange={(date) => setEditBirthdate(date)}
                />
              </Form.Group>
            </Row>
            <Row className="w-50">
              <Col>
                <Button variant="success" onClick={saveEdits}>
                  Save
                </Button>
              </Col>
              <Col>
                <Button variant="secondary" onClick={() => setEdit(false)}>
                  Cancel
                </Button>
              </Col>
            </Row>

          </Col>
        )
        : (
          <Col className="w-25">
            <Button variant="danger" onClick={() => setEdit(true)}>
              Edit
            </Button>
          </Col>
        )}
    </Row>
  );
}

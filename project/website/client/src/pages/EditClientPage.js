import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ClientInfo from '../components/ClientInfo';

export default function EditClientPage() {
  const [username, setUsername] = useState('');
  const [client, setClient] = useState(null);

  const getClient = () => {
    console.log(username);
    axios.get('http://localhost:3001/clients', {
      params: {
        username,
      },
    }).then(({ data }) => {
      setClient(data);
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="EditClientPage mx-4">
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Button className="mb-3" onClick={getClient}>
        Go
      </Button>
      {client != null
        ? <ClientInfo client={client} getClient={getClient} />
        : null }
    </div>
  );
}

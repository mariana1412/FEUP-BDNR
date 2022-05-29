import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

export default function PurchasesPage() {
  const [searchParams] = useSearchParams();

  return (
    <div className="PurchasesPage mx-4">
      <Row className="mb-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>I am a</Form.Label>
            <Form.Select name="type">
              <option value="client">Client</option>
              <option value="shop">Shop</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" />
          </Form.Group>
          <Button type="submit">
            Go
          </Button>
        </Form>
      </Row>
      <Row>
        {
          searchParams.get('type') === null ? null
            : (
              <div>
                { `Essa ${searchParams.get('type')} comprou bué `}
              </div>
            )
        }
      </Row>
    </div>
  );
}

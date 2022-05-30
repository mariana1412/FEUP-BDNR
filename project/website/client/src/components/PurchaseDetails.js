import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default function PurchaseDetails({ purchase }) {
  const date = new Date(purchase.date);

  return (
    <div className="mb-4">
      <h3>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</h3>
      <Row className="font-weight-bold">
        <Col><strong>Product</strong></Col>
        <Col><strong>Price</strong></Col>
        <Col><strong>Store</strong></Col>
      </Row>
      {
        purchase.products.map((product) => (
          <Row>
            <Col>
              {product.name}
            </Col>
            <Col>
              {parseFloat(product.price).toFixed(2)}
            </Col>
            <Col>
              {product['@metadata']['@collection']}
            </Col>
          </Row>
        ))
      }
      <strong>Total: {purchase.total}</strong>
    </div>
  );
}

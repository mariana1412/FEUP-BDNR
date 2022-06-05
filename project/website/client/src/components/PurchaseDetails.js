import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default function PurchaseDetails({ purchase }) {
  const date = new Date(purchase.orderDate);

  return (
    <div className="mb-4">
      <h3>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</h3>
      <Row className="font-weight-bold">
        <Col><strong>Product</strong></Col>
        <Col><strong>Store</strong></Col>
        <Col><strong>Unit Price</strong></Col>
        <Col><strong>Quantity</strong></Col>
        <Col><strong>Total</strong></Col>
      </Row>
      {
        purchase.lines.map((product) => (
          <Row key={product.productId}>
            <Col className="text-truncate">
              {product.productName}
            </Col>
            <Col>
              {product.store}
            </Col>
            <Col>
              {parseFloat(product.unitPrice).toFixed(2)}
            </Col>
            <Col>
              {product.quantity}
            </Col>
            <Col>
              {parseFloat(product.price).toFixed(2)}
            </Col>
          </Row>
        ))
      }
      <strong>Total: {purchase.total}</strong>
    </div>
  );
}

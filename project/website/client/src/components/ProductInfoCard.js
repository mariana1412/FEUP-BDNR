import React from 'react';
import { Row } from 'react-bootstrap';

export default function BookInfoCard({
  brand, price, store, stock,
}) {
  return (
    <Row
      className="mt-5 px-5 py-5 info-card"
      style={{ width: '20rem' }}
    >
      <h4 className="pb-1">
        {price} €
      </h4>
      <p>
        <b>Brand: </b> {brand}
      </p>
      <p>
        <b>Store: </b> {store}
      </p>
      <p>
        <b>Stock: </b> {stock}
      </p>
    </Row>
  );
}

import * as React from 'react';
import {
  Card, CardContent, Rating,
} from '@mui/material';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Product({ product }) {
  const navigate = useNavigate();

  const getCategory = (categories) => {
    if (Array.isArray(categories)) return categories.join(', ');
    if (categories) return categories;
    return 'none';
  };

  return (
    <Card variant="outlined" className="product-card" onClick={() => navigate(`/product/${product.id.replace('products/', '')}`)}>
      <CardContent>
        <h5 className="product-card-title">
          {product.name}
        </h5>
        <p className="product-card-description">{product.description}</p>
        <p>
          <b>Store: </b>
          {product.store}
        </p>
        <p>
          <b>Stock: </b>
          {product.stock}
        </p>
        <p className="product-card-category">
          <strong>Categories: </strong>
          {getCategory(product.category)}
        </p>
        <Row className="d-flex justify-content-center">
          <Col>
            <Rating name="half-rating-read" defaultValue={product.rating} precision={0.1} readOnly />
          </Col>
          <Col sm={5} className="d-flex align-items-end">
            <span className="product-card-price">
              {Number(product.price).toFixed(2)}
              €
            </span>
          </Col>
        </Row>
      </CardContent>
    </Card>
  );
}

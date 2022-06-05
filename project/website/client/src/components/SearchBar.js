import React from 'react';
import {
  Row, Col, Form, Button,
} from 'react-bootstrap';

export default function SearchBar({ text, setText }) {
  return (
    <Row className="searchbar-div d-flex align-items-center align-content-center justify-content-center g-0">
      <Col sm={3} className="text-center">
        <span>What are you looking for?</span>
      </Col>
      <Col>
        <Form.Control
          type="text"
          className="search-bar"
          placeholder="Search"
          onChange={(val) => setText(val)}
          value={text}
        />
      </Col>
      <Col sm={1} className="d-flex justify-content-center">
        <Button className="main-button">Search</Button>
      </Col>
    </Row>
  );
}

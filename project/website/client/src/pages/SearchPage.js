import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
// import FilterBox from '../components/FilterBox';

export default function SearchPage() {
  // const [products, setProducts] = useState([]);
  const [text, setText] = useState('');

  return (
    <div className="search-page">
      <SearchBar text={text} setText={setText} />
      <Row className="mt-4">
        <Col sm={4} />
        <Col>
          <p>Olá</p>
        </Col>
      </Row>
    </div>
  );
}

/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Pagination, Box, CircularProgress } from '@mui/material';
import SearchBar from '../components/SearchBar';
import FilterBox from '../components/FilterBox';
import Product from '../components/Product';

const perPage = 21;
export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const [resultsNumber, setResultsNumber] = useState(0);
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    rating: [0, 5],
    price: [0, 600000],
    stock: [0, 1000],
    stores: [],
  });

  const updateFilters = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  useEffect(() => {
    setPage(1);
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/product`, { params: { page, perPage } })
      .then(({ data }) => {
        setProducts(data.data);
        setResultsNumber(data.totalResults);

        const storesAux = [];

        data.stores.forEach((store) => {
          storesAux.push({ value: store.range, count: store.count });
        });

        setStores(storesAux);
        setLoading(false);
      })
      .catch(() => setError(true));
  }, []);

  const getProducts = (newPage) => {
    setPage(newPage);
    setError(false);
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/product/search`, {
      params: {
        category: filters.category,
        rating: filters.rating,
        price: filters.price,
        stock: filters.stock,
        stores: filters.stores,
        text,
        page: newPage - 1,
        perPage,
      },
    }).then(({ data }) => {
      setResultsNumber(data.totalResults);
      setProducts(data.data);
      setLoading(false);
    }).catch(() => {
      setError(true);
      setLoading(false);
    });
  };

  const getTotalPages = () => Math.ceil(resultsNumber / perPage);

  return (
    <div className="search-page">
      <SearchBar text={text} setText={setText} action={() => getProducts(1)} />
      <Row className="mt-4">
        <Col sm={3}>
          <FilterBox
            title="price"
            filterType="number"
            options={[
              { value: 0, label: '0€' },
              { value: 600000, label: '600000€' },
            ]}
            step={500}
            filters={filters.price}
            setFilters={updateFilters}
          />
          <FilterBox
            title="rating"
            filterType="number"
            options={[
              { value: 0, label: '0' },
              { value: 5, label: '5' },
            ]}
            step={0.1}
            filters={filters.rating}
            setFilters={updateFilters}
          />
          <FilterBox
            title="stock"
            filterType="number"
            options={[
              { value: 0, label: '0' },
              { value: 1000, label: '1000' },
            ]}
            step={10}
            filters={filters.stock}
            setFilters={updateFilters}
          />
          <FilterBox
            title="store"
            filterType="checkbox"
            options={stores}
            step={10}
            filters={filters.stores}
            setFilters={updateFilters}
          />
        </Col>
        <Col>
          <Row className="d-flex align-items-center mb-2 mt-0 pt-0">
            <Col sm={2}>
              <span>
                {' '}
                {resultsNumber}
                {' '}
                results
                {' '}
              </span>
            </Col>
            <Col className="d-flex justify-content-end">
              {resultsNumber !== 0 && (
              <Pagination
                count={getTotalPages()}
                page={page}
                onChange={(event, value) => getProducts(value)}
                showFirstButton
                showLastButton
                shape="rounded"
              />
              )}
            </Col>
          </Row>
          {loading
            ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress color="inherit" />
              </Box>
            )
            : error ? (
              <p>Something went wrong</p>
            )
              : (
                <Row>
                  {products.map((product) => (
                    <Col key={product.id} lg={4} sm={6} className="mb-4">
                      <Product product={product} />
                    </Col>
                  ))}
                </Row>
              )}
        </Col>
      </Row>
    </div>
  );
}

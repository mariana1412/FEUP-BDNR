/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import {
  Rating, Divider, Box, CircularProgress,
} from '@mui/material';
import ProductInfoCard from '../components/ProductInfoCard';
import ReviewCard from '../components/ReviewCard';
import Product from '../components/Product';
import BuyModal from '../components/BuyModal';

export default function ProductPage() {
  const { store, sid } = useParams();
  const [product, setProduct] = useState(null);
  const [fullDesc, setFullDesc] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [large, setLarge] = useState(false);
  const [morelikethis, setMorelikethis] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}/product/${store}/${sid}`)
      .then(({ data }) => {
        setProduct(data);
        setLarge(data.description.length > 740);
      })
      .catch((err) => {
        setError(err);
      });
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_SERVER}/product/${store}/${sid}/morelikethis`,
      )
      .then(({ data }) => {
        setMorelikethis(data);
      })
      .catch((err) => {
        setError(err);
      });
  }, [store, sid]);

  useEffect(() => {
    if (product && morelikethis) setLoading(false);
  }, [product, morelikethis]);

  const getCategories = () => {
    const categories = product.category;
    if (categories === null || categories.length === 0) return 'none';
    let category = categories.join(' #');
    category = category.replace(/\s+/g, ' ').trim();
    return category;
  };

  if (error !== '') {
    return <div>{error}</div>;
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <div className="product-page">
      <Row className="g-0">
        <Col sm={4} className=" justify-content-center">
          <Row>
            <img
              src={product.image}
              alt=""
              style={{ width: '20rem', height: '25rem' }}
            />
          </Row>
          <ProductInfoCard
            brand={product.brand}
            price={product.price}
            store={product.store}
            stock={product.stock}
          />
        </Col>
        <Col>
          <h2 className="product-title">{product.name}</h2>
          {product.category && product.category.length > 0 && <h6 className="product-categories">#{getCategories()}</h6>}
          {!large ? (
            <p className="mt-4">{product.description === 'nan' ? 'No description available.' : product.description}</p>
          ) : (
            <div className="mt-4">
              {fullDesc ? (
                <p>
                  {product.description}
                  <a className="more" onClick={() => setFullDesc(!fullDesc)}>
                    {' '}
                    see less...
                  </a>
                </p>
              ) : (
                <p>
                  {product.description.substr(0, 740)}
                  <a className="more" onClick={() => setFullDesc(true)}>
                    {' '}
                    see more...
                  </a>
                </p>
              )}
            </div>
          )}

          <Divider className="my-4" />
          <Row className="d-flex justify-content-center align-items-center mb-3">
            <Col className="d-flex justify-content-start">
              <div className="justify-content-center d-flex">
                <Rating
                  name="half-rating-read"
                  defaultValue={Number(product.rating)}
                  precision={0.1}
                  readOnly
                />
                <span className="rating">{product.rating}</span>
              </div>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button onClick={() => setOpenModal(true)}>Buy</Button>
            </Col>
          </Row>

          {!product.reviews || product.reviews.length === 0 ? (
            <Row>
              <p>No reviews yet</p>
            </Row>
          )
            : (product.reviews.map((item, index) => (
              <ReviewCard key={index} review={item} />
            )))}
        </Col>
      </Row>
      <Divider className="my-4" />
      <h4>More like this</h4>
      {!morelikethis || morelikethis.length === 0 ? (
        <p>There is nothing to recommend!</p>
      ) : (
        <Row>
          {morelikethis.map((prod) => (
            <Col key={prod.id} lg={3} className="mb-4">
              <Product product={prod} />
            </Col>
          ))}
        </Row>
      )}
      <BuyModal show={openModal} setShow={setOpenModal} product={product} />
    </div>
  );
}

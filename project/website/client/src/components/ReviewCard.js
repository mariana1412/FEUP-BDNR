/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Rating } from '@mui/material';

export default function ReviewCard({ review }) {
  const smallText = review.body.substr(0, 330);
  const [fullReview, setFullReview] = useState(false);

  const large = review.body.length > 330;

  const seeMoreReview = () => {
    setFullReview(true);
  };

  const seeLessReview = () => {
    setFullReview(false);
  };

  return (
    <Row className="review-card">
      <Row>
        <Col>
          <p>
            by <em>{review.author}</em>
          </p>
        </Col>
        <Col className="d-flex justify-content-center">
          <p>{review.date}</p>
        </Col>
        <Col className="d-flex justify-content-end">
          <Rating
            name="half-rating-read"
            defaultValue={Number(review.rating)}
            precision={0.1}
            readOnly
          />
        </Col>
      </Row>
      <div className={`mt-2 ${fullReview ? 'd-none' : 'd-flex'} `}>
        <p>
          {smallText}{' '}
          {large && (
            <a className="more" onClick={seeMoreReview}>
              {' '}
              see more...
            </a>
          )}
        </p>
      </div>
      {large && (
        <div className={`mt-2  ${fullReview ? 'd-flex' : 'd-none'} `}>
          <p>
            {review.body}
            <a className="more" onClick={seeLessReview}>
              {' '}
              see less...
            </a>
          </p>
        </div>
      )}
    </Row>
  );
}

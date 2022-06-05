# Setup

## Install dependencies
```
npm ci
```

## Run
```
npm run dev
```

# Endpoints Documentation

To access the server, use the following URL:

```
http://localhost:3001
```	

## Products

### `GET` /product

Get all products with pagination.
- Pagination is done by specifying the page number and the number of items per page.
- Possible responses:
  - `200`: Success - Returns the products;
  - `400`: Invalid page number or items per page.
- Receives the following arguments:
    - page: the page to get (starts at 0);
    - perPage: the amount of groups per page.
```
{
  "page": Number required,
  "perPage": Number required
} 
```

### `GET` /product/:id
Get a product by id.
- Needs the id of the product to get.
- Possible responses:
  - `200`: Success - Returns the product;
  - `404`: Product not found.

### `GET` /product/search
Search for products with pagination.
- Pagination is done by specifying the page number and the number of items per page.
- Possible responses:
  - `200`: Success - Returns the products;
  - `400`: Invalid page number or items per page.
- Receives the following arguments:
    - page: the page to get (starts at 0);
    - perPage: the amount of products per page;
    - text: the text to search for;
    - category: the categories to search for;
    - price: the price range to search for;
    - rating: the rating range to search for;
    - stock: the stock range to search for.
```
{
  "page": Number required,
  "perPage": Number required,
  "text": String,
  "store": String[],
  "category": String[],
  "rating": Number[],
  "stocks": Number[],
  "price": Number[]
} 
```
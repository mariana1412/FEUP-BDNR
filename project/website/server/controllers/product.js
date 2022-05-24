const { products } = require("../config");

async function getProducts(req, res) {
  let {page, perPage} = req.body;
  page = parseInt(page);
  perPage = parseInt(perPage);
  if (isNaN(page) || isNaN(perPage)) return res.status(400).send("Both page and perPage are required and need to be numbers.")
  const session = products.openSession();
  const result = await session.query(products).skip(page).take(perPage).all();
  return res.status(200).send(result);
}

module.exports = {
  getProducts,
};

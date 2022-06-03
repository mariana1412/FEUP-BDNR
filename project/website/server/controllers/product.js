const { store } = require("../config");

async function getProducts(req, res) {
  let {page, perPage} = req.body;
  page = parseInt(page);
  perPage = parseInt(perPage);
  if (isNaN(page) || isNaN(perPage)) return res.status(400).send("Both page and perPage are required and need to be numbers.")
  const session = store.openSession();
  const result = await session.query({ collection: 'Products' }).skip(page).take(perPage).all();
  return res.status(200).send(result);
}

async function getProduct(req, res) {
  const {id} = req.params;
  const session = products.openSession();
  const result = await session.load(id);
  if(result === null) return res.status(404).send(`Product ${id} not found.`);
  return res.status(200).send(result);
}

module.exports = {
  getProducts,
  getProduct
};

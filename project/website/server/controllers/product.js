const { store } = require("../config");
const { Facet } = require("ravendb");

async function getProducts(req, res) {
  let { page, perPage } = req.query;
  page = parseInt(page);
  perPage = parseInt(perPage);
  if (isNaN(page) || isNaN(perPage))
    return res
      .status(400)
      .send("Both page and perPage are required and need to be numbers.");

  const facet = new Facet();
  facet.fieldName = "store";

  const session = store.openSession();

  const facetValues = await session
    .query({ indexName: "products/search" })
    .aggregateBy(facet)
    .execute();

  const result = await session
    .query({ collection: "Products" })
    .statistics((s) => (stats = s))
    .skip(page * perPage)
    .take(perPage)
    .all();
  return res
    .status(200)
    .send({
      data: result,
      totalResults: stats.totalResults,
      stores: facetValues.store.values,
    });
}

async function getProduct(req, res) {
  const { id } = req.params;
  const session = store.openSession();
  const result = await session.load(id);
  if (result === null) return res.status(404).send(`Product ${id} not found.`);
  return res.status(200).send(result);
}

async function searchProducts(req, res) {
  let { text, category, rating, stock, price, stores } = req.query;

  let { page, perPage } = req.query;
  page = parseInt(page);
  perPage = parseInt(perPage);
  if (isNaN(page) || isNaN(perPage))
    return res
      .status(400)
      .send("Both page and perPage are required and need to be numbers.");

  let alreadyCond = false;

  const session = store.openSession();
  let query = "from index 'products/search'\n";

  if (text && text !== "") {
    alreadyCond = true;
    query += `where (boost(search(exactName, "${text}"), 10) or boost(search(name, "${text}"), 5) or search(body, "${text}"))\n`;
  }

  if (stock) {
    if (alreadyCond) query += "and ";
    else query += "where ";
    query += `stock between ${stock[0]} and ${stock[1]}\n`;
    alreadyCond = true;
  }

  if (category && category.length > 0) {
    category = category.replace("[", "(").replace("]", ")");
    if (alreadyCond) query += "and ";
    else query += "where ";
    query += `category all in ${category}\n`;
    alreadyCond = true;
  }

  if (rating) {
    if (alreadyCond) query += "and ";
    else query += "where ";
    query += `rating between ${rating[0]} and ${rating[1]}\n`;
    alreadyCond = true;
  }

  if (price) {
    if (alreadyCond) query += "and ";
    else query += "where ";
    query += `price between ${price[0]} and ${price[1]}\n`;
    alreadyCond = true;
  }

  if (stores) {
    let storesAux = "(";
    stores.forEach((store) => {
      storesAux += `"${store}", `;
    });
    storesAux = storesAux.substring(0, storesAux.length - 2) + ')';
    if (alreadyCond) query += "and ";
    else query += "where ";
    query += `store in ${storesAux}\n`;
  }

  const result = await session.advanced
    .rawQuery(query)
    .statistics((s) => (stats = s))
    .skip(page * perPage)
    .take(perPage)
    .all();

  return res
    .status(200)
    .send({ data: result, totalResults: stats.totalResults });
}

module.exports = {
  getProducts,
  getProduct,
  searchProducts,
};

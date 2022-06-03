const { products } = require("../config");

async function getProducts(req, res) {
  let { page, perPage } = req.query;
  page = parseInt(page);
  perPage = parseInt(perPage);
  if (isNaN(page) || isNaN(perPage))
    return res
      .status(400)
      .send("Both page and perPage are required and need to be numbers.");
  const session = products.openSession();
  const result = await session.query(products).statistics(s => stats = s).skip(page).take(perPage).all();
  return res.status(200).send({data: result, totalResults: stats.totalResults});
}

async function getProduct(req, res) {
  const { id } = req.params;
  const session = products.openSession();
  const result = await session.load(id);
  if (result === null) return res.status(404).send(`Product ${id} not found.`);
  return res.status(200).send(result);
}

function stringToList(list) {
  if (!list) return [];
  return list.replace("[", "").replace("]", "").split(",");
}

async function searchProducts(req, res) {
  let { text, category, rating, stock, price } = req.query;

  let { page, perPage } = req.query;
  page = parseInt(page);
  perPage = parseInt(perPage);
  if (isNaN(page) || isNaN(perPage))
    return res
      .status(400)
      .send("Both page and perPage are required and need to be numbers.");

  let alreadyCond = false;

  const session = products.openSession();
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

  if (category) {
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
  }

  const result = await session.advanced
    .rawQuery(query)
    .statistics(s => stats = s)
    .skip(page)
    .take(perPage)
    .all();

  return res.status(200).send({data: result, totalResults: stats.totalResults});
}

module.exports = {
  getProducts,
  getProduct,
  searchProducts,
};

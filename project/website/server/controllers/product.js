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

  const storeFacet = new Facet();
  storeFacet.fieldName = "store";

  const categoryFacet = new Facet();
  categoryFacet.fieldName = "category";

  const session = store.openSession();

  const storeFacetValues = await session
    .query({ indexName: "products/search" })
    .aggregateBy(storeFacet)
    .execute();

  const categoryFacetValues = await session
    .query({ indexName: "products/search" })
    .aggregateBy(categoryFacet)
    .execute();

  const result = await session
    .query({ collection: "Products" })
    .statistics((s) => (stats = s))
    .skip(page * perPage)
    .take(perPage)
    .all();

  return res.status(200).send({
    data: result,
    totalResults: stats.totalResults,
    stores: storeFacetValues.store.values,
    categories: categoryFacetValues.category.values,
  });
}

async function getProduct(req, res) {
  const { storeName, sid } = req.params;
  const session = store.openSession();
  const result = await session.load(`products/${storeName}/${sid}`);
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
    query += `where (boost(search(exactName, "${text}"), 10) or boost(search(name, "${text}"), 5) or search(description, "${text}"))\n`;
  }

  if (stock) {
    if (alreadyCond) query += "and ";
    else query += "where ";
    query += `stock between ${stock[0]} and ${stock[1]}\n`;
    alreadyCond = true;
  }

  if (category && category.length > 0) {
    let categoryAux = "(";
    category.forEach((store) => {
      categoryAux += `"${store}", `;
    });
    categoryAux = categoryAux.substring(0, categoryAux.length - 2) + ")";
    if (alreadyCond) query += "and ";
    else query += "where ";
    query += `category all in ${categoryAux}\n`;
    alreadyCond = true;
  }

  if (rating) {
    if (alreadyCond) query += "and ";
    else query += "where ";
    query += `rating between ${Number(rating[0]).toFixed(1)} and ${Number(
      rating[1]
    ).toFixed(1)}\n`;
    alreadyCond = true;
  }

  if (price) {
    if (alreadyCond) query += "and ";
    else query += "where ";
    query += `price between ${Number(price[0]).toFixed(2)} and ${Number(
      price[1]
    ).toFixed(2)}\n`;
    alreadyCond = true;
  }

  if (stores) {
    let storesAux = "(";
    stores.forEach((store) => {
      storesAux += `"${store}", `;
    });
    storesAux = storesAux.substring(0, storesAux.length - 2) + ")";
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

  query += "select facet(store)";
  const facet = await session.advanced.rawQuery(query).executeAggregation();

  query = query.replace("select facet(store)", "select facet(category)");
  const categoryFacet = await session.advanced
    .rawQuery(query)
    .executeAggregation();

  return res
    .status(200)
    .send({
      data: result,
      totalResults: stats.totalResults,
      stores: facet.store.values,
      categories: categoryFacet.category.values,
    });
}

async function getMoreLikeThis(req, res) {
  const { storeName, sid } = req.params;

  const options = {
    fields: ["category"],
  };

  const session = store.openSession();
  const result = await session
    .query({ indexName: "products/morelikethis" })
    .moreLikeThis((builder) =>
      builder
        .usingDocument((x) =>
          x.whereEquals("id()", `products/${storeName}/${sid}`)
        )
        .withOptions(options)
    )
    .take(6)
    .all();

  return res.status(200).send(result);
}

module.exports = {
  getProducts,
  getProduct,
  searchProducts,
  getMoreLikeThis,
};

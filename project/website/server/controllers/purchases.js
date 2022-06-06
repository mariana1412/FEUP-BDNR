const { store } = require("../config");

async function getHistory(req, res) {
  const { name, type } = req.query;
  const perPage = parseInt(req.query.perPage);
  const page = (parseInt(req.query.page) - 1) * perPage;

  console.log("Recived getHistory request", req.query);

  if (type === "client") {
    const session = store.openSession();

    try {
      const query = session
        .query({ indexName: "purchasesByUsername" })
        .whereEquals("username", name)
        .statistics((s) => (stats = s))
        .orderByDescending("orderDate");

      const results = await query.skip(page).take(perPage).all();

      return res
        .status(200)
        .send({ data: results, totalResults: stats.totalResults });
    } catch (e) {
      console.log(e);
      return res.status(500).send("Error in clients query");
    }
  } else if (type === "store") {
    const session = store.openSession();

    try {
      const query = session
        .query({ indexName: "purchasesLinesByStore" })
        .whereEquals("store", name)
        .statistics((s) => (stats = s))
        .orderByDescending("orderDate");

      const results = await query.skip(page).take(perPage).all();

      return res
        .status(200)
        .send({ data: results, totalResults: stats.totalResults });
    } catch (e) {
      console.log(e);
      return res.status(500).send("Error in store query");
    }
  } else if (type === "admin") {
    const session = store.openSession();

    try {
      const query = session
        .query({ collection: "Purchases" })
        .statistics((s) => (stats = s))
        .orderByDescending("orderDate");

      const results = await query.skip(page).take(perPage).all();

      return res
        .status(200)
        .send({ data: results, totalResults: stats.totalResults });
    } catch (e) {
      console.log(e);
      return res.status(500).send("Error in admin query");
    }
  }
}

module.exports = {
  getHistory,
};

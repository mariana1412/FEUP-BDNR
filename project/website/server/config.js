const { DocumentStore } = require("ravendb");
const product_search = require("./indexes/product_search");

const clients = new DocumentStore('http://localhost:8080', 'clients');
clients.initialize();

const products = new DocumentStore('http://localhost:8080', 'products');
products.initialize();
new product_search().execute(products);

const purchases = new DocumentStore('http://localhost:8080', 'purchases');
purchases.initialize();

module.exports = {clients, products, purchases};
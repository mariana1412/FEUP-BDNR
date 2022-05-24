const { DocumentStore } = require("ravendb");

const clients = new DocumentStore('http://localhost:8080', 'clients');
clients.initialize();

const products = new DocumentStore('http://localhost:8080', 'products');
products.initialize();

const purchases = new DocumentStore('http://localhost:8080', 'purchases');
purchases.initialize();

module.exports = {clients, products, purchases};
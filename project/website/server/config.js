const { DocumentStore } = require("ravendb");
const product_search = require("./indexes/product_search");

const store = new DocumentStore('http://localhost:8080', 'nolx');
store.initialize();

module.exports = {store};
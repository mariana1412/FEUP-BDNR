const { DocumentStore, FacetSetup } = require("ravendb");

const store = new DocumentStore('http://localhost:8080', 'nolx');
store.initialize();

module.exports = {store};
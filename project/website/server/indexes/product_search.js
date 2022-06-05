const { AbstractJavaScriptIndexCreationTask } = require('ravendb');

class product_search extends AbstractJavaScriptIndexCreationTask {
    constructor() {
        super();
        this.map = "map('Products', (product) => {\n" +
            "return { \n" +
            "    exactName: product.name,\n" +
            "    name: product.name, \n" +
            "    body: [product.name, product.description], \n" +
            "    stock: product.stock, \n" +
            "    store: product.store, \n" +
            "    category: product.category,    \n" +
            "    rating: product.rating, \n" +
            "    price: product.price \n" +
            "};\n" +
        "})";
        
        this.index("exactName", "exact");
        this.index("name", "fulltext");
        this.index("body", "fulltext");
    }
}
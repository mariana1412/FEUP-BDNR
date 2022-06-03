const express = require("express");
const cors = require("cors");

var app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json())

const product = require('./routes/product');
app.use('/product', product);

const purchases = require('./routes/purchases');
app.use('/purchases', purchases)

app.listen(port, () => console.log("Backend server live on " + port));

module.exports = app;

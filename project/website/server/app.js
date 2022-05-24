const express = require("express");
const cors = require("cors");
const { DocumentStore } = require('ravendb');

var app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json())

const product = require('./routes/product');
app.use('/product', product);

app.listen(port, () => console.log("Backend server live on " + port));

module.exports = app;

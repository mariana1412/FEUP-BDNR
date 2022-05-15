const express = require("express");
const cors = require("cors");

var app = express();

const port = process.env.PORT || 3001;

app.use(cors());

const example = require('./routes/example');
app.use('/example', example);

app.listen(port, () => console.log("Backend server live on " + port));

module.exports = app;

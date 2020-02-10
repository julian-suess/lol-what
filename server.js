const express = require("express");
const app = express();
const helmet = require("helmet");

app.use(helmet());
app.use(express.static("dist"));

app.listen(8080);

const bodyParser = require("body-parser");
const express = require("express");
const helmet = require("helmet");
const methodOverride = require("method-override");
const morgan = require("morgan");
const os = require("os");

process.env.UV_THREADPOOL_SIZE = Math.round(os.cpus().length / 2);

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  "extended": true,
  "type": ["application/json", "application/x-www-form-urlencoded"]
}))
app.use(methodOverride());
app.use(helmet());

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const productos = require("./productos.js")


router.use("/productos", productos)

module.exports = router;



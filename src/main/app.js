const express = require('express');
const path = require('path');
const cors = require('cors');
const routers = require('../routers/routers');
const middlewares = require('../middlewares');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.use(cors());
app.use(routers);
app.use(middlewares.errorMiddleware);

module.exports = app;

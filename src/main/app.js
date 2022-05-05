const express = require('express');
const cors = require('cors');
const routers = require('../routers/routers');
const { errorMiddleware } = require('../middlewares');

const app = express();
app.use(express.json());
app.use(cors());
app.use(routers);
app.use(errorMiddleware);

module.exports = app;

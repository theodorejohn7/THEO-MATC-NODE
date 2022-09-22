require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();


const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(logger("dev"));

mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, })
  .then(() => {
    console.log('Connected to the Database successfully');
  });

const User = require('./src/routes/user');

app.use('/api/v1/user', User);

const Products = require('./src/routes/products');

app.use('/api', Products);

const HealthMonk = require('./src/routes/healthMonk');

app.use('/hmkapi', HealthMonk);

app.listen(PORT, () => {
    console.log('Server is listening on Port:', PORT)
  })


module.exports = app;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const pratoRoutes = require('./routes/pratoRoutes');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'API Restaurante funcionando'
  });
});

app.use('/prato', pratoRoutes);

module.exports = app;
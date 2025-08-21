const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express(); 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const clientRoutes = require('./routes/clients');
const orderRoutes = require('./routes/orders');

app.use('/api/clients', clientRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'API rodando!',
    timestamp: new Date().toISOString()
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
module.exports = app;
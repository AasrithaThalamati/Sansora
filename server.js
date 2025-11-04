const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB Error:', err));

// Product API
app.get('/api/product/:sku', async (req, res) => {
  try {
    const Product = mongoose.model('Product', new mongoose.Schema({}, { collection: 'products' }));
    const product = await Product.findOne({ sku: req.params.sku });
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// SERVE index.html
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  res.sendFile(filePath, err => {
    if (err) {
      console.error('File not found:', filePath);
      res.status(500).send('Server error: index.html missing');
    }
  });
});

module.exports = app;
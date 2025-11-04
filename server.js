const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve ALL files in root

// MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Aasritha_Thalamati:aasi2006@cluster0.bftp8lu.mongodb.net/SansoraShopping')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Product API
app.get('/api/product/:sku', async (req, res) => {
  try {
    const Product = mongoose.model('Product', new mongoose.Schema({}, { collection: 'products' }));
    const product = await Product.findOne({ sku: req.params.sku });
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// FALLBACK: Serve index.html for ALL routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// VERCEL EXPORT
module.exports = app;
// server.js - FINAL VERCEL FIX
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Serve ALL files from root
app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Aasritha_Thalamati:aasi2006@cluster0.bftp8lu.mongodb.net/SansoraShopping')
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
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// SERVE index.html FOR EVERY ROUTE
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// VERCEL
module.exports = app;
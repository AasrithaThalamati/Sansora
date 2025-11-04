// server.js - FINAL VERCEL-READY VERSION

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// SERVE STATIC FILES FROM ROOT (CRITICAL!)
app.use(express.static(__dirname)); // ← This serves index.html, CSS, JS

// MongoDB Connection
const DB_URI = process.env.MONGODB_URI || 'mongodb+srv://Aasritha_Thalamati:aasi2006@cluster0.bftp8lu.mongodb.net/SansoraShopping?retryWrites=true&w=majority';

mongoose.connect(DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Product Schema & Model
const productSchema = new mongoose.Schema({
    title: String, sku: { type: String, unique: true },
    current_price: Number, original_price: Number,
    discount: String, description: String,
    images: [Object], features: [String],
    rating: Number, reviews_count: Number,
    category: String, inventory_count: Number,
    delivery_time: String, specs: Object
}, { collection: 'products' });

const Product = mongoose.model('Product', productSchema);

// API Route
app.get('/api/product/:sku', async (req, res) => {
    try {
        const product = await Product.findOne({ sku: req.params.sku });
        if (!product) return res.status(404).json({ message: 'Not found' });
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// SERVE index.html FOR ALL ROUTES (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// VERCEL EXPORT
module.exports = app;
// FALLBACK: Serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
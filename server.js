// server.js - VERCEL-READY VERSION 🚀

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/'))); // Serve all static files

// MongoDB Connection (Use env var on Vercel!)
const DB_URI = process.env.MONGODB_URI || 'mongodb+srv://Aasritha_Thalamati:aasi2006@cluster0.bftp8lu.mongodb.net/SansoraShopping?retryWrites=true&w=majority';

mongoose.connect(DB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Product Schema
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    current_price: { type: Number, required: true },
    original_price: Number,
    discount: String,
    description: String,
    images: [{ url: String, is_main: Boolean, is_thumbnail: Boolean }],
    features: [String],
    rating: Number,
    reviews_count: Number,
    category: String,
    inventory_count: Number,
    delivery_time: String,
    specs: { battery_life: String, charging_time: String, connectivity: String, weight: String, warranty: String }
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

// Serve HTML files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, req.path === '/' ? 'index.html' : req.path));
});

// VERCEL SERVERLESS EXPORT (THIS IS THE KEY!)
module.exports = app;
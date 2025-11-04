// server.js

// --- 1. IMPORTS ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Required for cross-origin requests
const path = require('path'); // ESSENTIAL for robust pathing

// --- 2. CONFIGURATION & INITIALIZATION ---
const DB_URI = 'mongodb+srv://Aasritha_Thalamati:aasi2006@cluster0.bftp8lu.mongodb.net/SansoraShopping?retryWrites=true&w=majority';
const PORT = 3000; 

// Initialize Express application
const app = express(); 

// --- 3. MIDDLEWARE ---
// Enable CORS for all routes (CRITICAL for fetch() calls to work)
app.use(cors()); 
app.use(express.json());

// **ROBUST STATIC FILE SERVING:** Guarantees CSS, JS, and images are found.
app.use(express.static(path.join(__dirname, '/'))); 

// --- 4. EXPLICIT HTML ROUTE (Guaranteed File Serving) ---
app.get('/product-detail.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'product-detail.html'));
});

// --- 5. DATABASE CONNECTION ---
mongoose.connect(DB_URI)
  .then(() => console.log('✅ MongoDB connected successfully.'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- 6. DEFINE SCHEMA AND MODEL ---
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

// --- 7. API ENDPOINT ---
app.get('/api/product/:sku', async (req, res) => {
    try {
        const productSku = req.params.sku;
        const product = await Product.findOne({ sku: productSku });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ message: 'Server error occurred' });
    }
});

// --- 8. START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
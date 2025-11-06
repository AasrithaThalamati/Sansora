// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// === MONGOOSE CONNECTION (VERCEL-PROOF) ===
let cachedConn = null;

async function connectDB() {
  if (cachedConn) return cachedConn;

  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI missing!');
    throw new Error('Add MONGODB_URI in Vercel Environment Variables');
  }

  cachedConn = await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });

  console.log('MongoDB connected successfully');
  return cachedConn;
}

// === API ROUTE ===
app.get('/api/product/:sku', async (req, res) => {
  try {
    await connectDB();

    const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }), 'products');
    const product = await Product.findOne({ sku: req.params.sku }).lean();

    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('API Error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// === SERVE FRONTEND ===
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

export default app;
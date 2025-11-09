// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// === MONGOOSE: CACHED CONNECTION ===
let cachedConn = null;
async function connectDB() {
  if (cachedConn) return cachedConn;
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI missing');
  cachedConn = await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 15000,
  });
  console.log('MongoDB connected');
  return cachedConn;
}

// === API ROUTE - FIXED: Using query params ===
app.get('/api/product', async (req, res) => {
  try {
    const sku = req.query.sku;
    if (!sku) {
      return res.status(400).json({ error: 'SKU parameter required' });
    }
    
    await connectDB();
    const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }), 'products');
    const product = await Product.findOne({ sku }).lean();
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// === SERVE index.html ===
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// === VERCEL HANDLER: REQUIRED ===
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return app(req, res);
}
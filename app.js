import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Import database connection
import connectdb from './db/connection.js';

// Import Models (for Mongoose schema registration)
import './Models/contactus.js';
import './Models/category.js';
import './Models/attribute.js';
import './Models/product.js';
import './Models/product_variant.js';
import './Models/usertable.js';
import './Models/wishlist.js';
import './Models/brand.js';
import './Models/address.js';
import './Models/order.js';
import './Models/review.js';

// Import Routes
import contactRouter from './routes/contactusRouter.js';
import infoRouter from './routes/infoRouter.js';
import userRouter from './routes/userRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import attributeRouter from './routes/attributeRouter.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import bannerRouter from './routes/bannerRouter.js';
import variantRouter from './routes/variantRouter.js';
import wishlistRouter from './routes/wishlistRouter.js';
import carouselListRouter from './routes/carousellistRouter.js';
import brandRouter from './routes/brandRouter.js';
import addressRouter from './routes/addressRouter.js';
import orderRouter from './routes/orderRouter.js';
import reviewRouter from './routes/reviewRouter.js';
 // ✅ Import contactRouter

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse incoming JSON requests

// Get __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Validate environment variables
if (!process.env.MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI not set in .env file.');
  process.exit(1);
}

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
connectdb(mongoURI).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((error) => {
  console.error('❌ MongoDB Connection Error:', error.message);
  process.exit(1);
});

// API Routes
app.use('/api/info', infoRouter); // Info routes (including `/api/info/contactus`)
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);
app.use('/api/attribute', attributeRouter);
app.use('/api/banner', bannerRouter);
app.use('/api/cart', cartRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/variant', variantRouter);
app.use('/api/list', carouselListRouter);
app.use('/api/brand', brandRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/contactus', contactRouter); // ✅ Ensure contact route is correctly registered
app.use('/api/contactus', contactRouter);
// Default Route for Unmatched Routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// Default Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong. Please try again later.' });
});

// Start the Server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  process.exit(1);
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
  process.exit(1);
});

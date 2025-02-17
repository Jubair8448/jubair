import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Import routes
import inforouter from './routes/infoRouter.js';
import userrouter from './routes/userRouter.js';
import categoryrouter from './routes/categoryRouter.js';
import attributerouter from './routes/attributeRouter.js';
import productrouter from './routes/productRouter.js';
import cartrouter from './routes/cartRouter.js';
import bannerrouter from './routes/bannerRouter.js';
import variantrouter from './routes/variantRouter.js';
import wishlistrouter from './routes/wishlistRouter.js';
import carousellistrouter from './routes/carousellistRouter.js';
import brandrouter from './routes/brandRouter.js';
import addressrouter from './routes/addressRouter.js';
import orderrouter from './routes/orderRouter.js';
import contactusrouter from './routes/contactusRouter.js'; // Import the contactus router

// Initialize express app
const app = express();

// MongoDB connection
import connectdb from './db/connection.js';
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

// CORS middleware
app.use(cors());

// Use express.json() middleware (No need for body-parser if using this)
app.use(express.json());

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set up static files folder
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB URI (from environment variables)
const mongoURI = process.env.MONGODB_URI;

// Set strict query to false (recommended for newer versions of Mongoose)
mongoose.set('strictQuery', false);

// Connect to MongoDB
connectdb(mongoURI);

// Routes
app.use("/api", inforouter);
app.use("/api/user", userrouter);
app.use("/api/product", productrouter);
app.use("/api/category", categoryrouter);
app.use("/api/attribute", attributerouter);
app.use("/api/banner", bannerrouter);
app.use("/api/cart", cartrouter);
app.use("/api/wishlist", wishlistrouter);
app.use("/api/variant", variantrouter);
app.use("/api/list", carousellistrouter);
app.use("/api/brand", brandrouter);
app.use("/api/address", addressrouter);
app.use("/api/order", orderrouter);
app.use("/api/contactus", contactusrouter); // Use the contactus router

// Set up server port
const port = process.env.PORT || 5001;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
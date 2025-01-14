// Import necessary modules
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser'); // Optional, since Express now supports express.json() natively
const path = require('path');

// Import routes
const inforouter = require("./routes/infoRouter.js");
const userrouter = require("./routes/userRouter.js");
const categoryrouter = require("./routes/categoryRouter.js");
const attributerouter = require("./routes/attributeRouter.js");
const productrouter = require("./routes/productRouter.js");
const cartrouter = require("./routes/cartRouter.js");
const bannerrouter = require("./routes/bannerRouter.js");
const variantrouter = require("./routes/variantRouter.js");
const wishlistrouter = require("./routes/wishlistRouter.js");
const carousellistrouter = require("./routes/carousellistRouter.js");
const brandrouter = require("./routes/brandRouter.js");
const addressrouter = require("./routes/addressRouter.js");
const orderrouter = require("./routes/orderRouter.js");

// Initialize express app
const app = express();

// MongoDB connection
const connectdb = require("./db/connection.js");
require("./Models/contactus");
require("./Models/category");
require("./Models/attribute");
require("./Models/product");
require("./Models/product_variant");
require("./Models/usertable");
require("./Models/wishlist");
require("./Models/brand");
require("./Models/address");
require("./Models/order");

// CORS middleware
app.use(cors());

// Use express.json() middleware (No need for body-parser if using this)
app.use(express.json());

// Set up static files folder
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB URI (from environment variables)
const mongoURI = process.env.MONGODB_URI || 

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

// Set up server port
const port = process.env.PORT || 5001;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

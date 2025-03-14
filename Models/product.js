const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_url: {
      type: String,
      required: true,
    },
    product_image1: {
      type: String,
      required: true,
      default: null,
    },
    product_image2: {
      type: String,
      required: true,
      default: null,
    },
    product_image3: {
      type: String,
      required: true,
      default: null,
    },
    product_image4: {
      type: String,
      required: true,
      default: null,
    },
    brand: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
    parent_category: {
      type: Array,
      required: true,
    },
    child_category: {
      type: Array,
      default: [],
    },
    sort_description: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    meta_title: {
      type: String,
      required: true,
    },
    meta_description: {
      type: String,
      required: true,
    },
    meta_keywords: {
      type: String,
      required: true,
    },
    skucode: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: "Active",
    },
    newarrivedproduct: {
      type: String,
      default: "Inactive",
    },
    trendingproduct: {
      type: String,
      default: "Inactive",
    },
    featuredproduct: {
      type: String,
      default: "Inactive",
    },
    weight: {
      type: Number,
      default: 0,
    },
    weight_type: {
      type: String,
      default: "ml",
    },
    mrp_price: {
      type: Number,
      required: true,
      default: 0,
    },
    selling_price: {
      type: Number,
      required: true,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    dynamicAttributes: {
      type: Array,
      default: [],
    },
    reviews: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Review" 
      }, // Reference to Review model
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

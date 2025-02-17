import express from 'express';
import Review from '../Models/review.js';
import Product from '../Models/product.js';  // Import the Product model to update the product with the review

const router = express.Router();

// Add a new review for a product
router.post('/:productId', async (req, res) => {
  const { rating, comment, user } = req.body;
  const { productId } = req.params;

  try {
    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Create a new review
    const newReview = new Review({
      rating,
      comment,
      user,
      productId,
    });

    // Save the review to the database
    await newReview.save();

    // Find the product and add the review to the product's review array
    const product = await Product.findById(productId);
    product.reviews.push(newReview);
    await product.save();

    return res.status(201).json({ message: 'Review added successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Get all reviews for a product
router.get('/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

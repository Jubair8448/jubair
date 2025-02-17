import express from 'express';
const router = express.Router();

// Import the ContactUs model
import ContactUs from '../Models/contactus.js';

// Define the route for getting contact us information
router.get('/', async (req, res) => {
  try {
    const contactUsInfo = await ContactUs.find();
    res.json(contactUsInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Define the route for getting contact us information with id 10
router.get('/10', async (req, res) => {
  try {
    const contactUsInfo = await ContactUs.findById(10);
    res.json(contactUsInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Define other routes as needed

export default router;
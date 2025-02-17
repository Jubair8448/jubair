const mongoose = require('mongoose');

// Regular expression for basic email validation
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const contactSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastname: {
      type: String,
      required: [true, 'Last name is required'],
    },
    mobile: {
      type: String, // Use String to avoid number precision issues
      required: [true, 'Mobile number is required'],
      minlength: [10, 'Mobile number must be at least 10 digits long'], // Optional: Mobile number length validation
      maxlength: [15, 'Mobile number must be at most 15 digits long'], // Optional: Mobile number length validation
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [emailRegex, 'Please enter a valid email address'], // Email format validation using regex
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

// Create the model
const ContactUs = mongoose.model('ContactUs', contactSchema);

module.exports = ContactUs;

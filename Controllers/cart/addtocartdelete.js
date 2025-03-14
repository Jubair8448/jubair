const cart = require("../../Models/cart");

const addtocartdelete = async (req, res) => { 
  const { cart_id } = req.params;
  console.log(`Received request to delete cart item with ID: ${cart_id}`); // Log the cart_id

  try {
    // Use Mongoose to find and remove the cart item by its ID
    const deletedCartItem = await cart.findByIdAndRemove(cart_id);

    if (!deletedCartItem) {
      return res.status(404).send({ message: 'Cart item not found' });
    }

    res.status(200).send({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart item:', error); // More detailed error logging
    res.status(500).send({ message: 'Server error' });
  }
}

module.exports = addtocartdelete;
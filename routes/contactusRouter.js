const express = require("express");
const router = express.Router();
const contactus = require("../Controllers/info/contactus"); 
const Contact = require("../Models/contactus"); // Import Model

// ✅ Route for handling contact form submission
router.post("/", contactus);

// ✅ Route to fetch all contacts for admin panel
router.get("/", async (req, res) => {
    try {
        const contacts = await Contact.find(); // Fetch all contacts
        res.status(200).json({ status: "success", data: contacts });
    } catch (err) {
        res.status(500).json({ status: "failed", error: err.message });
    }
});

// ✅ **Add this DELETE route**
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedContact = await Contact.findByIdAndDelete(id);
        
        if (!deletedContact) {
            return res.status(404).json({ status: "failed", message: "Record not found" });
        }

        res.status(200).json({ status: "success", message: "Record deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "failed", error: error.message });
    }
});

module.exports = router;

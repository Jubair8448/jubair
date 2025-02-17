const Contact = require("../../Models/contactus");

const contactus = async (req, res) => {
  try {
    const { fname, lname, message, emailID, mobile_no } = req.body;

    // Create a new contact entry
    const contactData = new Contact({
      firstname: fname,
      lastname: lname,
      mobile: mobile_no,
      email: emailID,
      message: message,  // Fixed key to match model
    });

    // Save to database
    const savedContact = await contactData.save();

    res.status(201).json({ status: "successful", data: savedContact });

  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ status: "failed", error: err.message });
  }
};

module.exports = contactus;

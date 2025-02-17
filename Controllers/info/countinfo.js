const countinfo = async (req, res) => {
    try {
      // Replace with your logic to get count info
      const countInfo = { count: 100 }; // Example response
      res.json(countInfo);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  module.exports = countinfo;
const WebsiteInfo = require("../../Models/website_info");  // ✅ Model name Capital case me rakho
const getwebinfo = async (req, res) => { 
    try {
        const webinfo = await WebsiteInfo.find();  
        
        console.log("Fetched Website Info:", webinfo);  // ✅ Debugging ke liye console.log

        res.status(200).json({ status: "successful", data: webinfo });
    } catch (err) {
        console.error("Error Fetching Website Info:", err);  // ✅ Error log karo
        
        res.status(500).json({ status: "failed", error: err.message });  // ✅ Proper error response
    }
};

module.exports = getwebinfo;

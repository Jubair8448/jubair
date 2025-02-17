const express = require('express');
const router = express.Router();
const upload = require('../middlewares/image-uploader.js');

// Controllers
const webinfo = require('../Controllers/info/webinfo.js');
const getwebinfo = require('../Controllers/info/getwebinfo.js');
const editwebinfo = require('../Controllers/info/editwebinfo.js');
const contactlist = require('../Controllers/info/contactlist.js');
const countinfo = require('../Controllers/info/countinfo.js');

// ✅ Website Info Routes
router.post('/websiteinfo', upload.fields([{ name: 'logo', maxCount: 1 }]), webinfo);
router.patch('/websiteinfo', upload.fields([{ name: 'logo', maxCount: 1 }]), editwebinfo);
router.get('/websiteinfo', getwebinfo);

// ✅ Count Info Route
router.get('/countinfo', countinfo);

// ✅ Contact List Route for Admin
router.get('/contactlist', async (req, res) => {
    try {
        const contacts = await contactlist(); // Ensure this function returns data
        res.status(200).json({ status: "success", data: contacts });
    } catch (err) {
        res.status(500).json({ status: "failed", error: err.message });
    }
});

module.exports = router;

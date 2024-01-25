const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
    return res.status(200).json({
        title: "Express Testing",
        message: "running on server.js",
    });
});

module.exports = router;
const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
    return res.status(200).json({
        title: "Express Testing",
        message: `Welcome to the Express Testing API.`,
    });
});

module.exports = router;
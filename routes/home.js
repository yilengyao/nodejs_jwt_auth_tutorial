const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
    return res.status(200).json({
        title: "Express Testing",
        message: `Database URI: ${process.env.DATABASE_URI}`,
    });
});

module.exports = router;
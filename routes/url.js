const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortUrl,
  handleGetRedirectUrl,
  handleGetAnalytics,
} = require("../controllers/url");

router.post("/", handleGenerateNewShortUrl);
router.get("/:shortId", handleGetRedirectUrl);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;

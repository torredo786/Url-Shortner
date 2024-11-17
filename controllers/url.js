const shortid = require("shortid");
const URL = require("../models/url");

const handleGenerateNewShortUrl = async (req, res) => {
  const shortId = shortid();
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", {
    id: shortId,
  });
};

const handleGetRedirectUrl = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  return res.redirect(entry.redirectUrl);
};

const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};
 
module.exports = {
  handleGenerateNewShortUrl,
  handleGetRedirectUrl,
  handleGetAnalytics,
};

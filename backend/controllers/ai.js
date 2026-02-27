/* Create imports */
const Review = require("../models/Review");
const User = require("../models/User");

/* Create controllers */
exports.generateReview = async (req, res) => {
  try {
    const { resumeText, jobDescriptionText } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: "User not authenticated." });
    }

    if (!resumeText || !jobDescriptionText) {
      return res.status(403).json({ error: "All fields must be filled." });
    }

    const review = await Review.createReview(userId, resumeText, jobDescriptionText);

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

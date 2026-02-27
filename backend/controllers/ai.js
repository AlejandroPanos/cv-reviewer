/* Create imports */

/* Create controllers */
exports.generateReview = async (req, res) => {
  try {
    res.status(200).json({ msg: "Review made" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

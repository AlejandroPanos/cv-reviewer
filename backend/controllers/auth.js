/* Create imports */
const User = require("../models/User");
const { createToken, maxAge } = require("../helpers/helpers");

/* Create controllers */
exports.getUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: "Could not get current user" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.register(name, email, password);

    if (!user) {
      return res.status(401).json({ error: "Could not register user" });
    }

    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge, httpOnly: true, sameSite: "none", secure: true });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);

    if (!user) {
      return res.status(401).json({ error: "Could not register user" });
    }

    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge, httpOnly: true, sameSite: "none", secure: true });
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1, httpOnly: true, sameSite: "none", secure: true });
    res.status(200).json({ msg: "User logged out successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

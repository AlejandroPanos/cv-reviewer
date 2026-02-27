/* Create imports */

/* Create controllers */
exports.getUser = async (req, res) => {
  try {
    res.status(200).json({ msg: "Got user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.register = async (req, res) => {
  try {
    res.status(200).json({ msg: "Registered user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    res.status(200).json({ msg: "Login user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.status(200).json({ msg: "Logout user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

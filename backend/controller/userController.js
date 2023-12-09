const User = require("../models/userModel");

exports.createUser = async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({
    success: true,
    user,
  });
};

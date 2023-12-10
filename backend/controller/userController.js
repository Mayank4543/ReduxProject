const User = require("../models/userModel");

// exports.createUser = async (req, res, next) => {
//   const user = await User.create(req.body);
//   res.status(200).json({
//     success: true,
//     user,
//   });
// };
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "myCloud.public_id",
      url: "myCloud.secure_url",
    },
  });
  const token = user.getJWTTOKEN();
  res.status(200).json({
    success: true,
    token,
  });
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return new Error("Please enter email and password");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return new Error("invalid email or password");
    }
    const ispasswordMatched = await user.comparepassword();
    if (!ispasswordMatched) {
      return new Error("invalid Password");
    }
  } catch (e) {
    res.status(400).json({
      message: "something went wrong",
    });
  }
};

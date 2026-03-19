const jwt = require("jsonwebtoken");
const User = require("./../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
//REGISTER THE USER

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    //check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "user already exists",
      });
    }
    //OTHERWISE CREATE THE USER
    const user = await User.create({
      name,
      email,
      password,
    });
    //SEND THE RESPONSE

    if (user) {
      res.status(201).json({
        status: "success",
        token: generateToken(user._id),
        user,
      });
    } else {
      res.status(200).json({
        message: "Invalid user data",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.loginUser = async (req, res) => {
  //GET THE USER DATA FROM REQUEST
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide your email and password",
    });
  }

  //VERIFY IF THE DATA IS VALID

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      message: "Your credentials are invalid! Please try again",
    });
  }

  //SEND THE JSON WEB TOKEN AS RESPONSE IF EVERYTHING IS VALID

  res.status(200).json({
    status: "success",
    token: generateToken(user._id),
    user: {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      _id: user._id,
    },
  });
};
//GET THE USER PROFILE WHO IS LOGGED IN

// @access  Private

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isPro: user.isPro,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

//UPDATING USER PROFILE

exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    user.avatar = `/${req.file.path}`;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

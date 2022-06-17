const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
  return token;
};

createAndSendToken = catchAsync(async (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.signUp = catchAsync(async (req, res, next) => {
  const newUserModel = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  if (
    !newUserModel.name ||
    !newUserModel.email ||
    !newUserModel.phone ||
    !newUserModel.password ||
    !newUserModel.confirmPassword
  ) {
    next(new AppError("Please provide all neccesary details", 406));
  }
  const newUser = await User.create(newUserModel);
  createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    next(new AppError("Please Login to use the routes", 401));
  }
  //   const decode = jwt.decode();
});

// const ob = new AuthController();
// console.log(ob.signToken("62a74d7ba8016cb2bc7b719c"));

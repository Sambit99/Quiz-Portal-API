const User = require("../models/userModel");
const factory = require("../controllers/handlerFactory");

class userController {
  getAllUser = factory.getAll(User);

  addUser = async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };
    const user = await User.create(newUserData);

    res.status(200).json({
      status: "success",
      message: "User Creation",
      data: user,
    });
    next();
  };
}

module.exports = new userController();

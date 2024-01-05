const passport = require("../utils/passport");
const User = require("../model/userModel");

/**
 * Authenticates the user with local credentials and logs them in.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {undefined}
 */
exports.login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: info.message,
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        data: user,
      });
    });
  })(req, res, next);
};

/**
 * Handles the signup request and creates a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Object} The response object with the created user data.
 */
exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res
      .status(200)
      .json({ status: "success", message: "User created", data: newUser });
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid User",
    });
  }
};

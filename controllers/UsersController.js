const User = require("../models/User");
const BadRequestError = require("../errors/bad-request");
const UnauthenticatedError = require("../errors/UnauthenticateError");
const httpStatusCodes = require("http-status-codes");
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !password || !email) {
    throw new BadRequestError("Please provide all values");
  }
  const person = await User.create({ name, email, password });
  const token = person.assignJWT();
  res
    .status(httpStatusCodes.CREATED)
    .json({ user: { name: person.name }, token });
};

const loginUser = async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = user.assignJWT();

  res.status(httpStatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  registerUser,
  loginUser,
};

const httpStatus = require("http-status");
const { UserModel, ProfileModel } = require("../models");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt"); // Assuming you want to hash the password

class AuthService {
  static async RegisterUser(body) {
    const { email, password, name } = body;

    // Check if user already exists
    const checkExist = await UserModel.findOne({ email });
    if (checkExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User Already Registered");
    }

    // Hash the password before saving (optional, but recommeded)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const user = await UserModel.create({
      email,
      password: hashedPassword,
      name
    });

    // Create a profile for the user
    await ProfileModel.create({
      user: user._id
    });

    return {
      msg: "User Registered Successfully",
      token: "" // You can implement a JWT token generation here
    };
  }
}

module.exports = AuthService;

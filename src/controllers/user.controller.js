import User from "../models/user.model.js";
import { successResponse } from "../utils/responseHelper.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return successResponse(res, users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      const error = new Error("User not Found");
      error.statusCode = 404;
      throw error;
    }
    return successResponse(res, user, "user detail Fetch Successfully");
  } catch (error) {
    next(error);
  }
};

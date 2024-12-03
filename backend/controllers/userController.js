import User from "../models/userModel.js";
import { oauth2Client } from "../utils/googleClient.js";
import generateToken from "../utils/createToken.js";
import { io } from "../index.js";
import { emitUserUpdate } from "../socket/sockets.js";

/* GET Google Authentication API. */
export const googleAuth = async (req, res) => {
  const code = req.query.code;
  try {
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);

    const userRes = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    if (!userRes.ok) {
      throw new Error("Failed to fetch user info from Google");
    }

    const { email, name, picture } = await userRes.json();
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        image: picture,
      });
    }

    const token = generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      isAdmin: user.isAdmin,
      isPremium: user.isPremium,
      plan: user.plan,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

export const logoutUser = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged Out Successfully" });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (user.isAdmin) {
        return res.status(400).json({ message: "Cannot delete admin" });
      }
      await User.deleteOne({ _id: user._id });
      res.status(200).json({ message: "User removed" });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.plan = req.body.plan || user.plan;

      if (user.plan !== "$0") {
        user.isPremium = true;
      } else {
        user.isPremium = false;
      }

      const updatedUser = await user.save();

      // Emit the update to the specific user
      emitUserUpdate(io, updatedUser._id, updatedUser);

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        isAdmin: updatedUser.isAdmin,
        isPremium: updatedUser.isPremium,
        plan: updatedUser.plan,
      });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

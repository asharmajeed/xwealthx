import User from "../models/userModel.js";
import { oauth2Client } from "../utils/googleClient.js";
import generateToken from "../utils/createToken.js";

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

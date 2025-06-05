import UserDetail from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import jwt from "jsonwebtoken";
const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadToCloudinary(buffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (result) resolve(result);
        else reject(err);
      }
    );
    stream.end(buffer);
  });
}
function generateToken(dataId) {
  return jwt.sign({ id: dataId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

export async function Register(req, res) {
  upload.fields([
    { name: "aadhaar1", maxCount: 1 },
    { name: "aadhaar2", maxCount: 1 },
  ])(req, res, async (err) => {
    if (err)
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });

    const { email, ...rest } = req.body;

    if (!req.files?.aadhaar1 || !req.files?.aadhaar2) {
      return res
        .status(400)
        .json({ message: "Both Aadhaar files are required." });
    }

    try {
      const userExists = await UserDetail.findOne({ email });
      if (userExists)
        return res.status(409).json({ message: "Email already registered." });

      const [aadhaar1Res, aadhaar2Res] = await Promise.all([
        uploadToCloudinary(req.files.aadhaar1[0].buffer, "aadhaar"),
        uploadToCloudinary(req.files.aadhaar2[0].buffer, "aadhaar"),
      ]);

      const userData = {
        email,
        ...rest,
        aadhaar1: aadhaar1Res.secure_url,
        aadhaar2: aadhaar2Res.secure_url,
        isSameAddress: rest.isSameAddress === "true",
        isStudent: rest.isStudent === "true",
        isWorking: rest.isWorking === "true",
      };
      const newUser = new UserDetail(userData);
      const savedUser = await newUser.save();

      res.status(201).json({ message: "User registered", user: savedUser });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
}

export const Login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserDetail.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid email or user not found." });
    }

    const token = generateToken(user._id);

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export async function get(req, res, next) {
  try {
    const user = await UserDetail.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "data not found" });
    }
    res.json(user);
    console.log(user);
  } catch (err) {
    console.error("getMe Error:", err.message);
    next(err);
  }
}

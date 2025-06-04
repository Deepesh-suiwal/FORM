import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import cors from "cors";
import UserDetail from "./models/user.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const app = express();
connectDB();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const corsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "PUT", "POST", "DELETE"],
};
app.use(cors(corsOptions));
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

const fileArr = upload.fields([
  { name: "aadhaar1", maxCount: 1 },
  { name: "aadhaar2", maxCount: 1 },
]);

app.use(express.urlencoded({ extended: true }));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post("/user/form/save", fileArr, async (req, res) => {
  try {
    const data = { ...req.body };
    const { email } = data;

    if (!req.files || !req.files.aadhaar1 || !req.files.aadhaar2) {
      return res
        .status(400)
        .json({ message: "Both Aadhaar files are required." });
    }

    const ExistingUser = await UserDetail.findOne({ email });
    if (ExistingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }

    // Helper to upload buffer to Cloudinary
    const uploadToCloudinary = (buffer, folder) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(buffer);
      });

    // Upload both files
    const [result1, result2] = await Promise.all([
      uploadToCloudinary(req.files.aadhaar1[0].buffer, "aadhaar"),
      uploadToCloudinary(req.files.aadhaar2[0].buffer, "aadhaar"),
    ]);

    // Save URLs instead of buffers in MongoDB
    data.aadhaar1 = result1.secure_url;
    data.aadhaar2 = result2.secure_url;

    // Convert boolean strings to boolean
    data.isSameAddress =
      data.isSameAddress === "true" || data.isSameAddress === true;
    data.isStudent = data.isStudent === "true" || data.isStudent === true;
    data.isWorking = data.isWorking === "true" || data.isWorking === true;

    const newStudent = new UserDetail({ ...data });

    const savedStudent = await newStudent.save();
    res.status(201).json({ message: "User added", student: savedStudent });
  } catch (error) {
    console.error("There was an error while handling the data", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Your backend is running at port ${PORT}`);
});

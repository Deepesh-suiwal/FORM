import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import cors from "cors";
import UserDetail from "./models/user.js";
import multer from "multer";
import path from "path";

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

app.use(express.urlencoded({ extended: true }));

// const storeimage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage: storeimage });

// const fileArr = upload.fields([
//   { name: "aadhaar1", maxCount: 1 },
//   { name: "aadhaar2", maxCount: 1 },
// ]);

const store = multer.memoryStorage();
const upload = multer({ storage: store });
const fileArr = upload.fields([
  { name: "aadhaar1", maxCount: 1 },
  { name: "aadhaar2", maxCount: 1 },
]);

app.post("/user/form/save", fileArr, async (req, res) => {
  try {
    const data = { ...req.body };
    console.log(req.files);

    if (!req.files || !req.files.aadhaar1 || !req.files.aadhaar2) {
      return res
        .status(400)
        .json({ message: "Both Aadhaar files are required." });
    }

    // data.aadhaar1 = req.files.aadhaar1[0].path;
    // data.aadhaar2 = req.files.aadhaar2[0].path;

    console.log(req.files.aadhaar1[0].buffer);
    console.log(req.files.aadhaar2[0].buffer);

    data.aadhaar1 = req.files.aadhaar1[0].buffer;
    data.aadhaar2 = req.files.aadhaar2[0].buffer;

    const newStudent = new UserDetail({ ...data });

    const savedStudent = await newStudent.save();
    res.status(201).json({ message: "User added", student: savedStudent });

    // const ExistingUser = await UserDetail.findOne({ email });

    // if (ExistingUser) {
    //   return res.status(409).json({ message: "Email already exists." });
    // }

    // const newStudent = new UserDetail({
    //   email,
    //   ...rest,
    // });
  } catch (error) {
    console.error("There was an error while handling the data", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Your backend is running at port ${PORT}`);
});

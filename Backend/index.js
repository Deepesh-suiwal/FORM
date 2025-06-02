import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import cors from "cors";
import UserDetail from "./models/user.js";

const app = express();
connectDB();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const corsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.post("/user/form/save", async (req, res) => {
  try {
    const { email, ...rest } = req.body;

    console.log(req.body);

    const ExistingUser = await UserDetail.findOne({ email });
    if (ExistingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const newStudent = new UserDetail({
      email,
      ...rest,
    });
    const savedStudent = await newStudent.save();
    res.status(201).json({ message: "User added", student: savedStudent });
  } catch (error) {
    console.log("There was error while handling the data", error);
  }
});

app.listen(PORT, () => {
  console.log(`Your backend is running at port ${PORT}`);
});

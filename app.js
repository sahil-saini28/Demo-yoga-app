import cors from "cors";
import Authroutes from './routes/Authroutes.js'
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import YogaClass from "./models/Yoga-classmodal.js";
dotenv.config();
// import Auth from "./models/Authmodal.js";
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = 4000;
app.use(express.json());
app.use(cors());

app.use('/auth', Authroutes )

// console.log(yogaClassesData.data.length);
// async function saveYogaClasses(data) {
//   try {
//     for (let i = 0; i < data.length; i++) {
//       const yogaClassData = data[i];
//       const yogaClass = new YogaClass(yogaClassData);
//       await yogaClass.save();
//       console.log("Yoga class saved successfully:");
//     }
//   } catch (error) {
//     console.error("Error saving yoga classes:", error);
//   }
// }
// saveYogaClasses(yogaClassesData.data);

app.post("/yoga-classes", async (req, res) => {
  try {
    const yogaClassData = req.body;
    const yogaClass = new YogaClass(yogaClassData);
    await yogaClass.save();
    res.status(201).json(yogaClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.get("/yoga-classes", async (req, res) => {
  try {
    const yogaClasses = await YogaClass.find();
    res.status(200).json(yogaClasses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/yoga-classes/get-by-id", async (req, res) => {
  const { id } = req.body;
  try {
    const yogaClass = await YogaClass.find({id});
    if (!yogaClass) {
      return res.status(404).json({ message: "Yoga class not found" });
    }
    res.status(200).json(yogaClass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

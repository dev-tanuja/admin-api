require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const AdminRoutes = require("./src/routes/AdminRoutes");
const CategoryRoutes = require("./src/routes/CategoryRoutes");
const UploadRoutes = require("./src/routes/UploadRoutes");
const LocationRoutes = require("./src/routes/LocationRoutes");
const FaqRoutes = require("./src/routes/FaqRoutes");
const ActivityRoutes = require("./src/routes/ActivityRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Admin API");
});

app.use("/admin", AdminRoutes);
app.use("/category", CategoryRoutes);
app.use("/images", UploadRoutes);
app.use("/location", LocationRoutes);
app.use("/faqs", FaqRoutes);
app.use("/activity", ActivityRoutes);

const PORT = process.env.PORT || 5050;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("MongoDB Connection Error:", err));

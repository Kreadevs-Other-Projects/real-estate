require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json({ limit: "20mb" }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

connectDB(process.env.MONGO_URI);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/properties", require("./routes/propertiesRoute"));

app.get("/", (req, res) => res.send("Real Estate API is running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoute = require("./routes/authRoute");
const propertiesRoute = require("./routes/propertiesRoute");

const PORT = process.env.PORT;

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

app.use("/api/auth", authRoute);
app.use("/api/properties", propertiesRoute);

app.get("/", (req, res) => res.send("Real Estate API is running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

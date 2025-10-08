const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  createProperty,
  updateProperty,
  deleteProperty,
  getProperty,
  listProperties,
} = require("../controllers/propertyController");
const auth = require("../middlewares/auth");

router.post("/create", auth, upload.array("images", 5), createProperty);

router.put(
  "/updateProperty/:id",
  auth,
  upload.array("images", 5),
  updateProperty
);

router.delete("/deleteProperty/:id", auth, deleteProperty);
router.get("/getProperty/:id", getProperty);
router.get("/listProperties", listProperties);

module.exports = router;

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

router.post("/", auth, upload.array("images", 5), createProperty);

router.put("/:id", auth, upload.array("images", 5), updateProperty);

router.delete("/:id", auth, deleteProperty);
router.get("/:id", getProperty);
router.get("/", listProperties);

module.exports = router;

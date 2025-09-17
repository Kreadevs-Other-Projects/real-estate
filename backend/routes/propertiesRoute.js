const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const propCtrl = require("../controllers/propertyController");

router.get("/", propCtrl.listProperties);
router.get("/:id", propCtrl.getProperty);
router.post("/", auth, propCtrl.createProperty);
router.put("/:id", auth, propCtrl.updateProperty);
router.delete("/:id", auth, propCtrl.deleteProperty);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  addNominee,
  getMyNominee,
  nomineeAccess,
  updateNominee,
} = require("../controllers/nomineeController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addNominee);
router.get("/my", protect, getMyNominee);
router.post("/access", nomineeAccess);
router.put("/:id", protect, updateNominee);

module.exports = router;

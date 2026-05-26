const express = require("express");
const router = express.Router();
const {
  createPlan,
  getMyPlan,
  getPlanById,
  updatePlan,
  deletePlan,
  getAllPlans,
} = require("../controllers/planController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", protect, authorizeRoles("admin"), getAllPlans);
router.post("/", protect, createPlan);
router.get("/my", protect, getMyPlan);
router.get("/:id", protect, getPlanById);
router.put("/:id", protect, updatePlan);
router.delete("/:id", protect, deletePlan);

module.exports = router;

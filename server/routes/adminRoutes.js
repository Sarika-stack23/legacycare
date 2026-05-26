const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  verifyProvider,
  getUnverifiedProviders,
  getPlatformStats,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.use(protect, authorizeRoles("admin"));

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.put("/providers/:id/verify", verifyProvider);
router.get("/providers/unverified", getUnverifiedProviders);
router.get("/stats", getPlatformStats);

module.exports = router;

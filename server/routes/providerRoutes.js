const express = require("express");
const router = express.Router();
const {
  createProvider,
  getAllProviders,
  getProviderById,
  updateProvider,
  deleteProvider,
} = require("../controllers/providerController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", getAllProviders);
router.post("/", protect, createProvider);
router.get("/:id", getProviderById);
router.put("/:id", protect, updateProvider);
router.delete("/:id", protect, authorizeRoles("admin"), deleteProvider);

module.exports = router;

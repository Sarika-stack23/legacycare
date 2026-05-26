const User = require("../models/User");
const ServiceProvider = require("../models/ServiceProvider");
const FuneralPlan = require("../models/FuneralPlan");

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.deleteOne();
    res.json({ message: "User removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify service provider
// @route   PUT /api/admin/providers/:id/verify
// @access  Private/Admin
const verifyProvider = async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id);
    if (!provider) return res.status(404).json({ message: "Provider not found" });

    provider.isVerified = true;
    await provider.save();

    res.json({ message: "Provider verified", provider });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all unverified providers
// @route   GET /api/admin/providers/unverified
// @access  Private/Admin
const getUnverifiedProviders = async (req, res) => {
  try {
    const providers = await ServiceProvider.find({ isVerified: false });
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get platform stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getPlatformStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalPlans = await FuneralPlan.countDocuments();
    const completedPlans = await FuneralPlan.countDocuments({ isFinalized: true });
    const totalProviders = await ServiceProvider.countDocuments();
    const verifiedProviders = await ServiceProvider.countDocuments({ isVerified: true });

    res.json({
      totalUsers,
      totalPlans,
      completedPlans,
      totalProviders,
      verifiedProviders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  verifyProvider,
  getUnverifiedProviders,
  getPlatformStats,
};

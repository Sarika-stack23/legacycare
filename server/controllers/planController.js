const FuneralPlan = require("../models/FuneralPlan");

// @desc    Create funeral plan
// @route   POST /api/plans
// @access  Private
const createPlan = async (req, res) => {
  try {
    const plan = await FuneralPlan.create({ ...req.body, user: req.user._id });
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get my funeral plan
// @route   GET /api/plans/my
// @access  Private
const getMyPlan = async (req, res) => {
  try {
    const plan = await FuneralPlan.findOne({ user: req.user._id })
      .populate("selectedProviders.provider")
      .populate("nominee");
    if (!plan) return res.status(404).json({ message: "No plan found" });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get plan by ID
// @route   GET /api/plans/:id
// @access  Private
const getPlanById = async (req, res) => {
  try {
    const plan = await FuneralPlan.findById(req.params.id)
      .populate("selectedProviders.provider")
      .populate("nominee");
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update funeral plan
// @route   PUT /api/plans/:id
// @access  Private
const updatePlan = async (req, res) => {
  try {
    const plan = await FuneralPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    if (plan.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedPlan = await FuneralPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete funeral plan
// @route   DELETE /api/plans/:id
// @access  Private
const deletePlan = async (req, res) => {
  try {
    const plan = await FuneralPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    if (plan.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await plan.deleteOne();
    res.json({ message: "Plan removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all plans (Admin)
// @route   GET /api/plans
// @access  Private/Admin
const getAllPlans = async (req, res) => {
  try {
    const plans = await FuneralPlan.find()
      .populate("user", "name email")
      .populate("nominee");
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPlan,
  getMyPlan,
  getPlanById,
  updatePlan,
  deletePlan,
  getAllPlans,
};

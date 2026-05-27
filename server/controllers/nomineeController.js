const Nominee = require("../models/Nominee");
const FuneralPlan = require("../models/FuneralPlan");
const crypto = require("crypto");

// @desc    Add nominee
// @route   POST /api/nominees
// @access  Private
const addNominee = async (req, res) => {
  try {
    const accessCode = crypto.randomBytes(6).toString("hex").toUpperCase();
    const nominee = await Nominee.create({
      ...req.body,
      user: req.user._id,
      accessCode,
    });
    res.status(201).json(nominee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get my nominee
// @route   GET /api/nominees/my
// @access  Private
const getMyNominee = async (req, res) => {
  try {
    const nominee = await Nominee.findOne({ user: req.user._id });
    if (!nominee) return res.status(404).json({ message: "No nominee found" });
    res.json(nominee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Nominee access plan using access code
// @route   POST /api/nominees/access
// @access  Public
const nomineeAccess = async (req, res) => {
  try {
    const { accessCode } = req.body;
    const nominee = await Nominee.findOne({ accessCode });

    if (!nominee) {
      return res.status(404).json({ message: "Invalid access code" });
    }

    nominee.hasAccess = true;
    await nominee.save();

    // Fetch funeral plan of the user who owns this nominee
    const plan = await FuneralPlan.findOne({ user: nominee.user })
      .populate("selectedProviders.provider");

    res.json({ 
      message: "Access granted", 
      nominee,
      plan: plan || null
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update nominee
// @route   PUT /api/nominees/:id
// @access  Private
const updateNominee = async (req, res) => {
  try {
    const nominee = await Nominee.findById(req.params.id);
    if (!nominee) return res.status(404).json({ message: "Nominee not found" });

    if (nominee.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Nominee.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addNominee, getMyNominee, nomineeAccess, updateNominee };
const ServiceProvider = require("../models/ServiceProvider");

// @desc    Register as service provider
// @route   POST /api/providers
// @access  Private
const createProvider = async (req, res) => {
  try {
    const provider = await ServiceProvider.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all verified providers
// @route   GET /api/providers
// @access  Public
const getAllProviders = async (req, res) => {
  try {
    const { serviceType } = req.query;
    const filter = { isVerified: true };
    if (serviceType) filter.serviceType = serviceType;

    const providers = await ServiceProvider.find(filter);
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single provider
// @route   GET /api/providers/:id
// @access  Public
const getProviderById = async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id);
    if (!provider) return res.status(404).json({ message: "Provider not found" });
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update provider profile
// @route   PUT /api/providers/:id
// @access  Private
const updateProvider = async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id);
    if (!provider) return res.status(404).json({ message: "Provider not found" });

    if (provider.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await ServiceProvider.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete provider
// @route   DELETE /api/providers/:id
// @access  Private/Admin
const deleteProvider = async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id);
    if (!provider) return res.status(404).json({ message: "Provider not found" });
    await provider.deleteOne();
    res.json({ message: "Provider removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProvider,
  getAllProviders,
  getProviderById,
  updateProvider,
  deleteProvider,
};

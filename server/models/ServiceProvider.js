const mongoose = require("mongoose");

const serviceProviderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    businessName: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
    },
    serviceType: {
      type: String,
      enum: ["funeral_agency", "transportation", "flowers", "catering", "priest", "other"],
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    pricing: {
      basePrice: { type: Number, default: 0 },
      pricingDetails: { type: String },
    },
    availability: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceProvider", serviceProviderSchema);

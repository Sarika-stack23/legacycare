const mongoose = require("mongoose");

const funeralPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "My Funeral Plan",
    },
    // Preferences
    preferredLocation: {
      type: String,
      trim: true,
    },
    ritualType: {
      type: String,
      enum: ["religious", "non-religious", "custom"],
      default: "religious",
    },
    religion: {
      type: String,
      trim: true,
    },
    priestPreference: {
      type: String,
      trim: true,
    },
    ceremonyInstructions: {
      music: { type: String },
      prayers: { type: String },
      customs: { type: String },
      additionalNotes: { type: String },
    },
    // Service Providers selected
    selectedProviders: [
      {
        provider: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ServiceProvider",
        },
        serviceType: String,
      },
    ],
    // Budget
    budgetEstimate: {
      type: Number,
      default: 0,
    },
    // Nominee assigned
    nominee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nominee",
    },
    // Plan status
    status: {
      type: String,
      enum: ["draft", "active", "executed"],
      default: "draft",
    },
    isFinalized: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FuneralPlan", funeralPlanSchema);

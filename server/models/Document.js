const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FuneralPlan",
    },
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
    },
    fileSize: {
      type: Number,
    },
    filePath: {
      type: String,
      required: true,
    },
    documentType: {
      type: String,
      enum: ["will", "insurance", "instructions", "photo", "other"],
      default: "other",
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);

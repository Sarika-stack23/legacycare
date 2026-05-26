const mongoose = require("mongoose");

const nomineeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Nominee name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Nominee email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    relationship: {
      type: String,
      trim: true,
    },
    accessCode: {
      type: String,
      unique: true,
    },
    hasAccess: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Nominee", nomineeSchema);

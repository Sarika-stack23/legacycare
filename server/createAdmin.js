const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    const adminExists = await User.findOne({ email: "admin@legacycare.com" });
    if (adminExists) {
      console.log("Admin already exists ✅");
      mongoose.connection.close();
      return;
    }

    const admin = await User.create({
      name: "Admin LegacyCare",
      email: "admin@legacycare.com",
      password: "Admin@123",
      role: "admin",
      isVerified: true,
    });

    console.log("Admin created successfully ✅");
    console.log("Email: admin@legacycare.com");
    console.log("Password: Admin@123");
    mongoose.connection.close();
    console.log("Done! 🎉");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

createAdmin();
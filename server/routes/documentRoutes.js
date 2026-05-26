const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  uploadDocument,
  getMyDocuments,
  deleteDocument,
} = require("../controllers/documentController");
const { protect } = require("../middleware/authMiddleware");

// Multer Storage Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s/g, "_")}`;
    cb(null, uniqueName);
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
  ];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, DOCX, JPG, PNG files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.get("/", protect, getMyDocuments);
router.post("/", protect, upload.single("file"), uploadDocument);
router.delete("/:id", protect, deleteDocument);

module.exports = router;

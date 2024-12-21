const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/productController");
const verifyToken = require("../middleware/authMiddleware");

// Multer ayarları
const storage = multer.memoryStorage(); // Bellekte resimleri sakla
const upload = multer({ storage: storage });

router.post("/", upload.single("image"), addProduct); 
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;

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

//Multer Ayarları
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("image"), verifyToken, addProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.put("/:id", upload.single("image"), verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;

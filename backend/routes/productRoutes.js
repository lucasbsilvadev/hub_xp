const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById); // Rota para buscar produto por ID
router.post("/", productController.createProduct);
router.get("/category/:categoryId", productController.getProductsByCategory); // Rota para filtrar por categoria
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
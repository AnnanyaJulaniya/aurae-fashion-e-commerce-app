const pool = require("../config/db");

// Helper to normalize product row 
const formatProduct = (product) => {
  if (!product) return null;
  let parsedSizes = product.sizes;
  if (typeof parsedSizes === "string") {
    try {
      parsedSizes = JSON.parse(parsedSizes);
    } catch {
      parsedSizes = [];
    }
  }
  return {
    ...product,
    price: Number(product.price),
    stock: Number(product.stock),
    featured: Boolean(product.featured),
    sizes: Array.isArray(parsedSizes) ? parsedSizes : [],
  };
};


const getProducts = async (req, res, next) => {
  try {
    const { search, category, minPrice, maxPrice, sort } = req.query;

    let sql = "SELECT * FROM products WHERE 1=1";
    const params = [];

    // Search by product name or description
    if (search && search.trim() !== "") {
      sql += " AND (LOWER(name) LIKE ? OR LOWER(description) LIKE ?)";
      const term = `%${search.trim().toLowerCase()}%`;
      params.push(term, term);
    }

    // Category filter
    if (category && category.trim() !== "" && category.toLowerCase() !== "all") {
      sql += " AND LOWER(category) = LOWER(?)";
      params.push(category.trim());
    }

    // Min price filter
    if (minPrice !== undefined && minPrice !== "" && !isNaN(minPrice)) {
      sql += " AND price >= ?";
      params.push(Number(minPrice));
    }

    // Max price filter
    if (maxPrice !== undefined && maxPrice !== "" && !isNaN(maxPrice)) {
      sql += " AND price <= ?";
      params.push(Number(maxPrice));
    }

    // Sorting
    switch (sort) {
      case "price_asc":
        sql += " ORDER BY price ASC";
        break;
      case "price_desc":
        sql += " ORDER BY price DESC";
        break;
      case "newest":
        sql += " ORDER BY created_at DESC";
        break;
      case "recommended":
      default:
        sql += " ORDER BY featured DESC, id ASC";
        break;
    }

    const [rows] = await pool.query(sql, params);
    const products = rows.map(formatProduct);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};


const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: formatProduct(rows[0]),
    });
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, image, sizes, stock, featured } = req.body;

    // Field Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ success: false, message: "Product name is required" });
    }
    if (!description || typeof description !== "string" || description.trim() === "") {
      return res.status(400).json({ success: false, message: "Product description is required" });
    }
    if (price === undefined || isNaN(price) || Number(price) <= 0) {
      return res.status(400).json({ success: false, message: "Price must be a valid number greater than 0" });
    }
    if (!category || typeof category !== "string" || category.trim() === "") {
      return res.status(400).json({ success: false, message: "Category is required" });
    }
    if (!image || typeof image !== "string" || image.trim() === "") {
      return res.status(400).json({ success: false, message: "Product image URL is required" });
    }
    if (!Array.isArray(sizes) || sizes.length === 0) {
      return res.status(400).json({ success: false, message: "At least one size must be specified" });
    }
    if (stock === undefined || isNaN(stock) || Number(stock) < 0) {
      return res.status(400).json({ success: false, message: "Stock must be a non-negative number" });
    }

    const cleanSizes = JSON.stringify(sizes.map((s) => String(s).trim()));
    const isFeatured = featured === true || featured === 1 || featured === "true";

    const sql = `
      INSERT INTO products (name, description, price, category, image, sizes, stock, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(sql, [
      name.trim(),
      description.trim(),
      Number(price),
      category.trim(),
      image.trim(),
      cleanSizes,
      parseInt(stock, 10),
      isFeatured ? 1 : 0,
    ]);

    const [newRow] = await pool.query("SELECT * FROM products WHERE id = ?", [result.insertId]);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: formatProduct(newRow[0]),
    });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    // Check if product exists
    const [existing] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const { name, description, price, category, image, sizes, stock, featured } = req.body;

    // Field Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ success: false, message: "Product name cannot be empty" });
    }
    if (!description || typeof description !== "string" || description.trim() === "") {
      return res.status(400).json({ success: false, message: "Product description cannot be empty" });
    }
    if (price === undefined || isNaN(price) || Number(price) <= 0) {
      return res.status(400).json({ success: false, message: "Price must be a valid number greater than 0" });
    }
    if (!category || typeof category !== "string" || category.trim() === "") {
      return res.status(400).json({ success: false, message: "Category cannot be empty" });
    }
    if (!image || typeof image !== "string" || image.trim() === "") {
      return res.status(400).json({ success: false, message: "Image URL cannot be empty" });
    }
    if (!Array.isArray(sizes) || sizes.length === 0) {
      return res.status(400).json({ success: false, message: "At least one size must be selected" });
    }
    if (stock === undefined || isNaN(stock) || Number(stock) < 0) {
      return res.status(400).json({ success: false, message: "Stock must be 0 or greater" });
    }

    const cleanSizes = JSON.stringify(sizes.map((s) => String(s).trim()));
    const isFeatured = featured === true || featured === 1 || featured === "true";

    const sql = `
      UPDATE products
      SET name = ?, description = ?, price = ?, category = ?, image = ?, sizes = ?, stock = ?, featured = ?
      WHERE id = ?
    `;

    await pool.query(sql, [
      name.trim(),
      description.trim(),
      Number(price),
      category.trim(),
      image.trim(),
      cleanSizes,
      parseInt(stock, 10),
      isFeatured ? 1 : 0,
      id,
    ]);

    const [updatedRow] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: formatProduct(updatedRow[0]),
    });
  } catch (err) {
    next(err);
  }
};


const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const [existing] = await pool.query("SELECT id FROM products WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    await pool.query("DELETE FROM products WHERE id = ?", [id]);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

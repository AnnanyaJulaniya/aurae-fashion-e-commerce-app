import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  AlertTriangle,
  X,
  Search,
} from "lucide-react";
import api from "../services/api";
import Toast from "../components/Toast";
import { formatPrice } from "../components/ProductCard";

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "One Size"];

const CATEGORIES = [
  "Dresses",
  "Tops",
  "Bottoms",
  "Outerwear",
  "Accessories",
];

export const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Admin table search/filter
  const [tableSearch, setTableSearch] = useState("");
  const [tableCategory, setTableCategory] = useState("");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingId, setEditingId] = useState(null);

  // Product form
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Dresses",
    image: "",
    sizes: ["S", "M", "L"],
    stock: "10",
    featured: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Toast
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const triggerToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });
  };

  // --------------------------------------------------
  // LOAD PRODUCTS
  // --------------------------------------------------

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.getProducts({
        sort: "newest",
      });

      if (res.success) {
        setProducts(res.data);
      } else {
        setError("Failed to load product catalog.");
      }
    } catch (err) {
      console.error("Admin fetch error:", err);
      setError(err.message || "Failed to load product catalog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // --------------------------------------------------
  // CREATE MODAL
  // --------------------------------------------------

  const handleOpenCreate = () => {
    setModalMode("create");
    setEditingId(null);

    setFormData({
      name: "",
      description: "",
      price: "",
      category: "Dresses",
      image: "",
      sizes: ["S", "M", "L"],
      stock: "10",
      featured: false,
    });

    setFormErrors({});
    setIsModalOpen(true);
  };

  // --------------------------------------------------
  // EDIT MODAL
  // --------------------------------------------------

  const handleOpenEdit = (product) => {
    setModalMode("edit");
    setEditingId(product.id);

    setFormData({
      name: product.name || "",
      description: product.description || "",
      price:
        product.price !== undefined && product.price !== null
          ? String(product.price)
          : "",
      category: product.category || "Dresses",
      image: product.image || "",
      sizes: Array.isArray(product.sizes) ? product.sizes : [],
      stock:
        product.stock !== undefined && product.stock !== null
          ? String(product.stock)
          : "0",
      featured: Boolean(product.featured),
    });

    setFormErrors({});
    setIsModalOpen(true);
  };

  // --------------------------------------------------
  // SIZE TOGGLE
  // --------------------------------------------------

  const handleSizeToggle = (size) => {
    setFormData((previous) => {
      const exists = previous.sizes.includes(size);

      const updatedSizes = exists
        ? previous.sizes.filter((item) => item !== size)
        : [...previous.sizes, size];

      return {
        ...previous,
        sizes: updatedSizes,
      };
    });
  };

  // --------------------------------------------------
  // FORM VALIDATION
  // --------------------------------------------------

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Product name is required.";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required.";
    }

    if (
      formData.price === "" ||
      isNaN(formData.price) ||
      Number(formData.price) <= 0
    ) {
      errors.price = "Price must be a number greater than 0.";
    }

    if (!formData.category.trim()) {
      errors.category = "Category is required.";
    }

    if (!formData.image.trim()) {
      errors.image = "Product image URL is required.";
    } else if (
      !formData.image.startsWith("http://") &&
      !formData.image.startsWith("https://")
    ) {
      errors.image = "Please enter a valid HTTP/HTTPS image URL.";
    }

    if (!formData.sizes || formData.sizes.length === 0) {
      errors.sizes = "At least one size must be selected.";
    }

    if (
      formData.stock === "" ||
      isNaN(formData.stock) ||
      Number(formData.stock) < 0
    ) {
      errors.stock = "Stock must be 0 or a positive number.";
    }

    return errors;
  };

  // --------------------------------------------------
  // CREATE / UPDATE PRODUCT
  // --------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    try {
      setSubmitting(true);

      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        category: formData.category,
        image: formData.image.trim(),
        sizes: formData.sizes,
        stock: parseInt(formData.stock, 10),
        featured: formData.featured,
      };

      if (modalMode === "create") {
        const response = await api.createProduct(payload);

        if (response.success) {
          triggerToast("Product created successfully.");
          setIsModalOpen(false);
          await loadProducts();
        }
      } else {
        const response = await api.updateProduct(editingId, payload);

        if (response.success) {
          triggerToast("Product updated successfully.");
          setIsModalOpen(false);
          await loadProducts();
        }
      }
    } catch (err) {
      console.error("Admin save error:", err);

      triggerToast(
        err.message || "Failed to save product.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // --------------------------------------------------
  // DELETE PRODUCT
  // --------------------------------------------------

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      setDeleting(true);

      const response = await api.deleteProduct(deleteTarget.id);

      if (response.success) {
        triggerToast(
          `"${deleteTarget.name}" deleted from catalog.`
        );

        setDeleteTarget(null);

        await loadProducts();
      }
    } catch (err) {
      console.error("Delete error:", err);

      triggerToast(
        err.message || "Failed to delete product.",
        "error"
      );
    } finally {
      setDeleting(false);
    }
  };

  // --------------------------------------------------
  // ADMIN TABLE FILTERING
  // --------------------------------------------------

  const filteredProducts = products.filter((product) => {
    const searchTerm = tableSearch.trim().toLowerCase();

    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm);

    const matchesCategory =
      !tableCategory ||
      product.category.toLowerCase() ===
        tableCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Toast */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({
              show: false,
              message: "",
              type: "success",
            })
          }
        />
      )}

      {/* ------------------------------------------------
          HEADER
      ------------------------------------------------ */}

      <div className="mb-8 pb-6 border-b border-brand-border flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-editorial uppercase font-semibold text-brand-taupe block mb-1">
            Backstage Atelier
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-light text-brand-dark">
            Product Management
          </h1>

          <p className="text-xs text-brand-muted mt-1 tracking-wide">
            Manage your MySQL fashion catalog. Create, edit, and
            adjust inventory levels in real-time.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-dark text-brand-canvas text-xs tracking-editorial uppercase font-medium hover:bg-brand-accent transition-colors shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* ------------------------------------------------
          TABLE FILTERS
      ------------------------------------------------ */}

      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-brand-taupe absolute left-3.5 top-3 pointer-events-none" />

          <input
            id="admin-search"
            name="adminSearch"
            type="search"
            placeholder="Search catalog table..."
            value={tableSearch}
            onChange={(event) =>
              setTableSearch(event.target.value)
            }
            autoComplete="off"
            className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-brand-border focus:outline-none focus:border-brand-dark"
            aria-label="Search admin product catalog"
          />
        </div>

        <select
          id="admin-category"
          name="adminCategory"
          value={tableCategory}
          onChange={(event) =>
            setTableCategory(event.target.value)
          }
          className="px-3 py-2 text-xs bg-white border border-brand-border text-brand-dark focus:outline-none focus:border-brand-dark"
          aria-label="Filter admin products by category"
        >
          <option value="">All Categories</option>

          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* ------------------------------------------------
          PRODUCT TABLE
      ------------------------------------------------ */}

      <div className="bg-white border border-brand-border shadow-subtle overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-brand-taupe tracking-wide animate-pulse">
            Connecting to MySQL &amp; loading catalog...
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-xs text-brand-red mb-4">
              {error}
            </p>

            <button
              type="button"
              onClick={loadProducts}
              className="px-4 py-2 bg-brand-dark text-white text-xs uppercase tracking-editorial"
            >
              Retry
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-xs text-brand-taupe">
            No products match the filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-sand/60 border-b border-brand-border text-[10px] tracking-editorial uppercase text-brand-dark font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Piece</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Sizes</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-brand-border/60">
                {filteredProducts.map((product) => {
                  const isOutOfStock = product.stock === 0;
                  const isLowStock =
                    product.stock > 0 && product.stock <= 5;

                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-brand-sand/30 transition-colors"
                    >
                      {/* Product */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            className="w-10 h-12 object-cover object-center bg-stone-100 border border-brand-border/60 shrink-0"
                          />

                          <div>
                            <span className="font-serif text-sm font-medium text-brand-dark block">
                              {product.name}
                            </span>

                            <span className="text-[10px] text-brand-taupe block">
                              ID #{product.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-brand-muted">
                        {product.category}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 font-medium text-brand-dark">
                        {formatPrice(product.price)}
                      </td>

                      {/* Sizes */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(product.sizes) &&
                            product.sizes.map((size) => (
                              <span
                                key={size}
                                className="px-1.5 py-0.5 bg-brand-sand text-[10px] text-brand-dark uppercase font-medium"
                              >
                                {size}
                              </span>
                            ))}
                        </div>
                      </td>

                      {/* Stock */}
                      <td className="py-3.5 px-4">
                        {isOutOfStock ? (
                          <span className="inline-flex items-center px-2 py-0.5 bg-red-100 text-brand-red text-[10px] font-semibold uppercase">
                            Out of Stock (0)
                          </span>
                        ) : isLowStock ? (
                          <span className="inline-flex items-center px-2 py-0.5 bg-amber-100 text-brand-amber text-[10px] font-semibold uppercase">
                            Low Stock ({product.stock})
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 bg-emerald-50 text-brand-green text-[10px] font-semibold uppercase">
                            In Stock ({product.stock})
                          </span>
                        )}
                      </td>

                      {/* Featured */}
                      <td className="py-3.5 px-4">
                        {product.featured ? (
                          <span className="text-emerald-700 font-medium">
                            Yes
                          </span>
                        ) : (
                          <span className="text-stone-400">
                            No
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenEdit(product)
                            }
                            className="p-1.5 text-stone-600 hover:text-brand-dark transition-colors"
                            title="Edit product"
                            aria-label={`Edit ${product.name}`}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteTarget(product)
                            }
                            className="p-1.5 text-stone-400 hover:text-brand-red transition-colors"
                            title="Delete product"
                            aria-label={`Delete ${product.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ------------------------------------------------
          CREATE / EDIT MODAL
      ------------------------------------------------ */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-brand-border w-full max-w-xl shadow-2xl p-6 sm:p-8 my-8 relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-6">
              <h2 className="font-serif text-xl sm:text-2xl font-light text-brand-dark">
                {modalMode === "create"
                  ? "Add New Piece"
                  : "Edit Piece"}
              </h2>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-stone-400 hover:text-brand-dark"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Product Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              noValidate
            >
              {/* Product Name */}
              <div>
                <label
                  htmlFor="product-name"
                  className="block text-[11px] tracking-editorial uppercase font-semibold text-brand-taupe mb-1"
                >
                  Product Name *
                </label>

                <input
                  id="product-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      name: event.target.value,
                    })
                  }
                  placeholder="e.g. Linen Oversized Shirt"
                  autoComplete="off"
                  className="w-full px-3 py-2 text-xs bg-brand-canvas border border-brand-border focus:outline-none focus:border-brand-dark"
                  aria-invalid={Boolean(formErrors.name)}
                  aria-describedby={
                    formErrors.name
                      ? "product-name-error"
                      : undefined
                  }
                />

                {formErrors.name && (
                  <p
                    id="product-name-error"
                    className="text-[11px] text-brand-red mt-1"
                  >
                    {formErrors.name}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="product-description"
                  className="block text-[11px] tracking-editorial uppercase font-semibold text-brand-taupe mb-1"
                >
                  Description *
                </label>

                <textarea
                  id="product-description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      description: event.target.value,
                    })
                  }
                  placeholder="Detailed tailoring notes, fabric composition, and silhouette..."
                  className="w-full px-3 py-2 text-xs bg-brand-canvas border border-brand-border focus:outline-none focus:border-brand-dark"
                  aria-invalid={Boolean(
                    formErrors.description
                  )}
                  aria-describedby={
                    formErrors.description
                      ? "product-description-error"
                      : undefined
                  }
                />

                {formErrors.description && (
                  <p
                    id="product-description-error"
                    className="text-[11px] text-brand-red mt-1"
                  >
                    {formErrors.description}
                  </p>
                )}
              </div>

              {/* Price + Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Price */}
                <div>
                  <label
                    htmlFor="product-price"
                    className="block text-[11px] tracking-editorial uppercase font-semibold text-brand-taupe mb-1"
                  >
                    Price (INR ₹) *
                  </label>

                  <input
                    id="product-price"
                    name="price"
                    type="number"
                    step="1"
                    min="1"
                    value={formData.price}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        price: event.target.value,
                      })
                    }
                    placeholder="2499"
                    className="w-full px-3 py-2 text-xs bg-brand-canvas border border-brand-border focus:outline-none focus:border-brand-dark"
                    aria-invalid={Boolean(formErrors.price)}
                    aria-describedby={
                      formErrors.price
                        ? "product-price-error"
                        : undefined
                    }
                  />

                  {formErrors.price && (
                    <p
                      id="product-price-error"
                      className="text-[11px] text-brand-red mt-1"
                    >
                      {formErrors.price}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="product-category"
                    className="block text-[11px] tracking-editorial uppercase font-semibold text-brand-taupe mb-1"
                  >
                    Category *
                  </label>

                  <select
                    id="product-category"
                    name="category"
                    value={formData.category}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        category: event.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-brand-canvas border border-brand-border text-brand-dark focus:outline-none focus:border-brand-dark"
                  >
                    {CATEGORIES.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label
                  htmlFor="product-image"
                  className="block text-[11px] tracking-editorial uppercase font-semibold text-brand-taupe mb-1"
                >
                  Image URL *
                </label>

                <input
                  id="product-image"
                  name="image"
                  type="url"
                  value={formData.image}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      image: event.target.value,
                    })
                  }
                  placeholder="https://images.unsplash.com/..."
                  autoComplete="url"
                  className="w-full px-3 py-2 text-xs bg-brand-canvas border border-brand-border focus:outline-none focus:border-brand-dark"
                  aria-invalid={Boolean(formErrors.image)}
                  aria-describedby={
                    formErrors.image
                      ? "product-image-error"
                      : undefined
                  }
                />

                {formErrors.image && (
                  <p
                    id="product-image-error"
                    className="text-[11px] text-brand-red mt-1"
                  >
                    {formErrors.image}
                  </p>
                )}
              </div>

              {/* Sizes */}
              <fieldset>
                <legend className="block text-[11px] tracking-editorial uppercase font-semibold text-brand-taupe mb-1">
                  Available Sizes *
                </legend>

                <div className="flex flex-wrap gap-2 pt-1">
                  {ALL_SIZES.map((size) => {
                    const checked =
                      formData.sizes.includes(size);

                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() =>
                          handleSizeToggle(size)
                        }
                        className={
                          "px-3 py-1 text-xs border uppercase transition-colors " +
                          (checked
                            ? "bg-brand-dark text-white border-brand-dark font-medium"
                            : "bg-white text-brand-dark border-brand-border hover:border-brand-dark")
                        }
                        aria-pressed={checked}
                        aria-label={`${
                          checked ? "Remove" : "Select"
                        } size ${size}`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                {formErrors.sizes && (
                  <p className="text-[11px] text-brand-red mt-1">
                    {formErrors.sizes}
                  </p>
                )}
              </fieldset>

              {/* Stock + Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                {/* Stock */}
                <div>
                  <label
                    htmlFor="product-stock"
                    className="block text-[11px] tracking-editorial uppercase font-semibold text-brand-taupe mb-1"
                  >
                    Stock Inventory Units *
                  </label>

                  <input
                    id="product-stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        stock: event.target.value,
                      })
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 text-xs bg-brand-canvas border border-brand-border focus:outline-none focus:border-brand-dark"
                    aria-invalid={Boolean(formErrors.stock)}
                    aria-describedby={
                      formErrors.stock
                        ? "product-stock-error"
                        : undefined
                    }
                  />

                  {formErrors.stock && (
                    <p
                      id="product-stock-error"
                      className="text-[11px] text-brand-red mt-1"
                    >
                      {formErrors.stock}
                    </p>
                  )}
                </div>

                {/* Featured */}
                <div className="pt-4 sm:pt-6">
                  <div className="flex items-center gap-2">
                    <input
                      id="product-featured"
                      name="featured"
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          featured: event.target.checked,
                        })
                      }
                      className="w-4 h-4 text-brand-dark border-brand-border rounded focus:ring-0"
                    />

                    <label
                      htmlFor="product-featured"
                      className="text-xs text-brand-dark font-medium cursor-pointer"
                    >
                      Feature on Home Page
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-6 border-t border-brand-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-xs tracking-editorial uppercase text-brand-taupe hover:text-brand-dark transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-brand-dark text-white text-xs tracking-editorial uppercase font-medium hover:bg-brand-accent transition-colors disabled:opacity-50"
                >
                  {submitting
                    ? "Saving..."
                    : modalMode === "create"
                    ? "Create Piece"
                    : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------
          DELETE CONFIRMATION
      ------------------------------------------------ */}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-sm">
          <div className="bg-white border border-brand-border w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-brand-red">
              <AlertTriangle className="w-5 h-5 shrink-0" />

              <h3 className="font-serif text-lg font-medium text-brand-dark">
                Confirm Deletion
              </h3>
            </div>

            <p className="text-xs text-brand-muted leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <strong className="text-brand-dark font-semibold">
                "{deleteTarget.name}"
              </strong>{" "}
              from the MySQL database? This action cannot be
              undone.
            </p>

            <div className="pt-4 border-t border-brand-border flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-xs tracking-editorial uppercase text-brand-taupe hover:text-brand-dark transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="px-5 py-2 bg-brand-red text-white text-xs tracking-editorial uppercase font-medium hover:bg-red-800 transition-colors disabled:opacity-50"
              >
                {deleting
                  ? "Deleting..."
                  : "Delete Piece"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;


import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import QuantitySelector from "../components/QuantitySelector";
import { DetailSkeleton } from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import Toast from "../components/Toast";
import { formatPrice } from "../components/ProductCard";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Fetch product from backend API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.getProduct(id);
        if (res.success && res.data) {
          setProduct(res.data);
          // Pre-select size if only one size exists (e.g. "One Size")
          if (Array.isArray(res.data.sizes) && res.data.sizes.length === 1) {
            setSelectedSize(res.data.sizes[0]);
          }
        } else {
          throw new Error("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(err.message || "Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <DetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ErrorState
          message={error || "The requested piece could not be found in our catalog."}
          onRetry={() => navigate("/shop")}
        />
      </div>
    );
  }

  const { name, description, price, category, image, sizes = [], stock } = product;
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;

  const handleAddToCart = () => {
    // Validation: Size must be selected
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);

    if (isOutOfStock) return;

    const result = addToCart(product, selectedSize, quantity);
    if (result.success) {
      setToast({
        show: true,
        message: `Added ${quantity} × ${name} (${selectedSize}) to your bag.`,
        type: "success",
      });
    } else {
      setToast({
        show: true,
        message: result.message || "Could not add item to bag.",
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: "", type: "success" })}
        />
      )}

      {/* Back to Shop link */}
      <div className="mb-6">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs tracking-editorial uppercase text-brand-taupe hover:text-brand-dark transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Collection</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Large Product Image */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[3/4] bg-stone-100 border border-brand-border/60 overflow-hidden shadow-subtle">
            <img
              src={image}
              alt={name}
              className={
                "w-full h-full object-cover object-center " +
                (isOutOfStock ? "grayscale opacity-80" : "")
              }
            />
            {isOutOfStock && (
              <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-[2px] flex items-center justify-center">
                <span className="px-6 py-2.5 bg-brand-dark text-white text-xs tracking-editorial uppercase font-medium">
                  Sold Out
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Product Information & Purchase Section */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-[10px] tracking-editorial uppercase text-brand-taupe block mb-1">
              {category}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-brand-dark">
              {name}
            </h1>
            <p className="font-sans text-xl sm:text-2xl font-medium text-brand-dark mt-3">
              {formatPrice(price)}
            </p>
          </div>

          {/* Stock Status Pill */}
          <div className="flex items-center gap-2 pt-1">
            {isOutOfStock ? (
              <span className="inline-flex items-center px-2.5 py-1 bg-red-50 border border-red-200 text-brand-red text-xs font-medium">
                Out of Stock &bull; Currently Unavailable
              </span>
            ) : isLowStock ? (
              <span className="inline-flex items-center px-2.5 py-1 bg-amber-50 border border-amber-200 text-brand-amber text-xs font-medium">
                Low Stock &bull; Only {stock} remaining
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs text-brand-green font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>In Stock &bull; Ready to Ship</span>
              </span>
            )}
          </div>

          {/* Description */}
          <div className="pt-2 border-t border-brand-border/60">
            <h3 className="text-[11px] tracking-editorial uppercase font-semibold text-brand-taupe mb-2">
              Description &amp; Fit
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans tracking-wide">
              {description}
            </p>
          </div>

          {/* Size Selection */}
          <div className="pt-2 border-t border-brand-border/60">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] tracking-editorial uppercase font-semibold text-brand-taupe">
                Select Size <span className="text-brand-red">*</span>
              </h3>
              <span className="text-[11px] text-brand-taupe underline cursor-pointer">
                Sizing Guide
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    disabled={isOutOfStock}
                    className={
                      "min-w-[44px] h-11 px-3.5 border text-xs font-medium uppercase tracking-wider transition-all flex items-center justify-center " +
                      (isSelected
                        ? "border-brand-dark bg-brand-dark text-white shadow-sm"
                        : "border-brand-border bg-white text-brand-dark hover:border-brand-dark disabled:opacity-40 disabled:cursor-not-allowed")
                    }
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            {sizeError && (
              <p className="text-xs text-brand-red mt-2 tracking-wide">
                Please select an available size to proceed.
              </p>
            )}
          </div>

          {/* Quantity Selection & Add to Cart */}
          <div className="pt-2 border-t border-brand-border/60 space-y-4">
            <div>
              <h3 className="text-[11px] tracking-editorial uppercase font-semibold text-brand-taupe mb-2">
                Quantity
              </h3>
              <QuantitySelector
                quantity={quantity}
                maxStock={stock}
                onIncrease={() => setQuantity((q) => Math.min(q + 1, stock))}
                onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
                disabled={isOutOfStock}
              />
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full py-4 bg-brand-dark text-brand-canvas text-xs tracking-editorial uppercase font-semibold hover:bg-brand-accent disabled:bg-stone-300 disabled:cursor-not-allowed transition-all duration-300 shadow-md"
            >
              {isOutOfStock ? "Sold Out" : "Add to Shopping Bag"}
            </button>
          </div>

          {/* Value Highlights */}
          <div className="pt-6 border-t border-brand-border/60 grid grid-cols-1 gap-3 text-xs text-brand-taupe">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-brand-dark shrink-0" />
              <span>Complimentary insured shipping across India</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-brand-dark shrink-0" />
              <span>Complimentary 14-day exchange &amp; returns</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-brand-dark shrink-0" />
              <span>Ethically crafted in certified small-batch ateliers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

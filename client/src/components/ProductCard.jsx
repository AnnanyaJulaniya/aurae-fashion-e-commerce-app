import React from "react";
import { Link } from "react-router-dom";

export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

export const ProductCard = ({ product }) => {
  const { id, name, category, price, image, stock } = product;

  // Stock Status Logic
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;

  return (
    <div className="group flex flex-col bg-white border border-brand-border/70 overflow-hidden transition-all duration-300 hover:shadow-card">
      <Link to={`/products/${id}`} className="relative block overflow-hidden aspect-[3/4] bg-stone-100">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className={
            "w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 " +
            (isOutOfStock ? "grayscale opacity-75" : "")
          }
        />

        {/* Stock Status Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isOutOfStock && (
            <span className="px-2.5 py-1 bg-stone-900/90 backdrop-blur-sm text-brand-canvas text-[10px] tracking-editorial uppercase font-medium">
              Sold Out
            </span>
          )}
          {isLowStock && (
            <span className="px-2.5 py-1 bg-amber-800/90 backdrop-blur-sm text-brand-canvas text-[10px] tracking-editorial uppercase font-medium">
              Only {stock} Left
            </span>
          )}
          {!isOutOfStock && !isLowStock && (
            <span className="px-2 py-0.5 bg-white/85 backdrop-blur-sm text-brand-dark text-[9px] tracking-editorial uppercase font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              In Stock
            </span>
          )}
        </div>
      </Link>

      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <span className="text-[10px] tracking-editorial uppercase text-brand-taupe block mb-1">
            {category}
          </span>
          <Link
            to={`/products/${id}`}
            className="font-serif text-base sm:text-lg font-medium text-brand-dark hover:text-brand-accent transition-colors line-clamp-1"
          >
            {name}
          </Link>
        </div>

        <div className="mt-4 pt-3 border-t border-brand-border/40 flex items-center justify-between">
          <span className="font-sans font-medium text-sm sm:text-base text-brand-dark">
            {formatPrice(price)}
          </span>

          <Link
            to={`/products/${id}`}
            className="text-[11px] tracking-editorial uppercase font-medium text-brand-dark group-hover:text-brand-accent transition-colors"
          >
            {isOutOfStock ? "View" : "Details &rarr;"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

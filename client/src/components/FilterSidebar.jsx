import React from "react";
import { SlidersHorizontal, RotateCcw, X } from "lucide-react";

export const CATEGORIES = [
  "All",
  "Dresses",
  "Tops",
  "Bottoms",
  "Outerwear",
  "Accessories",
];

export const PRICE_PRESETS = [
  { label: "All Prices", min: "", max: "" },
  { label: "Under ₹2,000", min: "", max: "2000" },
  { label: "₹2,000 – ₹3,500", min: "2000", max: "3500" },
  { label: "₹3,500 – ₹5,000", min: "3500", max: "5000" },
  { label: "Above ₹5,000", min: "5000", max: "" },
];

export const SORT_OPTIONS = [
  { value: "recommended", label: "Curated (Recommended)" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest Arrivals" },
];

export const FilterSidebar = ({
  selectedCategory,
  onSelectCategory,
  minPrice,
  maxPrice,
  onPriceChange,
  sort,
  onSortChange,
  onResetFilters,
  hasActiveFilters,
  isOpenOnMobile,
  onCloseMobile,
}) => {
  // Check if current min/max matches any preset
  const isPresetActive = (preset) => {
    return String(minPrice || "") === preset.min && String(maxPrice || "") === preset.max;
  };

  const content = (
    <div className="space-y-8 text-brand-dark">
      {/* Header with Clear Button */}
      <div className="flex items-center justify-between pb-4 border-b border-brand-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-brand-taupe" />
          <span className="text-xs tracking-editorial uppercase font-semibold">
            Refine By
          </span>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1 text-[11px] tracking-editorial uppercase text-brand-taupe hover:text-brand-accent transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Section */}
      <div className="space-y-3">
        <h4 className="text-[11px] tracking-editorial uppercase font-semibold text-brand-taupe">
          Category
        </h4>
        <div className="flex flex-col space-y-2">
          {CATEGORIES.map((cat) => {
            const isSelected =
              (cat === "All" && (!selectedCategory || selectedCategory === "All")) ||
              selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat === "All" ? "" : cat)}
                className={
                  "text-left text-xs py-1.5 px-2 transition-all flex items-center justify-between " +
                  (isSelected
                    ? "bg-brand-sand font-semibold text-brand-dark"
                    : "text-brand-muted hover:text-brand-dark hover:bg-white")
                }
              >
                <span>{cat}</span>
                {isSelected && <span className="text-[10px]">&bull;</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Presets Section */}
      <div className="space-y-3">
        <h4 className="text-[11px] tracking-editorial uppercase font-semibold text-brand-taupe">
          Price Range
        </h4>
        <div className="flex flex-col space-y-1.5">
          {PRICE_PRESETS.map((preset, idx) => {
            const active = isPresetActive(preset);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onPriceChange(preset.min, preset.max)}
                className={
                  "text-left text-xs py-1.5 px-2 transition-all flex items-center justify-between " +
                  (active
                    ? "bg-brand-sand font-semibold text-brand-dark"
                    : "text-brand-muted hover:text-brand-dark hover:bg-white")
                }
              >
                <span>{preset.label}</span>
                {active && <span className="text-[10px]">&bull;</span>}
              </button>
            );
          })}
        </div>

        {/* Custom Min / Max Price Inputs */}
        <div className="pt-2">
          <span className="text-[10px] tracking-editorial uppercase text-brand-taupe block mb-1.5">
            Or custom range (₹):
          </span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => onPriceChange(e.target.value, maxPrice)}
              className="w-1/2 px-2 py-1.5 text-xs bg-white border border-brand-border focus:outline-none focus:border-brand-dark"
              min="0"
            />
            <span className="text-brand-taupe text-xs">&ndash;</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => onPriceChange(minPrice, e.target.value)}
              className="w-1/2 px-2 py-1.5 text-xs bg-white border border-brand-border focus:outline-none focus:border-brand-dark"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Sort Section */}
      <div className="space-y-3">
        <h4 className="text-[11px] tracking-editorial uppercase font-semibold text-brand-taupe">
          Sort Order
        </h4>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full text-xs py-2 px-3 bg-white border border-brand-border text-brand-dark focus:outline-none focus:border-brand-dark appearance-none cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-brand-taupe">
            <span className="text-[10px]">&#9662;</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent) */}
      <aside className="hidden lg:block w-64 shrink-0 pr-6">
        <div className="sticky top-28">{content}</div>
      </aside>

      {/* Mobile Drawer (Collapsible) */}
      {isOpenOnMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer content */}
          <div className="relative ml-auto w-full max-w-xs bg-brand-canvas h-full p-6 shadow-2xl flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-brand-border">
              <span className="font-serif text-lg font-medium text-brand-dark">Filters</span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1 text-brand-dark hover:text-brand-accent transition-colors"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1">{content}</div>

            <div className="pt-6 mt-6 border-t border-brand-border">
              <button
                type="button"
                onClick={onCloseMobile}
                className="w-full py-3 bg-brand-dark text-brand-canvas text-xs tracking-editorial uppercase hover:bg-brand-accent transition-colors text-center font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;

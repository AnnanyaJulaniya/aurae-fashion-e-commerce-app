import React from "react";
import { Search, X } from "lucide-react";

export const SearchBar = ({ value, onChange, onClear, placeholder = "Search curated collection..." }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-taupe">
        <Search className="w-4 h-4 stroke-[1.75]" />
      </div>

      <input
      id="product-search" name="productSearch"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-white border border-brand-border text-brand-dark placeholder:text-brand-taupe/80 focus:outline-none focus:border-brand-dark transition-colors tracking-wide"
        aria-label="Search products"
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-taupe hover:text-brand-dark transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

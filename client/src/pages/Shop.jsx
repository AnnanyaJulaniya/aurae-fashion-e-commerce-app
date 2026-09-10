import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import api from "../services/api";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import ProductGridSkeleton from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query param bindings
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "recommended";

  // Data states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Debounced search term for smooth UX
  const [searchInput, setSearchInput] = useState(search);

  // Sync search input if URL changes externally
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // Update query params helper
  const updateParams = useCallback(
    (newParams) => {
      const current = Object.fromEntries(searchParams.entries());
      const merged = { ...current, ...newParams };

      // Remove empty keys
      Object.keys(merged).forEach((key) => {
        if (merged[key] === undefined || merged[key] === null || merged[key] === "") {
          delete merged[key];
        }
      });

      setSearchParams(merged);
    },
    [searchParams, setSearchParams]
  );

  // Debounce search changes to URL
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput !== search) {
        updateParams({ search: searchInput });
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [searchInput, search, updateParams]);

  // Fetch products from backend API whenever query parameters change
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        search,
        category,
        minPrice,
        maxPrice,
        sort,
      };

      const res = await api.getProducts(params);
      if (res.success) {
        setProducts(res.data);
      } else {
        throw new Error(res.message || "Failed to load products");
      }
    } catch (err) {
      console.error("Shop product fetch error:", err);
      setError(err.message || "Something went wrong while loading products.");
    } finally {
      setLoading(false);
    }
  }, [search, category, minPrice, maxPrice, sort]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchInput("");
    setSearchParams({});
  };

  const hasActiveFilters = Boolean(
    search || category || minPrice || maxPrice || (sort && sort !== "recommended")
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="mb-8 sm:mb-12 pb-6 border-b border-brand-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] tracking-editorial uppercase font-semibold text-brand-taupe block mb-1">
              AURAÉ Catalog
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-brand-dark">
              {category ? category : "The Full Collection"}
            </h1>
          </div>

          <div className="text-xs text-brand-muted tracking-wide">
            {!loading && (
              <span>
                Showing <strong className="text-brand-dark">{products.length}</strong>{" "}
                {products.length === 1 ? "piece" : "pieces"}
              </span>
            )}
          </div>
        </div>

        {/* Top Controls: Search Bar & Mobile Filter Trigger */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 max-w-lg">
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              onClear={() => {
                setSearchInput("");
                updateParams({ search: "" });
              }}
            />
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-brand-border text-xs tracking-editorial uppercase text-brand-dark hover:bg-brand-sand transition-colors font-medium shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-brand-accent"></span>
            )}
          </button>
        </div>

        {/* Active Filter Pills Bar */}
        {hasActiveFilters && (
          <div className="mt-4 pt-3 flex flex-wrap items-center gap-2">
            <span className="text-[10px] tracking-editorial uppercase text-brand-taupe mr-1">
              Active:
            </span>

            {search && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-brand-border text-xs text-brand-dark">
                <span>Search: "{search}"</span>
                <button
                  onClick={() => {
                    setSearchInput("");
                    updateParams({ search: "" });
                  }}
                  className="hover:text-brand-accent"
                  aria-label="Remove search filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {category && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-brand-border text-xs text-brand-dark">
                <span>Category: {category}</span>
                <button
                  onClick={() => updateParams({ category: "" })}
                  className="hover:text-brand-accent"
                  aria-label="Remove category filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {(minPrice || maxPrice) && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-brand-border text-xs text-brand-dark">
                <span>
                  Price: {minPrice ? `₹${minPrice}` : "₹0"} &ndash;{" "}
                  {maxPrice ? `₹${maxPrice}` : "Any"}
                </span>
                <button
                  onClick={() => updateParams({ minPrice: "", maxPrice: "" })}
                  className="hover:text-brand-accent"
                  aria-label="Remove price filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {sort && sort !== "recommended" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-brand-border text-xs text-brand-dark">
                <span>
                  Sort: {sort === "price_asc" ? "Price ↑" : sort === "price_desc" ? "Price ↓" : "Newest"}
                </span>
                <button
                  onClick={() => updateParams({ sort: "recommended" })}
                  className="hover:text-brand-accent"
                  aria-label="Reset sort"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-[11px] text-brand-taupe hover:text-brand-dark underline underline-offset-2 ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Main Layout: Sidebar + Product Grid */}
      <div className="flex items-start">
        {/* Filter Sidebar */}
        <FilterSidebar
          selectedCategory={category}
          onSelectCategory={(cat) => updateParams({ category: cat })}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={(min, max) => updateParams({ minPrice: min, maxPrice: max })}
          sort={sort}
          onSortChange={(s) => updateParams({ sort: s })}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
          isOpenOnMobile={mobileFilterOpen}
          onCloseMobile={() => setMobileFilterOpen(false)}
        />

        {/* Product Catalog Display */}
        <main className="flex-1 min-w-0">
          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : error ? (
            <ErrorState message={error} onRetry={fetchProducts} />
          ) : products.length === 0 ? (
            <EmptyState
              title="No pieces found."
              description="We couldn't find any pieces matching your current search or filters."
              onReset={handleResetFilters}
            />
          ) : (
            <ProductGrid products={products} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;

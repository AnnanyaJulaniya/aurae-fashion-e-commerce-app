import React from "react";

export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col animate-pulse bg-white border border-brand-border/60">
      {/* Image Skeleton */}
      <div className="w-full aspect-[3/4] bg-stone-200"></div>
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-3 w-1/3 bg-stone-200"></div>
        <div className="h-4 w-3/4 bg-stone-200"></div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 w-1/4 bg-stone-200"></div>
          <div className="h-3 w-1/4 bg-stone-200"></div>
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export const DetailSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        <div className="aspect-[3/4] bg-stone-200"></div>
        <div className="space-y-6 pt-4">
          <div className="h-3 w-20 bg-stone-200"></div>
          <div className="h-8 w-3/4 bg-stone-200"></div>
          <div className="h-6 w-24 bg-stone-200"></div>
          <div className="space-y-2 pt-4">
            <div className="h-3 w-full bg-stone-200"></div>
            <div className="h-3 w-5/6 bg-stone-200"></div>
            <div className="h-3 w-4/6 bg-stone-200"></div>
          </div>
          <div className="h-10 w-full bg-stone-200 pt-6"></div>
          <div className="h-12 w-full bg-stone-200"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductGridSkeleton;

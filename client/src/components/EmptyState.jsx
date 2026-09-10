import React from "react";
import { SlidersHorizontal, RefreshCw } from "lucide-react";

export const EmptyState = ({
  title = "No pieces found.",
  description = "Try changing your search or filters to find what you're looking for.",
  onReset,
}) => {
  return (
    <div className="min-h-[380px] flex flex-col items-center justify-center text-center p-8 bg-white border border-brand-border/70 my-6">
      <div className="w-14 h-14 rounded-full bg-brand-sand flex items-center justify-center text-brand-dark mb-4">
        <SlidersHorizontal className="w-6 h-6 stroke-[1.5]" />
      </div>
      <h3 className="font-serif text-2xl font-medium text-brand-dark mb-2">
        {title}
      </h3>
      <p className="text-xs text-brand-taupe max-w-md mb-6 tracking-wide leading-relaxed">
        {description}
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-dark text-brand-canvas text-xs tracking-editorial uppercase hover:bg-brand-accent transition-colors shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;

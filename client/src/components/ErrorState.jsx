import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export const ErrorState = ({
  message = "Something went wrong while loading products.",
  onRetry,
}) => {
  return (
    <div className="min-h-[360px] flex flex-col items-center justify-center text-center p-8 bg-white border border-brand-border my-6">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-brand-red mb-4">
        <AlertCircle className="w-6 h-6 stroke-[1.5]" />
      </div>
      <h3 className="font-serif text-xl font-medium text-brand-dark mb-2">
        Unable to Load Content
      </h3>
      <p className="text-xs text-brand-muted max-w-md mb-6 tracking-wide leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-dark text-brand-canvas text-xs tracking-editorial uppercase hover:bg-brand-accent transition-colors shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorState;

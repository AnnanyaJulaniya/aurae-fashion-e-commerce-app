import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <span className="text-[11px] tracking-editorial uppercase font-semibold text-brand-taupe mb-2">
        Error 404
      </span>
      <h1 className="font-serif text-4xl sm:text-6xl font-light text-brand-dark mb-4">
        Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-brand-muted max-w-md mb-8 tracking-wide leading-relaxed">
        The page you are looking for may have been moved, removed, or never existed in our atelier catalog.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-dark text-brand-canvas text-xs tracking-editorial uppercase font-medium hover:bg-brand-accent transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/shop"
          className="inline-flex items-center justify-center px-6 py-3.5 bg-transparent border border-brand-border text-brand-dark text-xs tracking-editorial uppercase font-medium hover:border-brand-dark transition-colors"
        >
          <span>Explore Collection</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

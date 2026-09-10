import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-brand-dark text-brand-canvas mt-24 border-t border-brand-charcoal font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-10">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <span className="font-serif text-2xl tracking-editorial font-semibold block text-brand-canvas">
              AURAÉ
            </span>
            <p className="text-xs text-brand-taupe leading-relaxed tracking-subtle">
              Everyday, elevated. Curated contemporary essentials crafted with thoughtful precision, timeless silhouettes, and organic textiles.
            </p>
            <div className="pt-2">
              <span className="text-[10px] tracking-editorial uppercase text-brand-sand block">
                Studio: Mumbai &bull; New Delhi &bull; Bengaluru
              </span>
            </div>
          </div>

          {/* Quick Links / Collections */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-editorial uppercase font-semibold text-brand-sand">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-taupe tracking-wide">
              <li>
                <Link to="/shop?category=Dresses" className="hover:text-brand-canvas transition-colors">
                  Dresses
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Tops" className="hover:text-brand-canvas transition-colors">
                  Tops & Shirts
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Bottoms" className="hover:text-brand-canvas transition-colors">
                  Trousers & Skirts
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Outerwear" className="hover:text-brand-canvas transition-colors">
                  Blazers & Outerwear
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Accessories" className="hover:text-brand-canvas transition-colors">
                  Leather & Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-editorial uppercase font-semibold text-brand-sand">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-taupe tracking-wide">
              <li>
                <span className="hover:text-brand-canvas transition-colors cursor-pointer">
                  Complimentary Shipping
                </span>
              </li>
              <li>
                <span className="hover:text-brand-canvas transition-colors cursor-pointer">
                  Hassle-Free Returns
                </span>
              </li>
              <li>
                <span className="hover:text-brand-canvas transition-colors cursor-pointer">
                  Garment Care & Sizing Guide
                </span>
              </li>
              <li>
                <span className="hover:text-brand-canvas transition-colors cursor-pointer">
                  Sustainable Packaging
                </span>
              </li>
            </ul>
          </div>

          {/* Brand Philosophy */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-editorial uppercase font-semibold text-brand-sand">
              Our Philosophy
            </h4>
            <p className="text-xs text-brand-taupe leading-relaxed">
              We create pieces meant to live in your wardrobe for seasons to come. Consciously crafted in small batches to reduce waste.
            </p>
            <div className="pt-2">
              <Link
                to="/admin"
                className="inline-block text-[11px] tracking-editorial uppercase text-stone-400 hover:text-brand-canvas underline underline-offset-4 transition-colors"
              >
                Admin Catalog Management &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-brand-charcoal/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-brand-taupe gap-4">
          <p>&copy; {new Date().getFullYear()} AURAÉ Atelier. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-brand-canvas transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-brand-canvas transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-brand-canvas transition-colors cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

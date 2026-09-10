import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getCartItemCount } = useCart();
  const cartCount = getCartItemCount();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Admin", path: "/admin" },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-canvas/95 backdrop-blur-md border-b border-brand-border transition-colors">
      {/* Editorial Announcement Bar */}
      <div className="bg-brand-dark text-brand-canvas text-[11px] tracking-editorial uppercase py-2 text-center font-medium px-4">
        Complimentary Shipping on all orders &bull; Designed for Modern Living
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-brand-dark hover:text-brand-accent transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo Wordmark */}
        <div className="flex items-center">
          <Link
            to="/"
            className="flex flex-col items-start group"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-editorial font-semibold text-brand-dark group-hover:text-brand-accent transition-colors">
              AURAÉ
            </span>
            <span className="text-[9px] tracking-editorial uppercase text-brand-taupe -mt-1 hidden sm:block">
              Everyday, elevated.
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={
                  "text-xs tracking-editorial uppercase font-medium transition-colors relative py-1 " +
                  (active
                    ? "text-brand-dark font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-brand-dark"
                    : "text-brand-taupe hover:text-brand-dark")
                }
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Action Icons: Cart */}
        <div className="flex items-center space-x-4">
          <Link
            to="/cart"
            className="relative p-2 text-brand-dark hover:text-brand-accent transition-colors flex items-center"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-dark text-brand-canvas text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-canvas shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-brand-border bg-brand-canvas px-6 py-8 shadow-xl animate-fadeIn">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={
                    "text-sm tracking-editorial uppercase font-medium transition-colors " +
                    (active ? "text-brand-dark font-bold" : "text-brand-taupe hover:text-brand-dark")
                  }
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-brand-border/60">
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-xs tracking-editorial uppercase font-medium text-brand-dark"
              >
                <span>Shopping Bag</span>
                <span className="bg-brand-sand px-2 py-0.5 rounded text-brand-dark font-semibold">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

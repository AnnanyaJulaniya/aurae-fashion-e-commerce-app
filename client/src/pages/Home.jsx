import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShieldCheck, RefreshCw, Mail, Check } from "lucide-react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { ProductCardSkeleton } from "../components/LoadingState";
import Toast from "../components/Toast";

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Newsletter state
  const [email, setEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        // Fetch products from backend API (no hardcoded items!)
        const res = await api.getProducts({ sort: "recommended" });
        if (res.success && Array.isArray(res.data)) {
          // Take first 4 items (or items with featured === true)
          const featured = res.data.filter((p) => p.featured).slice(0, 4);
          setFeaturedProducts(featured.length > 0 ? featured : res.data.slice(0, 4));
        }
      } catch (err) {
        console.error("Error loading featured products:", err);
        setError("Unable to load curated pieces at this moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterError("");

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setNewsletterError("Please enter a valid email address.");
      return;
    }

    setNewsletterSubscribed(true);
    setToastMessage("Thank you for joining the AURAÉ Atelier circle.");
    setEmail("");
    setTimeout(() => setNewsletterSubscribed(false), 5000);
  };

  const categories = [
    {
      name: "Dresses",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
      description: "Fluid silhouettes & timeless silk",
    },
    {
      name: "Tops",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
      description: "Breathable linen & fine knitwear",
    },
    {
      name: "Bottoms",
      image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=600&q=80",
      description: "Tailored trousers & pleated skirts",
    },
    {
      name: "Outerwear",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
      description: "Structured wool blazers & trench coats",
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-12">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-sand/60 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-28 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-brand-border/80 text-[10px] tracking-editorial uppercase font-medium text-brand-dark">
                <Sparkles className="w-3 h-3 text-brand-accent" />
                <span>The Autumn / Everyday Capsule</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-brand-dark leading-[1.1]">
                Elevate the <br />
                <span className="italic font-normal">everyday.</span>
              </h1>

              <p className="text-sm sm:text-base text-brand-muted max-w-xl font-sans tracking-wide leading-relaxed">
                Curated essentials designed for modern living. Tailored in pure organic linen, lustrous silk satin, and structured virgin wool with quiet architectural restraint.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-4 sm:items-center">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-dark text-brand-canvas text-xs tracking-editorial uppercase font-medium hover:bg-brand-accent transition-all duration-300 shadow-md group"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/shop?category=Dresses"
                  className="inline-flex items-center justify-center px-6 py-4 bg-transparent border border-brand-border hover:border-brand-dark text-xs tracking-editorial uppercase font-medium text-brand-dark transition-colors"
                >
                  Explore Dresses
                </Link>
              </div>
            </div>

            {/* Right Hero Editorial Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] max-w-md mx-auto shadow-2xl overflow-hidden bg-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85"
                  alt="AURAÉ Autumn Wardrobe Essentials"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <span className="text-[10px] tracking-editorial uppercase block text-brand-sand">
                    Atelier Spotlight
                  </span>
                  <p className="font-serif text-lg font-normal">
                    Linen, Silk &amp; Fluid Tailoring
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] tracking-editorial uppercase font-semibold text-brand-taupe block mb-2">
            Curated Categories
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-brand-dark">
            Designed for Every Moment
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/shop?category=${cat.name}`}
              className="group flex flex-col bg-white border border-brand-border/60 overflow-hidden hover:shadow-card transition-all duration-300"
            >
              <div className="aspect-[4/5] overflow-hidden bg-stone-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-4 sm:p-5 text-center bg-white">
                <h3 className="font-serif text-base sm:text-lg font-medium text-brand-dark group-hover:text-brand-accent transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-brand-taupe mt-1 tracking-wide line-clamp-1">
                  {cat.description}
                </p>
                <span className="inline-block mt-3 text-[10px] tracking-editorial uppercase font-semibold text-brand-dark group-hover:underline underline-offset-4">
                  Explore &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products from Backend API */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-brand-border gap-4">
          <div>
            <span className="text-[11px] tracking-editorial uppercase font-semibold text-brand-taupe block mb-1">
              Curator’s Selection
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-brand-dark">
              Signature Pieces
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs tracking-editorial uppercase font-medium text-brand-dark hover:text-brand-accent transition-colors inline-flex items-center gap-1.5"
          >
            <span>View All Pieces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white border border-brand-border">
            <p className="text-xs text-brand-muted mb-4">{error}</p>
            <Link
              to="/shop"
              className="inline-block px-5 py-2 bg-brand-dark text-brand-canvas text-xs tracking-editorial uppercase"
            >
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Brand & Value Pillars */}
      <section className="bg-brand-sand/50 border-y border-brand-border py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 text-center">
            <div className="space-y-3 px-4">
              <div className="w-10 h-10 mx-auto rounded-full bg-white flex items-center justify-center text-brand-dark shadow-sm">
                <Sparkles className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h4 className="font-serif text-lg font-medium text-brand-dark">
                Thoughtful Design
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed tracking-wide">
                Engineered with precise proportions, relaxed drape, and refined lines made to outlast fast-fashion cycles.
              </p>
            </div>

            <div className="space-y-3 px-4">
              <div className="w-10 h-10 mx-auto rounded-full bg-white flex items-center justify-center text-brand-dark shadow-sm">
                <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h4 className="font-serif text-lg font-medium text-brand-dark">
                Quality Materials
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed tracking-wide">
                We select certified organic linens, heavyweight silk satin, and durable full-grain vegetable-tanned leathers.
              </p>
            </div>

            <div className="space-y-3 px-4">
              <div className="w-10 h-10 mx-auto rounded-full bg-white flex items-center justify-center text-brand-dark shadow-sm">
                <RefreshCw className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h4 className="font-serif text-lg font-medium text-brand-dark">
                Seamless Shopping
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed tracking-wide">
                Complimentary delivery across India, transparent sizing guides, and dedicated customer support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="p-8 sm:p-14 bg-white border border-brand-border/80 shadow-subtle space-y-6">
          <div className="w-10 h-10 mx-auto rounded-full bg-brand-sand flex items-center justify-center text-brand-dark">
            <Mail className="w-5 h-5 stroke-[1.5]" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <span className="text-[10px] tracking-editorial uppercase font-semibold text-brand-taupe block">
              The AURAÉ Journal
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-brand-dark">
              Receive First Access
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed tracking-wide">
              Subscribe to receive private capsule launches, fabric stories, and seasonal styling recommendations.
            </p>
          </div>

          {newsletterSubscribed ? (
            <div className="p-4 bg-stone-50 border border-brand-border inline-flex items-center gap-2 text-xs text-emerald-800 font-medium">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>You have been subscribed to our private newsletter.</span>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5"
            >
              <div className="flex-1 text-left">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (newsletterError) setNewsletterError("");
                  }}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 text-xs bg-brand-canvas border border-brand-border text-brand-dark placeholder:text-brand-taupe/80 focus:outline-none focus:border-brand-dark tracking-wide"
                  aria-label="Email address for newsletter"
                />
                {newsletterError && (
                  <span className="text-[11px] text-brand-red mt-1 block">
                    {newsletterError}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-brand-dark text-brand-canvas text-xs tracking-editorial uppercase hover:bg-brand-accent transition-colors shrink-0 font-medium"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[10px] text-brand-taupe tracking-subtle">
            By subscribing, you agree to receive editorial newsletters. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;

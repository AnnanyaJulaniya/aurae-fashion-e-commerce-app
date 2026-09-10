import React from "react";
import { Link } from "react-router-dom";
import { Trash2, ArrowLeft, ShoppingBag, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import QuantitySelector from "../components/QuantitySelector";
import { formatPrice } from "../components/ProductCard";

export const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getCartTotal,
  } = useCart();

  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping per requirements
  const total = subtotal + shipping;

  // Empty Cart State
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-sand mx-auto flex items-center justify-center text-brand-dark mb-6">
          <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-brand-dark mb-3">
          Your Bag is Empty
        </h1>
        <p className="text-xs sm:text-sm text-brand-taupe max-w-md mx-auto mb-8 tracking-wide leading-relaxed">
          Looks like you haven't added any pieces to your shopping bag yet. Explore our latest collection of everyday essentials.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center justify-center px-8 py-4 bg-brand-dark text-brand-canvas text-xs tracking-editorial uppercase hover:bg-brand-accent transition-all shadow-md font-medium"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-brand-border flex items-end justify-between">
        <div>
          <span className="text-[10px] tracking-editorial uppercase font-semibold text-brand-taupe block mb-1">
            Review Selection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-brand-dark">
            Shopping Bag
          </h1>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs text-brand-taupe hover:text-brand-red transition-colors underline underline-offset-4 tracking-wide"
        >
          Clear bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Cart Items Table / List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="border border-brand-border bg-white divide-y divide-brand-border/60">
            {cartItems.map((item) => {
              const itemTotal = item.price * item.quantity;
              return (
                <div
                  key={`${item.id}-${item.size}`}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {/* Product Info & Thumbnail */}
                  <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                    <Link
                      to={`/products/${item.id}`}
                      className="w-20 h-24 sm:w-24 sm:h-28 aspect-[3/4] bg-stone-100 overflow-hidden shrink-0 border border-brand-border/60"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform"
                      />
                    </Link>

                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] tracking-editorial uppercase text-brand-taupe block">
                        {item.category}
                      </span>
                      <Link
                        to={`/products/${item.id}`}
                        className="font-serif text-base font-medium text-brand-dark hover:text-brand-accent transition-colors block truncate"
                      >
                        {item.name}
                      </Link>
                      <div className="flex items-center gap-3 text-xs text-brand-taupe pt-1">
                        <span className="px-2 py-0.5 bg-brand-sand text-brand-dark font-medium uppercase text-[10px]">
                          Size: {item.size}
                        </span>
                        <span>{formatPrice(item.price)} each</span>
                      </div>
                    </div>
                  </div>

                  {/* Stepper + Subtotal + Remove */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-brand-border/40">
                    <div>
                      <QuantitySelector
                        quantity={item.quantity}
                        maxStock={item.stock}
                        onIncrease={() => increaseQuantity(item.id, item.size)}
                        onDecrease={() => decreaseQuantity(item.id, item.size)}
                        size="sm"
                      />
                      {item.quantity >= item.stock && (
                        <span className="text-[10px] text-amber-700 block mt-1">
                          Max stock reached
                        </span>
                      )}
                    </div>

                    <div className="text-right min-w-[80px]">
                      <span className="font-sans font-medium text-sm sm:text-base text-brand-dark block">
                        {formatPrice(itemTotal)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="p-2 text-stone-400 hover:text-brand-red transition-colors"
                      aria-label={`Remove ${item.name} (${item.size})`}
                    >
                      <Trash2 className="w-4 h-4 stroke-[1.5]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs tracking-editorial uppercase text-brand-taupe hover:text-brand-dark transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-white border border-brand-border p-6 sm:p-8 space-y-6 shadow-subtle sticky top-28">
          <h2 className="font-serif text-xl font-medium text-brand-dark pb-3 border-b border-brand-border">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs tracking-wide text-brand-muted">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-brand-dark">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Shipping</span>
              <span className="text-emerald-700 font-medium">Free Express Delivery</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Taxes (GST)</span>
              <span className="text-brand-dark">Included in price</span>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-border flex justify-between items-baseline">
            <span className="font-serif text-lg font-medium text-brand-dark">Total</span>
            <span className="font-sans text-2xl font-semibold text-brand-dark">
              {formatPrice(total)}
            </span>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() =>
                alert(
                  "Assessment Demo: Checkout & payment gateway are intentionally omitted as specified in the assignment requirements."
                )
              }
              className="w-full py-4 bg-brand-dark text-brand-canvas text-xs tracking-editorial uppercase font-semibold hover:bg-brand-accent transition-all duration-300 shadow-md text-center"
            >
              Proceed to Checkout
            </button>
          </div>

          <div className="pt-2 space-y-2 text-[11px] text-brand-taupe border-t border-brand-border/60">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Complimentary insured transit across India</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>14-day hassle-free atelier returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

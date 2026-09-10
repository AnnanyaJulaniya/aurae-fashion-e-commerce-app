import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const CART_STORAGE_KEY = "aurae_cart_v1";

export const CartProvider = ({ children }) => {
  // Safe initial load from localStorage (with backward compatibility fallback)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored =
        localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (err) {
      console.error("Failed to read cart from localStorage:", err);
    }
    return [];
  });

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.error("Failed to save cart to localStorage:", err);
    }
  }, [cartItems]);

  /**
   * Add a product to the cart with chosen size & quantity.
   * If product ID + size already exists, increments quantity (capped at stock).
   * If same product with different size, adds as new line item.
   */
  const addToCart = (product, selectedSize, quantity = 1) => {
    if (!product || !selectedSize || quantity <= 0) return { success: false, message: "Invalid parameters" };
    if (product.stock <= 0) return { success: false, message: "Item is out of stock" };

    const parsedQty = parseInt(quantity, 10);
    const availableStock = parseInt(product.stock, 10);

    let wasUpdated = false;
    let finalAddedQty = parsedQty;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.size === selectedSize
      );

      if (existingIndex > -1) {
        const existingItem = prevItems[existingIndex];
        const newQty = Math.min(existingItem.quantity + parsedQty, availableStock);
        finalAddedQty = newQty - existingItem.quantity;
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...existingItem,
          quantity: newQty,
          stock: availableStock, // Keep stock updated
        };
        wasUpdated = true;
        return updated;
      } else {
        const clampedQty = Math.min(parsedQty, availableStock);
        finalAddedQty = clampedQty;
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            image: product.image,
            price: Number(product.price),
            size: selectedSize,
            quantity: clampedQty,
            stock: availableStock,
            category: product.category,
          },
        ];
      }
    });

    return {
      success: true,
      updated: wasUpdated,
      addedQuantity: finalAddedQty,
    };
  };

  // Remove a specific line item identified by product ID and size
  const removeFromCart = (productId, selectedSize) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === productId && item.size === selectedSize))
    );
  };

  // Increase quantity by 1, capped at available stock
  const increaseQuantity = (productId, selectedSize) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === productId && item.size === selectedSize) {
          if (item.quantity < item.stock) {
            return { ...item, quantity: item.quantity + 1 };
          }
        }
        return item;
      })
    );
  };

  // Decrease quantity by 1, floored at 1
  const decreaseQuantity = (productId, selectedSize) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === productId && item.size === selectedSize) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
    );
  };

  // Clear all items from cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total monetary value
  const getCartTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Calculate total number of individual items
  const getCartItemCount = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;

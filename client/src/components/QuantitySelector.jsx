import React from "react";
import { Minus, Plus } from "lucide-react";

export const QuantitySelector = ({
  quantity,
  maxStock,
  onIncrease,
  onDecrease,
  disabled = false,
  size = "md",
}) => {
  const isMin = quantity <= 1;
  const isMax = quantity >= maxStock;

  const heightClass = size === "sm" ? "h-8 text-xs" : "h-11 text-sm";
  const btnPadding = size === "sm" ? "px-2.5" : "px-3.5";

  return (
    <div
      className={
        "inline-flex items-center border border-brand-border bg-white " +
        heightClass
      }
    >
      <button
        type="button"
        onClick={onDecrease}
        disabled={disabled || isMin}
        className={
          btnPadding +
          " h-full flex items-center justify-center text-brand-dark hover:bg-brand-sand/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        }
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5 stroke-[1.75]" />
      </button>

      <span
        className="w-10 text-center font-medium font-sans text-brand-dark select-none"
        aria-label={`Current quantity ${quantity}`}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={disabled || isMax}
        className={
          btnPadding +
          " h-full flex items-center justify-center text-brand-dark hover:bg-brand-sand/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        }
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5 stroke-[1.75]" />
      </button>
    </div>
  );
};

export default QuantitySelector;

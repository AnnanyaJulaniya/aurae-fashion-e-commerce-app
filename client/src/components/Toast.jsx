import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export const Toast = ({ message, type = "success", onClose }) => {
  if (!message) return null;

  const bgStyles = {
    success: "bg-brand-dark text-brand-canvas border-brand-charcoal",
    error: "bg-brand-red text-white border-red-800",
    info: "bg-brand-taupe text-white border-brand-muted",
  };

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-red-200 shrink-0" />,
    info: <Info className="w-4 h-4 text-blue-200 shrink-0" />,
  };

  const currentBg = bgStyles[type] || bgStyles.success;

  return (
    <div
      className={
        "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 shadow-2xl border transition-all duration-300 transform translate-y-0 text-sm font-sans tracking-wide max-w-md " +
        currentBg
      }
    >
      {icons[type]}
      <span className="flex-1 leading-snug">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-white transition-colors p-1"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default Toast;

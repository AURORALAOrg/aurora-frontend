import React from "react";
import { Link } from "react-router-dom";

const baseStyles =
  "inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-[#00B8D4] text-white hover:bg-[#009fb3] focus:ring-[#00B8D4] border border-transparent",
  outline:
    "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 focus:ring-[#00B8D4]",
  nav:
    "bg-transparent text-gray-800 border-b-2 border-transparent hover:text-[#00B8D4] hover:border-[#00B8D4] rounded-none px-1 py-2 focus:ring-0",
};

export default function ActionButton({
  children,
  to,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const style = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;
  if (to) {
    return (
      <Link to={to} className={style} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={style} {...props}>
      {children}
    </button>
  );
} 
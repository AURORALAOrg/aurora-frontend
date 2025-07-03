import { cn } from "@/lib/utils";
import React from "react";

/* 
# This Responsive Card component is reusable component 
# We can define different layout in sections of our pages 
# This component is fully responsive 
*/

const ResponsiveCard = ({ className, children }) => {
  return (
    <div
      className={cn(
        className,
        "w-full max-w-[300px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] py-6 md:py-[48px] gap-6 md:gap-[24px]"
      )}
    >
      {children}
    </div>
  );
};

export default ResponsiveCard;

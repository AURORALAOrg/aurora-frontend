"use client";

import { createContext, forwardRef, useContext, useState } from "react";
import { cn } from "@/lib/utils";

const TabsContext = createContext({});

const Tabs = forwardRef(
  ({ defaultValue, onValueChange, className, children, ...props }, ref) => {
    const [value, setValue] = useState(defaultValue);

    const handleValueChange = (newValue) => {
      setValue(newValue);
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
        <div ref={ref} className={cn("", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = "Tabs";

const TabsList = forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center", className)}
      {...props}
    />
  );
});

TabsList.displayName = "TabsList";

const TabsTrigger = forwardRef(({ className, value, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = useContext(TabsContext);
  const isSelected = selectedValue === value;

  return (
    <button
      ref={ref}
      className={cn(
        "max-w-fit flex flex-1 whitespace-nowrap border-b-2 !border-transparent items-center justify-center  px-4 py-1.5 text-sm font-medium transition-all ring-0 !outline-none hover:!text-light-blue-1 ring-light-blue-1 disabled:pointer-events-none disabled:opacity-50 !bg-transparent",
        isSelected
          ? "!text-light-blue-1 !border-b-light-blue-1"
          : "!text-neutral-5",
        className
      )}
      onClick={() => onValueChange(value)}
      {...props}
    />
  );
});

TabsTrigger.displayName = "TabsTrigger";

const TabsContent = forwardRef(({ className, value, ...props }, ref) => {
  const { value: selectedValue } = useContext(TabsContext);
  const isSelected = selectedValue === value;

  if (!isSelected) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-white",
        className
      )}
      {...props}
    />
  );
});

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };

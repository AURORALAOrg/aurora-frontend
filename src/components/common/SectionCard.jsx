import { cn } from "@/lib/utils";

/* 
# this SectionCard Component is reusable component 
# we can use this component in define different section in our page such as landing Page and Business English page
*/

export const SectionCard = ({ className, children }) => {
  return (
    <div
      className={cn(
        "w-full h-auto p-[8%] flex flex-col  gap-4 sm:p-[6%] items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
};

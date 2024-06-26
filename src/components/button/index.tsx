import { type ButtonHTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "font-medium md:text-lg whitespace-nowrap transition-all duration-500 rounded-full",
  variants: {
    type: {
      contained: "text-gray-100 px-6 h-12 md:h-14 lg:max-w-60 max-w-44",
      text: "text-gray-100 underline underline-offset-2 group-hover:decoration-gray-100 decoration-gray-900",
      nav: "h-12 border-2 border-primary-orange-light px-6 text-primary-orange-light hover:bg-primary-orange-light hover:text-gray-100 hover:shadow-2xl hover:shadow-primary-orange-light md:h-14"
    }
  },
  defaultVariants: {
    type: "contained"
  }
});

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantProps<typeof button>;
}

export function Button({ variant, ...props }: IButton) {
  return <button {...props} className={button(variant)} />;
}

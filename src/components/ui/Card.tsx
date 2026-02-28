import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated";
}

function Card({ className, variant = "default", ...props }: CardProps) {
  const variants = {
    default: "bg-white rounded-xl border border-slate-200",
    bordered: "bg-white rounded-xl border-2 border-slate-300",
    elevated: "bg-white rounded-xl shadow-lg border border-slate-100",
  };
  return <div className={cn(variants[variant], className)} {...props} />;
}

function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 py-5 border-b border-slate-100", className)} {...props} />;
}

function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 py-5", className)} {...props} />;
}

function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-xl", className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardContent, CardFooter };

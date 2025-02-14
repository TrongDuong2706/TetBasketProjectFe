import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return <div className={`bg-white shadow-md p-4 rounded ${className}`}>{children}</div>;
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className="p-2">{children}</div>;
}

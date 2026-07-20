import { ReactNode } from "react";

export default function BracketCard({
  children,
  className = "",
  flame = false,
}: {
  children: ReactNode;
  className?: string;
  flame?: boolean;
}) {
  return (
    <div className={`bracket ${flame ? "bracket-flame" : ""} ${className}`}>
      <span className="bracket-b" aria-hidden />
      {children}
    </div>
  );
}

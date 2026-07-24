import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PoweredByEventloopsProps {
  /** "dark" for dark backgrounds (e.g. footer), "light" for light backgrounds */
  variant?: "dark" | "light";
  className?: string;
}

export function PoweredByEventloops({
  variant = "light",
  className,
}: PoweredByEventloopsProps) {
  return (
    <Link
      href="https://eventloops.in"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Powered by eventloops.in"
      className={cn(
        "inline-flex items-center gap-2 group",
        variant === "dark" ? "text-neutral-400" : "text-gray-500",
        className,
      )}
    >
      <span className="text-xs md:text-sm whitespace-nowrap">Powered by</span>
      <Image
        src="/images/eventloops-logo.png"
        alt="eventloops.in"
        width={120}
        height={27}
        className="h-5 md:h-6 w-auto rounded-md shadow-sm transition-transform duration-200 group-hover:scale-105"
      />
    </Link>
  );
}

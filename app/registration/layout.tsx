import { notFound } from "next/navigation";

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Registration is closed - return 404 for all registration routes
  notFound();

  // This will never be reached, but TypeScript needs it
  return <>{children}</>;
}

import { notFound } from "next/navigation";

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  notFound();
  return <>{children}</>;
}

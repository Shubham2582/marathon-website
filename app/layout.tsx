import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth`}>
      <body className={`antialiased bg-neutral-50 text-neutral-900`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

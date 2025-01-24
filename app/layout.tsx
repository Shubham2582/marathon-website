import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${playfair.variable} ${montserrat.variable}`}
    >
      <body className={`font-sans antialiased bg-neutral-50 text-neutral-900`}>
        {children}
      </body>
    </html>
  );
}

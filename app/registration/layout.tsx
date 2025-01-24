import { Metadata } from "next";
import { MusicPlayer } from "./_components/music-player";

export const metadata: Metadata = {
  title: "Marathon Registration",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MusicPlayer />
      {children}
    </>
  );
}

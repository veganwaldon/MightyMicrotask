import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rewrite My Message",
  description: "Make your message sound better instantly"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-800 antialiased">{children}</body>
    </html>
  );
}

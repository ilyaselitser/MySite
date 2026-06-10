import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CoolSchool – Educational Kits for Children",
  description: "High-quality educational kits for children of all ages.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

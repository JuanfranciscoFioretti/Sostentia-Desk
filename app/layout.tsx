import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sostentia Desk - Business Management Platform",
  description: "The all-in-one platform that combines a powerful mobile app and comprehensive web dashboard to streamline your business operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

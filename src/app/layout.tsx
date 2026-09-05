import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import { Toaster } from "sonner";

import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Smart Job Portal",
  description:
    "Find your next opportunity or connect with talented professionals.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
    >
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>

        <Toaster
          position="top-right"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
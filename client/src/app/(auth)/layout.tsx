
import type { Metadata } from "next";
import localFont from "next/font/local";

import { ContextProvider } from "@/contexts/Auth.context";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
      <ContextProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </ContextProvider>
    );
  }
  
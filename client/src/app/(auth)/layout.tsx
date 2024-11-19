
import type { Metadata } from "next";
import localFont from "next/font/local";

import { ContextProvider } from "@/contexts/Auth.context";
import AuthRoute from "@/conf/AuthRoute";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
      <ContextProvider>
        <AuthRoute>
        <html lang="en">
          <body>{children}</body>
        </html>
        </AuthRoute>
      </ContextProvider>
    );
  }
  
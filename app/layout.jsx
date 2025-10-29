/**
 * Root Layout Component
 *
 * This is the root layout component for the HaUIDOC application. It wraps all pages
 * and provides global context, styling, and functionality that applies to the entire app.
 *
 * Features:
 * - Global CSS imports and Tailwind CSS setup
 * - Header and Footer components for consistent layout
 * - Custom font loading (Raleway)
 * - Session management via NextAuth SessionProvider
 * - Metadata configuration for SEO
 * - Responsive design setup
 */

import "./globals.css";
import Header from "components/Header";
import Footer from "components/Footer";
import { raleway } from "public/fonts";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "HaUIDOC",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={`${raleway.className} antialiased`}>
        <SessionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}

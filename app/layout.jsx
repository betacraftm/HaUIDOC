import "./globals.css";
import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import { raleway } from "@/ui/fonts";
import { headers } from "next/headers";

export const metadata = {
  title: "HaUIDOC",
};

async function checkAuthStatus() {
  try {
    const requestHeaders = await headers();
    const cookies = requestHeaders.get("cookie");

    if (!cookies) {
      return false;
    }

    const response = await fetch("http://localhost:3000/api/auth-status", {
      headers: {
        Cookie: cookies,
      },
    });

    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    return data?.isAuthenticated;
  } catch (error) {
    console.error("Failed to fetch authentication status:", error);
    return false;
  }
}

export default async function RootLayout({ children }) {
  const isAuth = await checkAuthStatus();
  return (
    <html lang="vn">
      <body className={`${raleway.className} antialiased`}>
        <Header isAuth={isAuth} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

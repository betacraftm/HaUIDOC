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

    if (!cookies || !cookies.includes("session")) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to fetch authentication status:", error);
    return false;
  }
}

export default async function RootLayout({ children }) {
  const isAuth = await checkAuthStatus();
  return (
    <html lang="vi">
      <body className={`${raleway.className} antialiased`}>
        <Header isAuth={isAuth} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

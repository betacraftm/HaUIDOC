import "./globals.css";
import Header from "components/Header";
import Footer from "components/Footer";
import { raleway } from "components/fonts";
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

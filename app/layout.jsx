import "./globals.css";
import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import { raleway } from "@/ui/fonts";

export const metadata = {
  title: "HaUIDOC",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${raleway.className} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

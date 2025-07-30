import "./globals.css";
import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import { raleway } from "@/ui/fonts";
import { getUserAuth } from "./lib/auth";

export const metadata = {
  title: "HaUIDOC",
};

export default async function RootLayout({ children }) {
  const { isAuth, user } = await getUserAuth();

  return (
    <html lang="vi">
      <body className={`${raleway.className} antialiased`}>
        <Header isAuth={isAuth} userInfo={user} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

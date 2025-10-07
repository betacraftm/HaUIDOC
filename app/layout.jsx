import "./globals.css";
import Header from "components/Header";
import Footer from "components/Footer";
import { raleway } from "components/fonts";
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

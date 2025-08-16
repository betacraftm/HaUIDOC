"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LogOut, Upload, User, UserCog } from "lucide-react";
import Image from "next/image";
import LanguageButton from "./LanguageButton";
import { logoutUser } from "@/lib/action";

const Header = ({ isAuth, userInfo }) => {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);

  const userDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        setShowHeader(false); // Scroll down, hide header
      } else {
        setShowHeader(true); // Scroll up, show header
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/80 px-4 py-3 shadow-md backdrop-blur-sm transition-transform duration-300 md:px-12 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-primary text-2xl font-extrabold">
          <Image src="/logo.svg" alt="HaUIDOC Logo" width={128} height={28} />
        </Link>
        {isAuth ? (
          <div className="flex items-center space-x-4">
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!isUserDropdownOpen)}
                className="border-primary hover:ring-primary focus:ring-primary flex items-center justify-center rounded-full border p-0.5 transition-all duration-200 hover:ring-2 focus:ring-2 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isUserDropdownOpen}
              >
                <Image
                  src="/user.png"
                  alt="User Avatar"
                  height={32}
                  width={32}
                  className="rounded-full object-cover"
                />
              </button>
              {isUserDropdownOpen && (
                <ul
                  className="ring-opacity-5 absolute right-0 z-50 mt-5 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <li
                    role="none"
                    className="border-b border-gray-100 px-4 py-2 text-sm font-semibold text-black"
                  >
                    Xin chào, {userInfo?.name.split(" ").pop() || ""}!
                  </li>
                  <li role="none">
                    <Link
                      href="/profile"
                      className="text-secondary flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setUserDropdownOpen(false)} // Đóng menu khi click
                    >
                      <UserCog className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li role="none">
                    <Link
                      href="/upload"
                      className="text-secondary flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setUserDropdownOpen(false)} // Đóng menu khi click
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload tài liệu</span>
                    </Link>
                  </li>
                  <li role="none">
                    <button
                      onClick={async () => {
                        setUserDropdownOpen(false);
                        await logoutUser();
                      }}
                      className="text-secondary flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                      role="menuitem"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Đăng xuất</span>
                    </button>
                  </li>
                </ul>
              )}
            </div>

            <LanguageButton />
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <div>
              <Link
                href="/login"
                className="inline-flex rounded-full p-2 md:hidden"
              >
                <User className="text-primary h-5 w-5" />
              </Link>
              <Link
                href="/login"
                className="text-primary hover:bg-primary border-primary hidden h-9 items-center justify-center rounded-md border bg-white px-4 py-2 text-sm font-semibold transition-colors hover:text-white md:inline-flex"
              >
                Đăng nhập
              </Link>
            </div>
            <LanguageButton />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

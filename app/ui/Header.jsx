"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, Globe, ChevronDown } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

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

  return (
    <header
      className={`sticky top-0 z-50 bg-white/80 px-4 py-3 shadow-md backdrop-blur-sm transition-transform duration-300 md:px-12 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-primary text-2xl font-extrabold">
          <Image src="/logo.svg" alt="HaUIDOC Logo" width={128} height={28} />
        </Link>
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
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center rounded-full p-1 hover:bg-gray-100"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <Globe className="text-primary h-5 w-5" />
              <ChevronDown
                className={`text-secondary ml-1 h-4 w-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen && (
              <ul
                className="ring-opacity-5 absolute right-0 z-50 mt-5 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black focus:outline-none"
                role="menu"
                aria-orientation="vertical"
              >
                <li role="none">
                  <Link
                    href="#"
                    className="text-primary flex items-center gap-3 px-4 py-2 text-sm font-semibold"
                    role="menuitem"
                  >
                    <span>Tiếng Việt</span>
                  </Link>
                </li>
                <li role="none">
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 text-sm"
                    role="menuitem"
                  >
                    <span>English</span>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

/**
 * Header Component
 *
 * The main navigation header component that appears on all authenticated pages.
 * Provides navigation links, user menu, and responsive design for mobile devices.
 *
 * Features:
 * - Logo navigation (dynamic based on auth status)
 * - User dropdown menu with profile options
 * - Responsive design with mobile hamburger menu
 * - Session management and logout functionality
 * - Upload button for quick document uploads
 *
 * Navigation Logic:
 * - Authenticated users: Logo goes to "/home"
 * - Non-authenticated users: Logo goes to "/" (landing page)
 *
 * @component
 * @requires next-auth/react for session management
 * @requires next/navigation for routing
 */

"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogOut, Upload, User, UserCog } from "lucide-react";

const Header = () => {
  const { data: session, status } = useSession();
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") return null;

  const userInfo = session?.user;

  return (
    <header
      className={`sticky top-0 z-50 bg-white/80 px-4 py-3 shadow-md backdrop-blur-sm transition-transform duration-300 md:px-12 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex max-w-7xl items-center justify-between">
        <Link href={session ? "/home" : "/"} className="text-primary text-2xl font-extrabold">
        <Image src="/logo.svg" alt="HaUIDOC Logo" width={128} height={28} />
        </Link>

        {session ? (
          <div className="flex items-center space-x-4">
            <div className="relative" ref={userDropdownRef}>
              <Image
                src={userInfo?.image_url || "/user.png"}
                alt="User Avatar"
                height={28}
                width={28}
                onClick={() => setUserDropdownOpen(!isUserDropdownOpen)}
                className="ring-primary h-7 w-7 cursor-pointer rounded-full p-0.5 ring-2"
              />
              {isUserDropdownOpen && (
                <ul className="ring-opacity-5 absolute right-0 z-50 mt-5 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black">
                  <li className="border-b border-gray-100 px-4 py-2 text-sm font-semibold text-black">
                    Xin chào, {userInfo?.name.split(" ").pop() || ""}!
                  </li>
                  <li>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <UserCog className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/upload"
                      className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload tài liệu</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={async () => {
                        setUserDropdownOpen(false);
                        await signOut({ redirect: false });
                        router.push("/");
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Đăng xuất</span>
                    </button>
                  </li>
                </ul>
              )}
            </div>
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
                className="bg-primary hidden h-9 items-center justify-center rounded-xl border px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 md:inline-flex"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import { ChevronDown, Globe } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const LanguageButton = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
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
              className="text-secondary flex items-center gap-3 px-4 py-2 text-sm"
              role="menuitem"
            >
              <span>English</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default LanguageButton;

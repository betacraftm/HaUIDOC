import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-100 px-4 pt-10 shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.18)]">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Logo & Brand */}
        <div className="hidden flex-col items-start justify-start sm:inline-block lg:items-center lg:justify-center">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="HaUIDOC Logo"
              width={128}
              height={28}
              className="inline-block"
              priority
            />
          </div>
        </div>
        {/* Về dự án */}
        <div>
          <h4 className="text-secondary mb-2 text-lg font-bold">Về dự án</h4>
          <ul className="space-y-1 text-base text-gray-800">
            <li>
              <a href="#about" className="hover:underline">
                Giới thiệu về HaUIDOC
              </a>
            </li>
            <li>
              <Link href="/upload" className="hover:underline">
                Tải tài liệu lên
              </Link>
            </li>
          </ul>
        </div>
        {/* Liên hệ */}
        <div>
          <h4 className="text-secondary mb-2 text-lg font-bold">Liên hệ</h4>
          <ul className="space-y-1 text-base text-gray-800">
            <li>
              <a
                href="https://zalo.me/0963136904"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Zalo
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/ngocdat204"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
        {/* Buy Me a Coffee */}
        <div>
          <h4 className="text-secondary mb-2 text-lg font-bold">
            Buy Me a Coffee ☕︎☕︎☕︎
          </h4>
          <p className="mb-1 text-base text-gray-800">
            HaUIDOC là một dự án cá nhân phi lợi nhuận. Nếu bạn thấy trang web
            này hữu ích, một khoản ủng hộ nhỏ sẽ là nguồn động viên to lớn. Bạn
            có thể donate{" "}
            <Link
              href="/donate"
              className="text-secondary hover:text-secondary/80 underline"
              rel="noopener noreferrer"
            >
              tại đây.
            </Link>
          </p>
        </div>
      </div>
      {/* Only show logo at bottom on small screens */}
      <div className="mt-10 flex flex-col items-center sm:hidden">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="HaUIDOC Logo"
            width={128}
            height={28}
            className="inline-block"
          />
        </div>
      </div>
      {/* Copyright */}
      <div className="text-secondary my-4 text-center text-sm">
        © {new Date().getFullYear()} HaUIDOC. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

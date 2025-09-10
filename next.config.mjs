/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [new URL("https://ui-avatars.com/api?size=40")],
  },
};

export default nextConfig;

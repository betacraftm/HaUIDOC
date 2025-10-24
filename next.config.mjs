/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
    // serverComponentsExternalPackages: ['libreoffice-convert', 'nodemailer'],
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [new URL("https://lh3.googleusercontent.com/**")],
  },
  // // Transpile packages that use ESM to avoid build issues
};

export default nextConfig;

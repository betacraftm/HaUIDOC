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
  // Transpile packages that use ESM to avoid build issues
  transpilePackages: ["react-pdf", "pdfjs-dist"],
  // Webpack configuration to handle ESM imports
  webpack: (config, { isServer }) => {
    // Handle ESM imports in client-side code
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    return config;
  },
};

export default nextConfig;

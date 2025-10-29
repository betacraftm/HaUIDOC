/**
 * Next.js Configuration File
 *
 * This file contains the configuration for the HaUIDOC Next.js application.
 * It includes settings for server actions, image optimization, webpack configuration,
 * and other Next.js specific configurations.
 *
 * Key features configured:
 * - Server actions with increased body size limit for file uploads
 * - Image optimization for external sources (avatars, Firebase)
 * - Webpack configuration to handle ESM imports and Node.js fallbacks
 * - External packages that should run on the server side only
 */

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

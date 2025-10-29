/**
 * Hero/Landing Page Component
 *
 * The main landing page component that serves as the entry point for non-authenticated users.
 * Displays the hero section, features, statistics, and call-to-action buttons to encourage
 * user registration and engagement with the HaUIDOC platform.
 *
 * Features:
 * - Hero section with compelling headline and CTA
 * - Feature highlights and benefits
 * - Statistics and social proof
 * - Responsive design for all devices
 * - SEO optimized content
 *
 * Note: Authenticated users are automatically redirected to /home by middleware
 *
 * @component
 */

import AboutSection from "./AboutSection";
import HeroSection from "./HeroSection";

const HomePage = () => {
  return (
    <section className="mx-auto flex max-w-md flex-col items-center justify-center gap-6 px-6 py-16 text-center sm:max-w-lg sm:px-0">
      <HeroSection />
      <AboutSection />
    </section>
  );
};

export default HomePage;

import HeroSection from "@/pages/home-page/HeroSection";
import AboutSection from "@/pages/home-page/AboutSection";

const HomePage = () => {
  return (
    <section className="mx-auto flex max-w-md flex-col items-center justify-center gap-6 px-6 py-16 text-center sm:max-w-lg sm:px-0">
      <HeroSection />
      <AboutSection />
    </section>
  );
};

export default HomePage;

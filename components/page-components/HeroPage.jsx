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

import Navbar              from "@/components/layout/Navbar";
import Footer              from "@/components/layout/Footer";
import FilmCountdown       from "@/components/intro/FilmCountdown";
import CustomCursor        from "@/components/cursor/CustomCursor";
import Hero                from "@/components/sections/Hero";
import About               from "@/components/sections/About";
import Specializations     from "@/components/sections/Specializations";
import FeaturedProject     from "@/components/sections/FeaturedProject";
import BentoProjects       from "@/components/sections/BentoProjects";
import ThreeDShowcase      from "@/components/sections/ThreeDShowcase";
import KatanaShowcase      from "@/components/sections/KatanaShowcase";
import HorizontalShowcase  from "@/components/sections/HorizontalShowcase";
import Skills              from "@/components/sections/Skills";
import Approach            from "@/components/sections/Approach";
import OpportunityCTA      from "@/components/sections/OpportunityCTA";
import Contact             from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <FilmCountdown />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Specializations />
        <FeaturedProject />
        <BentoProjects />
        <ThreeDShowcase />
        <KatanaShowcase />
        <HorizontalShowcase />
        <Skills />
        <Approach />
        <OpportunityCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

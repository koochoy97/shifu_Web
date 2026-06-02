import Hero from "@/components/Hero";
import Fillings from "@/components/Fillings";
import Pricing from "@/components/Pricing";
import HowToCook from "@/components/HowToCook";
import Delivery from "@/components/Delivery";
import Faq from "@/components/Faq";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 pb-28 pt-4 md:max-w-xl">
      <div className="space-y-4">
        <Reveal>
          <Hero />
        </Reveal>
        <Reveal delay={60}>
          <Fillings />
        </Reveal>
        <Reveal delay={60}>
          <Pricing />
        </Reveal>
        <Reveal delay={60}>
          <HowToCook />
        </Reveal>
        <Reveal delay={60}>
          <Delivery />
        </Reveal>
        <Reveal delay={60}>
          <Faq />
        </Reveal>
        <Reveal delay={60}>
          <Closing />
        </Reveal>
        <Reveal delay={60}>
          <Footer />
        </Reveal>
      </div>
    </main>
  );
}

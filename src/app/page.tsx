import Hero from "@/components/Hero";
import Fillings from "@/components/Fillings";
import Pricing from "@/components/Pricing";
import HowToCook from "@/components/HowToCook";
import Delivery from "@/components/Delivery";
import Faq from "@/components/Faq";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 pb-28 pt-4 md:max-w-xl">
      <div className="space-y-4">
        <Hero />
        <Fillings />
        <Pricing />
        <HowToCook />
        <Delivery />
        <Faq />
        <Closing />
        <Footer />
      </div>
    </main>
  );
}

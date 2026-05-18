import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero, ServicesSequence } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ROICalculator } from "@/components/sections/roi-calculator";
import { Portfolio } from "@/components/sections/portfolio";
import { ContactForm } from "@/components/sections/contact-form";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ServicesSequence />
      <About />
      <ROICalculator />
      <Portfolio />
      <ContactForm />
      
      <Footer />
    </main>
  );
}

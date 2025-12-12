import Header from "@/components/white/Header";
import Hero from "@/components/white/Hero";
import Services from "@/components/white/Services";
import About from "@/components/white/About";
import WhyUs from "@/components/white/WhyUs";
import ContactForm from "@/components/white/ContactForm";
import Footer from "@/components/white/Footer";

export function WhitePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <WhyUs />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/white/ui/button";
import { ArrowRight, Calculator, FileText, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/white/ui/dialog";
import { Input } from "@/components/white/ui/input";
import Image from "next/image";

const Hero = () => {
  const [signupOpen, setSignupOpen] = useState(false);
  const { toast } = useToast();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Account Created",
      description: "Welcome to InvestBooks! Check your email for confirmation.",
    });
    setSignupOpen(false);
  };

  const scrollToServices = () => {
    const element = document.querySelector("#services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            fill
            src="/hero.jpg"
            alt="Professional accountant analyzing investment portfolio data"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-hero opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-transparent" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Trusted by 10,000+ Canadian Investors</span>
            </div>

            {/* Main Heading */}
            <h1
              className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Investment Portfolio <span className="text-gradient">Accounting</span> Made Simple
            </h1>

            {/* Subheading */}
            <p
              className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Professional bookkeeping for your Questrade, Qtrade, Wealthsimple, and other investment accounts.
              Tax-ready reports, capital gains tracking, and T-slip organization — all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="lg" onClick={() => setSignupOpen(true)}>
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="heroOutline" size="lg" onClick={scrollToServices}>
                Explore Services
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Users className="w-5 h-5" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-white">10K+</p>
                <p className="text-white/60 text-sm">Active Clients</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Calculator className="w-5 h-5" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-white">$2B+</p>
                <p className="text-white/60 text-sm">Assets Tracked</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <FileText className="w-5 h-5" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-white">50K+</p>
                <p className="text-white/60 text-sm">Tax Reports Generated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Signup Dialog */}
      <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Start Your Free Trial</DialogTitle>
            <DialogDescription>14 days free. No credit card required. Cancel anytime.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignup} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="hero-first" className="block text-sm font-medium mb-2">
                  First Name
                </label>
                <Input id="hero-first" placeholder="John" required />
              </div>
              <div>
                <label htmlFor="hero-last" className="block text-sm font-medium mb-2">
                  Last Name
                </label>
                <Input id="hero-last" placeholder="Smith" required />
              </div>
            </div>
            <div>
              <label htmlFor="hero-email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input id="hero-email" type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <label htmlFor="hero-password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <Input id="hero-password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full">
              Create Free Account
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Hero;

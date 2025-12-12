"use client";

import { useState } from "react";
import { Calculator, FileSpreadsheet, PieChart, Receipt, RefreshCw, Shield } from "lucide-react";
import { Button } from "@/components/white/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/white/ui/dialog";

const services = [
  {
    icon: Calculator,
    title: "Capital Gains Calculation",
    description:
      "Automatic calculation of capital gains and losses across all your investment accounts. ACB tracking with superficial loss rules applied.",
    features: ["Adjusted Cost Base (ACB)", "Superficial loss detection", "Foreign exchange handling"],
    details:
      "Our sophisticated algorithms automatically track your Adjusted Cost Base (ACB) across multiple accounts and platforms. We handle complex scenarios including stock splits, mergers, return of capital, and superficial loss rules as per CRA guidelines.",
  },
  {
    icon: FileSpreadsheet,
    title: "Tax-Ready Reports",
    description:
      "Generate CRA-compliant tax reports for your annual filing. Schedule 3, T5008 reconciliation, and foreign income reporting.",
    features: ["Schedule 3 reports", "T5008 reconciliation", "Foreign income summary"],
    details:
      "Get professionally formatted reports ready for your tax filing. Our reports include Schedule 3 capital gains summaries, T5008 reconciliation worksheets, and comprehensive foreign income documentation for US dividends and other international investments.",
  },
  {
    icon: PieChart,
    title: "Portfolio Analytics",
    description:
      "Comprehensive performance tracking and analytics for all your investment accounts. Visualize your portfolio allocation and returns.",
    features: ["Performance metrics", "Asset allocation charts", "Benchmark comparison"],
    details:
      "Understand your portfolio with detailed analytics including time-weighted returns, dividend yield tracking, sector allocation breakdowns, and benchmark comparisons against major indices like TSX and S&P 500.",
  },
  {
    icon: Receipt,
    title: "T-Slip Organization",
    description:
      "Automatic import and organization of all your T-slips. T3, T5, T5008, and NR4 slips organized and reconciled.",
    features: ["Automatic import", "Cross-platform matching", "Audit-ready records"],
    details:
      "We automatically import and organize your T3, T5, T5008, and NR4 slips from all major Canadian brokerages. Our system cross-references slips with your transaction history to catch discrepancies before you file.",
  },
  {
    icon: RefreshCw,
    title: "Multi-Platform Sync",
    description:
      "Connect all your investment accounts in one place. Questrade, Qtrade, Wealthsimple, TD, RBC, and more supported.",
    features: ["20+ platforms supported", "Automatic sync", "Historical import"],
    details:
      "Connect your accounts from Questrade, Qtrade, Wealthsimple, TD Direct Investing, RBC Direct Investing, BMO InvestorLine, CIBC Investor's Edge, National Bank, and many more. Import years of historical data with one click.",
  },
  {
    icon: Shield,
    title: "CRA Compliance",
    description:
      "Stay compliant with CRA requirements. Proper documentation for audits and peace of mind during tax season.",
    features: ["Audit-ready documentation", "6-year record keeping", "Expert support"],
    details:
      "All your records are stored securely and organized for easy retrieval during CRA audits. We maintain 6+ years of transaction history and provide detailed documentation that accountants and CRA auditors can easily understand.",
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null);

  return (
    <>
      <section id="services" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Complete Portfolio <span className="text-gradient">Accounting</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              From capital gains tracking to tax-ready reports, we handle all the bookkeeping for your investment
              portfolios.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-lg cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedService(service)}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-green-gradient flex items-center justify-center mb-6 group-hover:shadow-glow transition-shadow duration-500">
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>

                {/* Hover Gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Supported Platforms */}
          <div className="mt-20 text-center">
            <p className="text-muted-foreground mb-6">Supported Investment Platforms</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {["Questrade", "Qtrade", "Wealthsimple", "TD Direct", "RBC DI", "BMO", "CIBC", "NBC"].map((platform) => (
                <div
                  key={platform}
                  className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm"
                >
                  {platform}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Detail Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="w-12 h-12 rounded-xl bg-green-gradient flex items-center justify-center mb-4">
              {selectedService && <selectedService.icon className="w-6 h-6 text-white" />}
            </div>
            <DialogTitle className="font-display text-2xl">{selectedService?.title}</DialogTitle>
            <DialogDescription className="text-base leading-relaxed pt-4">{selectedService?.details}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <h4 className="font-semibold mb-3">Key Features:</h4>
            <ul className="space-y-2">
              {selectedService?.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <Button className="w-full mt-6" onClick={() => setSelectedService(null)}>
            Get Started
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Services;

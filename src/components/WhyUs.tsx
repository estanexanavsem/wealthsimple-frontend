import { 
  Clock, 
  Headphones, 
  Lock, 
  Zap, 
  CheckCircle, 
  DollarSign 
} from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Save Hours Every Tax Season",
    description: "What used to take days now takes minutes. Automatic imports, instant calculations, and one-click report generation.",
  },
  {
    icon: CheckCircle,
    title: "CRA-Compliant Accuracy",
    description: "Built by CPAs with deep knowledge of Canadian tax law. Superficial loss rules, ACB calculations, and foreign income — all handled correctly.",
  },
  {
    icon: Lock,
    title: "Bank-Level Security",
    description: "Your financial data is encrypted with 256-bit AES encryption. SOC 2 Type II certified infrastructure. Your data is never sold.",
  },
  {
    icon: Zap,
    title: "Real-Time Sync",
    description: "Connect your brokerage accounts and see transactions sync automatically. No manual data entry or CSV uploads required.",
  },
  {
    icon: DollarSign,
    title: "Maximize Tax Savings",
    description: "Identify tax-loss harvesting opportunities and optimize your capital gains. Many clients save more in taxes than the cost of our service.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Questions about your taxes? Our team includes CPAs who can help explain complex scenarios and ensure accurate reporting.",
  },
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-24 bg-hero text-white overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-primary text-sm font-semibold mb-4">
            Why InvestBooks
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            The Smart Choice for{" "}
            <span className="text-gradient">Portfolio Accounting</span>
          </h2>
          <p className="text-white/70 text-lg">
            Join thousands of Canadian investors who trust InvestBooks for accurate, stress-free tax reporting.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group glass rounded-2xl p-8 hover:bg-white/15 transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-green-gradient flex items-center justify-center mb-6 group-hover:shadow-glow transition-shadow duration-500">
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-display font-bold mb-3">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-20 text-center relative z-10">
          <p className="text-white/50 text-sm mb-6">Trusted & Secure</p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="glass px-6 py-3 rounded-lg">
              <span className="font-bold">SOC 2</span>
              <span className="text-white/60 text-sm ml-2">Certified</span>
            </div>
            <div className="glass px-6 py-3 rounded-lg">
              <span className="font-bold">256-bit</span>
              <span className="text-white/60 text-sm ml-2">Encryption</span>
            </div>
            <div className="glass px-6 py-3 rounded-lg">
              <span className="font-bold">CPA</span>
              <span className="text-white/60 text-sm ml-2">Reviewed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;

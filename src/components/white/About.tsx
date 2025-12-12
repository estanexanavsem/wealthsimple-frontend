import { CheckCircle2 } from "lucide-react";

const milestones = [
  { year: "2015", event: "Founded by CPA and software engineers in Vancouver" },
  { year: "2017", event: "Launched automated ACB tracking system" },
  { year: "2019", event: "Reached 1,000 active users" },
  { year: "2021", event: "Added support for 15+ Canadian brokerages" },
  { year: "2023", event: "Processed over $1B in investment transactions" },
  { year: "2024", event: "10,000+ clients, $2B+ assets tracked" },
];

const values = [
  "Founded by Canadian CPAs who understand tax rules",
  "Purpose-built for Canadian investment taxation",
  "Direct integrations with major brokerages",
  "Bank-level security and encryption",
  "Dedicated support from accounting professionals",
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Story */}
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Built by Investors,{" "}
              <span className="text-gradient">For Investors</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              InvestBooks was born out of frustration. As self-directed investors with accounts across multiple 
              platforms like Questrade, Qtrade, and Wealthsimple, our founders spent countless hours manually 
              tracking cost bases and preparing tax documents.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We built the tool we wished existed — one that automatically imports transactions from all 
              major Canadian brokerages, accurately calculates ACB following CRA rules, and generates 
              tax-ready reports in minutes instead of hours.
            </p>

            {/* Values */}
            <ul className="space-y-3">
              {values.map((value) => (
                <li key={value} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className="relative pl-20 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Year Badge */}
                  <div className="absolute left-0 w-16 h-16 rounded-xl bg-card border-2 border-border group-hover:border-primary flex items-center justify-center transition-colors duration-300 shadow-sm">
                    <span className="text-sm font-bold text-primary">{milestone.year}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="bg-card rounded-xl p-6 border border-border group-hover:border-primary/30 transition-all duration-300 hover:shadow-md">
                    <p className="text-foreground font-medium">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

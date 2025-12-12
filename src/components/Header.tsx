import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const { toast } = useToast();

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About Us", href: "#about" },
    { name: "Why Choose Us", href: "#why-us" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login Successful",
      description: "Welcome back to InvestBooks!",
    });
    setLoginOpen(false);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Account Created",
      description: "Welcome to InvestBooks! Check your email for confirmation.",
    });
    setSignupOpen(false);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-lg bg-green-gradient flex items-center justify-center shadow-glow">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-foreground">
                Invest<span className="text-gradient">Books</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setLoginOpen(true)}>
                Log In
              </Button>
              <Button size="sm" onClick={() => setSignupOpen(true)}>
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-border animate-fade-in">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium py-2 text-left"
                  >
                    {link.name}
                  </button>
                ))}
                <div className="flex flex-col gap-2 pt-4">
                  <Button variant="outline" className="w-full" onClick={() => { setIsOpen(false); setLoginOpen(true); }}>
                    Log In
                  </Button>
                  <Button className="w-full" onClick={() => { setIsOpen(false); setSignupOpen(true); }}>
                    Get Started
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Login Dialog */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Welcome Back</DialogTitle>
            <DialogDescription>
              Sign in to access your portfolio accounting dashboard.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium mb-2">Email</label>
              <Input id="login-email" type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium mb-2">Password</label>
              <Input id="login-password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button type="button" onClick={() => { setLoginOpen(false); setSignupOpen(true); }} className="text-primary hover:underline">
                Sign up
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Create Account</DialogTitle>
            <DialogDescription>
              Start organizing your investment portfolio accounting today.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignup} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="signup-first" className="block text-sm font-medium mb-2">First Name</label>
                <Input id="signup-first" placeholder="John" required />
              </div>
              <div>
                <label htmlFor="signup-last" className="block text-sm font-medium mb-2">Last Name</label>
                <Input id="signup-last" placeholder="Smith" required />
              </div>
            </div>
            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium mb-2">Email</label>
              <Input id="signup-email" type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium mb-2">Password</label>
              <Input id="signup-password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full">Create Account</Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button type="button" onClick={() => { setSignupOpen(false); setLoginOpen(true); }} className="text-primary hover:underline">
                Sign in
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;

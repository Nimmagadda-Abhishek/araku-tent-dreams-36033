import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-card/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Araku Valley Camps</h1>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("services")} className="text-foreground hover:text-primary transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection("booking")} className="text-foreground hover:text-primary transition-colors">
              Book Now
            </button>
            <button onClick={() => scrollToSection("gallery")} className="text-foreground hover:text-primary transition-colors">
              Gallery
            </button>
            <button onClick={() => scrollToSection("testimonials")} className="text-foreground hover:text-primary transition-colors">
              Reviews
            </button>
            <button onClick={() => scrollToSection("faq")} className="text-foreground hover:text-primary transition-colors">
              FAQ
            </button>
            <Button onClick={() => scrollToSection("booking")} variant="default" size="sm">
              Check Availability
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-card md:hidden pt-20 px-4">
          <div className="flex flex-col gap-4">
            <button onClick={() => scrollToSection("services")} className="text-left py-3 text-lg hover:text-primary transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection("booking")} className="text-left py-3 text-lg hover:text-primary transition-colors">
              Book Now
            </button>
            <button onClick={() => scrollToSection("gallery")} className="text-left py-3 text-lg hover:text-primary transition-colors">
              Gallery
            </button>
            <button onClick={() => scrollToSection("testimonials")} className="text-left py-3 text-lg hover:text-primary transition-colors">
              Reviews
            </button>
            <button onClick={() => scrollToSection("faq")} className="text-left py-3 text-lg hover:text-primary transition-colors">
              FAQ
            </button>
            <Button onClick={() => scrollToSection("booking")} className="mt-4">
              Check Availability
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/araku-hero.jpg";

const Hero = () => {
  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="absolute inset-0" style={{
        background: 'var(--hero-gradient)'
      }} />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
          Experience Araku Valley<br />Under The Stars
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 font-light">
          Premium Camping • Authentic Cuisine • Unforgettable Memories
        </p>
        <Button 
          onClick={scrollToBooking}
          size="lg" 
          className="text-lg px-8 py-6 hover:scale-105 transition-transform duration-300"
        >
          Check Availability
        </Button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

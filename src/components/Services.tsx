import { Tent, Utensils, Flame, Footprints } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Tent,
    title: "Luxury Tents",
    description: "Spacious, weather-proof tents with comfortable bedding and mountain views"
  },
  {
    icon: Utensils,
    title: "Traditional Tribal Cuisine",
    description: "Authentic local dishes prepared with fresh ingredients from the valley"
  },
  {
    icon: Flame,
    title: "Bonfire & Activities",
    description: "Evening campfires, music sessions, and outdoor games under starlit skies"
  },
  {
    icon: Footprints,
    title: "Guided Nature Trails",
    description: "Expert-led hikes through lush forests, waterfalls, and scenic viewpoints"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">What We Offer</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need for an unforgettable camping experience in Araku Valley
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index}
                className="border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                style={{ boxShadow: 'var(--card-shadow)' }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

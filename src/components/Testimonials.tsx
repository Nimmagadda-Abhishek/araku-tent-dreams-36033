import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Hyderabad",
    rating: 5,
    text: "Absolutely magical experience! The tents were luxurious, food was delicious, and the staff made us feel like family. The sunrise view from the camp is unforgettable.",
    image: "PS"
  },
  {
    name: "Rahul Verma",
    location: "Bangalore",
    rating: 5,
    text: "Best camping trip ever! Perfect blend of adventure and comfort. The bonfire nights and tribal cuisine were highlights. Highly recommend for nature lovers!",
    image: "RV"
  },
  {
    name: "Anjali Reddy",
    location: "Visakhapatnam",
    rating: 5,
    text: "Araku Valley is stunning and this camp is the best way to experience it. Clean facilities, friendly guides, and beautiful scenery. Will definitely come back!",
    image: "AR"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Guests Say</h2>
          <p className="text-muted-foreground text-lg">
            Real experiences from happy campers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-muted-foreground">{testimonial.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

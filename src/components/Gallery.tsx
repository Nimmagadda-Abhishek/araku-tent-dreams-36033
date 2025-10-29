import tentInterior from "@/assets/tent-interior.jpg";
import food from "@/assets/food.jpg";
import bonfire from "@/assets/bonfire.jpg";
import hiking from "@/assets/hiking.jpg";

const Gallery = () => {
  const images = [
    { src: tentInterior, alt: "Luxury tent interior with mountain views", span: "md:col-span-2" },
    { src: food, alt: "Traditional tribal cuisine served at camp", span: "" },
    { src: bonfire, alt: "Evening bonfire under starry sky", span: "" },
    { src: hiking, alt: "Guided nature trail through Araku forests", span: "md:col-span-2" },
  ];

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
          <p className="text-muted-foreground text-lg">
            A glimpse into your Araku Valley experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <div 
              key={index}
              className={`${image.span} relative overflow-hidden rounded-lg group cursor-pointer h-64 md:h-80`}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-primary-foreground p-4 text-sm">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

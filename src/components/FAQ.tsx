import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is included in the tent booking?",
    answer: "Each tent booking includes comfortable bedding, breakfast and dinner (traditional tribal cuisine), bonfire access in the evening, one guided nature trail, and free parking. Basic toiletries and towels are also provided."
  },
  {
    question: "Is transportation available from the city?",
    answer: "We can arrange transportation from Visakhapatnam at an additional cost. The journey takes approximately 3-4 hours. Alternatively, you can drive your own vehicle with ample parking available at the camp."
  },
  {
    question: "What should I bring for camping?",
    answer: "We recommend bringing comfortable walking shoes, light jackets for evenings (it gets cool), sunscreen, insect repellent, a flashlight, and any personal medications. We provide everything else needed for a comfortable stay."
  },
  {
    question: "Are children allowed? Is it family-friendly?",
    answer: "Absolutely! We welcome families with children. The camp is safe and has activities suitable for all ages. Children under 5 years stay free when sharing a tent with adults."
  },
  {
    question: "What is the cancellation policy?",
    answer: "Free cancellation is available up to 48 hours before your check-in date with a full refund. Cancellations within 48 hours receive a 50% refund. No-shows are non-refundable."
  },
  {
    question: "Is electricity available in the tents?",
    answer: "Yes, all tents have basic electricity for charging devices and lighting. However, we encourage guests to disconnect and enjoy nature. Power is available from 6 PM to 10 PM and 6 AM to 9 AM."
  },
  {
    question: "What about mobile network connectivity?",
    answer: "Mobile network is limited in the valley, which is part of the charm! BSNL and Airtel have patchy coverage. We have Wi-Fi available in the common area for emergencies."
  },
  {
    question: "Are pets allowed?",
    answer: "Unfortunately, we cannot accommodate pets at this time due to the natural wildlife in the area and to ensure all guests' comfort and safety."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know before booking
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;

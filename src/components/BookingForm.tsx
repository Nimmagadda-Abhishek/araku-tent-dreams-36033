import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CalendarIcon, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import TentSelector from "./TentSelector";
import PaymentForm from "./PaymentForm";

const TENT_PRICE = 2500;

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [selectedTents, setSelectedTents] = useState<number[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTentSelector, setShowTentSelector] = useState(false);
  
  // Simulated booked tents
  const bookedTents = [3, 7, 12, 18, 25, 31, 42, 48];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialRequests: ""
  });

  const handleTentSelect = (tentNumber: number) => {
    setSelectedTents(prev => 
      prev.includes(tentNumber) 
        ? prev.filter(t => t !== tentNumber)
        : [...prev, tentNumber]
    );
  };

  const checkAvailability = () => {
    if (checkIn && checkOut) {
      setShowTentSelector(true);
    }
  };

  const totalPrice = selectedTents.length * TENT_PRICE;

  const canProceedToStep2 = checkIn && checkOut && selectedTents.length > 0;
  const canProceedToStep3 = formData.fullName && formData.email && formData.phone && termsAccepted;

  return (
    <section id="booking" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Book Your Stay</h2>
          <p className="text-muted-foreground text-lg">50 Premium Tents Available Daily</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-border -z-10" />
          <div 
            className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                s <= step ? "bg-primary text-primary-foreground" : "bg-card border-2 border-border"
              }`}>
                {s}
              </div>
              <span className="text-xs mt-2 hidden sm:block">
                {s === 1 && "Select Dates"}
                {s === 2 && "Choose Tents"}
                {s === 3 && "Details"}
                {s === 4 && "Payment"}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Date Selection */}
        {step === 1 && (
          <div className="bg-card p-6 md:p-8 rounded-lg shadow-lg space-y-6 animate-scale-in">
            <h3 className="text-2xl font-semibold mb-4">Select Your Dates</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>Check-in Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left", !checkIn && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn ? format(checkIn, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Check-out Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left", !checkOut && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOut ? format(checkOut, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Label>Number of Guests</Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <SelectItem key={n} value={String(n)}>{n} {n === 1 ? 'Guest' : 'Guests'}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={checkAvailability} className="w-full" disabled={!checkIn || !checkOut}>
              Check Availability
            </Button>

            {showTentSelector && (
              <div className="mt-8 animate-fade-in-up">
                <h4 className="text-xl font-semibold mb-4">Select Your Tents</h4>
                <TentSelector 
                  selectedTents={selectedTents}
                  onTentSelect={handleTentSelect}
                  bookedTents={bookedTents}
                />
                
                {selectedTents.length > 0 && (
                  <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Total Price</p>
                        <p className="text-sm text-muted-foreground">{selectedTents.length} tent(s) × ₹{TENT_PRICE}</p>
                      </div>
                      <p className="text-2xl font-bold text-primary">₹{totalPrice.toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <Button onClick={() => setStep(2)} disabled={!canProceedToStep2} className="w-full mt-4">
              Continue to Details <ChevronRight className="ml-2" />
            </Button>
          </div>
        )}

        {/* Step 2: User Details */}
        {step === 2 && (
          <div className="bg-card p-6 md:p-8 rounded-lg shadow-lg space-y-6 animate-scale-in">
            <h3 className="text-2xl font-semibold mb-4">Your Details</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input 
                  id="fullName" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input 
                  id="phone" 
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <Label htmlFor="requests">Special Requests (Optional)</Label>
                <Textarea 
                  id="requests"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                  placeholder="Any dietary preferences or special requirements..."
                  rows={4}
                />
              </div>
            </div>

            {/* Terms & Conditions */}
            <Accordion type="single" collapsible className="border rounded-lg">
              <AccordionItem value="terms">
                <AccordionTrigger className="px-4">Terms & Conditions</AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Cancellation Policy</h4>
                      <p>Free cancellation up to 48 hours before check-in. 50% refund for cancellations within 48 hours.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Check-in/Check-out</h4>
                      <p>Check-in: 2:00 PM | Check-out: 11:00 AM</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Safety Guidelines</h4>
                      <p>Follow all camp safety rules. No smoking inside tents. Keep the area clean.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Amenities Included</h4>
                      <p>Bedding, breakfast, dinner, bonfire access, guided trail (1x), parking.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm cursor-pointer">
                I agree to the terms and conditions *
              </label>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                Back
              </Button>
              <Button onClick={() => setStep(3)} disabled={!canProceedToStep3} className="flex-1">
                Continue to Payment <ChevronRight className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="animate-scale-in">
            <PaymentForm 
              totalAmount={totalPrice}
              onBack={() => setStep(2)}
              bookingDetails={{
                checkIn,
                checkOut,
                guests: parseInt(guests),
                tents: selectedTents,
                ...formData
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingForm;

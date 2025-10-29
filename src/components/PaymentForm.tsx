import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Smartphone, Building2, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";

interface PaymentFormProps {
  totalAmount: number;
  onBack: () => void;
  bookingDetails: any;
}

const PaymentForm = ({ totalAmount, onBack, bookingDetails }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingRef] = useState(`ARK${Date.now().toString().slice(-8)}`);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setShowSuccess(true);
    }, 2000);
  };

  return (
    <>
      <div className="bg-card p-6 md:p-8 rounded-lg shadow-lg space-y-6">
        <h3 className="text-2xl font-semibold mb-4">Payment Details</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Payment Form */}
          <div>
            <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="card">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Card
                </TabsTrigger>
                <TabsTrigger value="upi">
                  <Smartphone className="w-4 h-4 mr-2" />
                  UPI
                </TabsTrigger>
                <TabsTrigger value="netbanking">
                  <Building2 className="w-4 h-4 mr-2" />
                  Net Banking
                </TabsTrigger>
              </TabsList>

              <TabsContent value="card" className="space-y-4 mt-6">
                <div>
                  <Label>Card Number</Label>
                  <Input placeholder="1234 5678 9012 3456" maxLength={19} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Expiry Date</Label>
                    <Input placeholder="MM/YY" maxLength={5} />
                  </div>
                  <div>
                    <Label>CVV</Label>
                    <Input placeholder="123" maxLength={3} type="password" />
                  </div>
                </div>
                <div>
                  <Label>Cardholder Name</Label>
                  <Input placeholder="John Doe" />
                </div>
              </TabsContent>

              <TabsContent value="upi" className="space-y-4 mt-6">
                <div>
                  <Label>UPI ID</Label>
                  <Input placeholder="yourname@upi" />
                </div>
                <p className="text-sm text-muted-foreground">
                  You will receive a payment request on your UPI app
                </p>
              </TabsContent>

              <TabsContent value="netbanking" className="space-y-4 mt-6">
                <div>
                  <Label>Select Bank</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                  </select>
                </div>
                <p className="text-sm text-muted-foreground">
                  You will be redirected to your bank's website
                </p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Order Summary */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold text-lg mb-4">Booking Summary</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-in</span>
                  <span className="font-medium">{bookingDetails.checkIn ? format(bookingDetails.checkIn, "PPP") : "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-out</span>
                  <span className="font-medium">{bookingDetails.checkOut ? format(bookingDetails.checkOut, "PPP") : "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guests</span>
                  <span className="font-medium">{bookingDetails.guests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tents</span>
                  <span className="font-medium">{bookingDetails.tents?.length || 0}</span>
                </div>
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Taxes & Fees</span>
                    <span>₹{(totalAmount * 0.18).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total Amount</span>
                    <span className="text-primary">₹{(totalAmount * 1.18).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4">
          <Button onClick={onBack} variant="outline" className="flex-1">
            Back
          </Button>
          <Button 
            onClick={handlePayment} 
            className="flex-1"
            disabled={processing}
          >
            {processing ? "Processing..." : `Pay ₹${(totalAmount * 1.18).toLocaleString()}`}
          </Button>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <DialogTitle className="text-center text-2xl">Booking Confirmed!</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Your camping adventure at Araku Valley is all set!
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Booking Reference</p>
              <p className="text-2xl font-bold font-mono">{bookingRef}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Confirmation email sent to {bookingDetails.email}
            </p>
            <Button className="w-full">
              Download Receipt
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentForm;

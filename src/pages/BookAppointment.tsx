
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, MapPin, Clock, User, Phone, CreditCard, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("paynow");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    landmark: "",
    service: "",
    notes: "",
    emergencyContact: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
    "06:00 PM", "07:00 PM"
  ];

  const services = [
    { value: "general", label: "General Consultation", price: 999, description: "Complete health checkup at home" },
    { value: "chronic", label: "Chronic Care Management", price: 1299, description: "Ongoing care for chronic conditions" },
    { value: "medication", label: "Medication Management", price: 799, description: "Medicine review and guidance" },
    { value: "monitoring", label: "Health Monitoring", price: 1199, description: "Vital signs and health tracking" },
    { value: "elderly", label: "Elderly Care", price: 1499, description: "Specialized care for seniors" },
    { value: "emergency", label: "Emergency Care", price: 2499, description: "Urgent medical attention" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getSelectedServicePrice = () => {
    const service = services.find(s => s.value === formData.service);
    return service ? service.price : 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !formData.name || !formData.phone || !formData.address || !formData.service) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setShowPaymentDialog(true);
  };

  const handlePayment = async () => {
    setIsSubmitting(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (paymentMethod === "paynow") {
        // Simulate Razorpay payment success
        toast({
          title: "Payment Successful!",
          description: "Your appointment has been confirmed with payment",
        });
      } else {
        toast({
          title: "Appointment Booked!",
          description: "Your appointment is confirmed. Payment will be collected after the visit.",
        });
      }
      
      navigate("/appointments");
      
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setShowPaymentDialog(false);
    }
  };

  const selectedService = services.find(s => s.value === formData.service);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Book Your Home Visit
          </h1>
          <p className="text-xl text-muted-foreground">
            Professional healthcare at your doorstep
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary" />
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    placeholder="Emergency contact number"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Address & Service */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Location & Service
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Home Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your complete address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="landmark">Landmark</Label>
                  <Input
                    id="landmark"
                    placeholder="Near landmark for easy location"
                    value={formData.landmark}
                    onChange={(e) => handleInputChange("landmark", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Select Service *</Label>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          <div className="flex flex-col">
                            <span className="font-medium">{service.label}</span>
                            <span className="text-sm text-muted-foreground">₹{service.price} - {service.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Date & Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Preferred Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Time *</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            {time}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific concerns or requirements..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="min-h-[60px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <CalendarIcon className="h-6 w-6 mx-auto text-primary mb-2" />
                  <div className="font-medium">Date</div>
                  <div className="text-sm text-muted-foreground">
                    {selectedDate ? format(selectedDate, "MMM d, yyyy") : "Not selected"}
                  </div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Clock className="h-6 w-6 mx-auto text-primary mb-2" />
                  <div className="font-medium">Time</div>
                  <div className="text-sm text-muted-foreground">
                    {selectedTime || "Not selected"}
                  </div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <User className="h-6 w-6 mx-auto text-primary mb-2" />
                  <div className="font-medium">Service</div>
                  <div className="text-sm text-muted-foreground">
                    {selectedService?.label || "Not selected"}
                  </div>
                </div>
                <div className="text-center p-4 bg-accent rounded-lg">
                  <CreditCard className="h-6 w-6 mx-auto text-accent-foreground mb-2" />
                  <div className="font-medium text-accent-foreground">Total</div>
                  <div className="text-lg font-bold text-accent-foreground">
                    ₹{getSelectedServicePrice()}
                  </div>
                </div>
              </div>

              <div className="text-center pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="medical-gradient px-12 py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Continue to Payment"}
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  You'll receive a confirmation call within 15 minutes
                </p>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Payment Dialog */}
        {showPaymentDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full">
              <CardHeader>
                <CardTitle className="text-center">Payment Options</CardTitle>
                <CardDescription className="text-center">
                  Choose your preferred payment method
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-lg font-bold">Total Amount: ₹{getSelectedServicePrice()}</div>
                  <div className="text-sm text-muted-foreground">{selectedService?.label}</div>
                </div>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="paynow" id="paynow" />
                    <Label htmlFor="paynow" className="flex-1">
                      <div className="font-medium">Pay Now</div>
                      <div className="text-sm text-muted-foreground">Secure payment via UPI/Card (Higher Priority)</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="paylater" id="paylater" />
                    <Label htmlFor="paylater" className="flex-1">
                      <div className="font-medium">Pay After Visit</div>
                      <div className="text-sm text-muted-foreground">Pay cash/online after service (Lower Priority)</div>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowPaymentDialog(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handlePayment}
                    disabled={isSubmitting}
                    className="flex-1 medical-gradient"
                  >
                    {isSubmitting ? "Processing..." : paymentMethod === "paynow" ? "Pay Now" : "Confirm Booking"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default BookAppointment;

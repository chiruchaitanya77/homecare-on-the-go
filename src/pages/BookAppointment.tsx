
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
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, MapPin, Clock, User, Phone } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    notes: "",
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
    { value: "general", label: "General Consultation - ₹999" },
    { value: "chronic", label: "Chronic Care Management - ₹1,299" },
    { value: "medication", label: "Medication Management - ₹799" },
    { value: "monitoring", label: "Health Monitoring - ₹1,199" },
    { value: "elderly", label: "Elderly Care - ₹1,499" },
    { value: "emergency", label: "Emergency Care - ₹2,499" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

    setIsSubmitting(true);

    // Simulate booking process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Appointment Booked Successfully!",
        description: `Your appointment is confirmed for ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime}`,
      });
      
      // Navigate to appointments dashboard
      navigate("/appointments");
      
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Book Your Home Visit
          </h1>
          <p className="text-xl text-muted-foreground">
            Schedule professional healthcare at your convenience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Tell us about yourself so we can provide the best care
                </CardDescription>
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
                  <Label htmlFor="address">Home Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your complete address with landmarks"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Appointment Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
                  Appointment Details
                </CardTitle>
                <CardDescription>
                  Choose your preferred date, time, and service
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Service *</Label>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-center">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
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
                  <MapPin className="h-6 w-6 mx-auto text-primary mb-2" />
                  <div className="font-medium">Service</div>
                  <div className="text-sm text-muted-foreground">
                    {formData.service ? services.find(s => s.value === formData.service)?.label.split(" - ")[0] : "Not selected"}
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
                  {isSubmitting ? "Booking..." : "Confirm Appointment"}
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  You'll receive a confirmation call within 15 minutes
                </p>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookAppointment;

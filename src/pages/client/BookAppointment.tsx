import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, MapPin, User, Phone } from "lucide-react";

const BookAppointment = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [service, setService] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleBookAppointment = () => {
    console.log("Appointment Details:", {
      date,
      service,
      address,
      name,
      phone,
    });
    // Here you would typically handle the appointment booking logic
    // such as sending the data to a backend server
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Book an Appointment
          </h1>
          <p className="text-xl text-muted-foreground">
            Schedule a home visit with our experienced doctors
          </p>
        </div>

        <Card className="space-y-6">
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>
              Please fill out the form below to book your appointment.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="service">Type of Service</Label>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General Consultation">General Consultation</SelectItem>
                  <SelectItem value="Health Monitoring">Health Monitoring</SelectItem>
                  <SelectItem value="Emergency Care">Emergency Care</SelectItem>
                  <SelectItem value="Vaccination">Vaccination</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                id="address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <Label>Preferred Date</Label>
              <Card>
                <CardContent className="grid gap-4 p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>

            <Button className="w-full medical-gradient" onClick={handleBookAppointment}>
              Book Appointment
            </Button>
          </CardContent>
        </Card>

        {/* Why Choose Us Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Why Choose OneDoc HomeCare?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-primary/5">
              <CardContent className="p-6">
                <div className="text-3xl text-primary mb-4">
                  <User className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Experienced Doctors</h3>
                <p className="text-muted-foreground">
                  Our team consists of highly qualified and experienced doctors.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-accent/5">
              <CardContent className="p-6">
                <div className="text-3xl text-accent mb-4">
                  <CalendarIcon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Convenient Scheduling</h3>
                <p className="text-muted-foreground">
                  Book appointments at your convenience with our easy-to-use platform.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-50">
              <CardContent className="p-6">
                <div className="text-3xl text-yellow-500 mb-4">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Home Visit Service</h3>
                <p className="text-muted-foreground">
                  Receive medical care in the comfort of your own home.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <div className="text-3xl text-blue-500 mb-4">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">24/7 Support</h3>
                <p className="text-muted-foreground">
                  Our support team is available 24/7 to assist you with any questions.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookAppointment;

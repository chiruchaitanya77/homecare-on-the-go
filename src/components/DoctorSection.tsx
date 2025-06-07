
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MapPin, Phone, Mail, Star, Award, Clock } from "lucide-react";

const DoctorSection = () => {
  const qualifications = [
    "MBBS, MD (Internal Medicine)",
    "15+ Years Experience",
    "500+ Successful Home Visits",
    "Specialist in Geriatric Care"
  ];

  const availability = [
    { day: "Monday - Friday", time: "8:00 AM - 8:00 PM" },
    { day: "Saturday", time: "9:00 AM - 6:00 PM" },
    { day: "Sunday", time: "10:00 AM - 4:00 PM" },
    { day: "Emergency", time: "24/7 Available" }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Doctor Info */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Meet Your Doctor
              </h2>
              <p className="text-xl text-muted-foreground">
                Professional healthcare with a personal touch
              </p>
            </div>

            <Card className="p-6">
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl font-bold">Dr</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground">Dr. Sarah Johnson</h3>
                    <p className="text-muted-foreground">General Practitioner & Internal Medicine Specialist</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">(4.9/5 from 247 patients)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center">
                    <Award className="h-4 w-4 mr-2 text-primary" />
                    Qualifications & Experience
                  </h4>
                  <div className="space-y-2">
                    {qualifications.map((qual, index) => (
                      <Badge key={index} variant="outline" className="mr-2 mb-2">
                        {qual}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-foreground">+91 98765 43210</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-foreground">dr.sarah@onedochomecare.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-foreground">Serving Mumbai & Surrounding Areas</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Availability & Booking */}
          <div className="space-y-6">
            <Card className="p-6">
              <CardContent className="space-y-6">
                <h3 className="text-xl font-bold text-foreground flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Availability Schedule
                </h3>
                <div className="space-y-3">
                  {availability.map((slot, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium text-foreground">{slot.day}</span>
                      <span className="text-muted-foreground">{slot.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 medical-gradient text-white">
              <CardContent className="text-center space-y-4">
                <h3 className="text-xl font-bold">Ready to Book?</h3>
                <p className="opacity-90">
                  Schedule your home visit consultation today. Same-day appointments available.
                </p>
                <Button size="lg" variant="secondary" className="w-full">
                  Book Appointment Now
                </Button>
                <p className="text-sm opacity-80">
                  Emergency appointments available 24/7
                </p>
              </CardContent>
            </Card>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">What to Expect:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Comprehensive health assessment</li>
                <li>• Digital prescription if needed</li>
                <li>• Follow-up care recommendations</li>
                <li>• Insurance claims assistance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorSection;

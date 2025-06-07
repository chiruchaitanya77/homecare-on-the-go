
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Phone, Clock } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative hero-gradient py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Quality Healthcare
                <span className="text-primary block">At Your Doorstep</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Professional medical care in the comfort of your home. Book trusted doctors for home visits with just a few clicks.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground font-medium">Easy Booking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <span className="text-foreground font-medium">Live Tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <span className="text-foreground font-medium">Same Day Care</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/book" className="inline-block">
                <Button size="lg" className="medical-gradient text-lg px-8 py-6 w-full sm:w-auto">
                  Book Appointment Now
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>

          {/* Doctor Image Placeholder */}
          <div className="relative">
            <div className="bg-card rounded-2xl p-8 shadow-2xl border">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-primary rounded-full mx-auto flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">Dr</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Dr. Sarah Johnson</h3>
                    <p className="text-muted-foreground">General Practitioner</p>
                    <p className="text-sm text-muted-foreground mt-2">15+ Years Experience</p>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">4.9</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">24/7</div>
                  <div className="text-sm text-muted-foreground">Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

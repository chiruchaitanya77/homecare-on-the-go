
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Heart, Stethoscope, Pill, Activity, UserCheck, Shield } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Stethoscope,
      title: "General Consultation",
      description: "Comprehensive health checkups and medical consultation at your home",
      price: "₹999"
    },
    {
      icon: Heart,
      title: "Chronic Care Management",
      description: "Regular monitoring and care for diabetes, hypertension, and other conditions",
      price: "₹1,299"
    },
    {
      icon: Pill,
      title: "Medication Management",
      description: "Prescription reviews, drug interactions, and dosage adjustments",
      price: "₹799"
    },
    {
      icon: Activity,
      title: "Health Monitoring",
      description: "Vital signs monitoring, ECG, and basic diagnostic tests",
      price: "₹1,199"
    },
    {
      icon: UserCheck,
      title: "Elderly Care",
      description: "Specialized care for senior citizens with mobility assistance",
      price: "₹1,499"
    },
    {
      icon: Shield,
      title: "Emergency Care",
      description: "Priority emergency home visits within 30 minutes",
      price: "₹2,499"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Our Medical Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive healthcare services delivered with professionalism and care in the comfort of your home
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 medical-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <div className="text-2xl font-bold text-primary">{service.price}</div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All prices include consultation, basic diagnostic tests, and follow-up care
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full">✓ Insurance Accepted</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">✓ Same Day Service</span>
            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full">✓ Digital Prescriptions</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

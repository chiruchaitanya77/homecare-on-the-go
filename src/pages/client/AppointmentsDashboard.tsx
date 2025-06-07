import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPin, Clock, Phone, Navigation, User, FileText, CheckCircle } from "lucide-react";

const ClientAppointmentsDashboard = () => {
  const [appointments] = useState([
    {
      id: 1,
      date: "2024-06-08",
      time: "10:00 AM",
      patient: "John Doe",
      phone: "+91 98765 43210",
      service: "General Consultation",
      address: "123 Marine Drive, Mumbai 400001",
      coordinates: { lat: 18.9220, lng: 72.8347 },
      status: "confirmed",
      notes: "Regular checkup requested",
      priority: "normal"
    },
    {
      id: 2,
      date: "2024-06-08",
      time: "2:00 PM",
      patient: "Jane Smith",
      phone: "+91 98765 43211",
      service: "Emergency Care",
      address: "456 Linking Road, Bandra, Mumbai 400050",
      coordinates: { lat: 19.0544, lng: 72.8406 },
      status: "pending",
      notes: "Urgent - High fever and chest pain",
      priority: "high"
    },
    {
      id: 3,
      date: "2024-06-08",
      time: "4:00 PM",
      patient: "Robert Johnson",
      phone: "+91 98765 43212",
      service: "Health Monitoring",
      address: "789 Carter Road, Bandra, Mumbai 400050",
      coordinates: { lat: 19.0625, lng: 72.8352 },
      status: "completed",
      notes: "Diabetes follow-up completed",
      priority: "normal"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-accent text-accent-foreground";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-primary text-primary-foreground";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleStartNavigation = (coordinates: { lat: number; lng: number }) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            My Appointments
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your upcoming and past appointments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {appointment.patient}
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {appointment.time}
                      </span>
                      <span className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {appointment.phone}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-sm">Service: {appointment.service}</div>
                </div>

                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1 text-sm text-muted-foreground">
                    {appointment.address}
                  </div>
                </div>

                {appointment.notes && (
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="text-sm">
                      <FileText className="h-4 w-4 inline mr-1" />
                      <span className="font-medium">Notes: </span>
                      {appointment.notes}
                    </div>
                  </div>
                )}

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleStartNavigation(appointment.coordinates)}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Start Navigation
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ClientAppointmentsDashboard;

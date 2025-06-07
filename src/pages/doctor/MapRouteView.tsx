
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Phone, Clock, User, Route, Target } from "lucide-react";

const DoctorMapRouteView = () => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState({
    id: 1,
    patient: "John Doe",
    phone: "+91 98765 43210",
    address: "123 Marine Drive, Mumbai 400001",
    coordinates: { lat: 18.9220, lng: 72.8347 },
    time: "10:00 AM",
    estimatedDistance: "5.2 km",
    estimatedTime: "15 mins",
    status: "confirmed"
  });

  useEffect(() => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to Mumbai coordinates
          setCurrentLocation({ lat: 19.0760, lng: 72.8777 });
        }
      );
    }
  }, []);

  const handleStartNavigation = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedAppointment.coordinates.lat},${selectedAppointment.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const handleCallPatient = () => {
    window.open(`tel:${selectedAppointment.phone}`);
  };

  const upcomingAppointments = [
    {
      id: 2,
      patient: "Jane Smith",
      address: "456 Linking Road, Bandra",
      time: "2:00 PM",
      distance: "8.1 km"
    },
    {
      id: 3,
      patient: "Robert Johnson", 
      address: "789 Carter Road, Bandra",
      time: "4:00 PM",
      distance: "9.5 km"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Map & Route View
          </h1>
          <p className="text-xl text-muted-foreground">
            Navigate to your patients with live GPS tracking
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Appointment Details */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Current Appointment
                </CardTitle>
                <CardDescription>Next patient visit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{selectedAppointment.patient}</span>
                  </div>
                  <Badge className="bg-accent text-accent-foreground">
                    {selectedAppointment.status}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedAppointment.time}</span>
                </div>

                <div className="flex items-start space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-muted-foreground">{selectedAppointment.address}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 p-3 bg-muted rounded-lg">
                  <div className="text-center">
                    <div className="font-bold text-lg text-primary">{selectedAppointment.estimatedDistance}</div>
                    <div className="text-sm text-muted-foreground">Distance</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-accent">{selectedAppointment.estimatedTime}</div>
                    <div className="text-sm text-muted-foreground">ETA</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={handleStartNavigation}
                    className="medical-gradient"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Navigate
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleCallPatient}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Location Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Your Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentLocation ? (
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Latitude: </span>
                      <span className="font-mono">{currentLocation.lat.toFixed(6)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Longitude: </span>
                      <span className="font-mono">{currentLocation.lng.toFixed(6)}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Location Active</Badge>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="text-muted-foreground">Getting your location...</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Visits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium text-sm">{apt.patient}</div>
                      <div className="text-xs text-muted-foreground">{apt.time} • {apt.distance}</div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Route className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Live Route Navigation
                </CardTitle>
                <CardDescription>
                  Real-time GPS navigation to patient location
                </CardDescription>
              </CardHeader>
              <CardContent className="h-full p-0">
                <div className="h-full bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <MapPin className="h-16 w-16 text-primary mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                      <p className="text-muted-foreground mb-4">
                        Real-time GPS navigation will be displayed here
                      </p>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div>🔴 Your current location</div>
                        <div>🔵 Patient destination</div>
                        <div>🛣️ Optimized route path</div>
                        <div>⏱️ Real-time traffic updates</div>
                      </div>
                    </div>
                    <Button onClick={handleStartNavigation} className="medical-gradient">
                      <Navigation className="h-4 w-4 mr-2" />
                      Open in Google Maps
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DoctorMapRouteView;

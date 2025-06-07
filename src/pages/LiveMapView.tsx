
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, Phone, User, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LiveMapView = () => {
  const { toast } = useToast();
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  // Sample appointment data
  const [currentAppointment] = useState({
    id: 1,
    patient: "John Doe",
    phone: "+91 98765 43210",
    time: "10:00 AM",
    service: "General Consultation",
    address: "123 Marine Drive, Mumbai 400001",
    landmark: "Near Gateway of India",
    coordinates: { lat: 18.9220, lng: 72.8347 },
    estimatedTime: "15 mins",
    distance: "2.3 km"
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
          toast({
            title: "Location Error",
            description: "Unable to get your current location",
            variant: "destructive",
          });
        }
      );
    }
  }, [toast]);

  const handleStartNavigation = () => {
    const { lat, lng } = currentAppointment.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
    setIsTracking(true);
  };

  const handleCopyCoordinates = () => {
    const coordString = `${currentAppointment.coordinates.lat}, ${currentAppointment.coordinates.lng}`;
    navigator.clipboard.writeText(coordString);
    toast({
      title: "Coordinates Copied",
      description: "Patient coordinates copied to clipboard",
    });
  };

  const handleCallPatient = () => {
    window.open(`tel:${currentAppointment.phone}`, '_self');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Live Map & Navigation
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your route to the patient's location
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Patient Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                Current Appointment
              </CardTitle>
              <CardDescription>Next patient visit details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="font-medium text-lg">{currentAppointment.patient}</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {currentAppointment.time} - {currentAppointment.service}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-1" />
                  {currentAppointment.phone}
                </div>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Address:</div>
                    <div className="text-sm text-muted-foreground">{currentAppointment.address}</div>
                    {currentAppointment.landmark && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Landmark: {currentAppointment.landmark}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-3 bg-accent/10 rounded-lg">
                <div className="text-center">
                  <div className="font-bold text-lg text-accent">{currentAppointment.distance}</div>
                  <div className="text-xs text-muted-foreground">Distance</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-primary">{currentAppointment.estimatedTime}</div>
                  <div className="text-xs text-muted-foreground">ETA</div>
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  className="w-full medical-gradient"
                  onClick={handleStartNavigation}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Start Navigation
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleCallPatient}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleCopyCoordinates}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Coords
                  </Button>
                </div>
              </div>

              {isTracking && (
                <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                  <Badge className="bg-accent text-accent-foreground mb-2">
                    Navigation Active
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    Follow the directions in your maps app to reach the patient.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Live Map View
                </CardTitle>
                <CardDescription>
                  Current location and route to patient
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Placeholder for map - In a real app, this would be Google Maps or Mapbox */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50"></div>
                  
                  {/* Mock map elements */}
                  <div className="absolute top-4 left-4 bg-white p-2 rounded shadow-sm">
                    <div className="text-xs font-medium">Your Location</div>
                    {currentLocation ? (
                      <div className="text-xs text-muted-foreground">
                        {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground">Getting location...</div>
                    )}
                  </div>
                  
                  <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow-sm">
                    <div className="text-xs font-medium">Patient Location</div>
                    <div className="text-xs text-muted-foreground">
                      {currentAppointment.coordinates.lat}, {currentAppointment.coordinates.lng}
                    </div>
                  </div>

                  {/* Mock route line */}
                  <svg className="absolute inset-0 w-full h-full">
                    <path 
                      d="M 50 200 Q 200 100 350 180" 
                      stroke="#3b82f6" 
                      strokeWidth="3" 
                      fill="none"
                      strokeDasharray="10,5"
                    />
                  </svg>

                  {/* Location markers */}
                  <div className="absolute" style={{ top: '70%', left: '15%' }}>
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                    <div className="text-xs mt-1 bg-white px-1 rounded text-center">You</div>
                  </div>
                  
                  <div className="absolute" style={{ top: '60%', right: '20%' }}>
                    <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="text-xs mt-1 bg-white px-1 rounded text-center">Patient</div>
                  </div>

                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                    <div className="text-lg font-medium">Interactive Map</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Real-time navigation would appear here
                    </div>
                    <div className="text-xs text-muted-foreground bg-white/80 p-2 rounded">
                      In production: Google Maps or Mapbox integration
                    </div>
                  </div>
                </div>

                {/* Map Controls */}
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      Recenter
                    </Button>
                    <Button variant="outline" size="sm">
                      Traffic View
                    </Button>
                  </div>
                  <Badge variant="outline">
                    Live Tracking {isTracking ? "ON" : "OFF"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Current Status */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Visit Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="font-bold text-blue-600">En Route</div>
                <div className="text-sm text-muted-foreground">Heading to patient</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="font-bold text-gray-600">Arrived</div>
                <div className="text-sm text-muted-foreground">At patient location</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="font-bold text-gray-600">In Progress</div>
                <div className="text-sm text-muted-foreground">Consultation ongoing</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="font-bold text-gray-600">Completed</div>
                <div className="text-sm text-muted-foreground">Visit finished</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default LiveMapView;

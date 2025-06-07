import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const LiveMapView = () => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Live Map View
          </h1>
          <p className="text-xl text-muted-foreground">
            Track the real-time location of your doctor
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Map Area */}
          <Card className="h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Doctor's Live Location
              </CardTitle>
              <CardDescription>
                Real-time GPS tracking of your doctor's location
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full p-0">
              <div className="h-full bg-muted rounded-lg flex items-center justify-center">
                {currentLocation ? (
                  <div>
                    {/* Replace this with actual map component */}
                    <p>Map will be displayed here</p>
                    <p>Latitude: {currentLocation.lat}</p>
                    <p>Longitude: {currentLocation.lng}</p>
                  </div>
                ) : (
                  <div>
                    <p>Loading map...</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Doctor Details */}
          <Card>
            <CardHeader>
              <CardTitle>Doctor Details</CardTitle>
              <CardDescription>Information about your doctor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">Dr. Sarah Johnson</h4>
                <p className="text-muted-foreground">General Physician</p>
              </div>
              <div className="space-y-1">
                <h5 className="font-medium">Estimated Time of Arrival (ETA)</h5>
                <p className="text-sm text-muted-foreground">15 minutes</p>
              </div>
              <div className="space-y-1">
                <h5 className="font-medium">Distance Away</h5>
                <p className="text-sm text-muted-foreground">5.2 km</p>
              </div>
              <Button>Contact Doctor</Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LiveMapView;

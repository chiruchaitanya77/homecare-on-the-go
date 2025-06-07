
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, MapPin, Clock, Phone, Star, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const AppointmentsDashboard = () => {
  // Sample data - in real app this would come from API
  const [appointments] = useState([
    {
      id: 1,
      date: "2024-06-08",
      time: "10:00 AM",
      service: "General Consultation",
      price: "₹999",
      status: "confirmed",
      address: "123 Marine Drive, Mumbai 400001",
      doctor: "Dr. Sarah Johnson",
      notes: "Regular checkup and blood pressure monitoring"
    },
    {
      id: 2,
      date: "2024-06-15",
      time: "2:00 PM",
      service: "Health Monitoring",
      price: "₹1,199",
      status: "pending",
      address: "456 Linking Road, Bandra, Mumbai 400050",
      doctor: "Dr. Sarah Johnson",
      notes: "Follow-up for diabetes management"
    },
    {
      id: 3,
      date: "2024-05-28",
      time: "11:00 AM",
      service: "General Consultation",
      price: "₹999",
      status: "completed",
      address: "789 Carter Road, Bandra, Mumbai 400050",
      doctor: "Dr. Sarah Johnson",
      notes: "Completed successfully",
      rating: 5
    },
    {
      id: 4,
      date: "2024-05-15",
      time: "4:00 PM",
      service: "Elderly Care",
      price: "₹1,499",
      status: "completed",
      address: "321 Juhu Beach Road, Mumbai 400049",
      doctor: "Dr. Sarah Johnson",
      notes: "Mobility assessment completed",
      rating: 5
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
      case "cancelled":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.date) >= new Date() && apt.status !== "cancelled"
  );

  const pastAppointments = appointments.filter(apt => 
    new Date(apt.date) < new Date() || apt.status === "completed"
  );

  const AppointmentCard = ({ appointment, isPast = false }: { appointment: any, isPast?: boolean }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg">{appointment.service}</CardTitle>
            <CardDescription className="flex items-center space-x-4">
              <span className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {new Date(appointment.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {appointment.time}
              </span>
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(appointment.status)}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {!isPast && (
                  <>
                    <DropdownMenuItem>Reschedule</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem>View Details</DropdownMenuItem>
                {isPast && <DropdownMenuItem>Book Again</DropdownMenuItem>}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-2">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
          <span className="text-sm text-muted-foreground">{appointment.address}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">Dr</span>
            </div>
            <span className="text-sm font-medium">{appointment.doctor}</span>
          </div>
          <span className="font-bold text-primary">{appointment.price}</span>
        </div>

        {appointment.notes && (
          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
            {appointment.notes}
          </p>
        )}

        {isPast && appointment.rating && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Your Rating:</span>
            <div className="flex">
              {[...Array(appointment.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
        )}

        {!isPast && (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Call Doctor
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <MapPin className="h-4 w-4 mr-2" />
              Track Visit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            My Appointments
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your healthcare appointments and visit history
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">{upcomingAppointments.length}</div>
              <div className="text-muted-foreground">Upcoming Visits</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-accent mb-2">{pastAppointments.length}</div>
              <div className="text-muted-foreground">Completed Visits</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-foreground mb-2">₹{appointments.reduce((sum, apt) => sum + parseInt(apt.price.replace('₹', '').replace(',', '')), 0).toLocaleString()}</div>
              <div className="text-muted-foreground">Total Spent</div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
            <TabsTrigger value="history">Visit History</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingAppointments.length > 0 ? (
              <div className="grid gap-6">
                {upcomingAppointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No Upcoming Appointments</h3>
                  <p className="text-muted-foreground mb-6">
                    Ready to schedule your next home visit with Dr. Sarah?
                  </p>
                  <Button className="medical-gradient">
                    Book New Appointment
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {pastAppointments.length > 0 ? (
              <div className="grid gap-6">
                {pastAppointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} isPast={true} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No Visit History</h3>
                  <p className="text-muted-foreground">
                    Your completed appointments will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default AppointmentsDashboard;

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, MapPin, Clock, Phone, Navigation, User, FileText, CheckCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const DoctorDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
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

  const todayAppointments = appointments.filter(apt => 
    new Date(apt.date).toDateString() === selectedDate.toDateString()
  );

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "normal":
        return "bg-green-100 text-green-800";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleStartNavigation = (coordinates: { lat: number; lng: number }) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  const handleMarkComplete = (appointmentId: number) => {
    console.log(`Marking appointment ${appointmentId} as complete`);
  };

  const AppointmentCard = ({ appointment }: { appointment: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center">
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
          <div className="flex items-center space-x-2">
            <Badge className={getPriorityColor(appointment.priority)}>
              {appointment.priority}
            </Badge>
            <Badge className={getStatusColor(appointment.status)}>
              {appointment.status}
            </Badge>
          </div>
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

        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleStartNavigation(appointment.coordinates)}
          >
            <Navigation className="h-4 w-4 mr-2" />
            Navigate
          </Button>
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            Call Patient
          </Button>
          {appointment.status !== "completed" && (
            <Button 
              variant="default" 
              size="sm"
              className="col-span-2 medical-gradient"
              onClick={() => handleMarkComplete(appointment.id)}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark as Complete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const totalAppointments = appointments.length;
  const completedToday = todayAppointments.filter(apt => apt.status === "completed").length;
  const pendingToday = todayAppointments.filter(apt => apt.status === "pending").length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Doctor Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your appointments and patient visits
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">{todayAppointments.length}</div>
              <div className="text-muted-foreground">Today's Appointments</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-accent mb-2">{completedToday}</div>
              <div className="text-muted-foreground">Completed Today</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{pendingToday}</div>
              <div className="text-muted-foreground">Pending Today</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-medical-green mb-2">{totalAppointments}</div>
              <div className="text-muted-foreground">Total This Week</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="pointer-events-auto"
              />
            </CardContent>
          </Card>

          {/* Appointments List */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="today" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="today">Today ({todayAppointments.length})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({pendingToday})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({completedToday})</TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="space-y-4">
                {todayAppointments.length > 0 ? (
                  todayAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))
                ) : (
                  <Card className="text-center py-12">
                    <CardContent>
                      <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No Appointments Today</h3>
                      <p className="text-muted-foreground">
                        You have no scheduled appointments for this date
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                {todayAppointments.filter(apt => apt.status === "pending").map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {todayAppointments.filter(apt => apt.status === "completed").map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DoctorDashboard;

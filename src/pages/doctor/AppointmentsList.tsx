
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, MapPin, Clock, Phone, Navigation, User, FileText, CheckCircle, Search, Filter } from "lucide-react";

const DoctorAppointmentsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
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
    },
    {
      id: 4,
      date: "2024-06-09",
      time: "11:00 AM",
      patient: "Sarah Wilson",
      phone: "+91 98765 43213",
      service: "Vaccination",
      address: "321 Hill Road, Bandra, Mumbai 400050",
      coordinates: { lat: 19.0625, lng: 72.8352 },
      status: "confirmed",
      notes: "COVID booster shot",
      priority: "normal"
    }
  ]);

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
                {appointment.time} - {appointment.date}
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
            Call
          </Button>
          {appointment.status !== "completed" && (
            <Button 
              variant="default" 
              size="sm"
              className="col-span-2 medical-gradient"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Complete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Appointments List
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage all your patient appointments
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by patient name or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Appointments Grid */}
        <div className="grid gap-6">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Appointments Found</h3>
                <p className="text-muted-foreground">
                  No appointments match your current filters
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DoctorAppointmentsList;

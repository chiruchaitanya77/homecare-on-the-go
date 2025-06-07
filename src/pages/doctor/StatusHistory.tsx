
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, FileText, User, Clock, MapPin, Star, Upload, Save } from "lucide-react";

const DoctorStatusHistory = () => {
  const [appointments] = useState([
    {
      id: 1,
      date: "2024-06-07",
      time: "10:00 AM",
      patient: "John Doe",
      phone: "+91 98765 43210",
      service: "General Consultation",
      address: "123 Marine Drive, Mumbai 400001",
      status: "completed",
      rating: 5,
      notes: "Patient showed significant improvement. Prescribed antibiotics for 7 days.",
      prescription: "Amoxicillin 500mg - 3 times daily for 7 days",
      feedback: "Doctor was very professional and thorough. Highly recommended!",
      duration: "45 minutes"
    },
    {
      id: 2,
      date: "2024-06-06",
      time: "2:00 PM",
      patient: "Jane Smith",
      phone: "+91 98765 43211",
      service: "Emergency Care",
      address: "456 Linking Road, Bandra, Mumbai 400050",
      status: "completed",
      rating: 4,
      notes: "Emergency visit for high fever. Temperature normalized after treatment.",
      prescription: "Paracetamol 650mg - 4 times daily as needed",
      feedback: "Quick response time. Very satisfied with the care received.",
      duration: "30 minutes"
    },
    {
      id: 3,
      date: "2024-06-05",
      time: "4:00 PM",
      patient: "Robert Johnson",
      phone: "+91 98765 43212",
      service: "Health Monitoring",
      address: "789 Carter Road, Bandra, Mumbai 400050",
      status: "completed",
      rating: 5,
      notes: "Regular diabetes checkup. Blood sugar levels stable.",
      prescription: "Continue current medication. Regular monitoring advised.",
      feedback: "Excellent follow-up care. Very knowledgeable doctor.",
      duration: "25 minutes"
    }
  ]);

  const [newNote, setNewNote] = useState("");
  const [newPrescription, setNewPrescription] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-primary text-primary-foreground";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const CompletedVisitCard = ({ appointment }: { appointment: any }) => (
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
              <span>Duration: {appointment.duration}</span>
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(appointment.status)}>
              {appointment.status}
            </Badge>
            <div className="flex items-center space-x-1">
              {renderStars(appointment.rating)}
            </div>
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
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm">
              <FileText className="h-4 w-4 inline mr-1" />
              <span className="font-medium">Doctor Notes: </span>
              {appointment.notes}
            </div>
          </div>
        )}

        {appointment.prescription && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-sm">
              <FileText className="h-4 w-4 inline mr-1" />
              <span className="font-medium">Prescription: </span>
              {appointment.prescription}
            </div>
          </div>
        )}

        {appointment.feedback && (
          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-sm">
              <Star className="h-4 w-4 inline mr-1" />
              <span className="font-medium">Patient Feedback: </span>
              {appointment.feedback}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const AddNotesForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>Add Visit Notes & Prescription</CardTitle>
        <CardDescription>
          Document patient visit details and prescriptions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="notes">Visit Notes</Label>
          <Textarea
            id="notes"
            placeholder="Enter detailed notes about the patient visit..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prescription">Prescription</Label>
          <Textarea
            id="prescription"
            placeholder="Enter medication details and dosage..."
            value={newPrescription}
            onChange={(e) => setNewPrescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="file-upload">Upload Prescription Image</Label>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <Input id="file-upload" type="file" accept="image/*" className="hidden" />
            <Label htmlFor="file-upload" className="cursor-pointer text-primary hover:text-primary/80">
              Click to upload prescription image
            </Label>
            <p className="text-sm text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
          </div>
        </div>

        <Button className="w-full medical-gradient">
          <Save className="h-4 w-4 mr-2" />
          Save Notes & Prescription
        </Button>
      </CardContent>
    </Card>
  );

  const totalVisits = appointments.length;
  const averageRating = appointments.reduce((sum, apt) => sum + apt.rating, 0) / appointments.length;
  const totalDuration = appointments.reduce((sum, apt) => sum + parseInt(apt.duration), 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Visit History & Notes
          </h1>
          <p className="text-xl text-muted-foreground">
            Track completed visits and manage patient records
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">{totalVisits}</div>
              <div className="text-muted-foreground">Total Visits</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-accent mb-2">{averageRating.toFixed(1)}</div>
              <div className="text-muted-foreground">Average Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-medical-green mb-2">{totalDuration}</div>
              <div className="text-muted-foreground">Total Minutes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-yellow-600 mb-2">98%</div>
              <div className="text-muted-foreground">Satisfaction</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="history" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history">Visit History ({totalVisits})</TabsTrigger>
            <TabsTrigger value="add-notes">Add Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <CompletedVisitCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No Completed Visits</h3>
                  <p className="text-muted-foreground">
                    Completed visits will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="add-notes">
            <AddNotesForm />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default DoctorStatusHistory;

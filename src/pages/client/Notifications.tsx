import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, CalendarIcon, MapPin, CreditCard, FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const ClientNotifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: "appointment",
      title: "Appointment Confirmed",
      message: "Your appointment with Dr. Sarah Johnson is confirmed for June 8, 2024 at 10:00 AM",
      time: "2 hours ago",
      read: false,
      icon: CalendarIcon,
      color: "text-accent"
    },
    {
      id: 2,
      type: "reminder",
      title: "Appointment Reminder",
      message: "Your appointment is starting in 30 minutes. Dr. Sarah will arrive soon.",
      time: "30 minutes ago",
      read: false,
      icon: Clock,
      color: "text-primary"
    },
    {
      id: 3,
      type: "location",
      title: "Doctor is on the way",
      message: "Dr. Sarah Johnson has started her journey to your location. ETA: 15 minutes",
      time: "1 hour ago",
      read: false,
      icon: MapPin,
      color: "text-blue-500"
    },
    {
      id: 4,
      type: "payment",
      title: "Payment Successful",
      message: "Payment of ₹999 for General Consultation has been processed successfully",
      time: "3 hours ago",
      read: true,
      icon: CreditCard,
      color: "text-green-500"
    },
    {
      id: 5,
      type: "completion",
      title: "Visit Completed",
      message: "Your consultation with Dr. Sarah Johnson has been completed. Please rate your experience.",
      time: "1 day ago",
      read: true,
      icon: CheckCircle,
      color: "text-accent"
    },
    {
      id: 6,
      type: "prescription",
      title: "Prescription Available",
      message: "Your digital prescription is ready for download. Follow the prescribed medication.",
      time: "1 day ago",
      read: true,
      icon: FileText,
      color: "text-purple-500"
    },
    {
      id: 7,
      type: "emergency",
      title: "Emergency Contact Update",
      message: "Please update your emergency contact information in your profile settings.",
      time: "2 days ago",
      read: true,
      icon: AlertTriangle,
      color: "text-orange-500"
    }
  ]);

  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "bg-accent/10 text-accent";
      case "reminder":
        return "bg-primary/10 text-primary";
      case "location":
        return "bg-blue-50 text-blue-700";
      case "payment":
        return "bg-green-50 text-green-700";
      case "completion":
        return "bg-purple-50 text-purple-700";
      case "prescription":
        return "bg-indigo-50 text-indigo-700";
      case "emergency":
        return "bg-orange-50 text-orange-700";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const NotificationCard = ({ notification }: { notification: any }) => {
    const IconComponent = notification.icon;
    
    return (
      <Card className={`hover:shadow-md transition-shadow ${!notification.read ? 'border-primary/30 bg-primary/5' : ''}`}>
        <CardContent className="p-4">
          <div className="flex space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-background border ${notification.color}`}>
              <IconComponent className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">{notification.title}</h4>
                <div className="flex items-center space-x-2">
                  <Badge className={getTypeColor(notification.type)} variant="outline">
                    {notification.type}
                  </Badge>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {notification.message}
              </p>
              <p className="text-xs text-muted-foreground">
                {notification.time}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Notifications
          </h1>
          <p className="text-xl text-muted-foreground">
            Stay updated with your appointments and health updates
          </p>
        </div>

        {/* Notification Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">{unreadNotifications.length}</div>
              <div className="text-muted-foreground">Unread Notifications</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-accent mb-2">{notifications.length}</div>
              <div className="text-muted-foreground">Total Notifications</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <Bell className="h-8 w-8 mx-auto text-medical-green mb-2" />
              <div className="text-muted-foreground">Push Notifications</div>
              <Badge className="bg-green-100 text-green-800 mt-1">Enabled</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Mark All as Read
            </Button>
            <Button variant="outline" size="sm">
              Clear All
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notification Settings
          </Button>
        </div>

        {/* Notifications Tabs */}
        <Tabs defaultValue="unread" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="unread">Unread ({unreadNotifications.length})</TabsTrigger>
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="read">Read ({readNotifications.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="unread" className="space-y-4">
            {unreadNotifications.length > 0 ? (
              unreadNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No Unread Notifications</h3>
                  <p className="text-muted-foreground">
                    You're all caught up! New notifications will appear here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {notifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </TabsContent>

          <TabsContent value="read" className="space-y-4">
            {readNotifications.length > 0 ? (
              readNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No Read Notifications</h3>
                  <p className="text-muted-foreground">
                    Previously read notifications will appear here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Notification Settings Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Manage how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Appointment Reminders</div>
                  <div className="text-sm text-muted-foreground">Get notified before appointments</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Doctor Updates</div>
                  <div className="text-sm text-muted-foreground">When doctor is on the way</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Payment Notifications</div>
                  <div className="text-sm text-muted-foreground">Payment confirmations and receipts</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Health Updates</div>
                  <div className="text-sm text-muted-foreground">Prescription and health tips</div>
                </div>
                <Badge className="bg-gray-100 text-gray-800">Disabled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default ClientNotifications;

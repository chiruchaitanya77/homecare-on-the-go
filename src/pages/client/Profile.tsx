import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Phone, MapPin, Calendar, Check, X } from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    address: "123 Marine Drive, Mumbai 400001",
    dob: "1990-01-01",
    subscription: true,
    emergencyContact: {
      name: "Jane Doe",
      phone: "+91 98765 43211",
    },
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmergencyContactChange = (e: any) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [name]: value,
      },
    }));
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleSave = () => {
    // Save profile data to backend here
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            My Profile
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your profile information and settings
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Personal Information
            </CardTitle>
            <CardDescription>
              View and update your personal details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  type="date"
                  id="dob"
                  name="dob"
                  value={profile.dob}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Emergency Contact
            </CardTitle>
            <CardDescription>
              Update your emergency contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyName">Contact Name</Label>
                <Input
                  type="text"
                  id="emergencyName"
                  name="name"
                  value={profile.emergencyContact.name}
                  onChange={handleEmergencyContactChange}
                  disabled={!editMode}
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Contact Phone</Label>
                <Input
                  type="tel"
                  id="emergencyPhone"
                  name="phone"
                  value={profile.emergencyContact.phone}
                  onChange={handleEmergencyContactChange}
                  disabled={!editMode}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Subscription
            </CardTitle>
            <CardDescription>
              Manage your subscription preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Receive important updates and reminders
                </div>
              </div>
              <Switch
                id="subscription"
                checked={profile.subscription}
                onCheckedChange={(checked) =>
                  setProfile((prev) => ({ ...prev, subscription: checked }))
                }
                disabled={!editMode}
              />
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-end space-x-2">
          {!editMode ? (
            <Button variant="outline" onClick={toggleEditMode}>
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={toggleEditMode}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button className="medical-gradient" onClick={handleSave}>
                <Check className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;

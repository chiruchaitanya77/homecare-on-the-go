
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Switch } from "./ui/switch";
import { Menu, Calendar, Phone, User, Bell, MapPin, Stethoscope, Sun, Moon } from "lucide-react";
import { Badge } from "./ui/badge";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const clientNavigation = [
    { name: "Home", href: "/" },
    { name: "Book Appointment", href: "/book" },
    { name: "My Appointments", href: "/appointments" },
    { name: "Live Map", href: "/map" },
    { name: "Notifications", href: "/notifications" },
    { name: "Profile", href: "/profile" },
  ];

  const doctorNavigation = [
    { name: "Dashboard", href: "/doctor" },
    { name: "Appointments", href: "/doctor/appointments" },
    { name: "Map & Route", href: "/doctor/map" },
    { name: "History", href: "/doctor/history" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isDoctorPage = location.pathname.startsWith('/doctor');

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="bg-card/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 medical-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">+</span>
            </div>
            <span className="font-bold text-lg text-foreground">OneDoc HomeCare</span>
          </Link>

          {/* Emergency Contact - Always Visible */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Emergency:</span>
              <span className="font-semibold text-foreground">+91 98765 43210</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
              <Moon className="h-4 w-4" />
            </div>

            {/* Navigation based on current page type */}
            {isDoctorPage ? (
              doctorNavigation.slice(0, 3).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))
            ) : (
              clientNavigation.slice(0, 4).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))
            )}
            
            {/* Notifications Icon */}
            <Link to="/notifications" className="relative">
              <Button variant="ghost" size="sm" className={isActive("/notifications") ? "text-primary" : ""}>
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
                  3
                </Badge>
              </Button>
            </Link>

            {/* Profile */}
            <Link to={isDoctorPage ? "/doctor" : "/profile"}>
              <Button variant="ghost" size="sm" className={isActive(isDoctorPage ? "/doctor" : "/profile") ? "text-primary" : ""}>
                <User className="h-4 w-4 mr-2" />
                {isDoctorPage ? "Doctor" : "Profile"}
              </Button>
            </Link>

            {/* Role Switch */}
            <Link to={isDoctorPage ? "/" : "/doctor"}>
              <Button 
                variant="outline" 
                size="sm"
              >
                <Stethoscope className="h-4 w-4 mr-2" />
                {isDoctorPage ? "Client View" : "Doctor View"}
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Theme Toggle */}
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Dark Mode</span>
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4" />
                      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
                      <Moon className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm p-4 bg-muted rounded-lg">
                    <Phone className="h-4 w-4 text-primary" />
                    <div>
                      <div className="text-muted-foreground">Emergency</div>
                      <div className="font-semibold">+91 98765 43210</div>
                    </div>
                  </div>
                  
                  {(isDoctorPage ? doctorNavigation : clientNavigation).map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-base font-medium transition-colors hover:text-primary p-3 rounded-md flex items-center ${
                        isActive(item.href) ? "text-primary bg-primary/10" : "text-muted-foreground"
                      }`}
                    >
                      {item.name === "Book Appointment" && <Calendar className="h-4 w-4 mr-2" />}
                      {item.name === "My Appointments" && <Calendar className="h-4 w-4 mr-2" />}
                      {item.name === "Live Map" && <MapPin className="h-4 w-4 mr-2" />}
                      {item.name === "Map & Route" && <MapPin className="h-4 w-4 mr-2" />}
                      {item.name === "Notifications" && (
                        <>
                          <Bell className="h-4 w-4 mr-2" />
                          <Badge className="ml-auto h-5 w-5 flex items-center justify-center p-0 text-xs">3</Badge>
                        </>
                      )}
                      {(item.name === "Profile" || item.name === "Dashboard") && <User className="h-4 w-4 mr-2" />}
                      {item.name}
                    </Link>
                  ))}

                  <div className="border-t pt-4">
                    <Link
                      to={isDoctorPage ? "/" : "/doctor"}
                      onClick={() => setIsOpen(false)}
                      className="text-base font-medium transition-colors hover:text-primary p-3 rounded-md flex items-center text-muted-foreground"
                    >
                      <Stethoscope className="h-4 w-4 mr-2" />
                      {isDoctorPage ? "Switch to Client View" : "Switch to Doctor View"}
                    </Link>
                  </div>
                  
                  <Button className="medical-gradient mt-4">
                    <User className="h-4 w-4 mr-2" />
                    Login / Sign Up
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

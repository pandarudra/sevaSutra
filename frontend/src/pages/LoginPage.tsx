import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { UserRole } from "../utils/types";
import { setLoggedInUser } from "../utils/mockData";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("donor");

  // For donor login
  const [donorData, setDonorData] = useState({
    phoneNumber: "",
    aadharNumber: "",
  });

  // For NGO login
  const [ngoData, setNgoData] = useState({
    email: "",
    password: "",
  });

  // For government login
  const [govData, setGovData] = useState({
    username: "",
    password: "",
  });

  const redirectTo = location.state?.redirectTo || "/";

  const handleDonorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDonorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNgoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNgoData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGovInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGovData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDonorLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!donorData.phoneNumber || !donorData.aadharNumber) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate login
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Mock successful login
      setLoggedInUser({
        id: 1,
        role: UserRole.DONOR,
        name: "Test Donor",
        phoneNumber: donorData.phoneNumber,
        aadharNumber: donorData.aadharNumber,
      });
      
      toast({
        title: "Login successful",
        description: "Welcome back to Relief Flow.",
      });
      
      navigate(redirectTo);
    }, 1500);
  };

  const handleNgoLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!ngoData.email || !ngoData.password) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate login
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Mock successful login
      setLoggedInUser({
        id: 3,
        role: UserRole.NGO,
        name: "Test NGO",
        ngoId: 3,
      });
      
      toast({
        title: "NGO login successful",
        description: "Welcome back to Relief Flow.",
      });
      
      navigate("/ngo/dashboard");
    }, 1500);
  };

  const handleGovLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!govData.username || !govData.password) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate login
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Mock successful login
      setLoggedInUser({
        id: 99,
        role: UserRole.GOVERNMENT,
        name: "Government Admin",
      });
      
      toast({
        title: "Admin login successful",
        description: "Welcome back to Relief Flow.",
      });
      
      navigate("/government/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container py-12">
          <div className="max-w-md mx-auto">
            <div className="bg-white shadow-sm rounded-lg border p-6">
              <h1 className="text-2xl font-bold mb-6 text-center">
                Login to Relief Flow
              </h1>

              <Tabs
                defaultValue="donor"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="donor">Donor</TabsTrigger>
                  <TabsTrigger value="ngo">NGO</TabsTrigger>
                  <TabsTrigger value="government">Government</TabsTrigger>
                </TabsList>

                <TabsContent value="donor">
                  <form onSubmit={handleDonorLogin} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">
                        Phone Number
                      </label>
                      <Input
                        name="phoneNumber"
                        value={donorData.phoneNumber}
                        onChange={handleDonorInputChange}
                        placeholder="+91 9876543210"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter the phone number linked to your account
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium">
                        Aadhar Number
                      </label>
                      <Input
                        name="aadharNumber"
                        value={donorData.aadharNumber}
                        onChange={handleDonorInputChange}
                        placeholder="XXXX-XXXX-XXXX"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </Button>

                    <p className="text-center text-sm">
                      Don't have an account?{" "}
                      <Link
                        to="/donor/register"
                        className="text-emergency-600 hover:underline"
                      >
                        Register as donor
                      </Link>
                    </p>
                  </form>
                </TabsContent>

                <TabsContent value="ngo">
                  <form onSubmit={handleNgoLogin} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={ngoData.email}
                        onChange={handleNgoInputChange}
                        placeholder="ngo@example.org"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Password</label>
                      <Input
                        name="password"
                        type="password"
                        value={ngoData.password}
                        onChange={handleNgoInputChange}
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </Button>

                    <p className="text-center text-sm">
                      Don't have an account?{" "}
                      <Link
                        to="/ngo/register"
                        className="text-emergency-600 hover:underline"
                      >
                        Register your NGO
                      </Link>
                    </p>
                  </form>
                </TabsContent>

                <TabsContent value="government">
                  <form onSubmit={handleGovLogin} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Username</label>
                      <Input
                        name="username"
                        value={govData.username}
                        onChange={handleGovInputChange}
                        placeholder="admin"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Password</label>
                      <Input
                        name="password"
                        type="password"
                        value={govData.password}
                        onChange={handleGovInputChange}
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </Button>

                    <p className="text-center text-sm text-gray-500">
                      Government login is restricted to authorized personnel.
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;

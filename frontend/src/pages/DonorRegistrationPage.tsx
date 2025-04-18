import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/use-toast";
import PhoneVerification from "../components/PhoneVerification";
import { UserRole } from "../utils/types";
import { setLoggedInUser } from "../utils/mockData";

const DonorRegistrationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    aadharNumber: "",
  });

  const handlePhoneVerification = (phone: string, verified: boolean) => {
    setPhoneNumber(phone);
    setPhoneVerified(verified);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.aadharNumber) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!phoneVerified) {
      toast({
        title: "Phone verification required",
        description: "Please verify your phone number to proceed.",
        variant: "destructive",
      });
      return;
    }

    // Submit the form
    setIsSubmitting(true);

    // Simulate form submission with a delay
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Mock successful registration and login
      setLoggedInUser({
        id: 5,
        role: UserRole.DONOR,
        name: formData.name,
        phoneNumber: phoneNumber,
        aadharNumber: formData.aadharNumber,
      });
      
      toast({
        title: "Registration successful",
        description: "Your donor account has been created successfully.",
      });
      
      navigate("/donor/dashboard");
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
                Register as a Donor
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <PhoneVerification
                    onVerificationComplete={handlePhoneVerification}
                  />

                  <div>
                    <label className="text-sm font-medium">Aadhar Number</label>
                    <Input
                      name="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={handleInputChange}
                      placeholder="XXXX-XXXX-XXXX"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Your Aadhar number is used to verify your identity
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>

                <p className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/donor/login"
                    className="text-emergency-600 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonorRegistrationPage;

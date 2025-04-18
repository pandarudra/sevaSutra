import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/NavBar"
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../components/ui/use-toast";
import MediaUpload from "../components/MediaUpload";
import { UserRole } from "../utils/types";
import { setLoggedInUser } from "../utils/mockData";
import { Checkbox } from "../components/ui/checkbox";

const NGORegistrationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    operationalAreas: "",
    foundedDate: "",
    acceptTerms: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, acceptTerms: checked }));
  };

  const handleMediaChange = (files: File[]) => {
    setMediaFiles(files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.operationalAreas ||
      !formData.foundedDate
    ) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.acceptTerms) {
      toast({
        title: "Terms and conditions",
        description: "Please accept the terms and conditions to proceed.",
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
        id: 6,
        role: UserRole.NGO,
        name: formData.name,
        ngoId: 6,
      });
      
      toast({
        title: "Registration Pending Approval",
        description: "Your NGO registration has been submitted and is awaiting government approval.",
      });
      
      navigate("/ngo/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow-sm rounded-lg border p-6 md:p-8">
              <h1 className="text-2xl font-bold mb-6">Register Your NGO</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Organization Information</h2>
                  
                  <div>
                    <label className="text-sm font-medium">Organization Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your organization's name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="organization@example.org"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 9876543210"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Areas of Operation</label>
                    <Textarea
                      name="operationalAreas"
                      value={formData.operationalAreas}
                      onChange={handleInputChange}
                      placeholder="List the states, districts, or regions where your organization operates"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Founding Date</label>
                    <Input
                      name="foundedDate"
                      type="date"
                      value={formData.foundedDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Accomplishments & Media</label>
                    <p className="text-xs text-gray-500 mb-2">
                      Upload images showcasing your organization's past work and achievements
                    </p>
                    <MediaUpload onMediaChange={handleMediaChange} />
                  </div>

                  <div className="pt-4 border-t">
                    <h2 className="text-lg font-semibold mb-4">Account Credentials</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Password</label>
                        <Input
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Confirm Password</label>
                        <Input
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-4">
                    <Checkbox
                      id="terms"
                      checked={formData.acceptTerms}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-emergency-600 hover:underline">
                        terms of service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-emergency-600 hover:underline">
                        privacy policy
                      </a>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Register Organization"}
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Your registration will be reviewed by government authorities.
                    This process typically takes 3-5 business days.
                  </p>
                </div>

                <p className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/ngo/login"
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

export default NGORegistrationPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import PhoneVerification from "../components/PhoneVerification";
import MediaUpload from "../components/MediaUpload";
import { useToast } from "../components/ui/use-toast";
// import { disasterProjects } from "@/utils/mockData";
import { DisasterType } from "../utils/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const RequestHelpPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    disasterType: "",
    description: "",
  });

  const handlePhoneVerification = (phone: string, verified: boolean) => {
    setPhoneNumber(phone);
    setPhoneVerified(verified);
  };

  const handleMediaChange = (files: File[]) => {
    setMediaFiles(files);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.location || !formData.description) {
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
      toast({
        title: "Help request submitted",
        description:
          "Your request has been received. Our team will contact you soon.",
      });
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow-sm rounded-lg border p-6 md:p-8">
              <h1 className="text-2xl font-bold mb-6">Request Emergency Help</h1>

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
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Village/Town/City, District, State"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Provide as specific a location as possible
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Disaster Type</label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          disasterType: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select disaster type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(DisasterType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0) + type.slice(1).toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Describe Your Needs
                    </label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your situation and what help you need..."
                      rows={4}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Include details about how many people need help, if medical
                      attention is required, etc.
                    </p>
                  </div>

                  <MediaUpload onMediaChange={handleMediaChange} />
                </div>

                <div className="pt-4 border-t">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Help Request"}
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By submitting this form, you confirm that you are in genuine
                    need of emergency assistance.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequestHelpPage;

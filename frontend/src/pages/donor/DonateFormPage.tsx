import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { useToast } from "../../components/ui/use-toast";
import { getDisasterProjectById, getLoggedInUser } from "../../utils/mockData";
import { DonationCategory, UserRole } from "../../utils/types";

const DonateFormPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getLoggedInUser();
  const [project, setProject] = useState(
    getDisasterProjectById(Number(projectId))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [donationCategory, setDonationCategory] = useState<DonationCategory>(
    DonationCategory.MONETARY
  );

  // Form state based on selected category
  const [monetaryForm, setMonetaryForm] = useState({
    amount: "",
    paymentMethod: "UPI",
  });

  const [foodForm, setFoodForm] = useState({
    items: "",
    logistics: "",
    specialNotes: "",
  });

  const [medicalForm, setMedicalForm] = useState({
    items: "",
    logistics: "",
    specialNotes: "",
  });

  // Redirect if user not logged in as donor
  useEffect(() => {
    if (!user || user.role !== UserRole.DONOR) {
      toast({
        title: "Login required",
        description: "Please log in as a donor to make donations.",
        variant: "destructive",
      });
      navigate("/donor/login", {
        state: { redirectTo: `/donor/donate/${projectId}` },
      });
      return;
    }
    
    // Redirect if project not found
    if (!project) {
      toast({
        title: "Project not found",
        description: "The requested project could not be found.",
        variant: "destructive",
      });
      navigate("/projects");
    }
  }, [user, project, projectId, navigate, toast]);

  const handleMonetaryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMonetaryForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFoodChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFoodForm(prev => ({ ...prev, [name]: value }));
  };

  const handleMedicalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMedicalForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form based on category
    if (donationCategory === DonationCategory.MONETARY) {
      if (!monetaryForm.amount || isNaN(Number(monetaryForm.amount)) || Number(monetaryForm.amount) <= 0) {
        toast({
          title: "Invalid amount",
          description: "Please enter a valid donation amount.",
          variant: "destructive",
        });
        return;
      }
    } else if (donationCategory === DonationCategory.FOOD) {
      if (!foodForm.items) {
        toast({
          title: "Missing information",
          description: "Please specify the food items you want to donate.",
          variant: "destructive",
        });
        return;
      }
    } else if (donationCategory === DonationCategory.MEDICAL) {
      if (!medicalForm.items) {
        toast({
          title: "Missing information",
          description: "Please specify the medical supplies you want to donate.",
          variant: "destructive",
        });
        return;
      }
    }

    // Submit the form
    setIsSubmitting(true);

    // Simulate form submission with a delay
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Donation successful",
        description: "Thank you for your generous contribution!",
      });
      navigate("/donor/dashboard");
    }, 1500);
  };

  if (!user || user.role !== UserRole.DONOR || !project) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container py-8">
          <div className="mb-6">
            <Link
              to={`/projects/${projectId}`}
              className="text-emergency-600 hover:underline text-sm"
            >
              ← Back to Project
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white border rounded-lg p-6 shadow-sm">
                <h1 className="text-2xl font-bold mb-6">Make a Donation</h1>
                <h2 className="text-lg font-medium mb-4">{project.title}</h2>
                <p className="text-gray-600 mb-6">{project.location}</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Donation Category</h3>
                    <RadioGroup
                      value={donationCategory}
                      onValueChange={(value) => setDonationCategory(value as DonationCategory)}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className="flex items-center space-x-2 border rounded p-4">
                        <RadioGroupItem value={DonationCategory.MONETARY} id="monetary" />
                        <Label htmlFor="monetary" className="flex-1 cursor-pointer">
                          <span className="font-medium">Monetary</span>
                          <p className="text-xs text-gray-500">Financial support</p>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded p-4">
                        <RadioGroupItem value={DonationCategory.FOOD} id="food" />
                        <Label htmlFor="food" className="flex-1 cursor-pointer">
                          <span className="font-medium">Food</span>
                          <p className="text-xs text-gray-500">Food & water supplies</p>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded p-4">
                        <RadioGroupItem value={DonationCategory.MEDICAL} id="medical" />
                        <Label htmlFor="medical" className="flex-1 cursor-pointer">
                          <span className="font-medium">Medical</span>
                          <p className="text-xs text-gray-500">Medicines & supplies</p>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Monetary Donation Form */}
                  {donationCategory === DonationCategory.MONETARY && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Donation Amount (₹)</label>
                        <Input
                          type="number"
                          name="amount"
                          value={monetaryForm.amount}
                          onChange={handleMonetaryChange}
                          placeholder="Enter amount in INR"
                          min="1"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Payment Method</label>
                        <select
                          name="paymentMethod"
                          value={monetaryForm.paymentMethod}
                          onChange={handleMonetaryChange}
                          className="w-full p-2 border rounded"
                          aria-label="Select payment method"
                          required
                        >
                          <option value="UPI">UPI</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Credit/Debit Card">Credit/Debit Card</option>
                          <option value="Online Wallet">Online Wallet</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Food Donation Form */}
                  {donationCategory === DonationCategory.FOOD && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Food Items</label>
                        <Textarea
                          name="items"
                          value={foodForm.items}
                          onChange={handleFoodChange}
                          placeholder="List the food items you want to donate (type, quantity, packaging)"
                          rows={3}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Logistics Information</label>
                        <Textarea
                          name="logistics"
                          value={foodForm.logistics}
                          onChange={handleFoodChange}
                          placeholder="How will you deliver these items? Do you need pickup arrangements?"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Special Notes</label>
                        <Textarea
                          name="specialNotes"
                          value={foodForm.specialNotes}
                          onChange={handleFoodChange}
                          placeholder="Any special handling instructions or additional information"
                          rows={2}
                        />
                      </div>
                    </div>
                  )}

                  {/* Medical Donation Form */}
                  {donationCategory === DonationCategory.MEDICAL && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Medical Supplies</label>
                        <Textarea
                          name="items"
                          value={medicalForm.items}
                          onChange={handleMedicalChange}
                          placeholder="List the medical supplies you want to donate (type, quantity, expiry dates if applicable)"
                          rows={3}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Logistics Information</label>
                        <Textarea
                          name="logistics"
                          value={medicalForm.logistics}
                          onChange={handleMedicalChange}
                          placeholder="How will you deliver these items? Do you need pickup arrangements?"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Special Notes</label>
                        <Textarea
                          name="specialNotes"
                          value={medicalForm.specialNotes}
                          onChange={handleMedicalChange}
                          placeholder="Any special handling instructions or additional information"
                          rows={2}
                        />
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Complete Donation"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white border rounded-lg p-6 shadow-sm">
                <h2 className="font-semibold mb-4">Donation Summary</h2>
                <div className="space-y-4 divide-y">
                  <div className="pb-4">
                    <h3 className="text-sm font-medium text-gray-500">Project</h3>
                    <p>{project.title}</p>
                  </div>
                  <div className="py-4">
                    <h3 className="text-sm font-medium text-gray-500">Managing Organization</h3>
                    <p>{project.managingNgo}</p>
                  </div>
                  <div className="py-4">
                    <h3 className="text-sm font-medium text-gray-500">Donation Type</h3>
                    <p>{donationCategory}</p>
                  </div>
                  {donationCategory === DonationCategory.MONETARY && monetaryForm.amount && (
                    <div className="py-4">
                      <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                      <p>₹{monetaryForm.amount}</p>
                    </div>
                  )}
                  <div className="pt-4">
                    <h3 className="text-sm font-medium text-gray-500">Expected Impact</h3>
                    <p className="text-sm">
                      Your donation will directly help the victims affected by this disaster and contribute to relief efforts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6 shadow-sm mt-6">
                <h2 className="font-semibold mb-4">About Credit Points</h2>
                <p className="text-sm text-gray-600 mb-4">
                  For every donation you make, you earn credit points based on the value and impact of your contribution.
                </p>
                <ul className="text-sm space-y-2 text-gray-600 list-disc pl-5">
                  <li>Monetary donations: 1 point per ₹100</li>
                  <li>Food donations: Points based on quantity and need</li>
                  <li>Medical supplies: Points based on value and urgency</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonateFormPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  getLoggedInUser,
  disasterProjects,
  getDonationsByDonorId,
  getDonorById,
} from "../../utils/mockData";
import DisasterCard from "../../components/DisasterCard";
import { UserRole } from "../../utils/types";
import { format } from "date-fns";
import { useToast } from "../../components/ui/use-toast";

const DonorDashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getLoggedInUser();
  const [donor, setDonor] = useState(user && user.id ? getDonorById(user.id) : null);
  const [donations, setDonations] = useState(user && user.id ? getDonationsByDonorId(user.id) : []);

  // Check if user is logged in as donor
  useEffect(() => {
    if (!user || user.role !== UserRole.DONOR) {
      toast({
        title: "Access denied",
        description: "Please log in as a donor to view this page.",
        variant: "destructive",
      });
      navigate("/donor/login");
    }
  }, [user, navigate, toast]);

  if (!user || user.role !== UserRole.DONOR) {
    return null; // Will redirect in the useEffect
  }

  // Format donations with project details
  const formattedDonations = donations.map(donation => {
    const project = disasterProjects.find(p => p.id === donation.projectId);
    return {
      ...donation,
      projectName: project ? project.title : "Unknown Project",
      projectLocation: project ? project.location : "Unknown Location",
    };
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">Donor Dashboard</h1>
          <p className="text-gray-600 mb-8">Welcome back, {user.name}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Donations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {donations.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Credit Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {donor?.totalCreditPoints || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {donations.length > 0 ? "High" : "None yet"}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList>
              <TabsTrigger value="projects">Relief Projects</TabsTrigger>
              <TabsTrigger value="donations">My Donations</TabsTrigger>
              <TabsTrigger value="profile">My Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              <h2 className="text-xl font-semibold">Active Relief Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {disasterProjects.slice(0, 6).map((project) => (
                  <DisasterCard key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="donations" className="space-y-6">
              <h2 className="text-xl font-semibold">Your Donations</h2>
              
              {formattedDonations.length > 0 ? (
                <div className="space-y-4">
                  {formattedDonations.map((donation) => (
                    <Card key={donation.id} className="overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div>
                            <h3 className="font-semibold">{donation.projectName}</h3>
                            <p className="text-sm text-gray-500">{donation.projectLocation}</p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <span className="text-sm font-medium bg-emergency-50 text-emergency-700 px-2 py-1 rounded">
                              {donation.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Date:</span>
                            <span className="text-sm">
                              {format(new Date(donation.createdAt), "PP")}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Status:</span>
                            <span className="text-sm">{donation.status}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Credit Points:</span>
                            <span className="text-sm font-semibold text-emergency-600">
                              +{donation.creditPoints}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="text-sm font-medium mb-2">Donation Details</h4>
                          {donation.category === "MONETARY" ? (
                            <p className="text-sm">
                              Amount: ₹{donation.details.amount} via {donation.details.paymentMethod}
                            </p>
                          ) : (
                            <ul className="list-disc pl-5 text-sm">
                              {donation.details.items.map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white border rounded-lg">
                  <p className="text-gray-500 mb-4">You haven't made any donations yet.</p>
                  <Button onClick={() => navigate("/projects")}>
                    Browse Relief Projects
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <h2 className="text-xl font-semibold">Your Profile</h2>
              
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Name</h3>
                      <p>{user.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                      <p>{user.phoneNumber}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Aadhar Number</h3>
                      <p>{user.aadharNumber}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Total Credit Points</h3>
                      <p>{donor?.totalCreditPoints || 0}</p>
                    </div>
                    <div className="pt-4">
                      <Button variant="outline" className="w-full">
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonorDashboardPage;
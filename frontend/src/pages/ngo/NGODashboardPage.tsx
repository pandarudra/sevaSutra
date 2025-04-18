import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer"
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  getLoggedInUser,
  disasterProjects,
  getDonationsByProjectId,
  getNgoById,
  getVictimRequestsByProjectId,
} from "../../utils/mockData";
import DisasterCard from "../../components/DisasterCard";
import StatusBadge from "../../components/StatusBadge";
import { UserRole } from "../../utils/types";
import { format } from "date-fns";
import { useToast } from "../../components/ui/use-toast";

const NGODashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getLoggedInUser();
  const ngo = user && user.ngoId ? getNgoById(user.ngoId) : null;

const managedProjects = ngo
  ? disasterProjects.filter((project) => ngo.projectIds.includes(project.id))
  : [];

const victimRequests = managedProjects.flatMap((project) =>
  getVictimRequestsByProjectId(project.id)
);

const donations = managedProjects.flatMap((project) =>
  getDonationsByProjectId(project.id)
);

  // Check if user is logged in as NGO
  useEffect(() => {
    if (!user || user.role !== UserRole.NGO) {
      toast({
        title: "Access denied",
        description: "Please log in as an NGO to view this page.",
        variant: "destructive",
      });
      navigate("/ngo/login");
    }
  }, [user, navigate, toast]);

  if (!user || user.role !== UserRole.NGO) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">NGO Dashboard</h1>
          <p className="text-gray-600 mb-8">
            Welcome back, {user.name}
            {ngo?.status === "PENDING" && (
              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                Approval Pending
              </span>
            )}
          </p>

          {ngo?.status === "PENDING" ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold mb-2">
                Registration Under Review
              </h2>
              <p className="text-gray-600 mb-4">
                Your organization's registration is currently being reviewed by
                government authorities. This process typically takes 3-5
                business days.
              </p>
              <p className="text-gray-600">
                You'll receive full access to the platform once your
                registration is approved.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Active Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {managedProjects.length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Pending Requests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {victimRequests.filter(r => r.status !== "RESOLVED").length}
                    </div>
                  </CardContent>
                </Card>
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
                      People Helped
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {managedProjects.reduce((total, project) => total + project.victims, 0)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="projects" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="projects">Managed Projects</TabsTrigger>
                  <TabsTrigger value="requests">Victim Requests</TabsTrigger>
                  <TabsTrigger value="donations">Donations</TabsTrigger>
                  <TabsTrigger value="organization">Organization</TabsTrigger>
                </TabsList>

                <TabsContent value="projects" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Your Projects</h2>
                    <Button variant="outline" size="sm">
                      Create New Project
                    </Button>
                  </div>

                  {managedProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {managedProjects.map((project) => (
                        <DisasterCard key={project.id} project={project} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white border rounded-lg">
                      <p className="text-gray-500 mb-4">
                        You currently don't have any assigned projects.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="requests" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Victim Requests</h2>
                    <div className="flex items-center space-x-2">
                      <select className="text-sm border rounded p-1" aria-label="Select status">
                        <option value="all">All Statuses</option>
                        <option value="critical">Critical</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <Button variant="outline" size="sm">
                        Export
                      </Button>
                    </div>
                  </div>

                  {victimRequests.length > 0 ? (
                    <div className="space-y-4">
                      {victimRequests.map((request) => (
                        <Card key={request.id} className="overflow-hidden">
                          <div className="p-6">
                            <div className="flex flex-col md:flex-row justify-between mb-4">
                              <div>
                                <h3 className="font-semibold">{request.name}</h3>
                                <p className="text-sm text-gray-500">{request.location}</p>
                              </div>
                              <div className="mt-2 md:mt-0">
                                <StatusBadge status={request.status} />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Phone:</span>
                                <span className="text-sm">{request.phoneNumber}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Requested:</span>
                                <span className="text-sm">
                                  {format(new Date(request.createdAt), "PP")}
                                </span>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <p className="text-sm">{request.description}</p>
                            </div>
                            
                            {request.mediaFiles.length > 0 && (
                              <div className="mt-4 grid grid-cols-3 gap-2">
                                {request.mediaFiles.map((file, idx) => (
                                  <div key={idx} className="border rounded overflow-hidden">
                                    <img src={file} alt="Media" className="w-full h-16 object-cover" />
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                              <Button variant="outline" size="sm">
                                Contact
                              </Button>
                              <Button size="sm">
                                Respond
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white border rounded-lg">
                      <p className="text-gray-500">
                        No victim requests for your projects.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="donations" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Incoming Donations</h2>
                    <div className="flex items-center space-x-2">
                      <select className="text-sm border rounded p-1" aria-label="Select donation category">
                        <option value="all">All Types</option>
                        <option value="monetary">Monetary</option>
                        <option value="food">Food</option>
                        <option value="medical">Medical</option>
                      </select>
                      <Button variant="outline" size="sm">
                        Export
                      </Button>
                    </div>
                  </div>

                  {donations.length > 0 ? (
                    <div className="space-y-4">
                      {donations.map((donation) => {
                        const project = disasterProjects.find(p => p.id === donation.projectId);
                        return (
                          <Card key={donation.id} className="overflow-hidden">
                            <div className="p-6">
                              <div className="flex flex-col md:flex-row justify-between mb-4">
                                <div>
                                  <h3 className="font-semibold">
                                    {project?.title || "Unknown Project"}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    Donation ID: {donation.id}
                                  </p>
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
                              </div>
                              
                              <div className="mt-4 pt-4 border-t">
                                <h4 className="text-sm font-medium mb-2">Donation Details</h4>
                                {donation.category === "MONETARY" ? (
                                  <p className="text-sm">
                                    Amount: ₹{donation.details.amount} via {donation.details.paymentMethod}
                                  </p>
                                ) : (
                                  <ul className="list-disc pl-5 text-sm">
                                    {donation.details.items?.map((item: string, idx: number) => (
                                      <li key={idx}>{item}</li>
                                    ))}
                                    {donation.details.logistics && (
                                      <li className="mt-2">
                                        <span className="font-medium">Logistics:</span> {donation.details.logistics}
                                      </li>
                                    )}
                                  </ul>
                                )}
                              </div>
                              
                              <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                                {donation.status !== "RECEIVED" && (
                                  <Button 
                                    variant={donation.status === "IN_TRANSIT" ? "default" : "outline"} 
                                    size="sm"
                                  >
                                    Mark as Received
                                  </Button>
                                )}
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white border rounded-lg">
                      <p className="text-gray-500">
                        No donations received for your projects yet.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="organization" className="space-y-6">
                  <h2 className="text-xl font-semibold">Organization Profile</h2>
                  
                  {ngo ? (
                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Organization Name</h3>
                            <p className="font-medium">{ngo.name}</p>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Areas of Operation</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {ngo.operationAreas.map((area, idx) => (
                                <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-sm">
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                              <div>
                                <span className="text-xs text-gray-500">Email:</span>
                                <p className="text-sm">{ngo.contactEmail}</p>
                              </div>
                              <div>
                                <span className="text-xs text-gray-500">Phone:</span>
                                <p className="text-sm">{ngo.contactPhone}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Accomplishments</h3>
                            <div className="space-y-3 mt-2">
                              {ngo.accomplishments.map((accomplishment, idx) => (
                                <div key={idx} className="border rounded-lg p-3">
                                  <h4 className="font-medium">{accomplishment.title} ({accomplishment.year})</h4>
                                  <p className="text-sm text-gray-600 mt-1">{accomplishment.description}</p>
                                  
                                  {accomplishment.mediaFiles.length > 0 && (
                                    <div className="mt-2 grid grid-cols-3 gap-2">
                                      {accomplishment.mediaFiles.map((file, mediaIdx) => (
                                        <div key={mediaIdx} className="border rounded overflow-hidden">
                                          <img src={file} alt="Media" className="w-full h-16 object-cover" />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="pt-4 border-t">
                            <Button variant="outline" className="w-full">
                              Edit Organization Profile
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="text-center py-12 bg-white border rounded-lg">
                      <p className="text-gray-500">
                        Organization profile data not available.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NGODashboardPage;
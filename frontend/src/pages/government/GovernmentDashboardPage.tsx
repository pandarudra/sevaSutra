import {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import {Button} from "../../components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "../../components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../components/ui/tabs";
import {
  getLoggedInUser,
  disasterProjects,
  ngos,
  victimRequests,
  getDonationsByProjectId,
} from "../../utils/mockData";
import StatusBadge from "../../components/StatusBadge";
import {UserRole, DisasterType, RequestStatus, Ngo} from "../../utils/types";
import {format} from "date-fns";
import {useToast} from "../../components/ui/use-toast";

const GovernmentDashboardPage = () => {
  const navigate = useNavigate();
  const {toast} = useToast();
  const user = getLoggedInUser();

  // Filter pending NGO registrations
  const [pendingNgos, setPendingNgos] = useState(
    ngos.filter((ngo) => ngo.status === "PENDING")
  );

  // Get unassigned victim requests
  const [unassignedRequests, setUnassignedRequests] = useState(
    victimRequests.filter((request) => 
      request.status !== RequestStatus.RESOLVED
    )
  );

  // Check if user is logged in as government admin
  useEffect(() => {
    if (!user || user.role !== UserRole.GOVERNMENT) {
      toast({
        title: "Access denied",
        description: "Please log in as a government administrator to view this page.",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [user, navigate, toast]);

  const handleNgoApproval = (ngoId: number, approved: boolean) => {
    const ngoIndex = pendingNgos.findIndex(ngo => ngo.id === ngoId);
    if (ngoIndex !== -1) {
      const updatedPendingNgos = [...pendingNgos];
      updatedPendingNgos.splice(ngoIndex, 1);
      setPendingNgos(updatedPendingNgos);
      
      toast({
        title: approved ? "NGO Approved" : "NGO Rejected",
        description: `The NGO registration has been ${approved ? "approved" : "rejected"}.`,
      });
    }
  };

  const assignNgoToProject = (ngoId: number, projectId: number) => {
    toast({
      title: "NGO Assigned",
      description: "The NGO has been assigned to the project successfully.",
    });
  };

  const forwardRequestToNgo = (requestId: number, ngoId: number) => {
    toast({
      title: "Request Forwarded",
      description: "The request has been forwarded to the NGO.",
    });
  };

  if (!user || user.role !== UserRole.GOVERNMENT) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">Government Admin Dashboard</h1>
          <p className="text-gray-600 mb-8">
            Welcome back, {user.name}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Active Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {disasterProjects.filter(p => p.status !== RequestStatus.RESOLVED).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Pending NGO Approvals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {pendingNgos.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Victim Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {unassignedRequests.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Approved NGOs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {ngos.filter(ngo => ngo.status === "APPROVED").length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList>
              <TabsTrigger value="projects">Disaster Projects</TabsTrigger>
              <TabsTrigger value="ngoapprovals">NGO Approvals</TabsTrigger>
              <TabsTrigger value="requests">Victim Requests</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Disaster Projects</h2>
                <Button variant="outline" size="sm">
                  Create New Project
                </Button>
              </div>

              <div className="space-y-4">
                {disasterProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="text-sm text-gray-500">{project.location}</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <StatusBadge status={project.status} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Type:</span>
                          <span className="text-sm">{project.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Started:</span>
                          <span className="text-sm">
                            {format(new Date(project.createdAt), "PP")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">People Affected:</span>
                          <span className="text-sm">{project.victims.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Managing NGO:</span>
                          <span className="text-sm">{project.managingNgo || "Unassigned"}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="text-sm font-medium mb-2">Latest Update</h4>
                        {project.updates.length > 0 ? (
                          <p className="text-sm">
                            {project.updates[project.updates.length - 1].content}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-500">No updates available</p>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
                        <div className="flex-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => navigate(`/projects/${project.id}`)}
                          >
                            View Details
                          </Button>
                        </div>
                        <div className="flex-1">
                          <select 
                            className="w-full p-2 text-sm border rounded" 
                            defaultValue=""
                            onChange={(e) => {
                              const ngoId = parseInt(e.target.value);
                              if (ngoId) {
                                assignNgoToProject(ngoId, project.id);
                              }
                            }}
                          >
                            <option value="" disabled>Assign NGO</option>
                            {ngos
                              .filter(ngo => ngo.status === "APPROVED")
                              .map(ngo => (
                                <option key={ngo.id} value={ngo.id}>
                                  {ngo.name}
                                </option>
                              ))
                            }
                          </select>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ngoapprovals" className="space-y-6">
              <h2 className="text-xl font-semibold">NGO Registration Approvals</h2>
              
              {pendingNgos.length > 0 ? (
                <div className="space-y-4">
                  {pendingNgos.map((ngo) => (
                    <Card key={ngo.id} className="overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between mb-4">
                          <div>
                            <h3 className="font-semibold">{ngo.name}</h3>
                            <p className="text-sm text-gray-500">
                              {ngo.operationAreas.join(", ")}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                              Pending Approval
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Founded:</span>
                            <span className="text-sm">
                              {format(new Date(ngo.inauguratedOn), "PP")}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Email:</span>
                            <span className="text-sm">{ngo.contactEmail}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Phone:</span>
                            <span className="text-sm">{ngo.contactPhone}</span>
                          </div>
                        </div>
                        
                        {ngo.accomplishments.length > 0 && (
                          <div className="mt-4 pt-4 border-t">
                            <h4 className="text-sm font-medium mb-2">Past Accomplishments</h4>
                            <div className="space-y-2">
                              {ngo.accomplishments.map((accomplishment, idx) => (
                                <div key={idx} className="border rounded-lg p-3">
                                  <h5 className="text-sm font-medium">
                                    {accomplishment.title} ({accomplishment.year})
                                  </h5>
                                  <p className="text-xs text-gray-600 mt-1">
                                    {accomplishment.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleNgoApproval(ngo.id, false)}
                          >
                            Reject
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleNgoApproval(ngo.id, true)}
                          >
                            Approve
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white border rounded-lg">
                  <p className="text-gray-500">
                    No pending NGO registrations at the moment.
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

              {unassignedRequests.length > 0 ? (
                <div className="space-y-4">
                  {unassignedRequests.map((request) => {
                    const project = disasterProjects.find(p => p.id === request.projectId);
                    return (
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
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Related Project:</span>
                              <span className="text-sm">
                                {project ? project.title : "None"}
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
                          
                          <div className="mt-4 pt-4 border-t">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div>
                                <select 
                                  className="w-full p-2 text-sm border rounded"
                                  defaultValue=""
                                  onChange={(e) => {
                                    const ngoId = parseInt(e.target.value);
                                    if (ngoId) {
                                      forwardRequestToNgo(request.id, ngoId);
                                    }
                                  }}
                                >
                                  <option value="" disabled>Forward to NGO</option>
                                  {ngos
                                    .filter(ngo => ngo.status === "APPROVED")
                                    .map(ngo => (
                                      <option key={ngo.id} value={ngo.id}>
                                        {ngo.name}
                                      </option>
                                    ))
                                  }
                                </select>
                              </div>
                              <Button variant="outline" size="sm">
                                View on Map
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-white border rounded-lg">
                  <p className="text-gray-500">
                    No pending victim requests at the moment.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="map" className="space-y-6">
              <h2 className="text-xl font-semibold">Disaster Map</h2>
              
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <div className="h-[500px] bg-gray-200 flex items-center justify-center">
                  <div className="text-center p-4">
                    <p className="text-gray-500 mb-2">
                      Interactive map showing disaster areas, NGO coverage zones, and victim requests.
                    </p>
                    <p className="text-sm text-gray-400">
                      Map view would be implemented here with markers for different activities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Disaster Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.values(DisasterType).map((type) => (
                        <div key={type} className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-emergency-500 mr-2"></div>
                          <span className="text-sm">{type}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">NGO Coverage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {ngos
                        .filter(ngo => ngo.status === "APPROVED")
                        .slice(0, 5)
                        .map((ngo) => (
                          <div key={ngo.id} className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-success-500 mr-2"></div>
                            <span className="text-sm">{ngo.name}</span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Request Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.values(RequestStatus).map((status) => (
                        <div key={status} className="flex items-center">
                          <div 
                            className={`w-3 h-3 rounded-full mr-2 ${
                              status === RequestStatus.CRITICAL 
                                ? 'bg-alert-500' 
                                : status === RequestStatus.ONGOING 
                                ? 'bg-emergency-500' 
                                : status === RequestStatus.RESOLVED 
                                ? 'bg-success-500' 
                                : 'bg-gray-500'
                            }`}
                          ></div>
                          <span className="text-sm">{status}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GovernmentDashboardPage;

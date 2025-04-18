import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import StatusBadge from "../components/StatusBadge";
import ProjectUpdatesList from "../components/ProjectUpdatesList";
import { getDisasterProjectById, getLoggedInUser, getNgoById } from "../utils/mockData";
import { UserRole } from "../utils/types";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useToast } from "../components/ui/use-toast";

const ProjectDetailsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState(
    getDisasterProjectById(Number(projectId))
  );
  const [managingNgo, setManagingNgo] = useState(
    project ? getNgoById(project.ngoId) : null
  );
  const { toast } = useToast();
  const user = getLoggedInUser();

  // Redirect if project not found
  useEffect(() => {
    if (!project) {
      toast({
        title: "Project not found",
        description: "The requested project could not be found.",
        variant: "destructive",
      });
      navigate("/projects");
    }
  }, [project, navigate, toast]);

  if (!project) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container py-8">
          <div className="mb-6">
            <Link
              to="/projects"
              className="text-emergency-600 hover:underline text-sm"
            >
              ← Back to All Projects
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
                {/* Project Header */}
                <div className="relative h-64 bg-gray-200">
                  {project.images && project.images.length > 0 ? (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      No image available
                    </div>
                  )}
                  <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h1 className="text-2xl font-bold text-white mb-1">
                      {project.title}
                    </h1>
                    <p className="text-white/80">{project.location}</p>
                  </div>
                </div>

                {/* Project Tabs */}
                <Tabs defaultValue="details" className="p-6">
                  <TabsList className="mb-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="updates">Live Updates</TabsTrigger>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-6">
                    <div className="flex items-center gap-3 flex-wrap">
                      <StatusBadge status={project.status} />
                      <span className="text-sm text-gray-600">
                        Created: {format(new Date(project.createdAt), "d MMM yyyy")}
                      </span>
                      <span className="text-sm text-gray-600">
                        Last updated:{" "}
                        {format(new Date(project.updatedAt), "d MMM yyyy")}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold mb-2">
                        About this disaster
                      </h2>
                      <p className="text-gray-600">{project.description}</p>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold mb-2">
                        Impact Statistics
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <span className="block text-2xl font-bold text-emergency-600">
                            {project.victims.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-600">
                            People Affected
                          </span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <span className="block text-2xl font-bold text-emergency-600">
                            {project.updates.length}
                          </span>
                          <span className="text-sm text-gray-600">
                            Updates Posted
                          </span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <span className="block text-2xl font-bold text-emergency-600">
                            {managingNgo?.name ? "1" : "0"}
                          </span>
                          <span className="text-sm text-gray-600">
                            NGOs Responding
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold mb-2">
                        Managing Organization
                      </h2>
                      {managingNgo ? (
                        <div className="border rounded-lg p-4">
                          <h3 className="font-medium">{managingNgo.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Operational areas:{" "}
                            {managingNgo.operationAreas.join(", ")}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Contact: {managingNgo.contactEmail}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-600">
                          No managing organization assigned yet.
                        </p>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="updates">
                    <ProjectUpdatesList updates={project.updates} />
                  </TabsContent>

                  <TabsContent value="gallery">
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold">
                        Disaster Images & Media
                      </h2>

                      {project.images && project.images.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {project.images.map((image, idx) => (
                            <div
                              key={idx}
                              className="border rounded-lg overflow-hidden"
                            >
                              <img
                                src={image}
                                alt={`${project.title} - Image ${idx + 1}`}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600">
                          No media files available for this project.
                        </p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="lg:col-span-1">
              {/* Action Panel */}
              <div className="bg-white border rounded-lg p-6 shadow-sm space-y-6">
                <h2 className="text-lg font-semibold">How You Can Help</h2>

                <div className="space-y-4">
                  <Button
                    className="w-full"
                    onClick={() => {
                      if (user && user.role === UserRole.DONOR) {
                        navigate(`/donor/donate/${project.id}`);
                      } else {
                        navigate("/donor/login", {
                          state: { redirectTo: `/donor/donate/${project.id}` },
                        });
                      }
                    }}
                  >
                    Donate Now
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/request-help")}
                  >
                    Request Help
                  </Button>

                  {user && user.role === UserRole.NGO && (
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => navigate("/ngo/dashboard")}
                    >
                      NGO Dashboard
                    </Button>
                  )}

                  {user && user.role === UserRole.GOVERNMENT && (
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => navigate("/government/dashboard")}
                    >
                      Admin Dashboard
                    </Button>
                  )}
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Share This Project</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        toast({
                          title: "Link Copied",
                          description: "Project link copied to clipboard",
                        });
                      }}
                    >
                      Copy Link
                    </Button>
                  </div>
                </div>
              </div>

              {/* Recent Updates Panel */}
              <div className="bg-white border rounded-lg p-6 mt-6 shadow-sm">
                <h3 className="font-semibold mb-4">Recent Updates</h3>
                <div className="space-y-4">
                  {project.updates.slice(0, 3).map((update) => (
                    <div key={update.id} className="border-b pb-3 last:border-0">
                      <p className="text-sm">{update.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(new Date(update.timestamp), "d MMM yyyy")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetailsPage;
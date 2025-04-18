import { useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { disasterProjects } from "../utils/mockData";
import { DisasterType, RequestStatus } from "../utils/types";
import DisasterCard from "../components/DisasterCard";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const ProjectsListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredProjects = disasterProjects.filter((project) => {
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesType = typeFilter === "all" || project.type === typeFilter;
    const matchesSearch =
      searchTerm.trim() === "" ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesType && matchesSearch;
  });

  const isAnyFilterActive = searchTerm || statusFilter !== "all" || typeFilter !== "all";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-8">Disaster Relief Projects</h1>

          {/* Filters Section */}
          <div className="mb-8 p-4 bg-white border rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Search Projects
                </label>
                <Input
                  type="text"
                  placeholder="Search by name, location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {Object.values(RequestStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0) + status.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Disaster Type
                </label>
                <Select
                  value={typeFilter}
                  onValueChange={(value) => setTypeFilter(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {Object.values(DisasterType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0) + type.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="flex justify-end mt-4">
              <button
                disabled={!isAnyFilterActive}
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setTypeFilter("all");
                }}
                className={`py-2 px-4 rounded ${
                  isAnyFilterActive
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          <div>
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <DisasterCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white border rounded-lg">
                <p className="text-gray-500">
                  No disaster projects match your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsListPage;

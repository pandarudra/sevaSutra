import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { disasterProjects } from "../utils/mockData";
import DisasterCard from "../components/DisasterCard";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { RequestStatus } from "../utils/types";

const Index = () => {
  // Filter active disasters (critical or ongoing)
  const activeDisasters = disasterProjects.filter(
    (project) =>
      project.status === RequestStatus.CRITICAL ||
      project.status === RequestStatus.ONGOING
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-gradient py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                Emergency Aid Coordination Platform
              </h1>
              <p className="text-lg text-gray-600">
                Connecting disaster victims with emergency services, donors, and
                support organizations for rapid relief coordination.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Link to="/request-help">
                  <Button
                    size="lg"
                    variant="destructive"
                    className="w-full sm:w-auto"
                  >
                    Request Help
                  </Button>
                </Link>
                <Link to="/donor/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Donate Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Active Disasters Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Active Disaster Relief Projects</h2>
                <Link
                  to="/projects"
                  className="text-emergency-600 hover:underline text-sm"
                >
                  View All Projects
                </Link>
              </div>

              {activeDisasters.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeDisasters.slice(0, 3).map((project) => (
                    <DisasterCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p>No active disaster projects at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">
                How The Platform Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-lg bg-white shadow-sm border">
                  <div className="mx-auto w-16 h-16 bg-emergency-50 rounded-full flex items-center justify-center mb-4">
                    <span className="text-emergency-500 text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Victims Request Help
                  </h3>
                  <p className="text-gray-600 text-sm">
                    People affected by disasters can submit requests for
                    assistance with their specific needs.
                  </p>
                </div>
                <div className="text-center p-6 rounded-lg bg-white shadow-sm border">
                  <div className="mx-auto w-16 h-16 bg-emergency-50 rounded-full flex items-center justify-center mb-4">
                    <span className="text-emergency-500 text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Government & NGOs Respond
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Government authorities and approved NGOs coordinate relief
                    efforts and respond to requests.
                  </p>
                </div>
                <div className="text-center p-6 rounded-lg bg-white shadow-sm border">
                  <div className="mx-auto w-16 h-16 bg-emergency-50 rounded-full flex items-center justify-center mb-4">
                    <span className="text-emergency-500 text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Donors Contribute
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Individual donors can provide funds, food, medical supplies,
                    and other essentials to support relief efforts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Options */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">
                Join The Relief Network
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border rounded-lg p-8 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">For Donors</h3>
                  <p className="text-gray-600 mb-6">
                    Register as a donor to contribute funds, food, medical
                    supplies, and other essentials to ongoing relief efforts.
                  </p>
                  <Link to="/donor/register">
                    <Button variant="outline" className="w-full">
                      Register as Donor
                    </Button>
                  </Link>
                </div>
                <div className="bg-white border rounded-lg p-8 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">For NGOs</h3>
                  <p className="text-gray-600 mb-6">
                    Register your organization to join the relief network and
                    coordinate disaster response efforts.
                  </p>
                  <Link to="/ngo/register">
                    <Button variant="outline" className="w-full">
                      Register as NGO
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
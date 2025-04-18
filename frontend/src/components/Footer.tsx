import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-emergency-500 text-white flex items-center justify-center font-bold">
                SS
              </div>
              <span className="font-bold text-xl">Seva Sutra</span>
            </div>
            <p className="text-sm text-gray-600">
              Connecting disaster victims with emergency aid through a
              coordinated network of donors, NGOs, and government agencies.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-sm mb-3">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-600 hover:text-emergency-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-600 hover:text-emergency-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-sm text-gray-600 hover:text-emergency-600"
                >
                  Disaster Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/request-help"
                  className="text-sm text-gray-600 hover:text-emergency-600"
                >
                  Request Help
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-sm mb-3">For Organizations</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/ngo/register"
                  className="text-sm text-gray-600 hover:text-emergency-600"
                >
                  NGO Registration
                </Link>
              </li>
              <li>
                <Link
                  to="/ngo/login"
                  className="text-sm text-gray-600 hover:text-emergency-600"
                >
                  NGO Login
                </Link>
              </li>
              <li>
                <Link
                  to="/government/login"
                  className="text-sm text-gray-600 hover:text-emergency-600"
                >
                  Government Portal
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-sm mb-3">For Donors</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/donor/register"
                  className="text-sm text-gray-600 hover:text-emergency-600"
                >
                  Donor Registration
                </Link>
              </li>
              <li>
                <Link
                  to="/donor/login"
                  className="text-sm text-gray-600 hover:text-emergency-600"
                >
                  Donor Login
                </Link>
              </li>
              <li>
                <Link
                  to="/donor/dashboard"
                  className="text-sm text-gray-600 hover:text-emergency-600"
                >
                  Donation Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} Relief Flow | Emergency Aid Coordination Platform
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
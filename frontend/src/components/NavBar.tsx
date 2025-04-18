import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { getLoggedInUser, setLoggedInUser } from "../utils/mockData";
import { UserRole } from "../utils/types";
import { useToast } from "../components/ui/use-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getLoggedInUser();

  const handleLogout = () => {
    setLoggedInUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  return (
    <div className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-emergency-500 text-white flex items-center justify-center font-bold">
            SS
          </div>
          <span className="font-bold text-xl">Seva Sutra</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link to="/projects" className="text-sm font-medium hover:underline">
            Projects
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <Button
                variant="ghost"
                onClick={() => {
                  switch (user.role) {
                    case UserRole.DONOR:
                      navigate("/donor/dashboard");
                      break;
                    case UserRole.NGO:
                      navigate("/ngo/dashboard");
                      break;
                    case UserRole.GOVERNMENT:
                      navigate("/government/dashboard");
                      break;
                    default:
                      navigate("/");
                  }
                }}
              >
                Dashboard
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => navigate("/request-help")}
              >
                Request Help
              </Button>
              <Button onClick={() => navigate("/login")}>
                Login
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
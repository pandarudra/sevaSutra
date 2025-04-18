import React from "react";
import { Link } from "react-router-dom";
import { DisasterProject, RequestStatus } from "../utils/types";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "../components/ui/badge";

interface DisasterCardProps {
  project: DisasterProject;
}

const DisasterCard: React.FC<DisasterCardProps> = ({ project }) => {
  const getStatusClass = (status: RequestStatus) => {
    switch (status) {
      case RequestStatus.CRITICAL:
        return "disaster-card-alert";
      case RequestStatus.ONGOING:
        return "disaster-card-ongoing";
      case RequestStatus.RESOLVED:
        return "disaster-card-resolved";
      default:
        return "";
    }
  };

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case RequestStatus.CRITICAL:
        return (
          <Badge variant="destructive" className="rounded-sm">
            Critical
          </Badge>
        );
      case RequestStatus.ONGOING:
        return (
          <Badge variant="default" className="bg-emergency-500 rounded-sm">
            Ongoing
          </Badge>
        );
      case RequestStatus.RESOLVED:
        return (
          <Badge variant="outline" className="text-success-600 rounded-sm">
            Resolved
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="rounded-sm">
            Pending
          </Badge>
        );
    }
  };

  return (
    <Link to={`/projects/${project.id}`}>
      <div
        className={`disaster-card hover:translate-y-[-2px] ${getStatusClass(
          project.status
        )}`}
      >
        <div className="flex flex-col h-full">
          <div className="relative h-40 overflow-hidden rounded-t-lg bg-muted">
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
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <h3 className="font-bold text-white">{project.title}</h3>
              <p className="text-xs text-white/80">{project.location}</p>
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              {getStatusBadge(project.status)}
              <span className="text-xs text-gray-500">
                Updated{" "}
                {formatDistanceToNow(new Date(project.updatedAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 line-clamp-2">
                {project.description}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t flex justify-between items-center text-xs text-gray-500">
              <span>Managing NGO: {project.managingNgo}</span>
              <span>
                {project.victims.toLocaleString()} affected
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DisasterCard;
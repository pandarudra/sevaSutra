import React from "react";
import { Badge } from "../components/ui/badge";
import { RequestStatus } from "../utils/types";

interface StatusBadgeProps {
  status: RequestStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
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

export default StatusBadge;
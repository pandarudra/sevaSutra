import React from "react";
import { ProjectUpdate } from "../utils/types";
import { formatDistanceToNow } from "date-fns";

interface ProjectUpdatesListProps {
  updates: ProjectUpdate[];
}

const ProjectUpdatesList: React.FC<ProjectUpdatesListProps> = ({ updates }) => {
  // Sort updates by timestamp (newest first)
  const sortedUpdates = [...updates].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        <span className="live-indicator ml-6">Live Updates</span>
      </h3>
      <div className="space-y-4">
        {sortedUpdates.length > 0 ? (
          sortedUpdates.map((update) => (
            <div
              key={update.id}
              className="border-l-2 border-emergency-500 pl-4 py-2"
            >
              <p className="text-sm">{update.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(new Date(update.timestamp), {
                  addSuffix: true,
                })}
              </p>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-sm">No updates available yet.</div>
        )}
      </div>
    </div>
  );
};

export default ProjectUpdatesList;
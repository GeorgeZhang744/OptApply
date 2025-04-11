import { IconX } from "@tabler/icons-react";
import { Link } from "react-router";

import { formatSalary } from "../../utils/applicationDataProcessing";

interface IJobCardProps {
  application: models.application.IApplication;
}

const JobCard: React.FC<IJobCardProps> = ({ application }) => {
  return (
    // TODO: add more styling to make it look better
    <div className="border border-secondary rounded-lg shadow-sm p-5 bg-neutral text-neutral-content space-y-2 w-full">
      <div className="flex justify-between items-center">
        {/* Position name and application status */}
        <div className="flex space-x-2">
          <h2 className="text-xl font-semibold">{application.position}</h2>
          <span className="text-sm px-3 py-1 rounded-sm">{application.status}</span>
        </div>

        {/* Exit Button */}
        <Link to="/home">
          <button className="btn btn-error btn-ghost">
            <IconX stroke={2} />
          </button>
        </Link>
      </div>

      {/* Rest of application data */}
      <div className="text-sm">
        <p>
          <strong>Company:</strong> {application.company}
        </p>
        <p>
          <strong>Application Link:</strong>{" "}
          <a href={application.applicationUrl} target="_blank" rel="noopener noreferrer" className="text-info underline">
            {application.applicationUrl}
          </a>
        </p>
        <p>
          <strong>Deadline:</strong> {application.deadline.toLocaleDateString()}
        </p>
        <p>
          <strong>Work Location:</strong> {application.workLocation}
        </p>
        <p>
          <strong>Salary:</strong> {formatSalary(application.salary)}
        </p>
        <p>
          <strong>Skills Required:</strong> {application.skillsRequired.join(", ")}
        </p>
        <p>
          <strong>Job Description:</strong> {application.jobDescription}
        </p>
        <p>
          <strong>Note:</strong> {application.note}
        </p>
      </div>
    </div>
  );
};

export default JobCard;

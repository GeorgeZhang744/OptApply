import { IconX } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { formatSalary } from "../../utils/applicationDataProcessing";

interface IJobCardProps {
  application: models.application.IApplication;
}

const JobCard: React.FC<IJobCardProps> = ({ application }) => {
  return (
    <div className="rounded-xl shadow-md bg-white text-gray-900 p-6 w-full max-w-2xl border border-gray-200 space-y-4">
      <div className="flex justify-between items-center">
        {/* Position name and application status */}
        <div className="flex space-x-2">
          <h2 className="text-xl font-semibold">{application.position}</h2>
          <span className="inline-block bg-gray-200 text-gray-800 text-xs font-medium px-3 py-2 rounded-md">
            {application.status}
          </span>
        </div>

        {/* Exit Button */}
        <Link to="/home">
          <button className="btn btn-error btn-ghost">
            <IconX stroke={2} />
          </button>
        </Link>
      </div>

      {/* Info Section */}
      <div className="text-base space-y-2">
        <p>
          <span className="font-medium">Company:</span> {application.company}
        </p>
        <p>
          <span className="font-medium">Application URL:</span>{" "}
          <a
            href={application.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            {application.applicationUrl}
          </a>
        </p>
        <p>
          <span className="font-medium">Deadline:</span>{" "}
          {application.deadline.toLocaleDateString(undefined, {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <p>
          <span className="font-medium">Work Location:</span> {application.workLocation}
        </p>
        <p>
          <span className="font-medium">Salary:</span> {formatSalary(application.salary)}
        </p>
        <p>
          <span className="font-medium">Skills Required:</span> {application.skillsRequired.join(", ")}
        </p>
        <p>
          <span className="font-medium">Job Description:</span> {application.jobDescription}
        </p>
      </div>

      {/* Note (if present) */}
      {application.note && (
        <>
          <hr className="my-2" />
          <p className="text-sm italic text-gray-600">{application.note}</p>
        </>
      )}
    </div>
  );
};

export default JobCard;

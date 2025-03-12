import { useParams } from "react-router";

import JobCard from "../components/JobCard/JobCard";

const ApplicationDetailPage = () => {
  // TODO: Temp mock data, pretending the data being fetched remove afterward
  const applications: models.application.IApplication[] = [
    {
      id: "1",
      company: "C1",
      position: "Web Dev",
      ApplicationUrl: "https://job.com/1",
      deadline: new Date("2025-10-05"),
      workLocation: "Remote",
      status: "Applied",
      salary: { min: 80000, max: 100000 },
      skillsRequired: ["HTML", "CSS", "React"],
      jobDescription: "Frontend development",
      note: "",
    },
  ];

  const { applicationId } = useParams();

  // TODO: Currently this is only simulating data fetching, need to be replaced with useEffect later
  const application = applications.find((application) => application.id === applicationId);

  return <div className="container w-full mx-auto mt-24">{application && <JobCard application={application} />}</div>;
};

export default ApplicationDetailPage;

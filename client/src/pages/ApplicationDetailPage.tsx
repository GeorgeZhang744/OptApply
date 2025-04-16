import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router";
import { mockApplications } from "../data/mockdata";
import JobCard from "../components/JobCard/JobCard";

const ApplicationDetailPage = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState<models.application.IApplication | null>(null);

  const foundApplication = useMemo(
    () => mockApplications.find((application) => application.id === applicationId) || null,
    [applicationId]
  );

  useEffect(() => {
    const fetchApplication = async () => {
      //simulate API call delay
      setTimeout(() => setApplication(foundApplication), 500);
    };

    fetchApplication();
  }, [foundApplication]);

  return (
    <div className="container w-full mx-auto mt-24 px-4">
      {application ? (
        <div className="flex flex-col items-center mt-24 px-4 w-full">
          <div className="w-full max-w-2xl space-y-4">
            <JobCard application={application} />
            <div className="flex justify-end">
              <Link to={`/edit/${applicationId}`} className="btn btn-primary">
                Edit
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ApplicationDetailPage;

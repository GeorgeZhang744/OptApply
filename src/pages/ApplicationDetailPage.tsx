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
    <div className="container w-full mx-auto mt-24">
      {application ? (
        <>
          <JobCard application={application} />
          <div className="flex justify-end space-x-2 mt-4">
            <Link to={`/edit/${applicationId}`} className="btn btn-primary">
              Edit
            </Link>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ApplicationDetailPage;

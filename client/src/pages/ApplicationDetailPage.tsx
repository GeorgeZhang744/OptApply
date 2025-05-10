import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import JobCard from "../components/JobCard/JobCard";

const ApplicationDetailPage = () => {
  const { applicationId } = useParams();
  const authContext = useContext(AuthContext);
  const [application, setApplication] = useState<models.application.IApplication | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      if(!authContext?.jwtToken || !applicationId) return;
      
      try{
        const response = await fetch(`http://localhost:3000/api/applications/${applicationId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authContext.jwtToken}`,
          },
        });
        if(!response.ok) throw new Error("Failed to fetch application");

        const data = await response.json();
        setApplication(data);
      } catch (err){
        console.error("error fetching application", err);
      }
    };

    fetchApplication();
  }, [authContext?.jwtToken, applicationId]);

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

import {useEffect, useState} from "react";
import { useParams } from "react-router";
import {mockApplications} from "../data/mockdata";
import JobCard from "../components/JobCard/JobCard";

const ApplicationDetailPage = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState<models.application.IApplication | null>(null);

  useEffect(()=>{
    const fetchApplication = async()=>{
      const foundApplication = mockApplications.find((app) => app.id === applicationId) || null;
      
      //simulate API call delay
      setTimeout(()=> setApplication(foundApplication),500);
    };

    fetchApplication();
  }, [applicationId]); 

  return (
    <div className="container w-full mx-auto mt-24">
      {application ? <JobCard application={application}/> : <p>Loading...</p>}
    </div>
  );
};

export default ApplicationDetailPage;

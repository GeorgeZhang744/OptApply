import ToolBar from "../components/ToolBar/ToolBar";
import ApplicationTable from "../components/ApplicationTable/ApplicationTable";
import {useEffect, useState} from "react";
import {mockApplications} from "../data/mockdata";

const MainPage = () => {
  const [applications, setApplications] = useState<models.application.IApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchApplication = async()=>{
      setTimeout(()=>{
        setApplications(mockApplications);
        setLoading(false);
      }, 500);
    };

    fetchApplication();
  }, []);

  return (
    <div className="container w-full mx-auto mt-24">
      <ToolBar />
      {loading ? <p>Loading...</p> : <ApplicationTable applications={applications}/>}
    </div>
  );
};

export default MainPage;

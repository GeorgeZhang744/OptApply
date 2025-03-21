import ToolBar from "../components/ToolBar/ToolBar";
import ApplicationTable from "../components/ApplicationTable/ApplicationTable";
import { useEffect, useState } from "react";
import { mockApplications } from "../data/mockdata";

const MainPage = () => {
  const [applications, setApplications] = useState<models.application.IApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOption, setFilterOption] = useState<models.application.ApplicationStatusFilterOptions>("All Application");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      setTimeout(() => {
        setApplications(mockApplications);
        setLoading(false);
      }, 500);
    };

    fetchApplication();
  }, []);

  const filteredApplications = applications.filter((application: models.application.IApplication) => {
    const matchesFilter = filterOption === "All Application" || application.status === filterOption;
    const matchesSearch = application.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container w-full mx-auto mt-24">
      <ToolBar setFilterOption={setFilterOption} setSearchQuery={setSearchQuery} />
      {loading ? <p>Loading...</p> : <ApplicationTable applications={filteredApplications} />}
    </div>
  );
};

export default MainPage;

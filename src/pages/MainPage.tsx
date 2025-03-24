import ToolBar from "../components/ToolBar/ToolBar";
import ApplicationTable from "../components/ApplicationTable/ApplicationTable";
import { useEffect, useState } from "react";
import { mockApplications } from "../data/mockdata";

const MainPage = () => {
  const [applications, setApplications] = useState<models.application.IApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOption, setFilterOption] = useState<models.application.ApplicationStatusFilterOptions>("All Application");
  const [searchQuery, setSearchQuery] = useState("");
  // State for a set that stores the application IDs of the applications that are selected
  const [selectedApplications, setSelectedApplications] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchApplication = async () => {
      setTimeout(() => {
        setApplications(mockApplications);
        setLoading(false);
      }, 500);
    };

    fetchApplication();
  }, []);

  const toggleApplicationSelection = (applicationId: string) => {
    setSelectedApplications((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(applicationId)) {
        newSelected.delete(applicationId);
      } else {
        newSelected.add(applicationId);
      }
      return newSelected;
    });
  };

  const handleDelete = () => {
    // TODO: This is place holder function for deleting feature. Implement actual delete logic here
    console.log("Selected Application IDs:", Array.from(selectedApplications));
  };

  const filteredApplications = applications.filter((application: models.application.IApplication) => {
    const searchHelper = (searchField: string) => {
      return searchField.toLowerCase().includes(searchQuery.toLowerCase());
    };

    const matchesFilter = filterOption === "All Application" || application.status === filterOption;
    const matchesSearch = searchHelper(application.company) || searchHelper(application.position);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container w-full mx-auto mt-24">
      <ToolBar setFilterOption={setFilterOption} setSearchQuery={setSearchQuery} handleDelete={handleDelete} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ApplicationTable
          applications={filteredApplications}
          selectedApplications={selectedApplications}
          toggleApplicationSelection={toggleApplicationSelection}
        />
      )}
    </div>
  );
};

export default MainPage;

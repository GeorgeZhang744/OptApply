import ToolBar from "../components/ToolBar/ToolBar";
import ApplicationTable from "../components/ApplicationTable/ApplicationTable";
import { useEffect, useState, useMemo, useCallback, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const MainPage = () => {
  const [applications, setApplications] = useState<models.application.IApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOption, setFilterOption] = useState<models.application.ApplicationStatusFilterOptions>("All Application");
  const [searchQuery, setSearchQuery] = useState("");
  // State for a set that stores the application IDs of the applications that are selected
  const [selectedApplications, setSelectedApplications] = useState<Set<string>>(new Set());
  const authContext = useContext(AuthContext);

  useEffect(() => {
  const fetchApplications = async () => {
    console.log("Token in MainPage:", authContext?.jwtToken);
    if (!authContext?.jwtToken) return;

    try {
      const response = await fetch("http://localhost:3000/api/applications", {
        headers: {
          Authorization: `Bearer ${authContext.jwtToken}`,
        },
      });
console.log("RAW response:", response); // ADD THIS

const text = await response.text();      // Try reading as text first
console.log("RESPONSE BODY:", text);     // ADD THIS

if (!response.ok) throw new Error("Failed to fetch applications");

const data = JSON.parse(text);           // Then parse it manually
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchApplications();
}, [authContext?.jwtToken]);


  // Prevents function recreation because it is passed to a child component
  const toggleApplicationSelection = useCallback((applicationId: string) => {
    setSelectedApplications((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(applicationId)) {
        newSelected.delete(applicationId);
      } else {
        newSelected.add(applicationId);
      }
      return newSelected;
    });
  }, []);

  // Prevents function recreation because it is passed to a child component
  const handleDelete = useCallback(() => {
    // TODO: This is place holder function for deleting feature. Implement actual delete logic here
    console.log("Selected Application IDs:", Array.from(selectedApplications));
  }, [selectedApplications]);

  // Prevents function recreation because it is passed to a child component
  const filteredApplications = useMemo(
    () =>
      applications.filter((application: models.application.IApplication) => {
        const searchHelper = (searchField: string) => {
          return searchField.toLowerCase().includes(searchQuery.toLowerCase());
        };

        const matchesFilter = filterOption === "All Application" || application.status === filterOption;
        const matchesSearch = searchHelper(application.company) || searchHelper(application.position);
        return matchesFilter && matchesSearch;
      }),
    [applications, filterOption, searchQuery]
  );

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

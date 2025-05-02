import React, { useState, useMemo, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm/ApplicationForm";
import Loading from "../components/Loading/Loading";
import { LoadingContext } from "../contexts/LoadingContext";

const AddApplicationPage = () => {
  const loadingContext = useContext(LoadingContext);

  const [url, setUrl] = useState("");

  // Memoizes initial form state to prevent unnecessary re-renders
  const initialFormState = useMemo(
    () => ({
      company: "",
      position: "",
      applicationUrl: "",
      deadline: "",
      workLocation: "Remote",
      status: "Applied",
      salary: { min: 0, max: 0 },
      skillsRequired: "",
      jobDescription: "",
      note: "",
    }),
    []
  );

  const [formData, setFormData] = useState(initialFormState);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  // Prevents function recreation because it is passed to a child component
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "salaryMin" || name === "salaryMax") {
      // Handle salary input update
      setFormData((prevData) => ({
        ...prevData,
        salary: {
          ...prevData.salary,
          [name === "salaryMin" ? "min" : "max"]: parseInt(value, 10) || 0,
        },
      }));
    } else {
      // Handle other input update
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  }, []);
  
  // Prevents function recreation because it is passed to a child component
  const handleSelectChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);
  
  // Prevents function recreation because it is passed to a child component
  const handleTextareaChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleExtractInfo = async () => {
    // Validate URL format (basic validation)
    if (!url) return;

    let loadingTimeout;

    try {
      // Show loading spinner
      loadingContext?.updateLoading(true);

      // Create a 15 seconds timeout to auto-clear loading in case the fetch hangs
      loadingTimeout = setTimeout(() => {
        loadingContext?.updateLoading(false);
        alert("Request timed out. Please try again.");
      }, 15000); 

      // Send a POST request to the scrapper service to extract job info
      const response = await fetch("http://localhost:3000/api/scrapper/fill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error("Failed to extract job info");

      const { result } = await response.json();

      // Debug log the result
      console.log("Extracted result:", result);

      // Reformat the skillsRequired field array into a comma-separated string
      // Ex:ample: ["JavaScript", "React"] => "JavaScript, React"
      const skillsRequired = Array.isArray(result.skillsRequired)
        ? result.skillsRequired.join(", ")
        : result.skillsRequired || "";

      setFormData({
        company: result.company || "",
        position: result.position || "",
        applicationUrl: result.applicationUrl || url,
        deadline: result.deadline || "",
        workLocation: result.workLocation || "Remote",
        status: result.status || "Applied",
        salary: {
          min: result.salary?.min ?? 0,
          max: result.salary?.max ?? 0,
        },
        skillsRequired,
        jobDescription: result.jobDescription || "",
        note: "",
      });

      loadingContext?.updateLoading(false);
    } catch (error) {
      console.error("Error extracting job info:", error);
      alert("Failed to extract job info. Please try again.");
    } finally {
      // Clear the timeout and set loading to false
      clearTimeout(loadingTimeout);
      loadingContext?.updateLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-32 mb-10 px-4">
      <Loading isOpen={loadingContext?.loading ?? false} />
      <h1 className="text-2xl font-bold mb-4">Add New Application</h1>

      {/* URL Input Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Enter Job Application URL</h2>
        <div className="flex flex-col md:flex-row md:space-x-2">
          <input
            type="text"
            placeholder="Enter URL"
            className="input input-bordered w-full mb-2 md:mb-0"
            value={url}
            onChange={handleUrlChange}
          />
          <button className="btn btn-primary w-full md:w-auto" onClick={handleExtractInfo}>
            Extract
          </button>
        </div>
      </div>

      <ApplicationForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        handleTextareaChange={handleTextareaChange}
        isEditable={true}
      />

      <div className="flex justify-end space-x-2 mt-4">
        <Link to="/home" className="btn btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddApplicationPage;

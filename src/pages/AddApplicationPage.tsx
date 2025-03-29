import React, { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm/ApplicationForm";

const AddApplicationPage = () => {
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

  const handleExtractInfo = () => {
    // TODO: Placeholder for extraction logic
    // Simulate extraction by setting some dummy data
    setFormData({
      company: "Extracted Company",
      position: "Extracted Job Title",
      applicationUrl: "http://example.com",
      deadline: "2024-05-01",
      workLocation: "Remote",
      status: "Applied",
      salary: { min: 50000, max: 70000 },
      skillsRequired: "JavaScript, React, Node.js",
      jobDescription: "Extracted job description",
      note: "Extracted note",
    });
  };

  return (
    <div className="container mx-auto mt-32 mb-10 px-4">
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

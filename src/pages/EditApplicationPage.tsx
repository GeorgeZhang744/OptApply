import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm/ApplicationForm";
import { mockApplications } from "../data/mockdata";

const EditApplicationPage = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    applicationUrl: "",
    deadline: "",
    workLocation: "",
    status: "",
    salary: { min: 0, max: 0 },
    skillsRequired: "",
    jobDescription: "",
    note: "",
  });

  // Memoize finding the application data
  const foundApplication = useMemo(() => {
    return mockApplications.find((application: models.application.IApplication) => application.id === applicationId) || null;
  }, [applicationId]);

  useEffect(() => {
    const fetchApplication = async () => {
      if (foundApplication) {
        setFormData({
          ...foundApplication,
          deadline: foundApplication.deadline.toISOString().split("T")[0],
          salary: {
            min: foundApplication.salary.min || 0,
            max: foundApplication.salary.max || 0,
          },
          skillsRequired: foundApplication.skillsRequired.join(", "),
        });
      }
    };

    fetchApplication();
  }, [foundApplication]);

  // Prevents function recreation because it is passed to a child component
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "salaryMin" || name === "salaryMax") {
      // Handle salary input update
      setFormData((prevData) => ({
        ...prevData,
        salary: {
          ...prevData.salary,
          // Make the value is an positive integer
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Add logic to actually update the application
    console.log("Updated application:", formData);
    navigate(`/application/${applicationId}`);
  };

  return (
    <div className="container mx-auto mt-32 mb-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Edit Application</h1>

      <ApplicationForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        handleTextareaChange={handleTextareaChange}
        isEditable={true}
      />

      <div className="flex justify-end space-x-2 mt-4">
        <button className="btn btn-secondary" onClick={() => navigate(`/application/${applicationId}`)}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditApplicationPage;

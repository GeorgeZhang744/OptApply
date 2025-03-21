import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddApplicationPage = () => {
  const [url, setUrl] = useState("");
  const [formData, setFormData] = useState({
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
  });

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

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

      {/* Application Details Form */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Application Details</h2>
        <form className="space-y-4">
          {/* Company and Position */}
          <div className="flex flex-col md:flex-row md:space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company"
                className="input input-bordered w-full"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">
                Position <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="position"
                className="input input-bordered w-full"
                value={formData.position}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Application URL and Deadline */}
          <div className="flex flex-col md:flex-row md:space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium">
                Application URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="applicationUrl"
                className="input input-bordered w-full"
                value={formData.applicationUrl}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">
                Deadline <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="deadline"
                className="input input-bordered w-full"
                value={formData.deadline}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Work Location and Status */}
          <div className="flex flex-col md:flex-row md:space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium">
                Work Location <span className="text-red-500">*</span>
              </label>
              <select
                name="workLocation"
                className="input input-bordered w-full"
                value={formData.workLocation}
                onChange={handleSelectChange}
                required
              >
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                className="input input-bordered w-full"
                value={formData.status}
                onChange={handleSelectChange}
                required
              >
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-sm font-medium">
              Salary Range <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col md:flex-row md:space-x-2">
              <div className="flex-1">
                <label className="block text-xs font-medium">Min</label>
                <input
                  type="number"
                  name="salaryMin"
                  placeholder="Min"
                  className="input input-bordered w-full"
                  value={formData.salary.min}
                  onChange={(e) => setFormData({ ...formData, salary: { ...formData.salary, min: parseInt(e.target.value) } })}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium">Max</label>
                <input
                  type="number"
                  name="salaryMax"
                  placeholder="Max"
                  className="input input-bordered w-full"
                  value={formData.salary.max}
                  onChange={(e) => setFormData({ ...formData, salary: { ...formData.salary, max: parseInt(e.target.value) } })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Skills Required */}
          <div>
            <label className="block text-sm font-medium">Skills Required</label>
            <input
              type="text"
              name="skillsRequired"
              className="input input-bordered w-full"
              value={formData.skillsRequired}
              onChange={handleInputChange}
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium">Job Description</label>
            <textarea
              name="jobDescription"
              className="textarea input-bordered w-full"
              value={formData.jobDescription}
              onChange={handleTextareaChange}
              rows={5}
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium">Note</label>
            <textarea
              name="note"
              className="textarea input-bordered w-full"
              value={formData.note}
              onChange={handleTextareaChange}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 mt-4">
            <Link to="/home" className="btn btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApplicationPage;

import React from "react";

interface ApplicationFormProps {
  formData: {
    company: string;
    position: string;
    applicationUrl: string;
    deadline: string;
    workLocation: string;
    status: string;
    salary: { min: number; max: number };
    skillsRequired: string;
    jobDescription: string;
    note: string;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleTextareaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isEditable: boolean;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  formData,
  handleInputChange,
  handleSelectChange,
  handleTextareaChange,
  isEditable,
}) => {
  return (
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
            value={formData.company ?? ""}
            onChange={handleInputChange}
            required
            disabled={!isEditable}
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
            value={formData.position ?? ""}
            onChange={handleInputChange}
            required
            disabled={!isEditable}
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
            disabled={!isEditable}
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
            value={formData.deadline ?? ""}
            onChange={handleInputChange}
            required
            disabled={!isEditable}
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
            disabled={!isEditable}
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
            disabled={!isEditable}
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
              value={formData.salary.min ?? ""}
              onChange={(e) => handleInputChange(e as any)}
              required
              disabled={!isEditable}
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium">Max</label>
            <input
              type="number"
              name="salaryMax"
              placeholder="Max"
              className="input input-bordered w-full"
              value={formData.salary.max ?? ""}
              onChange={(e) => handleInputChange(e as any)}
              required
              disabled={!isEditable}
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
          value={formData.skillsRequired ?? ""}
          onChange={handleInputChange}
          disabled={!isEditable}
        />
      </div>

      {/* Job Description */}
      <div>
        <label className="block text-sm font-medium">Job Description</label>
        <textarea
          name="jobDescription"
          className="textarea input-bordered w-full"
          value={formData.jobDescription ?? ""}
          onChange={handleTextareaChange}
          rows={5}
          disabled={!isEditable}
        />
      </div>

      {/* Note */}
      <div>
        <label className="block text-sm font-medium">Note</label>
        <textarea
          name="note"
          className="textarea input-bordered w-full"
          value={formData.note ?? ""}
          onChange={handleTextareaChange}
          disabled={!isEditable}
        />
      </div>
    </form>
  );
};

export default ApplicationForm;

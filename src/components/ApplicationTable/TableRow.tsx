import { useNavigate } from "react-router";
import React from "react";

interface ITableRowProps {
  application: models.application.IApplication;
  isChecked: boolean;
  toggleSelection: () => void;
}

const TableRow: React.FC<ITableRowProps> = ({ application, isChecked, toggleSelection }) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/application/${application.id}`);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    toggleSelection();
  };

  return (
    <tr className="text-neutral-content hover:bg-accent hover:text-accent-content cursor-pointer" onClick={handleRowClick}>
      <td className="p-3">
        <input
          type="checkbox"
          className="checkbox checkbox-secondary"
          checked={isChecked}
          onChange={handleCheckboxChange}
          // Prevents the row click event (navigate to application page) from being triggered when the checkbox is clicked
          onClick={(event) => event.stopPropagation()}
        />
      </td>
      <td className="p-3">{application.company}</td>
      <td className="p-3">{application.position}</td>
      <td className="p-3 text-info hidden sm:table-cell">
        <a href={application.applicationUrl} target="_blank" rel="noopener noreferrer">
          {application.applicationUrl}
        </a>
      </td>
      <td className="p-3">{application.deadline.toLocaleDateString()}</td>
      <td className="p-3 hidden sm:table-cell">{application.workLocation}</td>
      <td className="p-3 hidden sm:table-cell">{application.status}</td>
    </tr>
  );
};

export default TableRow;

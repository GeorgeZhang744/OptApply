import { useNavigate } from "react-router";

interface ITableRowProps {
  application: models.application.IApplication;
}

const TableRow: React.FC<ITableRowProps> = ({ application }) => {
  const navigate = useNavigate()

  const handleRowClick = () => {
    navigate(`/application/${application.id}`)
  }

  return (
    <tr className="text-neutral-content hover:bg-accent hover:text-accent-content cursor-pointer" onClick={handleRowClick}>
      <td className="p-3">
        <input type="checkbox" className="checkbox checkbox-secondary" />
      </td>
      <td className="p-3">{application.company}</td>
      <td className="p-3">{application.position}</td>
      <td className="p-3 text-info">
        <a href={application.applicationUrl} target="_blank" rel="noopener noreferrer">
          {application.applicationUrl}
        </a>
      </td>
      <td className="p-3">{application.deadline.toLocaleDateString()}</td>
      <td className="p-3">{application.workLocation}</td>
      <td className="p-3">{application.status}</td>
    </tr>
  );
};

export default TableRow;
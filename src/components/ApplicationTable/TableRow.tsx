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
    <tr className=" hover:bg-gray-50 cursor-pointer" onClick={handleRowClick}>
      <td className="p-3">
        <input type="checkbox" />
      </td>
      <td className="p-3">{application.company}</td>
      <td className="p-3">{application.position}</td>
      <td className="p-3 text-blue-500">
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
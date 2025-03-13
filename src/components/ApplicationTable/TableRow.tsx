import { useNavigate } from "react-router";
import { IApplication } from "../../data/mockdata";

interface ITableRowProps {
  application: IApplication;
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
        <a href={application.ApplicationUrl} target="_blank" rel="noopener noreferrer">
          {application.ApplicationUrl}
        </a>
      </td>
      <td className="p-3">{application.deadline.toLocaleDateString()}</td>
      <td className="p-3">{application.workLocation}</td>
      <td className="p-3">{application.status}</td>
    </tr>
  );
};

export default TableRow;
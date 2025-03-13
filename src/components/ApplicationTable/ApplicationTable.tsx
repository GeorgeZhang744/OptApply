import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { IApplication } from "../../data/mockdata";

type IApplicationTableProps = {
  applications: IApplication[];
};

const ApplicationTable: React.FC<IApplicationTableProps> = ({ applications }) => {
  return (
    <div className="overflow-x-auto rounded-lg bg-white border border-gray-200 mt-2">
      <table className="table w-full text-sm text-left text-gray-700">
        <TableHeader />

        {/* Table Content */}
        <tbody>
          {applications.map((application) => (
            <TableRow key={application.id} application={application} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationTable;

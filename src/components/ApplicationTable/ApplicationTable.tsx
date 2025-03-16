import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

type IApplicationTableProps = {
  applications: models.application.IApplication[];
};

const ApplicationTable: React.FC<IApplicationTableProps> = ({
  applications,
}) => {
  return (
    <div className="overflow-x-auto rounded-lg bg-neutral border border-secondary mt-2">
      <table className="table w-full text-sm text-left">
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

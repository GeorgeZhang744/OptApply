import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

type IApplicationTableProps = {
  applications: models.application.IApplication[];
  selectedApplications: Set<string>;
  toggleApplicationSelection: (applicationId: string) => void;
};

const ApplicationTable: React.FC<IApplicationTableProps> = ({
  applications,
  selectedApplications,
  toggleApplicationSelection,
}) => {
  return (
    <div className="overflow-x-auto rounded-lg bg-neutral border border-secondary m-1 mx-2">
      <table className="table w-full text-sm text-left">
        <TableHeader />

        {/* Table Content */}
        <tbody>
          {applications.map((application) => (
            <TableRow
              key={application.id}
              application={application}
              isChecked={selectedApplications.has(application.id.toString())}
              toggleSelection={() => toggleApplicationSelection(application.id.toString())}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationTable;

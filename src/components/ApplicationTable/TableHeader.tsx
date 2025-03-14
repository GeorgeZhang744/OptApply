const TableHeader = () => {
  return (
    <thead className="bg-secondary text-secondary-content font-semibold">
      <tr>
        <th className="p-3"></th>
        <th className="p-3">Company</th>
        <th className="p-3">Position</th>
        <th className="p-3">Application</th>
        <th className="p-3">Deadline</th>
        <th className="p-3">Remote</th>
        <th className="p-3">Status</th>
      </tr>
    </thead>
  );
}

export default TableHeader;